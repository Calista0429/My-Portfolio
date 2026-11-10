import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import Image from 'next/image';
import Link from 'next/link';

const AboutMePage = () => {
  return (
    <>
      <PageHeader>
        <div className="flex w-full items-start justify-between gap-6">
          <div className="flex flex-col gap-1">
            <PageHeaderHeading>About Baoxi</PageHeaderHeading>
            <PageHeaderHeading className="mt-2 text-muted-foreground">
              More than just a title—let’s dive deeper!
            </PageHeaderHeading>
          </div>
          <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border bg-muted sm:size-32 md:size-36">
            <Image
              src="/profile-placeholder.svg"
              alt="Baoxi Huang"
              fill
              sizes="144px"
              className="object-cover"
              priority
            />
          </div>
        </div>
        <PageHeaderDescription>
          I am a Machine Learning & Software Engineer with a background in data
          science. I earned my Bachelor's in Data Science and Big Data
          Technology at Jilin University, graduating in the top 3% of my class,
          and went on to a Master's in Environment Systems at The University of
          Tokyo, where I focused on machine learning in the Mizuno Lab and
          worked as a teaching assistant for Data Structure and Algorithm.
        </PageHeaderDescription>

        <PageHeaderDescription>
          At Preferred Networks, I turned LSHBloom research into a production
          deduplication pipeline on AWS, cutting processing time by 38.4% and
          memory usage by 87.2% on the peS2o dataset, and wrote about it on the{' '}
          <Link
            href="https://tech.preferred.jp/en/blog/improve-minhashlsh-for-deduplication-on-large-scale-dataset/"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-4"
          >
            Preferred Networks Tech Blog
          </Link>
          . At Money Forward, I helped migrate an in-house HR management system
          from Vue 2 to React, delivering 5 merged pull requests within 10 days.
        </PageHeaderDescription>

        <PageHeaderDescription>
          Currently, I am building SupportMesh, an explainable multi-agent
          customer support platform with hybrid intent routing, RAG, tiered
          memory and LLM-as-Judge evaluation. My research on{' '}
          <Link
            href="https://www.sciencedirect.com/science/article/pii/S0025326X25001857"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-4"
          >
            seafloor debris detection using underwater images and deep
            learning-driven image restoration
          </Link>{' '}
          has been published, and I hold the AWS Certified Solutions Architect –
          Associate certification, JLPT N2 and a TOEFL score of 91.
        </PageHeaderDescription>
      </PageHeader>

      <Pager nextHref="/projects" nextTitle="Projects" />
    </>
  );
};
export default AboutMePage;
