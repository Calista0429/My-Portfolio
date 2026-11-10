# Translations

English and Japanese text for the whole site, ready for a language toggle.
Nothing reads it yet: the components still render their English directly.

## Where the text lives

- **UI and page copy**: `messages/en.ts` holds every string that is currently
  hard-coded in components, copied verbatim; `messages/ja.ts` has the same
  keys in Japanese. `ja` is typed against `en`, so a missing or extra key
  fails `tsc`. `index.ts` exports `locales`, `defaultLocale` and `messages`.
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
names, the paper title, and the intro's `npm run hello` / `ready` (they are
code on screen).

## Notes for the toggle

- Set `<html lang>` from `messages.locale.htmlLang`, the Open Graph locale from
  `meta.ogLocale`, and use `locale.intl` for the header and mobile clocks.
- The Geist fonts only cover Latin, so Japanese falls back to the system font.
  Loading Noto Sans JP through `next/font` would make it consistent.
- Page headings use `tracking-tighter`; Japanese reads better without the
  negative letter-spacing.
- Pass `home.github.calendar` to the GitHub calendar's `labels`
  (`totalCountRecent` is for the 3-month phone view).
- The intro's skip button and overlay label are set in
  `components/pixel-preloader/mount-preloader.js`; take them from `intro`.
- The Resume link points to the English PDF, which is why the Japanese label
  says 英文レジュメ. Point it at a Japanese résumé if one is added.
- The About page rows (`about.languages`, `about.skills`, …) currently live
  inline in `app/about/page.tsx`; switch the page to read them from `messages`.
