'use client';

import type { Messages } from '@/i18n';
import { createContext, useContext, type ReactNode } from 'react';

// Text for the not-found screen. Next doesn't pass not-found.tsx the route's
// [locale], so the root layout hands it its strings this way instead of
// every translation being bundled for the browser.
type LocaleText = Pick<Messages, 'notFound'>;

const LocaleTextContext = createContext<LocaleText | null>(null);

export function LocaleTextProvider({
  value,
  children,
}: {
  value: LocaleText;
  children: ReactNode;
}) {
  return (
    <LocaleTextContext.Provider value={value}>
      {children}
    </LocaleTextContext.Provider>
  );
}

export function useLocaleText(): LocaleText {
  const value = useContext(LocaleTextContext);
  if (!value) throw new Error('useLocaleText needs a LocaleTextProvider above it');
  return value;
}
