import { PageHeader, PageHeaderHeading } from '@/components/page-header';
import Pager from '@/components/pager';
import { ProjectCover } from '@/components/project-cover';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { projects } from '@/constants/projects';
import Link from 'next/link';

const ProjectsPage = () => {
  return (
    <>
      <PageHeader className="mb-10">
        <PageHeaderHeading>Projects</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          A lot of ideas, but some are still under construction!
        </PageHeaderHeading>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 card-container">
        {projects.map((project, index) => (
          <Card
            title={project.overview}
            key={index}
            className="relative w-full gap-3 pt-4 pb-3 transition-all duration-300 cursor-pointer isolate hover:scale-105 has-[a:focus-visible]:ring-[3px] has-[a:focus-visible]:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <CardHeader className="px-4">
              <CardTitle className="leading-snug text-center text-balance">
                <Link
                  href={`/projects/${project.slug}`}
                  className="outline-none"
                >
                  {project.title.split(' | ').map((part, i) => (
                    <span
                      key={part}
                      className={
                        i === 0
                          ? 'block'
                          : 'mt-1 block text-sm font-normal text-muted-foreground'
                      }
                    >
                      {part}
                    </span>
                  ))}
                  <span className="absolute inset-0"></span>
                </Link>
              </CardTitle>
            </CardHeader>
            <ProjectCover
              project={project}
              sizes="(min-width: 1024px) 300px, (min-width: 768px) 45vw, 100vw"
              className="mx-3 mt-auto"
            />
          </Card>
        ))}
      </div>

      <Pager
        prevHref="/about"
        nextHref="/skills-tools"
        prevTitle="About"
        nextTitle="Skills & Tools"
      />
    </>
  );
};
export default ProjectsPage;
