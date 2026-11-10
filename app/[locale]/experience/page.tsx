import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import TimelineViewer from '@/components/timeline-viewer';
import { experiences } from '@/constants/experience';
import { localize, messages, toLocale } from '@/i18n';

const ExperiencePage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const locale = toLocale((await params).locale);
  const t = messages[locale];
  return (
    <>
      <PageHeader className="mb-10">
        <PageHeaderHeading>{t.experience.title}</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          {t.experience.subtitle}
        </PageHeaderHeading>
        <PageHeaderDescription>{t.experience.description}</PageHeaderDescription>
      </PageHeader>

      <TimelineViewer
        data={experiences.map((item) => localize(item, locale))}
        latestLabel={t.timeline.latest}
      />

      <Pager
        prevHref="/skills-tools"
        nextHref="/education"
        prevTitle="Skills & Tools"
        nextTitle="Education"
      />
    </>
  );
};
export default ExperiencePage;
