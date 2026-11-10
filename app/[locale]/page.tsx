import { getGitHubStatsServerAction } from '@/app/actions/getGitHubStatsServerAction';
import { FootprintExplorer } from '@/components/footprint-explorer';
import GitHubGraphs from '@/components/github-graphs';
import { HomePreloader } from '@/components/home-preloader';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import { localizePlaces } from '@/constants/footprint';
import { messages, toLocale } from '@/i18n';
import { cn } from '@/lib/utils';

// Rebuild the page at most once an hour, so the GitHub numbers stay fresh
// without calling GitHub's rate-limited API on every visit.
export const revalidate = 3600;

const HomePage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const locale = toLocale((await params).locale);
  const { home, footprint } = messages[locale];
  const github = await getGitHubStatsServerAction();
  // Profile fields left empty on GitHub (or missing when the API call fails) get no card.
  const statCards = [
    { title: home.github.hireable, value: github.hireable ? home.github.yes : null, highlight: true },
    { title: home.github.repos, value: github.public_repos, highlight: false },
    { title: home.github.followers, value: github.followers, highlight: false },
    { title: home.github.following, value: github.following, highlight: false },
  ].filter(
    (card): card is { title: string; value: string | number; highlight: boolean } =>
      card.value != null && card.value !== ''
  );
  const places = localizePlaces(locale);
  const countryCount = new Set(places.map((place) => place.country)).size;

  return (
    <>
      {/* Plays over the page below on a full load of the homepage. */}
      <HomePreloader />

      <PageHeader className="mb-4">
        <PageHeaderHeading>{home.github.title}</PageHeaderHeading>
        <PageHeaderDescription>{home.github.description}</PageHeaderDescription>
      </PageHeader>

      <div className="mb-6 flex w-full items-center justify-center rounded-xl border border-border/40 p-4">
        <GitHubGraphs
          labels={home.github.calendar}
          errorMessage={home.github.calendarError}
        />
      </div>

      {statCards.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {statCards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">{home.github.unavailable}</p>
      )}

      <PageHeader className="mt-16 mb-4">
        <PageHeaderHeading>{home.footprint.title}</PageHeaderHeading>
        <PageHeaderDescription>{home.footprint.description}</PageHeaderDescription>
      </PageHeader>

      <FootprintExplorer
        places={places}
        labels={{
          places: footprint.places,
          summary: footprint.summary(places.length, countryCount),
          allPlaces: footprint.allPlaces,
          mapLabel: footprint.mapLabel,
        }}
      />

      <Pager nextHref="/about" nextTitle="About Me" />
    </>
  );
};
export default HomePage;

function StatCard({
  title,
  value,
  highlight,
}: {
  title: string;
  value: string | number;
  highlight: boolean;
}) {
  return (
    <div
      className={cn(
        'h-full w-full rounded-xl border border-border/40 p-4 transition-transform duration-200 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100',
        highlight && 'bg-green-500/20'
      )}
    >
      <h3 className="text-lg font-semibold tracking-tight text-muted-foreground">
        {title}
      </h3>
      <span
        className={cn(
          'font-bold leading-tight tracking-tight',
          // Numbers read best large; names and places would wrap at that size.
          typeof value === 'number' ? 'text-5xl' : 'text-2xl'
        )}
      >
        {value}
      </span>
    </div>
  );
}
