export type Place = {
  /** Unique id, e.g. "tokyo". */
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  /** When you were there, written the way it should appear: "2024 – 2026", "Aug 2025". */
  period?: string;
  note?: string;
  /** A blog post or album about the place. */
  link?: { href: string; label: string };
};

// To add a place, copy an entry and edit it. For coordinates, right-click the
// spot on openstreetmap.org and choose "Show address": the search box then
// shows its latitude and longitude. The page lists places by country, with
// countries in the order they first appear here.
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
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    lat: 35.0116,
    lng: 135.7681,
  },
  {
    id: 'toyama',
    name: 'Toyama',
    country: 'Japan',
    lat: 36.6953,
    lng: 137.2113,
  },
  {
    id: 'nagano',
    name: 'Nagano',
    country: 'Japan',
    lat: 36.6486,
    lng: 138.1948,
  },
  {
    id: 'nara',
    name: 'Nara',
    country: 'Japan',
    lat: 34.6851,
    lng: 135.8048,
  },
  {
    id: 'osaka',
    name: 'Osaka',
    country: 'Japan',
    lat: 34.6937,
    lng: 135.5023,
  },
  {
    id: 'chiba',
    name: 'Chiba',
    country: 'Japan',
    lat: 35.6074,
    lng: 140.1065,
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
  {
    id: 'guangzhou',
    name: 'Guangzhou',
    country: 'China',
    lat: 23.1291,
    lng: 113.2644,
  },
  {
    id: 'shenzhen',
    name: 'Shenzhen',
    country: 'China',
    lat: 22.5431,
    lng: 114.0579,
  },
  {
    id: 'zhuhai',
    name: 'Zhuhai',
    country: 'China',
    lat: 22.271,
    lng: 113.5767,
  },
  {
    id: 'macau',
    name: 'Macau',
    country: 'China',
    lat: 22.1987,
    lng: 113.5439,
  },
  {
    id: 'hong-kong',
    name: 'Hong Kong',
    country: 'China',
    lat: 22.3193,
    lng: 114.1694,
  },
  {
    id: 'beijing',
    name: 'Beijing',
    country: 'China',
    lat: 39.9042,
    lng: 116.4074,
  },
  {
    id: 'qingdao',
    name: 'Qingdao',
    country: 'China',
    lat: 36.0669,
    lng: 120.3828,
  },
  {
    id: 'weihai',
    name: 'Weihai',
    country: 'China',
    lat: 37.5133,
    lng: 122.12,
  },
  {
    id: 'lijiang',
    name: 'Lijiang',
    country: 'China',
    lat: 26.8725,
    lng: 100.23,
  },
  {
    id: 'shanghai',
    name: 'Shanghai',
    country: 'China',
    lat: 31.2304,
    lng: 121.4737,
  },
  {
    id: 'nanjing',
    name: 'Nanjing',
    country: 'China',
    lat: 32.0584,
    lng: 118.7965,
  },
  {
    id: 'tianjin',
    name: 'Tianjin',
    country: 'China',
    lat: 39.1336,
    lng: 117.2054,
  },
  {
    // The seaside community in Qinhuangdao, Hebei; the marker is on its chapel.
    id: 'aranya',
    name: 'Aranya',
    country: 'China',
    lat: 39.6536,
    lng: 119.3163,
  },
  {
    id: 'sanya',
    name: 'Sanya',
    country: 'China',
    lat: 18.2525,
    lng: 109.5117,
  },
  {
    id: 'changsha',
    name: 'Changsha',
    country: 'China',
    lat: 28.2281,
    lng: 112.9389,
  },
  {
    id: 'xian',
    name: 'Xi’an',
    country: 'China',
    lat: 34.261,
    lng: 108.9423,
  },
  {
    id: 'chengdu',
    name: 'Chengdu',
    country: 'China',
    lat: 30.6574,
    lng: 104.0659,
  },
  {
    id: 'kuala-lumpur',
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    lat: 3.139,
    lng: 101.6869,
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    id: 'busan',
    name: 'Busan',
    country: 'South Korea',
    lat: 35.1796,
    lng: 129.0756,
  },
];
