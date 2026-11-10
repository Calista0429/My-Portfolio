import { Icons } from '@/components/icons';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import { Badge } from '@/components/ui/badge';
import { mySkills } from '@/constants';
import { messages, toLocale } from '@/i18n';

const SkillsToolsPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const text = messages[toLocale((await params).locale)].skills;
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{text.title}</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          {text.subtitle}
        </PageHeaderHeading>
        <PageHeaderDescription>{text.description}</PageHeaderDescription>
      </PageHeader>

      {/* skills and tools badges */}
      <div
        id="badges"
        className="flex flex-wrap items-center justify-center gap-2 my-4"
      >
        {mySkills.map((item) => (
          <Badge
            key={item.title}
            className="p-4 py-2 border border-secondary bg-secondary-foreground text-secondary"
          >
            {Icons[item.icon as keyof typeof Icons]?.({
              className: 'mr-2 size-4',
            })}
            {item.title}
          </Badge>
        ))}
      </div>

      <Pager
        prevHref="/projects"
        nextHref="/experience"
        prevTitle="Projects"
        nextTitle="Experience"
      />
    </>
  );
};
export default SkillsToolsPage;
