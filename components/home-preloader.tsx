'use client';

import developerTyping from '@/assets/pixel-preloader/developer-typing-v3.png';
import dayRoom from '@/assets/pixel-preloader/terminal-workroom-day-v4.png';
import nightRoom from '@/assets/pixel-preloader/terminal-workroom-night-v4.png';
import {
  mountPixelPreloader,
  type PixelPreloader,
} from '@/components/pixel-preloader/mount-preloader';
import { stripLocale } from '@/i18n/routing';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// If the intro hasn't taken over this long after the page started loading (a
// very slow network or a script error), the cover fades out by itself and the
// intro is skipped.
const COVER_TIMEOUT_MS = 8000;
// Last-resort release in case the animation stalls. It normally ends within
// about 7.6 s: up to 2.8 s waiting for the images, then about 4.75 s of motion.
const SAFETY_TIMEOUT_MS = 12000;

// Module state lasts for the whole page load: it survives client-side
// navigation but not a reload, so the intro plays once per load of the homepage.
let played = false;
let mountedCount = 0;

// True when the document itself was loaded at the homepage ("/" or "/ja"),
// rather than the visitor arriving there from another page of the site.
function isFullLoadOfHome() {
  const [navigation] = performance.getEntriesByType('navigation');
  const firstPath = navigation
    ? new URL(navigation.name).pathname
    : window.location.pathname;
  return stripLocale(firstPath) === '/';
}

function startIntro(theme: 'light' | 'dark'): PixelPreloader | null {
  try {
    return mountPixelPreloader({
      theme,
      assets: {
        day: dayRoom.src,
        night: nightRoom.src,
        operator: developerTyping.src,
      },
      onComplete: () => {
        played = true;
      },
    });
  } catch (error) {
    console.error('The intro animation could not start', error);
    return null;
  }
}

/**
 * The pixel-developer intro. It plays over the already-rendered homepage when
 * the homepage is opened or reloaded, then reveals it; the theme follows the
 * site's (next-themes).
 */
export function HomePreloader() {
  const { resolvedTheme } = useTheme();
  // The server HTML includes a plain cover in the scene's background colour, so
  // the first paint is the intro rather than a flash of the page underneath.
  // Client-side navigation to the homepage renders without it.
  const [covering, setCovering] = useState(
    () => typeof window === 'undefined' || (!played && isFullLoadOfHome())
  );

  useEffect(() => {
    if (
      played ||
      !isFullLoadOfHome() ||
      performance.now() > COVER_TIMEOUT_MS
    ) {
      played = true;
      setCovering(false);
      return;
    }

    const theme =
      resolvedTheme === 'light' || resolvedTheme === 'dark'
        ? resolvedTheme
        : document.documentElement.classList.contains('dark')
          ? 'dark'
          : 'light';
    const intro = startIntro(theme);
    // From here the intro's own overlay covers the page (or, if it failed to
    // start, nothing should).
    setCovering(false);
    if (!intro) {
      played = true;
      return;
    }

    const safety = window.setTimeout(intro.skip, SAFETY_TIMEOUT_MS);
    mountedCount += 1;
    return () => {
      mountedCount -= 1;
      window.clearTimeout(safety);
      intro.cancel();
      // Strict Mode (in development) and a theme change re-run this effect
      // straight away. Only a real unmount leaves nothing mounted; then the
      // interrupted intro counts as played, so it won't restart on return.
      queueMicrotask(() => {
        if (mountedCount === 0) played = true;
      });
    };
  }, [resolvedTheme]);

  if (!covering) return null;
  return (
    <>
      <div
        data-intro-cover=""
        aria-hidden="true"
        className="fixed inset-0 z-[100000] bg-[#e9e4d6] dark:bg-[#192531]"
        style={{
          animation: `intro-cover-release 300ms ease-out ${COVER_TIMEOUT_MS}ms forwards`,
        }}
      />
      <style>
        {'@keyframes intro-cover-release{to{opacity:0;visibility:hidden}}'}
      </style>
      <noscript>
        <style>{'[data-intro-cover]{display:none}'}</style>
      </noscript>
    </>
  );
}
