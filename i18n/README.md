# Translations

English and Japanese text for every page, ready for a language toggle.
Nothing reads it yet: the pages still render their English directly.

Only page content is translated. Site chrome stays in English in both
languages: the sidebar, the header links, the mobile menu, search, the footer,
the ‹ › pagers at the bottom of each page and the intro's skip button.

## Where the text lives

- **Page copy**: `messages/en.ts` holds the text of every page, copied verbatim
  from where it is hard-coded today; `messages/ja.ts` has the same keys in
  Japanese. `ja` is typed against `en`, so a missing or extra key fails `tsc`.
  `index.ts` exports `locales`, `defaultLocale` and `messages`.
- **Content data** keeps its Japanese next to the English, in a `ja` field
  that uses the same field names, so a localised item is `{ ...item, ...item.ja }`:
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

## Notes for the toggle

- Set `<html lang>` from `messages.locale.htmlLang` and the Open Graph locale
  from `meta.ogLocale`.
- The Geist fonts only cover Latin, so Japanese falls back to the system font.
  Loading Noto Sans JP through `next/font` would make it consistent.
- Page headings use `tracking-tighter`; Japanese reads better without the
  negative letter-spacing.
- Pass `home.github.calendar` to the GitHub calendar's `labels`
  (`totalCountRecent` is for the 3-month phone view).
- The About page rows (`about.languages`, `about.skills`, …) currently live
  inline in `app/about/page.tsx`; switch the page to read them from `messages`.
