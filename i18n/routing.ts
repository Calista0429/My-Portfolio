// URL scheme: English pages keep their bare paths (/about) and Japanese pages
// live under /ja (/ja/about). middleware.ts serves the bare paths from the
// [locale] = "en" routes. Kept free of message imports so client components
// can use it without bundling every translation.
export const locales = ['en', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** The locale for a route's [locale] param; anything unknown is English. */
export function toLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/** "/ja" and "/ja/…" are Japanese; every other path is English. */
export function localeFromPathname(pathname: string): Locale {
  return pathname === '/ja' || pathname.startsWith('/ja/') ? 'ja' : 'en';
}

/** The path without its language prefix: "/ja/about" -> "/about", "/ja" -> "/". */
export function stripLocale(pathname: string): string {
  return localeFromPathname(pathname) === 'ja' ? pathname.slice(3) || '/' : pathname;
}

/** The same page in the given language: ("/about", "ja") -> "/ja/about". */
export function localizePath(path: string, locale: Locale): string {
  const bare = stripLocale(path);
  if (locale === defaultLocale) return bare;
  return `/${locale}${bare === '/' ? '' : bare}`;
}
