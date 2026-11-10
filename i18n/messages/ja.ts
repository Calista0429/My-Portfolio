import type { Messages } from './en';

// Japanese copy of every page. Typed against the English messages, so a
// missing or extra key fails the type check.
export const ja: Messages = {
  locale: { htmlLang: 'ja' },
  meta: {
    description:
      '機械学習エンジニア／ソフトウェアエンジニア、Baoxi Huangのポートフォリオです。LLMエージェント、RAGシステム、データパイプラインを開発しています。',
    keywords: [
      'Baoxi Huang',
      'Huang Baoxi',
      'Calista0429',
      'ポートフォリオ',
      '機械学習エンジニア',
      'ソフトウェアエンジニア',
      'LLM',
      'RAG',
      'AIエージェント',
      'Python',
      'React',
      '東京大学',
    ],
    ogLocale: 'ja_JP',
  },
  // Badge on the newest timeline entry (Experience, Education).
  timeline: { latest: '最新' },
  loading: {
    title: '読み込み中…',
    description: 'データを取得しています…',
    hint: '数秒かかる場合があります…',
  },
  notFound: { title: 'ページが見つかりません' },
  home: {
    github: {
      title: 'GitHubアクティビティ',
      description: 'GitHubでの活動と各種データです。',
      hireable: '求職状況',
      yes: '求職中',
      repos: '公開リポジトリ数',
      followers: 'フォロワー',
      following: 'フォロー中',
      unavailable:
        'GitHubのデータを読み込めませんでした。データは1時間ごとに更新されます。',
      calendarError: 'GitHubのデータを取得できませんでした',
      calendar: {
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        weekdays: ['日', '月', '火', '水', '木', '金', '土'],
        totalCount: '過去1年間のコントリビューション：{{count}}件',
        totalCountRecent: '過去3か月間のコントリビューション：{{count}}件',
        legend: { less: '少', more: '多' },
      },
    },
    footprint: {
      title: '足あと',
      description: 'これまでに訪れた場所です。',
    },
  },
  footprint: {
    places: '場所一覧',
    summary: (places: number, countries: number) =>
      `${countries}か国・${places}か所`,
    allPlaces: 'すべての場所',
    mapLabel: '訪れた場所の地図',
    tooltip: (name: string, country: string) => `${name}（${country}）`,
    countries: {
      Japan: '日本',
      China: '中国',
      Malaysia: 'マレーシア',
      Singapore: 'シンガポール',
      'South Korea': '韓国',
    },
  },
  about: {
    role: '機械学習エンジニア／ソフトウェアエンジニア',
    contacts: {
      email: 'メール',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      blog: 'ブログ',
    },
    sections: {
      language: '語学',
      skills: 'スキル',
      records: '論文・資格',
      hobbies: '趣味',
    },
    languages: [
      ['英語', 'TOEFL 91点'],
      ['日本語', '日本語能力試験（JLPT）N2'],
      ['中国語', 'ネイティブ'],
    ],
    skills: [
      ['プログラミング', 'Python、TypeScript'],
      ['機械学習・LLM', 'PyTorch、RAG、マルチエージェントシステム、LLM-as-Judgeによる評価'],
      ['バックエンド', 'FastAPI、Node.js、GraphQL、Redis、ChromaDB'],
      ['フロントエンド', 'React'],
      ['クラウド・DevOps', 'AWS（S3、Batch、EC2）、Docker、Prometheus、GitHub Actions、Git'],
    ],
    publication: {
      label: '論文',
      // Published title; kept in English.
      title:
        'Seafloor Debris Detection Using Underwater Images and Deep Learning-Driven Image Restoration',
    },
    certification: {
      label: '資格',
      value: 'AWS 認定ソリューションアーキテクト – アソシエイト',
    },
    hobbies: '写真、ジム、水泳、ジョギング、料理、読書',
  },
  projects: {
    title: 'プロジェクト',
    subtitle: 'アイデアはたくさん。まだ開発中のものもあります！',
  },
  project: {
    back: 'プロジェクト一覧に戻る',
    notFound: 'プロジェクトが見つかりません',
    techStack: '技術スタック',
    features: '主な機能',
    challenges: '課題',
    learnings: '学び',
    feedback: 'フィードバック',
    feedbackPrompt: 'ご意見・ご提案は、こちらまでお気軽にご連絡ください：',
    links: 'リンク',
    link: 'リンク',
    live: 'デモ',
    github: 'GitHub',
  },
  skills: {
    title: 'スキル・ツール',
    subtitle: '夜通しコードを書き、一日中デバッグして身につけました！',
    description:
      '機械学習エンジニア／ソフトウェアエンジニアとして、フロントエンドからバックエンドまで幅広く手がけています。LLMエージェント、RAG、データパイプラインにはPython、バックエンドにはFastAPI・Redis・ChromaDB、フロントエンドにはReact・TypeScript・GraphQLを使い、開発したものはAWS、Docker、GitHub Actions、Prometheusでデプロイ・運用しています。',
  },
  experience: {
    title: '職務経験',
    subtitle: '仕事を得るには経験が要る。でも、経験は仕事からしか得られない！',
    description:
      '開発者としての歩みの中で、最先端の技術に触れる機会に恵まれる一方、深夜2時のデバッグという技も磨いてきました。動的なWebアプリケーションの構築から難解なエラーメッセージの解読まで、体系的な学びとその場での問題解決を積み重ねてきました。プロジェクトやインターンを経るごとに、きれいなコードを書く力、チームで協働する力、そして何より、バグにやられる前にバグを直す力が鍛えられています。',
  },
  education: {
    title: '学歴',
    subtitle: 'たくさん学びましたが、本当の学びはコードエディタの中にあります！',
    description: [
      '教育は、私がテクノロジーの世界へ進むうえでの礎です。吉林大学でデータサイエンス・ビッグデータ技術を専攻してデータとコンピューティングの基礎を身につけ、東京大学大学院の環境システム学専攻（修士課程）では、水野研究室で機械学習を中心とした研究へと発展させました。',
      '授業に加えて実践的なプロジェクトにも取り組み、実務に生きるスキルと最新の技術への深い理解を培ってきました。',
    ],
  },
  testimonials: {
    title: '推薦の声',
    subtitle: '私の仕事を間近で見てきた方々の声をご紹介します！',
  },
};
