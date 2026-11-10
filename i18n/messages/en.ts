// English copy of every page, copied verbatim from where it is hard-coded
// today; a language toggle should read from here and from ./ja.ts instead.
// Site chrome (sidebar, header, mobile menu, search, footer, pagers, intro)
// stays in English and is not here. Content data (projects, experience,
// education, places) keeps its translations next to the English: see ../README.md.
export const en = {
  locale: { htmlLang: 'en' },
  meta: {
    description:
      'Portfolio of Baoxi Huang, Machine Learning & Software Engineer building LLM agents, RAG systems and data pipelines.',
    keywords: [
      'Baoxi Huang',
      'baoxi huang',
      'Huang Baoxi',
      'Calista0429',
      'Baoxi Huang Portfolio',
      'Machine Learning Engineer',
      'Software Engineer',
      'LLM',
      'RAG',
      'AI Agents',
      'Python Developer',
      'React Developer',
      'Baoxi Huang Projects',
      'Baoxi Huang Skills',
      'Baoxi Huang Experience',
      'Baoxi Huang Education',
      'Baoxi Huang Contact',
      'Baoxi Huang Resume',
    ],
    ogLocale: 'en_US',
  },
  // Badge on the newest timeline entry (Experience, Education).
  timeline: { latest: 'Latest' },
  loading: {
    title: 'Loading...',
    description: 'Getting data from various sources...',
    hint: 'This may take a few seconds...',
  },
  notFound: { title: 'NotFound' },
  home: {
    github: {
      title: 'GitHub Stats',
      description: 'Insights and metrics about my GitHub profile',
      hireable: 'Hireable',
      yes: 'Yes',
      repos: 'Total Public Repositories',
      followers: 'Followers',
      following: 'Following',
      unavailable:
        'GitHub profile numbers couldn’t be loaded. They refresh every hour.',
      calendarError: 'Could not fetch GitHub stats',
      // `labels` for react-github-calendar; {{count}} is filled in by the calendar.
      calendar: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        totalCount: '{{count}} contributions in the last year',
        // Phones show only the last 3 months.
        totalCountRecent: '{{count}} contributions in the last 3 months',
        legend: { less: 'Less', more: 'More' },
      },
    },
    footprint: {
      title: 'Footprint',
      description: 'Places I’ve been so far.',
    },
  },
  footprint: {
    places: 'Places',
    summary: (places: number, countries: number) =>
      `${places} ${places === 1 ? 'place' : 'places'} in ${countries} ${countries === 1 ? 'country' : 'countries'}`,
    allPlaces: 'All places',
    mapLabel: 'Map of places I’ve been',
    // Marker tooltip; when the name equals the country (Singapore) show the name alone.
    tooltip: (name: string, country: string) => `${name}, ${country}`,
    // Keyed by the `country` values in constants/footprint.ts.
    countries: {
      Japan: 'Japan',
      China: 'China',
      Malaysia: 'Malaysia',
      Singapore: 'Singapore',
      'South Korea': 'South Korea',
    },
  },
  about: {
    role: 'Machine Learning & Software Engineer',
    contacts: {
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      blog: 'Blog',
    },
    sections: {
      language: 'Language',
      skills: 'Skills',
      records: 'Publication & certification',
      hobbies: 'Hobbies',
    },
    languages: [
      ['English', 'TOEFL 91'],
      ['Japanese', 'JLPT N2'],
      ['Chinese', 'Native'],
    ],
    skills: [
      ['Programming', 'Python, TypeScript'],
      ['ML & LLM', 'PyTorch, RAG, multi-agent systems, LLM-as-Judge evaluation'],
      ['Backend', 'FastAPI, Node.js, GraphQL, Redis, ChromaDB'],
      ['Frontend', 'React'],
      ['Cloud & DevOps', 'AWS (S3, Batch, EC2), Docker, Prometheus, GitHub Actions, Git'],
    ],
    publication: {
      label: 'Publication',
      title:
        'Seafloor Debris Detection Using Underwater Images and Deep Learning-Driven Image Restoration',
    },
    certification: {
      label: 'Certification',
      value: 'AWS Certified Solutions Architect – Associate',
    },
    hobbies: 'Photography, Gym, Swimming, Jogging, Cooking, Reading',
  },
  projects: {
    title: 'Projects',
    subtitle: 'A lot of ideas, but some are still under construction!',
  },
  project: {
    back: 'Back to projects',
    notFound: 'Project not found',
    techStack: 'Tech Stack',
    features: 'Features',
    challenges: 'Challenges',
    learnings: 'Learnings',
    feedback: 'Feedback',
    feedbackPrompt: 'For feedback or suggestions, contact me at:',
    links: 'Links',
    link: 'Link',
    live: 'Live',
    github: 'Github',
  },
  skills: {
    title: 'Skills & Tools',
    subtitle: 'Learned by coding all night and debugging all day!',
    description:
      'As a Machine Learning & Software Engineer, I work across the stack: Python for LLM agents, RAG and data pipelines, FastAPI, Redis and ChromaDB on the backend, and React, TypeScript and GraphQL on the frontend. I deploy and operate my work with AWS, Docker, GitHub Actions and Prometheus.',
  },
  experience: {
    title: 'Experience',
    subtitle: 'You need it to get the job, but the job’s what gives it!',
    description:
      'Throughout my journey as a developer, I have had the opportunity to work with cutting-edge technologies while also mastering the fine art of debugging at 2 AM. From building dynamic web applications to deciphering cryptic error messages, my experience has been a mix of structured learning and spontaneous problem-solving. Each project and internship has sharpened my ability to write clean code, collaborate effectively, and most importantly—fix bugs before they fix me.',
  },
  education: {
    title: 'Education',
    subtitle:
      'I learned a lot, but the real learning happens in the code editor!',
    description: [
      "Education has always been the cornerstone of my journey into the tech world. My Bachelor's in Data Science and Big Data Technology at Jilin University gave me my foundation in data and computing, and my Master's in Environment Systems at The University of Tokyo, with a machine learning focus in the Mizuno Lab, took it into research.",
      'My academic journey has been complemented by hands-on projects and coursework, enabling me to build practical skills and a deep understanding of modern technological solutions.',
    ],
  },
  testimonials: {
    title: 'Testimonials',
    subtitle: 'Get the truth from those who’ve seen my work firsthand!',
  },
};

export type Messages = typeof en;
