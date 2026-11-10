import profilePhoto from '@/assets/profile.jpg';
import { PageHeader, PageHeaderHeading } from '@/components/page-header';
import Pager from '@/components/pager';
import { siteConfig } from '@/config/site';
import { messages, toLocale } from '@/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';

const contacts = [
  { key: 'email', href: siteConfig.links.email },
  { key: 'github', href: siteConfig.links.githubProfile },
  { key: 'linkedin', href: siteConfig.links.linkedin },
  { key: 'blog', href: siteConfig.links.blog },
] as const;

const paperUrl =
  'https://www.sciencedirect.com/science/article/pii/S0025326X25001857';

// globals.css styles h1–h6 and p outside any CSS layer, which beats Tailwind
// utilities, so classes that restyle those tags here need `!`.
const AboutMePage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { about } = messages[toLocale((await params).locale)];
  const records: [string, ReactNode][] = [
    [
      about.publication.label,
      <TextLink key="paper" href={paperUrl}>
        {about.publication.title}
      </TextLink>,
    ],
    [about.certification.label, about.certification.value],
  ];

  return (
    <>
      <PageHeader className="pb-8">
        {/* The photo sits beside the name. Below laptop width the contact list
            runs full width under both, so the LinkedIn URL never has to wrap. */}
        <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-6">
          <div>
            <PageHeaderHeading>Baoxi Huang</PageHeaderHeading>
            <p className="mt-2! text-base text-muted-foreground sm:text-lg">
              {about.role}
            </p>
          </div>
          <Image
            src={profilePhoto}
            alt="Baoxi Huang"
            placeholder="blur"
            sizes="(min-width: 1024px) 224px, (min-width: 640px) 168px, 112px"
            className="size-28 self-start rounded-2xl object-cover sm:size-40 lg:row-span-2 lg:size-48"
            priority
          />
          <dl className="col-span-2 mt-4 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-3 gap-y-1 text-sm sm:text-base lg:col-span-1">
            {contacts.map(({ key, href }) => (
              <Fragment key={key}>
                <dt>{about.contacts[key]}</dt>
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

      <Section title={about.sections.language}>
        <Rows rows={about.languages} />
      </Section>
      <Section title={about.sections.skills}>
        <Rows rows={about.skills} />
      </Section>
      <Section title={about.sections.records}>
        <Rows rows={records} />
      </Section>
      <Section title={about.sections.hobbies}>
        <p className="mt-0! text-sm text-muted-foreground sm:text-base">
          {about.hobbies}
        </p>
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
