import type { StaticImageData } from "next/image";

import type { Locale } from "@/i18n/routing";

import employeeOnboardingCover from "@/assets/projects/employee-onboarding-agent.png";
import finetunedBertCover from "@/assets/projects/finetuned-bert-chinese-qa.png";
import lshbloomCover from "@/assets/projects/lshbloom-pes2o.png";
import supportmeshCover from "@/assets/projects/supportmesh.png";
import tripPlannerCover from "@/assets/projects/trip-planner-agent.png";

export type Project = {
  title: string;
  slug: string;
  tagline: string;
  // Shown on the project card and the project page. To add one, put the
  // image in assets/projects/ and import it above.
  cover?: {
    src: StaticImageData;
    alt: string;
  };
  overview: string;
  features: string[];
  techStack: string[];
  challenges: string[];
  learnings: string[];
  feedback: boolean;
  links: {
    live?: string;
    github?: string;
  };
  // Japanese text for the language toggle: the same fields as the English
  // ones above, with coverAlt standing in for cover.alt.
  ja: {
    title: string;
    tagline: string;
    coverAlt?: string;
    overview: string;
    features: string[];
    challenges: string[];
    learnings: string[];
  };
};

export const projects: Project[] = [
  {
    title: "SupportMesh | Multi-Agent Customer Support Platform",
    slug: "supportmesh",
    tagline:
      "An explainable, observable multi-agent support harness that routes enterprise support requests to specialist agents.",
    cover: {
      src: supportmeshCover,
      alt: "SupportMesh console answering a refund question, with the routing trace panel on the right",
    },
    overview:
      "SupportMesh is an enterprise customer-service system built on large language models. Each request is classified by a hybrid intent router, routed to a General, Technical or Billing agent, answered with retrieval from a knowledge base, and remembered across turns. Product inquiries, technical incidents and after-sales requests are handled with human escalation, Prometheus monitoring, LLM-as-Judge evaluation and Docker deployment built in rather than bolted on.",
    features: [
      "Hybrid intent router fusing LLM, embedding and pattern-matching signals to classify requests into 19 intents and 4 urgency levels, reaching 91.3% accuracy and 0.89 macro-F1 on about 500 labeled cases.",
      "Intent-gated ChromaDB RAG with 3 query rewrites, multi-path retrieval, deduplication, reranking, caching and a circuit-breaker fallback, achieving 88.7% answer accuracy and 91.2% retrieval recall.",
      "Tiered memory with Redis working memory plus ChromaDB episodic memory and user profiles, using a 24-hour TTL and compression after 15 messages that keeps the latest 5.",
      "Hot-loadable Skills: business rules written in Markdown, injected into an agent's system prompt and reloaded without a restart.",
      "Prometheus metrics, Z-score anomaly detection and 5% degradation alerts, with routing penalties fed back to the orchestrator.",
      "LLM-as-Judge evaluation across 5 end-to-end suites, with regression detection against a baseline.",
      "Vue 3 console with a trace panel that shows how the backend routed each request.",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "Redis",
      "ChromaDB",
      "Docker",
      "Prometheus",
      "Anthropic API",
      "Vue 3",
    ],
    challenges: [
      "Keeping each agent inside its scope when one message mixes problems, such as a login failure combined with a duplicate charge.",
      "Grounding answers in business policy so an agent never promises an outcome it cannot guarantee.",
      "Carrying context across turns without letting the prompt grow unbounded.",
      "Staying responsive when retrieval or tool calls fail.",
    ],
    learnings: [
      "Encoding business rules as hot-loadable Skills keeps agent behaviour bounded by policy rather than by the model's discretion.",
      "Building monitoring and evaluation in from the start makes routing decisions observable and regressions detectable.",
      "Feeding live performance metrics back into routing lets the system down-weight degraded paths automatically.",
    ],
    feedback: true,
    links: {
      github: "https://github.com/Calista0429/SupportMesh",
    },
    ja: {
      title: "SupportMesh | マルチエージェント型カスタマーサポート基盤",
      tagline:
        "企業のサポート依頼を専門エージェントに振り分ける、説明可能で可観測なマルチエージェント型サポート基盤です。",
      coverAlt:
        "返金に関する質問に回答するSupportMeshのコンソール。右側にルーティングのトレースパネルを表示",
      overview:
        "SupportMeshは、大規模言語モデルを用いた企業向けカスタマーサービスシステムです。リクエストはハイブリッド意図ルーターで分類され、一般・技術・請求の各エージェントに振り分けられ、ナレッジベースからの検索結果をもとに回答されます。会話の文脈はターンをまたいで記憶されます。製品に関する問い合わせ、技術的なインシデント、アフターサービスの依頼に対応し、人間へのエスカレーション、Prometheusによる監視、LLM-as-Judgeによる評価、Dockerでのデプロイを後付けではなく最初から組み込んでいます。",
      features: [
        "LLM・埋め込み・パターンマッチングのシグナルを統合したハイブリッド意図ルーターで、リクエストを19の意図と4段階の緊急度に分類。約500件のラベル付きデータで正解率91.3%、マクロF1 0.89を達成",
        "意図に応じて起動するChromaDBベースのRAG。3通りのクエリ書き換え、マルチパス検索、重複除去、リランキング、キャッシュ、サーキットブレーカーによるフォールバックを備え、回答正解率88.7%、検索再現率91.2%を達成",
        "RedisのワーキングメモリとChromaDBのエピソード記憶・ユーザープロファイルによる階層型メモリ。TTLは24時間で、15メッセージを超えると直近5件を残して圧縮",
        "ホットロード可能なSkills：Markdownで書いた業務ルールをエージェントのシステムプロンプトに注入し、再起動なしで再読み込み",
        "Prometheusメトリクス、Zスコアによる異常検知、5%の性能劣化アラートを備え、ルーティングのペナルティをオーケストレーターにフィードバック",
        "5つのエンドツーエンド評価スイートによるLLM-as-Judge評価と、ベースラインとの比較による回帰検知",
        "バックエンドが各リクエストをどう振り分けたかを確認できる、トレースパネル付きのVue 3コンソール",
      ],
      challenges: [
        "ログインできない問題と二重請求が1つのメッセージに混在するような場合でも、各エージェントを担当範囲内にとどめること",
        "エージェントが保証できない結果を約束しないよう、回答を業務ポリシーに基づかせること",
        "プロンプトを際限なく長くすることなく、ターンをまたいで文脈を引き継ぐこと",
        "検索やツール呼び出しが失敗しても応答性を保つこと",
      ],
      learnings: [
        "業務ルールをホットロード可能なSkillsとして記述すると、エージェントの振る舞いをモデルの裁量ではなくポリシーで制御できる",
        "監視と評価を最初から組み込むことで、ルーティングの判断が可視化され、性能の後退も検知できる",
        "リアルタイムの性能指標をルーティングにフィードバックすると、性能が落ちた経路の重みをシステムが自動で下げられる",
      ],
    },
  },
  {
    title: "LSHBloom on peS2o | Deduplication for LLM Pretraining",
    slug: "lshbloom-pes2o",
    tagline:
      "Measuring how LSHBloom deduplication changes the cost and quality of continued pretraining for Qwen2.5-0.5B.",
    cover: {
      src: lshbloomCover,
      alt: "Qwen2.5-0.5B efficiency curves comparing Raw, MinHashLSH and LSHBloom training data by training tokens and GPU hours",
    },
    overview:
      "Extending my internship work at Preferred Networks, this project evaluates how MinHashLSH and LSHBloom deduplication affect continued pretraining on a 5,000-document peS2o sample, with data preparation code, reproducible Colab notebooks, validation helpers and measured Qwen2.5-0.5B results. Training on LSHBloom-deduplicated data cut training tokens by 8.46% and A100 GPU time by 8.47%, with validation perplexity within 0.34% of the raw data and a 1.1-point gain in SciQ normalized accuracy.",
    features: [
      "Prepares Raw, MinHashLSH and LSHBloom variants of a peS2o sample at a Jaccard threshold of 0.5 with 256 MinHash permutations, plus a manifest of counts and hashes.",
      "Reproducible Colab notebooks for Qwen2.5-0.5B continued pretraining under an equal token budget and over one full corpus epoch.",
      "Evaluation with peS2o validation perplexity and zero-shot SciQ accuracy using lm-evaluation-harness.",
      "A PLaMo-2-1B replication notebook that applies the same equal-compute protocol on an A100.",
      "Versioned result tables and publication-ready figures, regenerated by scripts.",
      "Unit, notebook and repository-structure tests, checked with pytest and ruff.",
    ],
    techStack: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "datasketch",
      "lm-evaluation-harness",
      "Google Colab",
    ],
    challenges: [
      "Keeping the comparison fair by fixing the token budget, model revision, seed, validation hashes and hyperparameters across all three variants.",
      "Interpreting a single-seed pilot in which the LSHBloom run used a different PyTorch version from the other two.",
      "Continued pretraining lowered base-model SciQ performance in all three runs, pointing to catastrophic forgetting, an aggressive training setup or a corpus-to-task mismatch.",
    ],
    learnings: [
      "LSHBloom closely matches MinHashLSH: the two methods agreed on 4,994 of 5,000 retention decisions (99.88%).",
      "Deduplication reduced training tokens and GPU hours by about 8.5% while keeping endpoint quality comparable to the raw data.",
      "Turning the pilot into a causal claim requires rerunning every variant in one pinned environment with at least three seeds.",
    ],
    feedback: true,
    links: {
      github: "https://github.com/Calista0429/LSHBloom-peS2o",
    },
    ja: {
      title: "LSHBloom on peS2o | LLM事前学習のための重複除去",
      tagline:
        "LSHBloomによる重複除去が、Qwen2.5-0.5Bの継続事前学習のコストと品質をどう変えるかを測定しました。",
      coverAlt:
        "Raw・MinHashLSH・LSHBloomの各学習データについて、学習トークン数とGPU時間ごとにQwen2.5-0.5Bの効率を比較した曲線",
      overview:
        "Preferred Networksでのインターンの取り組みを発展させたプロジェクトです。5,000件のpeS2oサンプルを用いて、MinHashLSHとLSHBloomによる重複除去が継続事前学習に与える影響を評価しました。データ準備のコード、再現可能なColabノートブック、検証用のヘルパー、Qwen2.5-0.5Bでの実測結果をまとめています。LSHBloomで重複除去したデータで学習すると、学習トークン数は8.46%、A100のGPU時間は8.47%削減され、検証パープレキシティは元データとの差が0.34%以内に収まり、SciQの正規化正解率は1.1ポイント向上しました。",
      features: [
        "Jaccard閾値0.5、MinHashの置換数256で、peS2oサンプルのRaw・MinHashLSH・LSHBloomの3種類のデータを作成し、件数とハッシュを記録したマニフェストも出力",
        "同一トークン予算と、コーパス全体1エポックの両条件でQwen2.5-0.5Bを継続事前学習する、再現可能なColabノートブック",
        "lm-evaluation-harnessを用いた、peS2oの検証パープレキシティとゼロショットのSciQ正解率による評価",
        "同じ計算量条件のプロトコルをA100上でPLaMo-2-1Bにも適用した再現ノートブック",
        "スクリプトで再生成できる、バージョン管理された結果表と論文掲載レベルの図",
        "ユニットテスト、ノートブックのテスト、リポジトリ構成のテストを用意し、pytestとruffでチェック",
      ],
      challenges: [
        "3種類のデータすべてでトークン予算、モデルのリビジョン、シード、検証用ハッシュ、ハイパーパラメータを固定し、公平な比較を保つこと",
        "LSHBloomの実行だけPyTorchのバージョンが他の2つと異なっていた、シード1つの予備実験をどう解釈するか",
        "継続事前学習により、3つの実行すべてでベースモデルのSciQ性能が低下したこと。破滅的忘却、強すぎる学習設定、あるいはコーパスとタスクのミスマッチが原因として考えられる",
      ],
      learnings: [
        "LSHBloomはMinHashLSHとほぼ一致し、5,000件中4,994件（99.88%）で残す・除くの判断が同じだった",
        "重複除去によって学習トークン数とGPU時間が約8.5%減り、最終的な品質は元データと同等に保たれた",
        "予備実験の結果を因果的な主張にするには、固定した1つの環境で、すべての条件を少なくとも3つのシードで再実行する必要がある",
      ],
    },
  },
  {
    title: "Effective | AI-Assisted Employee Onboarding",
    slug: "employee-onboarding-agent",
    tagline:
      "A local-first HR onboarding platform where a tool-calling AI agent carries out HR work from Japanese instructions.",
    cover: {
      src: employeeOnboardingCover,
      alt: "Effective's AI assistant reporting the onboarding form it created and the employees it invited",
    },
    overview:
      "Extending my internship work at Money Forward, Effective explores what happens around an employee information form. HR composes templates from three sections (personal information, payroll bank account and commuting), invites new hires and reviews their submissions, while employees save drafts, confirm their details and submit. An AI assistant performs the HR work from Japanese instructions, and a scheduled job reminds employees who have not submitted. It runs entirely on a local machine with synthetic data and is not a Money Forward product.",
    features: [
      "Template builder with three configurable sections and required-field settings; every invitation keeps an immutable snapshot of its template.",
      "Employee forms with draft saving, a confirmation step and account numbers masked until explicitly revealed.",
      "Tool-calling agent that changes data only through 5 guarded tools reusing the UI's domain validation, so no agent action can bypass validation or ownership checks.",
      "Pluggable model providers: a deterministic offline provider by default, or an OpenAI-compatible backend such as DeepSeek.",
      "Notification centre, simulated mailbox and a reminder scheduler that chases non-submitters.",
      "Audit trail covering every invitation, message, submission and HR confirmation.",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Vite",
      "Vitest",
      "DeepSeek API",
    ],
    challenges: [
      "Letting an AI agent change real data without giving it a way around business rules.",
      "Handling payroll details safely: bank and branch codes keep their leading zeroes, and account numbers stay masked in summaries.",
      "Rejecting stale edits with conditional version checks so retried submissions never duplicate history.",
      "Keeping delivery state separate from form progress so a failed delivery can be retried without creating another task.",
    ],
    learnings: [
      "Sharing one domain layer between the UI, the store and the agent tools keeps every path consistent.",
      "A deterministic offline provider makes an agent testable without an API key or network access.",
      "Constraining an agent to a fixed catalogue of tools keeps its behaviour predictable.",
    ],
    feedback: true,
    links: {
      github: "https://github.com/Calista0429/employee-onboarding-agent",
    },
    ja: {
      title: "Effective | AIによる入社手続き支援",
      tagline:
        "ツール呼び出し型のAIエージェントが、日本語の指示から人事業務を代行する、ローカルファーストの入社手続きプラットフォームです。",
      coverAlt:
        "作成した入社フォームと招待した従業員を報告するEffectiveのAIアシスタント",
      overview:
        "マネーフォワードでのインターンの取り組みを発展させ、従業員情報フォームを取り巻く業務を探ったプロジェクトです。人事担当者は個人情報・給与振込口座・通勤の3つのセクションからテンプレートを作成し、新入社員を招待して提出内容を確認します。従業員は下書きを保存し、内容を確認してから提出します。AIアシスタントは日本語の指示から人事業務を実行し、スケジュールされたジョブが未提出の従業員にリマインドを送ります。すべて合成データを使ってローカル環境だけで動作し、マネーフォワードの製品ではありません。",
      features: [
        "3つのセクションと必須項目を設定できるテンプレートビルダー。招待ごとに、変更できないテンプレートのスナップショットを保持",
        "下書き保存と確認ステップを備えた従業員フォーム。口座番号は明示的に表示するまでマスク",
        "UIと同じドメインバリデーションを再利用する5つのガード付きツールを通してのみデータを変更する、ツール呼び出し型エージェント。エージェントの操作がバリデーションや所有者チェックをすり抜けることはない",
        "差し替え可能なモデルプロバイダー：デフォルトは決定的に動作するオフラインプロバイダーで、DeepSeekなどOpenAI互換のバックエンドも利用可能",
        "通知センター、模擬メールボックス、未提出者にリマインドを送るスケジューラー",
        "すべての招待・メッセージ・提出・人事による確認を記録する監査ログ",
      ],
      challenges: [
        "業務ルールをすり抜ける手段を与えずに、AIエージェントに実データを変更させること",
        "給与関連の情報を安全に扱うこと：銀行コードと支店コードは先頭のゼロを保持し、要約では口座番号をマスクしたままにする",
        "条件付きのバージョンチェックで古い編集を拒否し、送信をリトライしても履歴が重複しないようにすること",
        "配信状態をフォームの進捗と分けて管理し、配信に失敗しても新しいタスクを作らずに再送できるようにすること",
      ],
      learnings: [
        "UI、ストア、エージェントのツールで1つのドメイン層を共有すると、すべての経路で一貫性が保たれる",
        "決定的に動作するオフラインプロバイダーがあれば、APIキーやネットワークなしでエージェントをテストできる",
        "エージェントを決められたツールの範囲に制限すると、振る舞いを予測しやすくなる",
      ],
    },
  },
  {
    title: "HelloAgents Trip Planner | AI Travel Planning Agent",
    slug: "trip-planner-agent",
    tagline:
      "A travel-planning agent that grounds every itinerary in real map data, budgets and party size, and returns a structured, auditable plan.",
    cover: {
      src: tripPlannerCover,
      alt: "The trip planner's daily maps for a three-day Hangzhou trip: one map per day, with the route linking that day's stay, sights and meals",
    },
    overview:
      "HelloAgents Trip Planner is an intelligent travel assistant for real-world trip planning. The FastAPI backend compiles the user's request, party size, budget, accommodation, weather, attractions, hotels, food and price hints from Amap (Gaode Maps) into an auditable PlannerContext, and the Planner model generates a structured TripPlan JSON within those constraints. The repository also keeps the post-training data and evaluation conventions behind the Planner, plus optional RAG retrieval and a critic reflection loop.",
    features: [
      "Multi-day trip plans constrained jointly by destination, dates, party size, budget, transportation, accommodation and preferences.",
      "Structured tool snapshots of attractions, hotels, food, weather, price hints and candidate counts from Amap to reduce model fabrication.",
      "A budget-ledger convention that separates per-room nightly hotel prices, adult ticket prices, per-person meal prices and party size.",
      "Optional hybrid RAG over travel posts in Qdrant, fusing dense Qwen3 embeddings with sparse term vectors and filtering by credibility.",
      "Optional generate-critique-revise loop: a deterministic critic checks budget overspend and hallucinated places, then a gated LLM critic judges detours, pacing and persona fit.",
      "Post-training assets: SFT data, frozen evaluation sets, rule-based evaluation metrics and SFT/DPO data-preparation scripts.",
      "Vue 3 + TypeScript + Ant Design Vue web UI with Amap maps for entering requests and reviewing plans.",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "HelloAgents",
      "Vue 3",
      "TypeScript",
      "Amap API",
      "Qdrant",
      "LLaMA-Factory",
    ],
    challenges: [
      "Keeping the model from inventing attractions, hotels and prices by grounding every plan in structured tool snapshots.",
      "Making budgets add up: per-room, per-person and per-adult prices have to stay consistent with the party size.",
      "Getting a complete TripPlan JSON back every time; generation kept failing when the planner ran on a reasoning model instead of a chat model.",
      "Adding RAG without weakening grounding: retrieved posts only guide prioritization and pacing, while places still come from Amap.",
    ],
    learnings: [
      "SFT teaches the output structure, DPO teaches preferences, and reranking picks the best answer.",
      "Frozen evaluation sets and rule-based metrics give a stable yardstick across training iterations.",
      "Running cheap deterministic checks before an LLM critic keeps the reflection loop focused on what rules cannot judge.",
    ],
    feedback: true,
    links: {
      github: "https://github.com/Calista0429/trip-planner-agent",
    },
    ja: {
      title: "HelloAgents Trip Planner | AI旅行プランニングエージェント",
      tagline:
        "すべての旅程を実際の地図データ・予算・人数に基づいて作成し、検証可能な構造化プランを返す旅行計画エージェントです。",
      coverAlt:
        "Trip Plannerの日別マップ：3日間の杭州旅行を1日1枚の地図で示し、その日の宿泊先・観光地・食事をルートで結んでいる",
      overview:
        "HelloAgents Trip Plannerは、実際の旅行計画のためのインテリジェントな旅行アシスタントです。FastAPIのバックエンドが、ユーザーの要望、人数、予算、宿泊、天気、観光地、ホテル、食事、そして高徳地図（Amap）から得た価格の目安を、検証可能なPlannerContextにまとめます。Plannerモデルはその制約の範囲内で、構造化されたTripPlan JSONを生成します。リポジトリには、Plannerを支えるポストトレーニング用のデータと評価の規約に加え、オプションのRAG検索とクリティックによるリフレクションループも含まれています。",
      features: [
        "目的地、日程、人数、予算、交通、宿泊、好みを同時に満たす複数日の旅行プラン",
        "高徳地図から取得した観光地、ホテル、食事、天気、価格の目安、候補数を構造化したツールスナップショットで、モデルのハルシネーションを抑制",
        "ホテルの1室1泊あたりの料金、大人のチケット料金、1人あたりの食費、人数を区別する予算台帳の規約",
        "オプションのハイブリッドRAG：Qdrantに格納した旅行記を対象に、Qwen3の密ベクトルと疎な単語ベクトルを組み合わせて検索し、信頼度でフィルタリング",
        "オプションの「生成・批評・修正」ループ：決定的なクリティックが予算超過や実在しない場所をチェックし、その後、条件付きで起動するLLMクリティックが回り道、ペース配分、ペルソナとの適合を判定",
        "ポストトレーニング用の資産：SFTデータ、固定された評価セット、ルールベースの評価指標、SFT/DPO用のデータ準備スクリプト",
        "Vue 3 + TypeScript + Ant Design VueによるWeb UI。高徳地図の地図上で要望を入力し、プランを確認可能",
      ],
      challenges: [
        "すべてのプランを構造化されたツールスナップショットに基づかせ、モデルが実在しない観光地・ホテル・価格を作り出さないようにすること",
        "予算の計算を合わせること：1室あたり・1人あたり・大人1人あたりの料金を、人数と矛盾なく扱う必要がある",
        "毎回完全なTripPlan JSONを返すこと。Plannerをチャットモデルではなく推論モデルで動かすと、生成が失敗し続けた",
        "グラウンディングを損なわずにRAGを追加すること：検索した旅行記は優先順位とペース配分の参考にとどめ、場所は引き続き高徳地図から取得する",
      ],
      learnings: [
        "SFTで出力の構造を、DPOで好みを学習させ、リランキングで最良の回答を選ぶ",
        "固定された評価セットとルールベースの指標があれば、学習を重ねても同じ物差しで比較できる",
        "LLMクリティックの前に低コストな決定的チェックを走らせると、リフレクションループをルールでは判断できない点に集中させられる",
      ],
    },
  },
  {
    title: "Fine-tuned BERT | Chinese Extractive Question Answering",
    slug: "finetuned-bert-chinese-qa",
    tagline:
      "Fine-tuning Chinese BERT to extract answer spans from paragraphs, lifting exact-match accuracy from 64.1% to 81.2%.",
    cover: {
      src: finetunedBertCover,
      alt: "Training accuracy curves for the simple, medium, strong and boss BERT baselines",
    },
    overview:
      "This project tackles extractive question answering on a Chinese dataset from a Kaggle machine learning competition: given a question and a context paragraph, the model predicts the start and end positions of the answer span. Starting from BERT pretrained on Chinese corpora, the model was improved in four stages, from direct fine-tuning to a larger BERT variant, raising exact-match accuracy from 64.094% to 81.174%.",
    features: [
      "Encodes each sample as [CLS] question [SEP] context [SEP] and predicts the answer's start and end positions.",
      "Simple baseline: direct fine-tuning with the standard training and evaluation pipeline (64.094% EM).",
      "Medium baseline: post-processing that keeps only valid spans where start ≤ end (66.608% EM).",
      "Strong baseline: random offsets around the answer span during training to reduce positional bias (69.787% EM).",
      "Boss baseline: a larger 340M-parameter BERT with gradient accumulation and a learning-rate scheduler (81.174% EM).",
      "Runs as a training script or in Google Colab.",
    ],
    techStack: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "Accelerate",
      "Weights & Biases",
      "Google Colab",
    ],
    challenges: [
      "The model sometimes predicted a start index after the end index, producing invalid or empty answers.",
      "Training on centered answer spans biased the model toward answers in the middle of the context.",
      "Training a larger model with large batches without running out of GPU memory.",
    ],
    learnings: [
      "Filtering invalid spans in post-processing raised exact match from 64.1% to 66.6%.",
      "Randomizing where the answer sits during training reduced positional bias and raised exact match to 69.8%.",
      "Model capacity mattered most: the 340M-parameter BERT with gradient accumulation and learning-rate scheduling reached 81.2%.",
    ],
    feedback: true,
    links: {
      github: "https://github.com/Calista0429/Finetuned-Bert-on-Chinese-QA",
    },
    ja: {
      title: "Fine-tuned BERT | 中国語の抽出型質問応答",
      tagline:
        "中国語BERTをファインチューニングして文章から回答箇所を抽出し、完全一致率を64.1%から81.2%に向上させました。",
      coverAlt:
        "simple・medium・strong・bossの各BERTベースラインの学習精度の推移",
      overview:
        "Kaggleの機械学習コンペティションの中国語データセットを使った、抽出型質問応答のプロジェクトです。質問と文脈の段落が与えられたとき、モデルは回答スパンの開始位置と終了位置を予測します。中国語コーパスで事前学習されたBERTをもとに、そのままのファインチューニングから、より大きなBERTへの切り替えまで4段階で改善し、完全一致率（EM）を64.094%から81.174%に向上させました。",
      features: [
        "各サンプルを [CLS] 質問 [SEP] 文脈 [SEP] の形式にエンコードし、回答の開始位置と終了位置を予測",
        "Simpleベースライン：標準的な学習・評価パイプラインでそのままファインチューニング（EM 64.094%）",
        "Mediumベースライン：開始位置 ≤ 終了位置となる有効なスパンだけを残す後処理（EM 66.608%）",
        "Strongベースライン：学習時に回答スパンの周囲をランダムにずらし、位置バイアスを軽減（EM 69.787%）",
        "Bossベースライン：3億4,000万パラメータの大規模BERTに、勾配累積と学習率スケジューラを導入（EM 81.174%）",
        "学習スクリプトとしても、Google Colab上でも実行可能",
      ],
      challenges: [
        "モデルが終了位置より後ろの開始位置を予測することがあり、無効な回答や空の回答が生じた",
        "回答スパンが中央にある状態で学習すると、モデルが文脈の中央にある回答に偏った",
        "GPUメモリを使い切らずに、大きなバッチで大規模モデルを学習すること",
      ],
      learnings: [
        "後処理で無効なスパンを除外することで、完全一致率が64.1%から66.6%に向上した",
        "学習時に回答の位置をランダム化することで位置バイアスが減り、完全一致率は69.8%に向上した",
        "最も効いたのはモデルの容量で、勾配累積と学習率スケジューリングを組み合わせた3億4,000万パラメータのBERTで81.2%に達した",
      ],
    },
  },
];

/** The project in the given language, with its cover alt text translated too. */
export function localizeProject(project: Project, locale: Locale): Project {
  if (locale === "en") return project;
  const { coverAlt, ...text } = project.ja;
  return {
    ...project,
    ...text,
    ...(project.cover && {
      cover: { ...project.cover, alt: coverAlt ?? project.cover.alt },
    }),
  };
}
