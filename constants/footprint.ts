import { localize, messages, type Locale } from '@/i18n';

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
  // Japanese text for the language toggle; same field names as the English.
  // Country names are translated in i18n/messages (footprint.countries).
  ja: { name: string; period?: string; note?: string };
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
    ja: { name: '東京', period: '2024年〜2026年', note: '東京大学大学院（修士課程）' },
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    lat: 35.0116,
    lng: 135.7681,
    ja: { name: '京都' },
  },
  {
    id: 'toyama',
    name: 'Toyama',
    country: 'Japan',
    lat: 36.6953,
    lng: 137.2113,
    ja: { name: '富山' },
  },
  {
    id: 'nagano',
    name: 'Nagano',
    country: 'Japan',
    lat: 36.6486,
    lng: 138.1948,
    ja: { name: '長野' },
  },
  {
    id: 'nara',
    name: 'Nara',
    country: 'Japan',
    lat: 34.6851,
    lng: 135.8048,
    ja: { name: '奈良' },
  },
  {
    id: 'osaka',
    name: 'Osaka',
    country: 'Japan',
    lat: 34.6937,
    lng: 135.5023,
    ja: { name: '大阪' },
  },
  {
    id: 'chiba',
    name: 'Chiba',
    country: 'Japan',
    lat: 35.6074,
    lng: 140.1065,
    ja: { name: '千葉' },
  },
  {
    id: 'yokohama',
    name: 'Yokohama',
    country: 'Japan',
    lat: 35.4437,
    lng: 139.638,
    ja: { name: '横浜' },
  },
  {
    id: 'kamakura',
    name: 'Kamakura',
    country: 'Japan',
    lat: 35.3192,
    lng: 139.5467,
    ja: { name: '鎌倉' },
  },
  {
    id: 'nagoya',
    name: 'Nagoya',
    country: 'Japan',
    lat: 35.1815,
    lng: 136.9066,
    ja: { name: '名古屋' },
  },
  {
    id: 'changchun',
    name: 'Changchun',
    country: 'China',
    lat: 43.88,
    lng: 125.32,
    period: '2020 – 2024',
    note: 'Bachelor’s at Jilin University.',
    ja: { name: '長春', period: '2020年〜2024年', note: '吉林大学（学士課程）' },
  },
  {
    id: 'guangzhou',
    name: 'Guangzhou',
    country: 'China',
    lat: 23.1291,
    lng: 113.2644,
    ja: { name: '広州' },
  },
  {
    id: 'shenzhen',
    name: 'Shenzhen',
    country: 'China',
    lat: 22.5431,
    lng: 114.0579,
    ja: { name: '深圳' },
  },
  {
    id: 'zhuhai',
    name: 'Zhuhai',
    country: 'China',
    lat: 22.271,
    lng: 113.5767,
    ja: { name: '珠海' },
  },
  {
    id: 'macau',
    name: 'Macau',
    country: 'China',
    lat: 22.1987,
    lng: 113.5439,
    ja: { name: 'マカオ' },
  },
  {
    id: 'hong-kong',
    name: 'Hong Kong',
    country: 'China',
    lat: 22.3193,
    lng: 114.1694,
    ja: { name: '香港' },
  },
  {
    id: 'beijing',
    name: 'Beijing',
    country: 'China',
    lat: 39.9042,
    lng: 116.4074,
    ja: { name: '北京' },
  },
  {
    id: 'qingdao',
    name: 'Qingdao',
    country: 'China',
    lat: 36.0669,
    lng: 120.3828,
    ja: { name: '青島' },
  },
  {
    id: 'weihai',
    name: 'Weihai',
    country: 'China',
    lat: 37.5133,
    lng: 122.12,
    ja: { name: '威海' },
  },
  {
    id: 'lijiang',
    name: 'Lijiang',
    country: 'China',
    lat: 26.8725,
    lng: 100.23,
    ja: { name: '麗江' },
  },
  {
    id: 'shanghai',
    name: 'Shanghai',
    country: 'China',
    lat: 31.2304,
    lng: 121.4737,
    ja: { name: '上海' },
  },
  {
    id: 'nanjing',
    name: 'Nanjing',
    country: 'China',
    lat: 32.0584,
    lng: 118.7965,
    ja: { name: '南京' },
  },
  {
    id: 'tianjin',
    name: 'Tianjin',
    country: 'China',
    lat: 39.1336,
    lng: 117.2054,
    ja: { name: '天津' },
  },
  {
    // The seaside community in Qinhuangdao, Hebei; the marker is on its chapel.
    id: 'aranya',
    name: 'Aranya',
    country: 'China',
    lat: 39.6536,
    lng: 119.3163,
    ja: { name: '阿那亜' },
  },
  {
    id: 'sanya',
    name: 'Sanya',
    country: 'China',
    lat: 18.2525,
    lng: 109.5117,
    ja: { name: '三亜' },
  },
  {
    id: 'changsha',
    name: 'Changsha',
    country: 'China',
    lat: 28.2281,
    lng: 112.9389,
    ja: { name: '長沙' },
  },
  {
    id: 'xian',
    name: 'Xi’an',
    country: 'China',
    lat: 34.261,
    lng: 108.9423,
    ja: { name: '西安' },
  },
  {
    id: 'chengdu',
    name: 'Chengdu',
    country: 'China',
    lat: 30.6574,
    lng: 104.0659,
    ja: { name: '成都' },
  },
  {
    // A whole region: the marker sits on its capital, Ürümqi.
    id: 'xinjiang',
    name: 'Xinjiang',
    country: 'China',
    lat: 43.8244,
    lng: 87.6139,
    ja: { name: '新疆' },
  },
  {
    id: 'fuzhou',
    name: 'Fuzhou',
    country: 'China',
    lat: 26.0775,
    lng: 119.2918,
    ja: { name: '福州' },
  },
  {
    id: 'xiamen',
    name: 'Xiamen',
    country: 'China',
    lat: 24.4801,
    lng: 118.0853,
    ja: { name: '厦門' },
  },
  {
    id: 'shantou',
    name: 'Shantou',
    country: 'China',
    lat: 23.3564,
    lng: 116.6776,
    ja: { name: '汕頭' },
  },
  {
    // Shunde and Nanhai are districts of Foshan, Guangdong.
    id: 'shunde',
    name: 'Shunde',
    country: 'China',
    lat: 22.8055,
    lng: 113.2894,
    ja: { name: '順徳' },
  },
  {
    id: 'nanhai',
    name: 'Nanhai',
    country: 'China',
    lat: 23.0314,
    lng: 113.1375,
    ja: { name: '南海' },
  },
  {
    id: 'kuala-lumpur',
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    lat: 3.139,
    lng: 101.6869,
    ja: { name: 'クアラルンプール' },
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    ja: { name: 'シンガポール' },
  },
  {
    id: 'busan',
    name: 'Busan',
    country: 'South Korea',
    lat: 35.1796,
    lng: 129.0756,
    ja: { name: '釜山' },
  },
];

/** A place in one language, with its marker tooltip ready (sent to the browser). */
export type LocalizedPlace = Omit<Place, 'ja'> & { tooltip: string };

export function localizePlaces(locale: Locale): LocalizedPlace[] {
  const { countries, tooltip } = messages[locale].footprint;
  return places.map((place) => {
    const { id, name, lat, lng, period, note, link, country } = localize(place, locale);
    const countryName = countries[country as keyof typeof countries] ?? country;
    return {
      id,
      name,
      country: countryName,
      lat,
      lng,
      // "Singapore, Singapore" would be silly; show the name alone.
      tooltip: name === countryName ? name : tooltip(name, countryName),
      ...(period ? { period } : {}),
      ...(note ? { note } : {}),
      ...(link ? { link } : {}),
    };
  });
}
