import profilePhoto from '@/assets/profile.jpg';
import { PageHeader, PageHeaderHeading } from '@/components/page-header';
import Pager from '@/components/pager';
import { siteConfig } from '@/config/site';
import { ExternalLinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';

// A dated line (job, project or degree) followed by groups of bullet points.
// A group may have a short label, and the label may carry a link.
type Entry = {
  period: string;
  title: string;
  groups: {
    label?: string;
    link?: { href: string; text: string };
    points: ReactNode[];
  }[];
};

const contacts = [
  { label: 'Email', href: siteConfig.links.email },
  { label: 'GitHub', href: siteConfig.links.githubProfile },
  { label: 'LinkedIn', href: siteConfig.links.linkedin },
  { label: 'Blog', href: siteConfig.links.blog },
];

const experience: Entry[] = [
  {
    period: 'Mar 2026 – Apr 2026',
    title: 'Money Forward, Inc. – Software Engineer Intern',
    groups: [
      {
        label: 'In-house HR management system',
        link: { href: 'https://biz.moneyforward.com/employee/', text: 'Product' },
        points: [
          'Helped migrate the system from Vue 2 to React to improve scalability and developer productivity, with 5 pull requests merged in 10 days and my features deployed to production',
          'Built the employee payroll page from Figma designs with a UI engineer, showing each employee’s monthly salary, bonuses and reimbursements, and wrote unit tests for it',
          'Enabled the sidebar and implemented the GraphQL API for employee-information form submissions',
        ],
      },
      {
        label: 'Extended work',
        link: {
          href: 'https://github.com/Calista0429/employee-onboarding-agent',
          text: 'GitHub',
        },
        points: [
          'Built a local-first HR onboarding platform (React, TypeScript, Node) where HR composes templates, invites employees and reviews their submissions',
          'Added a tool-calling AI agent that does the HR work from Japanese instructions through 5 guarded tools, which reuse the UI’s own validation so the agent can’t bypass any checks',
        ],
      },
    ],
  },
  {
    period: 'Aug 2025 – Sep 2025',
    title: 'Preferred Networks, Inc. – Machine Learning Engineer Intern',
    groups: [
      {
        label: 'LLM dataset deduplication with LSHBloom',
        points: [
          'Turned LSHBloom research into a production implementation in the in-house deduplication pipeline, fixing its out-of-memory errors and long processing times',
          'Matched MinHashLSH on a self-built synthetic benchmark (F1 0.6963 vs. 0.7015)',
          'Deployed it on AWS (S3, AWS Batch, EC2) to deduplicate the peS2o dataset, cutting processing time by 38.4% and memory usage by 87.2%',
          <>
            Wrote about the work on the official{' '}
            <TextLink href="https://tech.preferred.jp/en/blog/improve-minhashlsh-for-deduplication-on-large-scale-dataset/">
              Preferred Networks Tech Blog
            </TextLink>
          </>,
        ],
      },
      {
        label: 'Extended work',
        link: {
          href: 'https://github.com/Calista0429/LSHBloom-peS2o',
          text: 'GitHub',
        },
        points: [
          'Deduplicated peS2o with LSHBloom for Qwen2.5-0.5B continued pretraining: 8.46% fewer training tokens and 8.47% less A100 GPU time, with validation perplexity within 0.34% of the raw data and a 1.1% gain in SciQ normalized accuracy',
        ],
      },
    ],
  },
];

const projects: Entry[] = [
  {
    period: 'Apr 2026 – Present',
    title: 'SupportMesh – Multi-agent customer support platform',
    groups: [
      {
        label: 'Overview',
        link: { href: 'https://github.com/Calista0429/SupportMesh', text: 'GitHub' },
        points: [
          'An explainable, observable multi-agent support system for enterprise software that routes product questions, technical incidents and after-sales requests across 3 agents, with human escalation, Prometheus monitoring and Docker deployment',
        ],
      },
      {
        label: 'Core components',
        points: [
          'Hybrid intent router that fuses LLM, embedding and pattern-matching signals to sort requests into 19 intents and 4 urgency levels, reaching 91.3% accuracy and 0.89 macro-F1 on about 500 labeled cases',
          'Intent-gated ChromaDB RAG with query rewriting, multi-path retrieval, deduplication, reranking, caching and a circuit-breaker fallback, reaching 88.7% answer accuracy and 91.2% retrieval recall',
          'Tiered memory on Redis and ChromaDB, dynamic skill injection, monitor-driven route down-weighting and LLM-as-Judge evaluation',
        ],
      },
    ],
  },
];

const education: Entry[] = [
  {
    period: '2024 – 2026',
    title: 'The University of Tokyo – Master of Environment Systems',
    groups: [
      {
        points: [
          'Mizuno Lab, with a focus on machine learning',
          'Teaching assistant for Data Structure and Algorithm',
        ],
      },
    ],
  },
  {
    period: '2020 – 2024',
    title: 'Jilin University – Bachelor of Data Science and Big Data Technology',
    groups: [
      {
        points: [
          'Top 3% of graduates',
          'First prize in the college scholarship',
          'Third prize in the Mathematical Contest in Modeling',
        ],
      },
    ],
  },
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
// utilities, so size, weight and margin classes on those tags here need `!`.
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

      <Section title="Experience">
        <EntryList entries={experience} />
      </Section>
      <Section title="Project">
        <EntryList entries={projects} />
      </Section>
      <Section title="Education">
        <EntryList entries={education} />
      </Section>
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

function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <article key={entry.title}>
          <h3 className="text-sm! font-normal! tracking-normal! sm:text-base!">
            <span className="font-medium">{entry.period}</span>{' '}
            <span className="text-muted-foreground">{entry.title}</span>
          </h3>
          {entry.groups.map((group, i) => (
            <div key={group.label ?? i} className={group.label ? 'mt-3' : 'mt-1.5'}>
              {group.label && (
                <h4 className="mb-1.5 flex flex-wrap items-center gap-x-3 text-sm! font-medium! tracking-normal!">
                  {group.label}
                  {group.link && (
                    <Link
                      href={group.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 font-normal text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {group.link.text}
                      <ExternalLinkIcon className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                    </Link>
                  )}
                </h4>
              )}
              <ul className="max-w-3xl list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-muted-foreground/60">
                {group.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </article>
      ))}
    </div>
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
