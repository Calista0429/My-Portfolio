export type Place = {
  /** Unique id, e.g. "tokyo". */
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  /** When you were there, written the way it should appear: "2024 – 2026", "Aug 2025". */
  period: string;
  note?: string;
  /** A blog post or album about the place. */
  link?: { href: string; label: string };
};

// To add a place, copy an entry and edit it. For coordinates, right-click the
// spot on openstreetmap.org and choose "Show address": the search box then
// shows its latitude and longitude.
export const places: Place[] = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    lat: 35.6895,
    lng: 139.6917,
    period: '2024 – 2026',
    note: 'Master’s at The University of Tokyo.',
  },
  {
    id: 'changchun',
    name: 'Changchun',
    country: 'China',
    lat: 43.88,
    lng: 125.32,
    period: '2020 – 2024',
    note: 'Bachelor’s at Jilin University.',
  },
];
