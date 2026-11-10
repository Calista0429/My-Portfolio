import { TimelineViewerData } from '@/types/TimelineViewer.types';

export const experiences: TimelineViewerData[] = [
  {
    title: 'Software Engineer Intern · Money Forward, Inc.',
    date: 'Mar. 2026 - Apr. 2026',
    description: `Helped migrate the in-house HR management system from Vue 2 to React to improve scalability and developer productivity, delivering 5 merged pull requests within 10 days with my features deployed to production. Built the employee payroll page from Figma designs with a UI engineer and covered it with unit tests, enabled the side-bar feature, and implemented the GraphQL API for employee-information workflow form submissions.`,
    ja: {
      title: 'ソフトウェアエンジニア インターン · 株式会社マネーフォワード',
      date: '2026年3月〜2026年4月',
      description: '社内の人事管理システムをVue 2からReactへ移行するプロジェクトに参加し、スケーラビリティと開発生産性の向上に貢献しました。10日間で5件のプルリクエストがマージされ、担当した機能は本番環境にリリースされています。UIエンジニアと連携してFigmaのデザインから給与明細ページを実装し、ユニットテストを整備したほか、サイドバー機能の有効化と、従業員情報ワークフローのフォーム送信に使うGraphQL APIの実装を担当しました。',
    },
    latest: true,
  },
  {
    title: 'Machine Learning Engineer Intern · Preferred Networks, Inc.',
    date: 'Aug. 2025 - Sep. 2025',
    description: `Turned LSHBloom research into a production implementation integrated into the in-house data deduplication pipeline, resolving out-of-memory errors and excessive processing time. Benchmarked it against MinHashLSH on a self-built synthetic dataset with comparable F1 (0.6963 vs. 0.7015), then deployed it on AWS (S3, AWS Batch, EC2) to deduplicate the peS2o dataset, reducing processing time by 38.4% and memory usage by 87.2%. Authored a post on this work for the official Preferred Networks Tech Blog.`,
    ja: {
      title: '機械学習エンジニア インターン · 株式会社Preferred Networks',
      date: '2025年8月〜2025年9月',
      description: 'LSHBloomの研究成果を本番実装に落とし込み、社内のデータ重複除去パイプラインに統合して、メモリ不足と処理時間の長さという課題を解消しました。自作の合成データセットでMinHashLSHと比較してF1スコアが同等（0.6963 対 0.7015）であることを確認したうえで、AWS（S3、AWS Batch、EC2）上に展開してpeS2oデータセットの重複除去を行い、処理時間を38.4%、メモリ使用量を87.2%削減しました。この取り組みについて、Preferred Networks公式テックブログに記事を執筆しました。',
    },
  },
];
