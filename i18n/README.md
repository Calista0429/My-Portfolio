# Languages

The site is in English and Japanese. English pages keep their bare paths
(`/about`); Japanese pages live under `/ja` (`/ja/about`).

Only page content is translated. Site chrome stays in English in both
languages: the sidebar, the header links, the mobile menu, search, the footer,
the ‹ › pagers at the bottom of each page and the intro's skip button. Their
links still follow the current language.

## How it fits together

- `middleware.ts` serves the bare English paths from the `app/[locale]` routes
  (as `en`), redirects `/en/…` to the bare path, and leaves `/ja/…` alone.
- `app/[locale]/layout.tsx` sets `<html lang>` and the metadata per language;
  both languages are prerendered.
- `routing.ts` has the URL helpers (`localizePath`, `localeFromPathname`, …);
  it imports no messages, so client components can use it cheaply.
- Pages read their text from `messages[locale]` and their content data through
  `localize` / `localizeProject` / `localizePlaces`.
- The EN / JP keycap toggle is `components/language-toggle.tsx`. Each key links
  to the current page in that language.

## Where the text lives

- **Page copy**: `messages/en.ts` and `messages/ja.ts`, with the same keys.
  `ja` is typed against `en`, so a missing or extra key fails `tsc`.
- **Content data** keeps its Japanese next to the English, in a `ja` field
  that uses the same field names:
  - `constants/projects.ts`: `title`, `tagline`, `overview`, `features`,
    `challenges`, `learnings`, plus `coverAlt` for `cover.alt`.
  - `constants/experience.ts`, `constants/education.ts`: `title`, `date`,
    `description`.
  - `constants/footprint.ts`: `name`, and `period` / `note` where the English
    has them. Country names are in `messages.footprint.countries`.

  The types make `ja` required, so a new entry can't be added without its
  Japanese.

Kept in English on purpose: the name "Baoxi Huang", product and technology
names, and the paper title.

## Adding a language

`/ja` is spelled out in `localeFromPathname` (`routing.ts`) and in
`middleware.ts`; teach both the new prefix, add it to `locales`, add
`messages/<id>.ts`, give content entries the new field, and add a key to the
toggle.
