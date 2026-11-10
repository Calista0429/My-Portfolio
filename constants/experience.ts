import { TimelineViewerData } from '@/types/TimelineViewer.types';

export const experiences: TimelineViewerData[] = [
  {
    title: 'Software Engineer Intern · Money Forward, Inc.',
    date: 'Mar. 2026 - Apr. 2026',
    description: `Helped migrate the in-house HR management system from Vue 2 to React to improve scalability and developer productivity, delivering 5 merged pull requests within 10 days with my features deployed to production. Built the employee payroll page from Figma designs with a UI engineer and covered it with unit tests, enabled the side-bar feature, and implemented the GraphQL API for employee-information workflow form submissions.`,
    latest: true,
  },
  {
    title: 'Machine Learning Engineer Intern · Preferred Networks, Inc.',
    date: 'Aug. 2025 - Sep. 2025',
    description: `Turned LSHBloom research into a production implementation integrated into the in-house data deduplication pipeline, resolving out-of-memory errors and excessive processing time. Benchmarked it against MinHashLSH on a self-built synthetic dataset with comparable F1 (0.6963 vs. 0.7015), then deployed it on AWS (S3, AWS Batch, EC2) to deduplicate the peS2o dataset, reducing processing time by 38.4% and memory usage by 87.2%. Authored a post on this work for the official Preferred Networks Tech Blog.`,
  },
];
