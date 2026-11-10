import { NextResponse, type NextRequest } from 'next/server';

// English pages keep their bare paths (/about) and are served from the
// [locale] = "en" routes; Japanese pages are requested as /ja/… directly.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/ja' || pathname.startsWith('/ja/')) return;

  const url = request.nextUrl.clone();
  // /en/about is the same page as /about; send it to the canonical bare path.
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url);
  }
  url.pathname = pathname === '/' ? '/en' : `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and files (anything with an extension:
  // images, the résumé PDF, music, the web manifest).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
