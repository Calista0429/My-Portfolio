import { run } from './animations/terminal.js';

/**
 * Mount the existing pixel animation over a real page.
 * `theme`: 'system' | 'light' | 'dark'. Pass the site's resolved theme if it has one.
 * `container`: defaults to document.body (full screen). Other containers need position:relative.
 * `assets`: URLs of the day room, night room and typing sprite, supplied by the app's bundler.
 * Returns { finished, skip, cancel }; cancel is intended for component unmount.
 */
export function mountPixelPreloader({ theme = 'system', container = document.body, assets, onComplete } = {}) {
  const resolvedTheme = theme === 'system'
    ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
  if (!['light', 'dark'].includes(resolvedTheme)) throw new TypeError('theme must be system, light or dark');
  if (!assets?.day || !assets?.night || !assets?.operator) throw new TypeError('assets must include day, night and operator URLs');

  const controller = new AbortController();
  const { signal } = controller;
  const fullScreen = container === document.body;
  const previousOverflow = document.documentElement.style.overflow;
  const previousFocus = document.activeElement;
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: fullScreen ? 'fixed' : 'absolute', inset: '0', overflow: 'hidden',
    zIndex: '100000', background: resolvedTheme === 'dark' ? '#192531' : '#e9e4d6',
  });
  overlay.setAttribute('role', 'region');
  overlay.setAttribute('aria-label', 'Intro animation');
  // Lenis (the site's smooth scrolling) ignores events from inside this element,
  // so together with the overflow lock the page underneath cannot scroll.
  overlay.setAttribute('data-lenis-prevent', '');

  const host = document.createElement('div');
  Object.assign(host.style, { position: 'absolute', inset: '0', overflow: 'hidden' });
  host.setAttribute('aria-hidden', 'true');
  const skipButton = document.createElement('button');
  skipButton.type = 'button';
  skipButton.textContent = 'Skip intro';
  Object.assign(skipButton.style, {
    position: 'absolute', right: '20px', bottom: '20px', zIndex: '1', cursor: 'pointer',
    padding: '8px 13px', borderRadius: '20px', font: '12px system-ui,sans-serif',
    border: `1px solid ${resolvedTheme === 'dark' ? '#697b88' : '#c6ced5'}`,
    background: resolvedTheme === 'dark' ? '#20313ee8' : '#ffffffeb',
    color: resolvedTheme === 'dark' ? '#e2e8ed' : '#34424c',
  });
  overlay.append(host, skipButton);
  container.append(overlay);
  if (fullScreen) document.documentElement.style.overflow = 'hidden';

  let settled = false;
  let covering = true;
  let resolveFinished;
  const finished = new Promise(resolve => { resolveFinished = resolve; });

  function settle(reason, notify = true) {
    if (settled) return;
    settled = true;
    controller.abort();
    document.removeEventListener('keydown', onKeyDown);
    overlay.remove();
    if (fullScreen) document.documentElement.style.overflow = previousOverflow;
    if (previousFocus instanceof HTMLElement && previousFocus.isConnected && previousFocus !== document.body) {
      previousFocus.focus({ preventScroll: true });
    }
    const result = { reason, theme: resolvedTheme };
    resolveFinished(result);
    if (notify && typeof onComplete === 'function') {
      try { onComplete(result); } catch (error) { console.error('Preloader completion callback failed', error); }
    }
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') { event.preventDefault(); settle('skip'); }
    if (fullScreen && event.key === 'Tab') { event.preventDefault(); skipButton.focus(); }
  }
  document.addEventListener('keydown', onKeyDown);
  skipButton.addEventListener('click', () => settle('skip'));
  if (fullScreen) skipButton.focus({ preventScroll: true });

  const abortError = () => new DOMException('Animation cancelled', 'AbortError');
  const ctx = {
    signal,
    theme: resolvedTheme,
    assets,
    wait(ms) {
      return new Promise((resolve, reject) => {
        if (signal.aborted) { reject(abortError()); return; }
        const onAbort = () => { clearTimeout(timer); reject(abortError()); };
        const timer = setTimeout(() => { signal.removeEventListener('abort', onAbort); resolve(); }, ms);
        signal.addEventListener('abort', onAbort, { once: true });
      });
    },
    async animate(element, frames, options) {
      if (signal.aborted) throw abortError();
      const animation = element.animate(frames, { fill: 'forwards', ...options });
      const onAbort = () => animation.cancel();
      signal.addEventListener('abort', onAbort, { once: true });
      try { await animation.finished; } finally { signal.removeEventListener('abort', onAbort); }
      if (signal.aborted) throw abortError();
      // The source's first animation fades the room in. Once opaque, release
      // the loading cover so its ending fade reveals the actual homepage.
      if (covering) { covering = false; overlay.style.background = 'transparent'; }
    },
    finish: () => settle('complete'),
  };

  (async () => {
    try {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        await ctx.animate(overlay, [{ opacity: 1 }, { opacity: 0 }], { duration: 220 });
        settle('complete');
      } else await run(host, ctx);
    } catch (error) {
      if (settled || signal.aborted) return;
      console.error('Preloader could not play', error);
      settle('error');
    }
  })();

  return {
    finished,
    skip: () => settle('skip'),
    cancel: () => settle('cancel', false),
  };
}
