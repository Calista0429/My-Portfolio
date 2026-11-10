import type { StaticImageData } from "next/image";

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
  },
  {
    title: "HelloAgents Trip Planner | AI Travel Planning Agent",
    slug: "trip-planner-agent",
    tagline:
      "A travel-planning agent that grounds every itinerary in real map data, budgets and party size, and returns a structured, auditable plan.",
    cover: {
      src: tripPlannerCover,
      alt: "Diagram of the trip planner's post-training loop: SFT learns the plan structure, DPO learns preferences, and reranking picks the answer",
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
  },
];
