import { en, type Messages } from './messages/en';
import { ja } from './messages/ja';
import type { Locale } from './routing';

// Everything about languages: URL helpers (./routing), page copy (./messages)
// and `localize` for content data. See ./README.md for where text lives.
export * from './routing';
export type { Messages };

export const messages: Record<Locale, Messages> = { en, ja };

/**
 * Content entries keep their Japanese in a `ja` field that uses the English
 * field names; this returns the entry with that text in place.
 */
export function localize<T extends { ja: object }>(item: T, locale: Locale): T {
  return locale === 'ja' ? { ...item, ...item.ja } : item;
}
