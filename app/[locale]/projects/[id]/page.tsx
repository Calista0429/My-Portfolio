import { localizeProject, projects } from '@/constants/projects';
import { localizePath, messages, toLocale } from '@/i18n';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { ProjectCover } from '@/components/project-cover';
import { Badge } from '@/components/ui/badge';

import { siteConfig } from '@/config/site';
import { ArrowLeftIcon, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

const getProject = async (slug: string) => {
  return projects.find((project) => project.slug === slug);
};

const ProjectDetails = async ({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) => {
  const { locale: localeParam, id } = await params;
  const locale = toLocale(localeParam);
  const text = messages[locale].project;
  const projectsHref = localizePath('/projects', locale);
  const found = await getProject(id);

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!found) {
    return (
      <>
        <h2 className="text-destructive">{text.notFound}</h2>
        <Link
          href={projectsHref}
          className="text-muted-foreground flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {text.back}
        </Link>
      </>
    );
  }

  const project = localizeProject(found, locale);

  return (
    <div>
      <div className="navigation">
        <Link
          href={projectsHref}
          className="flex items-center gap-2 mb-4 text-muted-foreground cursor-pointer w-fit"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {text.back}
        </Link>
      </div>

      <PageHeader>
        <PageHeaderHeading>{project.title}</PageHeaderHeading>
        <PageHeaderDescription>{project.tagline}</PageHeaderDescription>
        {project.cover && (
          <ProjectCover
            project={project}
            sizes="(min-width: 1024px) 860px, 100vw"
            priority
            className="my-4 w-full p-4 md:aspect-[2/1] md:p-6"
          />
        )}
        <PageHeaderDescription>{project.overview}</PageHeaderDescription>
      </PageHeader>

      <div id="badges" className="my-4">
        <h2 className="text-lg font-semibold">{text.techStack}</h2>
        <div className="flex flex-wrap items-center gap-2">
          {project.techStack?.map((tech) => (
            <Badge
              variant="outline"
              className="px-4 text-base shadow-md"
              key={tech}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-light">
        <div id="features" className="my-4">
          <h2 className="text-lg font-semibold">{text.features}</h2>
          <ul className="list-disc list-outside">
            {project.features?.map((feature) => (
              <li className="ml-4 pl-2" key={feature}>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div id="challenges" className="my-4">
          <h2 className="text-lg font-semibold">{text.challenges}</h2>
          <ul className="list-disc list-outside">
            {project.challenges?.map((challenge) => (
              <li className="ml-4 pl-2" key={challenge}>
                {challenge}
              </li>
            ))}
          </ul>
        </div>

        <div id="learnings" className="my-4">
          <h2 className="text-lg font-semibold">{text.learnings}</h2>
          <ul className="list-disc list-outside ">
            {project.learnings?.map((learning) => (
              <li className="ml-4 pl-2" key={learning}>
                {learning}
              </li>
            ))}
          </ul>
        </div>

        {project.feedback && (
          <div id="feedback" className="my-4">
            <h2 className="text-lg font-semibold">{text.feedback}</h2>
            <p>
              {text.feedbackPrompt}{' '}
              <Link href={siteConfig.links.email}>
                <span className="text-primary">
                  {siteConfig.links.email.replace('mailto:', '')}
                </span>
              </Link>
            </p>
          </div>
        )}

        {project.links && (
          <div id="links" className="my-4">
            <h2 className="text-lg font-semibold">
              {project.links.live && project.links.github ? text.links : text.link}
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              {project.links.live && (
                <Link href={project.links.live} target="_blank">
                  <Badge variant="default" className="px-4 text-base">
                    {text.live} <ExternalLinkIcon className="w-4 h-4 -mt-2" />
                  </Badge>
                </Link>
              )}

              {project.links.github && (
                <Link href={project.links.github} target="_blank">
                  <Badge variant="outline" className="px-4 text-base">
                    {text.github} <ExternalLinkIcon className="w-4 h-4 -mt-2" />
                  </Badge>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
