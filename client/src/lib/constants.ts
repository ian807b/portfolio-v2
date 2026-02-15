import type {
  Project,
  SkillCategory,
  ExperienceEntry,
  EducationEntry,
} from "@/types";

// ─── API Configuration ───

// In development, Vite proxies /api requests to localhost:4000,
// so we use an empty base URL. In production, set VITE_API_URL to the backend origin.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "";

// ─── Navigation Links ───

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

// ─── Social Links ───

export const SOCIAL_LINKS = {
  github: "https://github.com/ian807b",
  linkedin: "https://www.linkedin.com/in/ian-hwang/",
  email: "ian807b@gmail.com",
  resume:
    "https://drive.google.com/file/d/1QXfSjLxQuS-fjJvBCu3SvcpoS-Zr9Bio/view?usp=drive_link",
} as const;

// ─── Projects Data ───

export const PROJECTS: Project[] = [
  {
    id: "observability-pipeline",
    title: "Full-Stack Observability Pipeline",
    description:
      "Production monitoring system with C++20 instrumentation, Grafana Alloy for distributed metric collection, Prometheus backend on AWS EC2, and Grafana dashboards for visualization.",
    technologies: [
      "C++20",
      "Python",
      "Prometheus",
      "Grafana",
      "AWS EC2",
      "Grafana Alloy",
    ],
    category: "fullstack",
    image: "/images/observability.png",
    featured: true,
  },
  {
    id: "smart-stick",
    title: "Smart Stick - Embedded Systems",
    description:
      "Assistive walking device for visually impaired users with obstacle detection (10m range), haptic feedback via I2C, and fall detection using gyroscope with emergency PWM buzzer alerts.",
    technologies: [
      "C",
      "I2C Protocol",
      "ToF Sensor",
      "Gyroscope",
      "PWM",
      "BeagleBone",
    ],
    category: "fullstack",
    image: "/images/smart-stick.png",
    featured: true,
  },
  {
    id: "running-tracker",
    title: "Running Tracker - UX Design",
    description:
      "Medium-fidelity prototype of a running tracker app. Conducted usability testing with 4 potential users and awarded class's favorite design for addressing user-facing problems.",
    technologies: ["Figma", "Usability Testing", "User Research", "Prototyping"],
    category: "frontend",
    image: "/images/running-tracker.png",
    liveUrl: "https://www.youtube.com/watch?v=3Ngzww6wS3g",
  },
  {
    id: "portfolio-v2",
    title: "Portfolio v2",
    description:
      "This website. A full-stack React portfolio with Express.js backend, PostgreSQL visitor tracking, and an MCP server that lets recruiters ask an AI about me.",
    technologies: [
      "React",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Tailwind CSS",
      "AWS",
      "MCP",
    ],
    category: "fullstack",
    image: "/images/project-portfolio.png",
    githubUrl: "https://github.com/ian807b/portfolio-v2",
    featured: true,
  },
  {
    id: "shoppy",
    title: "Shoppy",
    description:
      "E-commerce application with product browsing, cart management, and dynamic tax calculations based on location. Built with React, Firebase, and React Query.",
    technologies: ["React", "Firebase", "React Query", "Tailwind CSS"],
    category: "frontend",
    image: "/images/shoppy.png",
    liveUrl: "https://creative-crepe-d98eb7.netlify.app",
    featured: true,
  },
  {
    id: "youtube-clone",
    title: "YouTube Clone",
    description:
      "A React-based YouTube clone utilizing the YouTube Data API for real video data, with React Router for navigation and React Query for data fetching.",
    technologies: [
      "React",
      "React Router",
      "React Query",
      "Tailwind CSS",
      "YouTube API",
    ],
    category: "frontend",
    image: "/images/project3.png",
    liveUrl: "https://bright-bunny-e38c91.netlify.app",
    featured: true,
  },
  {
    id: "yumspot",
    title: "YumSpot",
    description:
      "A cross-platform mobile application for discovering and saving restaurant recommendations. Built with React Native for iOS.",
    technologies: ["React Native", "iOS", "TypeScript"],
    category: "mobile",
    image: "/images/yumspot.png",
    githubUrl: "https://github.com/ian807b/matzip",
  },
  {
    id: "todo-app",
    title: "Todo Application",
    description:
      "A feature-rich todo application with dark/light mode switching using Context API, task persistence, and clean UI design.",
    technologies: ["React", "Context API", "CSS"],
    category: "frontend",
    image: "/images/project2.png",
    liveUrl: "https://charming-sorbet-12187a.netlify.app",
  },
];

