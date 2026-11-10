import { en, type Messages } from './messages/en';
import { ja } from './messages/ja';

// Languages the site is prepared for. Nothing switches between them yet;
// see ./README.md for where every translation lives.
export const locales = ['en', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const messages: Record<Locale, Messages> = { en, ja };
export type { Messages };
