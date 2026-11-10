import profilePhoto from '@/assets/profile.jpg';
import { PageHeader, PageHeaderHeading } from '@/components/page-header';
import Pager from '@/components/pager';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';

const contacts = [
  { label: 'Email', href: siteConfig.links.email },
  { label: 'GitHub', href: siteConfig.links.githubProfile },
  { label: 'LinkedIn', href: siteConfig.links.linkedin },
  { label: 'Blog', href: siteConfig.links.blog },
];

const languages: [string, ReactNode][] = [
  ['English', 'TOEFL 91'],
  ['Japanese', 'JLPT N2'],
  ['Chinese', 'Native'],
];

const skills: [string, ReactNode][] = [
  ['Programming', 'Python, TypeScript'],
  ['ML & LLM', 'PyTorch, RAG, multi-agent systems, LLM-as-Judge evaluation'],
  ['Backend', 'FastAPI, Node.js, GraphQL, Redis, ChromaDB'],
  ['Frontend', 'React'],
  ['Cloud & DevOps', 'AWS (S3, Batch, EC2), Docker, Prometheus, GitHub Actions, Git'],
];

const records: [string, ReactNode][] = [
  [
    'Publication',
    <TextLink
      key="paper"
      href="https://www.sciencedirect.com/science/article/pii/S0025326X25001857"
    >
      Seafloor Debris Detection Using Underwater Images and Deep
      Learning-Driven Image Restoration
    </TextLink>,
  ],
  ['Certification', 'AWS Certified Solutions Architect – Associate'],
];

// globals.css styles h1–h6 and p outside any CSS layer, which beats Tailwind
// utilities, so classes that restyle those tags here need `!`.
const AboutMePage = () => {
  return (
    <>
      <PageHeader className="pb-8">
        {/* The photo sits beside the name; on phones the contact list runs
            full width below both instead of being squeezed next to the photo. */}
        <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-6">
          <div>
            <PageHeaderHeading>Baoxi Huang</PageHeaderHeading>
            <p className="mt-2! text-base text-muted-foreground sm:text-lg">
              Machine Learning & Software Engineer
            </p>
          </div>
          <Image
            src={profilePhoto}
            alt="Baoxi Huang"
            placeholder="blur"
            sizes="(min-width: 640px) 144px, 96px"
            className="size-24 self-start rounded-2xl object-cover sm:row-span-2 sm:size-36"
            priority
          />
          <dl className="col-span-2 mt-4 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-3 gap-y-1 text-sm sm:col-span-1 sm:text-base">
            {contacts.map(({ label, href }) => (
              <Fragment key={label}>
                <dt>{label}</dt>
                <dd className="wrap-anywhere text-muted-foreground">
                  <Link
                    href={href}
                    {...(href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                    className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {displayUrl(href)}
                  </Link>
                </dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </PageHeader>

      <Section title="Language">
        <Rows rows={languages} />
      </Section>
      <Section title="Skills">
        <Rows rows={skills} />
      </Section>
      <Section title="Publication & certification">
        <Rows rows={records} />
      </Section>

      <Pager nextHref="/projects" nextTitle="Projects" />
    </>
  );
};
export default AboutMePage;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t py-6">
      <h2 className="mb-4 text-sm! font-semibold uppercase tracking-wide!">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Rows({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-sm sm:text-base">
      {rows.map(([key, value]) => (
        <Fragment key={key}>
          <dt className="font-medium">{key}</dt>
          <dd className="text-muted-foreground">{value}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-primary underline underline-offset-4"
    >
      {children}
    </Link>
  );
}

// "mailto:a@b.c" -> "a@b.c", "https://www.linkedin.com/in/x/" -> "linkedin.com/in/x"
function displayUrl(href: string) {
  return href.replace(/^(mailto:|https?:\/\/(www\.)?)/, '').replace(/\/$/, '');
}
