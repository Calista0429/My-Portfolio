import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import TimelineViewer from '@/components/timeline-viewer';
import { education } from '@/constants/education';

const EducationPage = () => {
  return (
    <>
      <PageHeader className="mb-10">
        <PageHeaderHeading>Education</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          I learned a lot, but the real learning happens in the code editor!
        </PageHeaderHeading>
        <PageHeaderDescription>
          Education has always been the cornerstone of my journey into the tech
          world. My Bachelor's in Data Science and Big Data Technology at Jilin
          University gave me my foundation in data and computing, and my
          Master's in Environment Systems at The University of Tokyo, with a
          machine learning focus in the Mizuno Lab, took it into research.
        </PageHeaderDescription>

        <PageHeaderDescription>
          My academic journey has been complemented by hands-on projects and
          coursework, enabling me to build practical skills and a deep
          understanding of modern technological solutions.
        </PageHeaderDescription>
      </PageHeader>

      <TimelineViewer data={education} />

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
