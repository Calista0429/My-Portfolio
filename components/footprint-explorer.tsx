'use client';

import { FootprintMap } from '@/components/footprint-map';
import type { Place } from '@/constants/footprint';
import { ArrowLeftIcon, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// The map plus a side panel that lists every place, or shows the one picked
// on the map or in the list.
export function FootprintExplorer({ places }: { places: Place[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Where keyboard focus goes back to after leaving a place's details.
  const [returnFocusId, setReturnFocusId] = useState<string | null>(null);
  const selected = places.find((place) => place.id === selectedId);
  const countries = new Set(places.map((place) => place.country)).size;

  const select = (id: string | null) => {
    if (id === null) setReturnFocusId(selectedId);
    setSelectedId(id);
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
      <FootprintMap
        places={places}
        selectedId={selectedId}
        onSelect={select}
        className="h-[360px] sm:h-[460px]"
      />
      <aside className="rounded-xl border p-4 xl:h-[460px] xl:overflow-y-auto">
        {selected ? (
          <PlaceDetails place={selected} onBack={() => select(null)} />
        ) : (
          <>
            <h2 className="mb-1! text-sm! font-semibold uppercase tracking-wide!">
              Places
            </h2>
            <div className="mb-3 text-sm text-muted-foreground">
              {plural(places.length, 'place', 'places')} in{' '}
              {plural(countries, 'country', 'countries')}
            </div>
            <ul className="-mx-2 space-y-0.5">
              {places.map((place) => (
                <li key={place.id}>
                  <button
                    type="button"
                    onClick={() => select(place.id)}
                    autoFocus={place.id === returnFocusId}
                    className="flex w-full items-baseline justify-between gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors outline-none hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <span className="min-w-0">
                      <span className="font-medium">{place.name}</span>
                      <span className="text-muted-foreground">
                        , {place.country}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {place.period}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </div>
  );
}

function PlaceDetails({ place, onBack }: { place: Place; onBack: () => void }) {
  return (
    <div className="text-sm">
      <button
        type="button"
        onClick={onBack}
        autoFocus
        className="mb-4 inline-flex items-center gap-1 rounded-md text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <ArrowLeftIcon className="size-4" />
        All places
      </button>
      <h2 className="mb-1!">{place.name}</h2>
      <div className="text-muted-foreground">{place.country}</div>
      <div className="text-muted-foreground">{place.period}</div>
      {place.note && <div className="mt-3">{place.note}</div>}
      {place.link && (
        <Link
          href={place.link.href}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-primary underline underline-offset-4"
        >
          {place.link.label}
          <ExternalLinkIcon className="size-3" />
        </Link>
      )}
    </div>
  );
}

function plural(count: number, one: string, many: string) {
  return `${count} ${count === 1 ? one : many}`;
}
