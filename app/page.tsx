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
import { places } from '@/constants/footprint';
import { cn } from '@/lib/utils';

// Rebuild the page at most once an hour, so the GitHub numbers stay fresh
// without calling GitHub's rate-limited API on every visit.
export const revalidate = 3600;

const HomePage = async () => {
  const github = await getGitHubStatsServerAction();
  // Profile fields left empty on GitHub (or missing when the API call fails) get no card.
  const statCards = [
    { title: 'Hireable', value: github.hireable ? 'Yes' : null },
    { title: 'Total Public Repositories', value: github.public_repos },
    { title: 'Followers', value: github.followers },
    { title: 'Following', value: github.following },
  ].filter(
    (card): card is { title: string; value: string | number } =>
      card.value != null && card.value !== ''
  );

  return (
    <>
      {/* Plays over the page below on a full load of the homepage. */}
      <HomePreloader />

      <PageHeader className="mb-4">
        <PageHeaderHeading>GitHub Stats</PageHeaderHeading>
        <PageHeaderDescription>
          Insights and metrics about my GitHub profile
        </PageHeaderDescription>
      </PageHeader>

      <div className="mb-6 flex w-full items-center justify-center rounded-xl border border-border/40 p-4">
        <GitHubGraphs />
      </div>

      {statCards.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {statCards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          GitHub profile numbers couldn’t be loaded. They refresh every hour.
        </p>
      )}

      <PageHeader className="mt-16 mb-4">
        <PageHeaderHeading>Footprint</PageHeaderHeading>
        <PageHeaderDescription>Places I’ve been so far.</PageHeaderDescription>
      </PageHeader>

      <FootprintExplorer places={places} />

      <Pager nextHref="/about" nextTitle="About Me" />
    </>
  );
};
export default HomePage;

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div
      className={cn(
        'h-full w-full rounded-xl border border-border/40 p-4 transition-transform duration-200 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100',
        title === 'Hireable' && 'bg-green-500/20'
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
