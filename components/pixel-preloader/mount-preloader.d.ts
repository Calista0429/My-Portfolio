// Types for mount-preloader.js; the project's TypeScript setup doesn't read JS files.

export type PixelPreloaderResult = {
  /** complete: played to the end; skip: skipped; error: failed and released the page; cancel: cancelled. */
  reason: 'complete' | 'skip' | 'error' | 'cancel';
  theme: 'light' | 'dark';
};

export type PixelPreloaderOptions = {
  /** 'system' follows prefers-color-scheme; pass 'light' or 'dark' when the site resolves its own theme. */
  theme?: 'system' | 'light' | 'dark';
  /** Defaults to document.body (full screen). Other containers need position:relative and a size. */
  container?: HTMLElement;
  /** URLs of the three images the animation draws. */
  assets: { day: string; night: string; operator: string };
  /** Called once on complete, skip or error; never after cancel(). */
  onComplete?: (result: PixelPreloaderResult) => void;
};

export type PixelPreloader = {
  /** Resolves once the overlay is gone, whatever the reason. */
  finished: Promise<PixelPreloaderResult>;
  /** Ends the intro now and calls onComplete with reason "skip". */
  skip: () => void;
  /** Removes the intro without calling onComplete; meant for unmount. */
  cancel: () => void;
};

export function mountPixelPreloader(
  options: PixelPreloaderOptions
): PixelPreloader;
