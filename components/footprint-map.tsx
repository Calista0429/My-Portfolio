'use client';

import 'leaflet/dist/leaflet.css';

import type { Place } from '@/constants/footprint';
import { cn } from '@/lib/utils';
import type {
  CircleMarker,
  LatLngBoundsExpression,
  Map as LeafletMap,
} from 'leaflet';
import { useEffect, useRef } from 'react';

type FootprintMapProps = {
  places: Place[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  className?: string;
};

const RADIUS = 7;
const SELECTED_RADIUS = 11;

// OpenStreetMap through Leaflet: one marker per place. Clicking a marker
// selects it, clicking the map clears the selection.
export function FootprintMap({
  places,
  selectedId,
  onSelect,
  className,
}: FootprintMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef(new Map<string, CircleMarker>());
  // Leaflet handlers are bound once, so they read the latest callback from here.
  const onSelectRef = useRef(onSelect);
  useEffect(() => {
    onSelectRef.current = onSelect;
  });

  // Leaflet touches `window` as soon as it is imported, so load it on the client only.
  useEffect(() => {
    let disposed = false;
    let map: LeafletMap | undefined;
    const markers = markersRef.current;

    void import('leaflet').then((L) => {
      if (disposed || !containerRef.current) return;
      map = L.map(containerRef.current, { scrollWheelZoom: false });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      for (const place of places) {
        const marker = L.circleMarker([place.lat, place.lng], {
          radius: RADIUS,
          weight: 2,
          fillOpacity: 0.9,
          className: 'fill-primary stroke-background',
          bubblingMouseEvents: false,
        })
          .bindTooltip(`${place.name}, ${place.country}`)
          .on('click', () => onSelectRef.current(place.id))
          .addTo(map);
        markers.set(place.id, marker);
      }
      map.on('click', () => onSelectRef.current(null));

      mapRef.current = map;
      showAll(map, places, false);
    });

    return () => {
      disposed = true;
      map?.remove();
      mapRef.current = null;
      markers.clear();
    };
  }, [places]);

  // Enlarge the selected marker and bring it into view; with no selection, show every place.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const animate = !window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches;

    for (const [id, marker] of markersRef.current) {
      marker.setRadius(id === selectedId ? SELECTED_RADIUS : RADIUS);
      if (id === selectedId) marker.bringToFront();
    }

    const place = places.find((p) => p.id === selectedId);
    if (place) {
      map.setView([place.lat, place.lng], Math.max(map.getZoom(), 6), {
        animate,
      });
    } else {
      showAll(map, places, animate);
    }
  }, [selectedId, places]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Map of places I’ve been"
      className={cn(
        // `isolate` keeps Leaflet's z-indexed panes under the sticky site header.
        // leaflet.css is unlayered, so its background needs `!` to be replaced.
        'isolate rounded-xl border bg-muted!',
        // OpenStreetMap tiles are light; invert them in dark mode.
        'dark:[&_.leaflet-tile-pane]:invert dark:[&_.leaflet-tile-pane]:hue-rotate-180 dark:[&_.leaflet-tile-pane]:brightness-90',
        className
      )}
    />
  );
}

function showAll(map: LeafletMap, places: Place[], animate: boolean) {
  if (places.length === 0) {
    map.setView([20, 0], 2, { animate });
    return;
  }
  const bounds: LatLngBoundsExpression = places.map((p) => [p.lat, p.lng]);
  map.fitBounds(bounds, { padding: [48, 48], maxZoom: 5, animate });
}
