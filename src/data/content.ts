// ============================================
// Site Content Data
// ============================================

export const contact = {
  email: "sutharpramod@outlook.com",
  location: "Montréal, Canada",
  timezone: "America/Montreal",
  socials: [
    {
      platform: "LinkedIn",
      href: "https://www.linkedin.com/in/pramodsuthar/",
    },
    {
      platform: "GitHub",
      href: "https://github.com/pramodsuthar",
    },
    {
      platform: "X",
      href: "https://twitter.com/prmd96",
    },
  ],
} as const;

export const skills = [
  "AI Engineering",
  "Full Stack Development",
  "React Native",
  "Machine Learning",
  "System Architecture",
  "UI/UX Design",
  "DevOps",
  "Cloud Development",
  "Game Development",
  "Git",
  ] as const;

export const lottiePaths = [
  "/lottie/lottie_project_fuse.json",
  "/lottie/lottie_project_nes.json",
  "/lottie/lottie_project_rewind.json",
  "/lottie/lottie_project_spotify.json",
] as const;

export const Experience = [
  {
    company: "Creator.co",
    role: "Software Developer",
    period: "2022 — 2025",
    description:
      "Worked on development of key features for an influencer marketing platform serving thousands of brands and creators. Built robust integrations with Instagram, TikTok, YouTube, and Facebook APIs for real-time analytics and campaign tracking. Architected microservices using Docker and AWS (Lambda, S3) to handle high-volume data processing. Implemented automated reporting dashboards and optimized MySQL queries, reducing load times by 40%.",
    tags: ["React.js", "TypeScript", "REST API", "Docker", "AWS", "MySQL"],
    link: "https://www.creator.co/",
  },
  {
    company: "IGT Canada",
    role: "Software Engineer I",
    period: "2021-2022",
    description:
      "Developed and shipped casino games for regulated gaming markets across North America and Europe. Built slot machine game logic, bonus features, and animation systems using Unity and C#. Collaborated with artists and game designers to implement engaging visual effects and sound integration.",
    tags: ["Unity", "C#", "Perforce", "Jira", "Confluence"],
    link: "https://www.igt.com/",
  },
  {
    company: "One Web Technologies",
    role: "Software Developer Intern",
    period: "2017-2019",
    description:
      "Delivered full-stack solutions for small businesses and startups, including e-commerce platforms, inventory management systems, and custom CRM tools. Gained hands-on experience with agile methodologies and client communication.",
    tags: ["C#", "Python", "Web Development", "SQL", "Git", "GitHub"],
  },
];

export const Projects = [
  {
    title: "Shiron Connect (WIP)",
    description: "A next-gen social platform where users connect to share, discuss, and validate ideas through AI-powered conversations. Features real-time messaging, AI moderation, and intelligent idea matching. Integrates OpenAI's GPT models for contextual discussions and idea analysis.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "OpenAI API", "AWS", "Docker", "Kubernetes", "GitHub"],
    link: "https://www.shironconnect.com/ (WIP)",
  },
  {
    title: "Shiron Athena (WIP)",
    description: "An AI-powered personal analytics dashboard that helps users track daily activities, set goals, and gain actionable insights. Features natural language querying powered by Google Gemini, interactive data visualizations, and smart recommendations.",
    tags: ["React", "TypeScript", "Styled Components", "AWS", "Node.js", "Express", "MySQL", "Prisma", "Google Gemini API", "Docker", "Kubernetes", "GitHub"],
    link: "https://www.shironathena.com/ (WIP)",
  },
  {
    title: "Moviepedia",
    description: "A comprehensive movie and TV show encyclopedia built as a Progressive Web App. Features instant search, detailed cast and crew information, trailer previews, and personalized watchlists.",
    tags: ["React", "PWA", "SCSS", "TMDB API", "Netlify"],
    link: "https://movieepedia.netlify.app/",
  },
  {
    title: "Pacman",
    description:  'Developed a Remake of the classic arcade game Pacman where the character, Pacman will find paths through his maze world.',
    tags: ["Unreal Engine", "C++", "Gameplay Programming"],
    link: "https://github.com/PramodSuthar/PacMan",
  },
]

export const Education = [
  {
    title: "Diploma in Computer Science and Engineering",
    org: "Gujarat Technological University",
    year: "2012-2016",
  },
    
  { title: "Bachelors in Computer Science and Engineering", 
    org: "Gujarat Technological University", 
    year: "2016-2019" 
  },
  {
    title: "A.E.C. Diploma in IT Programming Analyst",
    org: "College Lasalle, Montréal",
    year: "2019-2021",
  },
];

