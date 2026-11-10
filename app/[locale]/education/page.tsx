import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import TimelineViewer from '@/components/timeline-viewer';
import { education } from '@/constants/education';
import { localize, messages, toLocale } from '@/i18n';

const EducationPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const locale = toLocale((await params).locale);
  const t = messages[locale];
  return (
    <>
      <PageHeader className="mb-10">
        <PageHeaderHeading>{t.education.title}</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          {t.education.subtitle}
        </PageHeaderHeading>
        {t.education.description.map((paragraph) => (
          <PageHeaderDescription key={paragraph}>{paragraph}</PageHeaderDescription>
        ))}
      </PageHeader>

      <TimelineViewer
        data={education.map((item) => localize(item, locale))}
        latestLabel={t.timeline.latest}
      />

      <Pager
        prevHref="/experience"
        nextHref="/"
        prevTitle="Experience"
        nextTitle="Home"
      />
    </>
  );
};
export default EducationPage;
