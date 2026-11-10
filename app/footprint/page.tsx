import { FootprintExplorer } from '@/components/footprint-explorer';
import { PageHeader, PageHeaderHeading } from '@/components/page-header';
import Pager from '@/components/pager';
import { places } from '@/constants/footprint';

const FootprintPage = () => {
  return (
    <>
      <PageHeader className="mb-10">
        <PageHeaderHeading>Footprint</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          Places I’ve been so far.
        </PageHeaderHeading>
      </PageHeader>

      <FootprintExplorer places={places} />

      <Pager
        prevHref="/education"
        nextHref="/stats"
        prevTitle="Education"
        nextTitle="Stats"
      />
    </>
  );
};
export default FootprintPage;
