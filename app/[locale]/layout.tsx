import { ThemeProvider } from '@/components/theme-provider';
import { META_THEME_COLORS, siteConfig } from '@/config/site';
import { LenisProvider } from '@/components/providers/lenis-provider';
import 'lenis/dist/lenis.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';

import { fontSans, fontMono } from '@/lib/fonts';
import { Toaster } from '@/components/ui/sonner';

import { Metadata, Viewport } from 'next';
import '../globals.css';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/site-header';
import { SideNav } from '@/components/side-nav';
import { SiteFooter } from '@/components/site-footer';
import { docsConfig } from '@/config/docs';
import { locales, messages, toLocale } from '@/i18n';
import { LocaleTextProvider } from '@/components/locale-text';

import { SpeedInsights } from '@vercel/speed-insights/next';

// Google Analytics loads only once a measurement ID is set (see .env.example).
const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

// Both languages are prerendered: /about (English, via middleware.ts) and /ja/about.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LayoutParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: LayoutParams): Promise<Metadata> {
  const { meta } = messages[toLocale((await params).locale)];
  return {
    title: siteConfig.name,
    description: meta.description,
    metadataBase: new URL(siteConfig.url),
    keywords: meta.keywords,
    authors: [
      {
        name: 'Baoxi Huang',
        url: siteConfig.url,
      },
    ],
    creator: 'Baoxi Huang',
    openGraph: {
      type: 'website',
      locale: meta.ogLocale,
      url: siteConfig.url,
      title: siteConfig.name,
      description: meta.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: meta.description,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
  };
}

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default async function RootLayout({
  children,
  params,
}: LayoutParams & { children: React.ReactNode }) {
  const locale = toLocale((await params).locale);
  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
            }}
          />
        </head>
        <body
          className={cn(
            'min-h-svh bg-background font-sans antialiased',
            fontSans.variable,
            fontMono.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <LenisProvider>
              <div vaul-drawer-wrapper="">
                <div className="relative flex flex-col min-h-svh bg-background">
                  <div
                    data-wrapper=""
                    className="flex flex-col flex-1 border-grid"
                  >
                    <SiteHeader />
                    <main className="flex flex-col flex-1">
                      <div className="container-wrapper">
                        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                          <aside className="border-grid fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block">
                            <div className="h-full py-6 pr-4 overflow-auto no-scrollbar lg:py-8">
                              <SideNav config={docsConfig} />
                            </div>
                          </aside>
                          <div className="flex flex-col flex-1 py-6 pr-4 lg:py-8">
                            <LocaleTextProvider
                              value={{ notFound: messages[locale].notFound }}
                            >
                              {children}
                            </LocaleTextProvider>
                          </div>
                        </div>
                      </div>
                    </main>
                    <SiteFooter />
                  </div>
                </div>
              </div>
            </LenisProvider>
          </ThemeProvider>
          <Toaster richColors position="top-center" />
          {gaId && <GoogleAnalytics gaId={gaId} />}
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </>
  );
}