// ─── Skills Data ───

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages",
    icon: "Code2",
    skills: ["C++", "C", "Python", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    name: "Frontend",
    icon: "Layout",
    skills: ["React", "TailwindCSS"],
  },
  {
    name: "Backend",
    icon: "Server",
    skills: ["ExpressJS"],
  },
  {
    name: "Embedded Systems",
    icon: "Cpu",
    skills: ["I2C Protocol", "ToF Sensors", "Gyroscope", "PWM", "Interrupt Handling"],
  },
  {
    name: "Database",
    icon: "Database",
    skills: ["PostgreSQL"],
  },
  {
    name: "Developer Tools",
    icon: "Wrench",
    skills: [
      "AWS",
      "Git",
      "GitHub",
      "Atlassian Tools",
      "TeamCity",
      "Visual Studio",
      "Prometheus",
      "Grafana",
      "Docker",
    ],
  },
  {
    name: "Operating Systems",
    icon: "Monitor",
    skills: ["Linux", "MacOS", "Windows"],
  },
];

// ─── Experience Data ───

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "darkvision",
    company: "DarkVision",
    role: "Software Engineering Co-op",
    location: "North Vancouver, Canada",
    period: "Aug. 2025 - Present",
    description: [
      "Developing high-performance C++20 Windows desktop applications for processing and visualizing ultrasound inspection data.",
      "Optimized application throughput by profiling Windows desktop apps to identify database bottlenecks and implementing concurrent solutions using Mutex, Thread, and Async operations.",
      "Developed efficient data processing pipelines to handle large ultrasound datasets, utilizing serialization to structure PostgreSQL data for UI workflows.",
      "Increased data transfer speed up to 5 times faster from embedded systems to local machines by removing redundant data chunks.",
      "Built observability infrastructure to monitor application performance using Prometheus and Grafana.",
    ],
    technologies: ["C++20", "PostgreSQL", "Windows", "Python", "Prometheus", "Grafana"],
  },
  {
    id: "kvic",
    company: "Korea Venture Investment Corporation",
    role: "Global Investment Team Intern",
    location: "Seoul, South Korea",
    period: "Nov. 2016 - Apr. 2017",
    description: [
      "Analyzed Limited Partnership Agreements to extract and verify key legal clauses.",
      "Coordinated international calls and investor events across multiple time zones, managing scheduling logistics for global stakeholders.",
    ],
    technologies: [],
  },
  {
    id: "changjo-law",
    company: "Changjo Law Firm",
    role: "Translator",
    location: "Seoul, South Korea",
    period: "Mar. 2012 - Sep. 2014",
    description: [
      "Provided critical English-Korean translation for legal documents and real-time communication between international clients and US counsel.",
      "Streamlined client communications and administrative operations by managing schedules, travel logistics, and financial reporting.",
    ],
    technologies: [],
  },
  {
    id: "us-army",
    company: "United States Army",
    role: "Senior KATUSA",
    location: "Pyeongtaek-city, South Korea",
    period: "Sep. 2009 - Jul. 2011",
    description: [
      "Oversaw operations for 150+ personnel as liaison between US and ROK military leadership.",
      "Selected as #1 soldier in brigade-wide competition evaluating combat skills, physical performance, and professional conduct.",
      "Recognized with Army Commendation/Achievement Medals for key role in ROK/US joint investigation of the Cheonan naval vessel sinking.",
    ],
    technologies: [],
  },
];

// ─── Education Data ───

export const EDUCATION: EducationEntry[] = [
  {
    id: "sfu",
    institution: "Simon Fraser University",
    degree: "B.Sc. Computer Science",
    period: "2021 - 2026 (Expected)",
    logo: "/images/sfu-cs-logo.png",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Web Development",
      "Software Engineering",
      "Database Systems",
      "Networking",
      "Distributed Systems",
      "Embedded Systems",
      "Artificial Intelligence",
      "Bioinformatics",
    ],
  },
];

// ─── MCP Chat Suggestions ───

export const MCP_SUGGESTIONS = [
  "Is Ian available for co-op positions?",
  "What is Ian's current work experience?",
  "Tell me about the observability pipeline project",
  "What are Ian's C++ and Windows application skills?",
  "What makes Ian stand out as a candidate?",
  "When can Ian start full-time?",
] as const;
