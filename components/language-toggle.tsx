'use client';

import './language-toggle.css';

import { localeFromPathname, localizePath, type Locale } from '@/i18n/routing';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LANGUAGES: { locale: Locale; label: string; name: string }[] = [
  { locale: 'en', label: 'EN', name: 'English' },
  { locale: 'ja', label: 'JP', name: '日本語' },
];

/**
 * Keycap EN / JP switch: the "keys" variant of the swe-language-toggle
 * package, as a React component. Each key is a real link to the current page
 * in that language, so a plain click switches through client-side navigation,
 * Cmd/Ctrl-click opens it in a new tab, and the pressed key always matches the
 * URL (after Back too).
 */
export function LanguageToggle() {
  const pathname = usePathname();
  const current = localeFromPathname(pathname);

  return (
    <nav
      aria-label="Language"
      data-locale={current}
      className="swe-language-toggle swe-language-toggle--keys"
    >
      {LANGUAGES.map(({ locale, label, name }) => (
        <Link
          key={locale}
          href={localizePath(pathname, locale)}
          lang={locale}
          hrefLang={locale}
          aria-label={name}
          aria-current={locale === current ? 'page' : undefined}
          className="swe-language-toggle__link"
          onClick={(event) => {
            // Pressing the key that's already down does nothing (instead of
            // reloading the page and jumping to the top); modified clicks still
            // open the link.
            const modified =
              event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
            if (locale === current && !modified) event.preventDefault();
          }}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
