import type { Certification, Education, Experience, Profile, Project, ToolGroup } from "./types";

// Every text on the site lives in this file. Replace the placeholder content
// below with your own to make the template yours.

export const profile: Profile = {
  name: "Alex Morgan",
  role: "Full-Stack Developer",
  headline: "I design and build *calm, considered* products for the web.",
  location: "Lisbon, Portugal",
  timeZone: "Europe/Lisbon",
  status: "Available for new projects",
  available: true,
  intro:
    "I design and build fast, accessible web products, from the first sketch to the last millisecond of load time.",
  bio: [
    "I am a developer who cares about the details nobody asks for: the easing of a menu, the empty state of a table, the time it takes for the first pixel to show up.",
    "Over the last years I have worked with startups and studios to ship products used by millions of people, leading frontend teams and building the tools they rely on every day.",
  ],
  email: "hello@example.com",
  links: [
    { label: "GitHub", href: "https://github.com/", handle: "@username" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", handle: "in/username" },
    { label: "X", href: "https://x.com/", handle: "@username" },
    { label: "Dribbble", href: "https://dribbble.com/", handle: "@username" },
  ],
};

export const toolbox: ToolGroup[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Go", "Rust", "SQL"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"] },
  { group: "Backend", items: ["Node.js", "GraphQL", "PostgreSQL", "Redis", "Prisma"] },
  { group: "Infrastructure", items: ["AWS", "Docker", "Vercel", "GitHub Actions", "Terraform"] },
  { group: "Design", items: ["Figma", "Design tokens", "Prototyping", "Accessibility"] },
];

export const experience: Experience[] = [
  {
    role: "Senior Frontend Engineer",
    company: "Northwind Labs",
    companyUrl: "https://example.com",
    type: "Full-time",
    location: "Remote",
    start: "2023",
    summary:
      "Lead the frontend of a collaborative analytics platform used by more than 2,000 teams.",
    highlights: [
      "Rebuilt the dashboard renderer, cutting interaction latency by 60%.",
      "Created the design system now shared by four product teams.",
      "Mentor three engineers and run the frontend guild.",
    ],
    stack: ["TypeScript", "React", "Next.js", "GraphQL", "Storybook"],
  },
  {
    role: "Full-Stack Developer",
    company: "Brightline",
    companyUrl: "https://example.com",
    type: "Full-time",
    location: "Lisbon, Portugal",
    start: "2020",
    end: "2023",
    summary:
      "Built the core booking flow and internal tools of a fast-growing travel startup.",
    highlights: [
      "Shipped a new checkout that raised conversion by 18%.",
      "Designed the public REST API and its documentation site.",
      "Moved the deployment pipeline to containers and preview environments.",
    ],
    stack: ["Node.js", "React", "PostgreSQL", "Docker", "AWS"],
  },
  {
    role: "Frontend Developer",
    company: "Studio Parallel",
    companyUrl: "https://example.com",
    type: "Agency",
    location: "Porto, Portugal",
    start: "2018",
    end: "2020",
    summary:
      "Developed websites and campaigns for cultural institutions and consumer brands.",
    highlights: [
      "Delivered more than 25 sites with rich motion and WebGL details.",
      "Introduced component-driven development and visual regression tests.",
    ],
    stack: ["JavaScript", "Vue", "GSAP", "WebGL"],
  },
  {
    role: "Freelance Developer",
    company: "Independent",
    type: "Freelance",
    location: "Remote",
    start: "2016",
    end: "2018",
    summary: "Websites and small web applications for local businesses and creatives.",
    highlights: [
      "Handled every step of the work: brief, design, development and hosting.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "PHP"],
  },
];

export const education: Education[] = [
  {
    degree: "MSc in Computer Science",
    school: "Metropolitan University",
    schoolUrl: "https://example.com",
    location: "Lisbon, Portugal",
    start: "2016",
    end: "2018",
    summary: "Specialisation in human-computer interaction and distributed systems.",
    highlights: [
      "Research on perceived performance in web interfaces.",
      "Teaching assistant for the Web Development course.",
    ],
    note: "Thesis: Measuring perceived speed in single-page applications",
  },
  {
    degree: "BSc in Software Engineering",
    school: "Metropolitan University",
    schoolUrl: "https://example.com",
    location: "Lisbon, Portugal",
    start: "2013",
    end: "2016",
    summary: "Algorithms, data structures, databases, networks and software design.",
    highlights: [
      "Final project: a real-time collaborative whiteboard.",
      "Member of the university programming team.",
    ],
    note: "Graduated with honours",
  },
];

export const certifications: Certification[] = [
  { title: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", year: "2024", url: "https://example.com" },
  { title: "Web Accessibility Specialist", issuer: "IAAP", year: "2023", url: "https://example.com" },
  { title: "Professional Scrum Developer", issuer: "Scrum.org", year: "2021", url: "https://example.com" },
];

export const projects: Project[] = [
  {
    slug: "lumen",
    title: "Lumen",
    category: "Design system",
    year: "2026",
    summary:
      "An open-source design system with 60 accessible components, design tokens and a live playground.",
    stack: ["TypeScript", "React", "Storybook"],
    cover: { tone: "crimson", pattern: "rings" },
    repo: "https://github.com/",
    url: "https://example.com",
    featured: true,
  },
  {
    slug: "atlas",
    title: "Atlas",
    category: "Web app",
    year: "2025",
    summary:
      "Real-time analytics dashboard that turns millions of events into clear, shareable reports.",
    stack: ["Next.js", "GraphQL", "PostgreSQL"],
    cover: { tone: "espresso", pattern: "grid" },
    url: "https://example.com",
    featured: true,
  },
  {
    slug: "relay",
    title: "Relay",
    category: "Open source",
    year: "2025",
    summary:
      "A tiny, type-safe event bus for TypeScript with zero dependencies and first-class React bindings.",
    stack: ["TypeScript", "Node.js"],
    cover: { tone: "sand", pattern: "waves" },
    repo: "https://github.com/",
    featured: true,
  },
  {
    slug: "nimbus",
    title: "Nimbus",
    category: "Mobile web",
    year: "2024",
    summary:
      "A calm weather app built as a progressive web app, with offline support and animated forecasts.",
    stack: ["React", "PWA", "Canvas"],
    cover: { tone: "cocoa", pattern: "dots" },
    url: "https://example.com",
    featured: true,
  },
  {
    slug: "ledger",
    title: "Ledger",
    category: "Web app",
    year: "2024",
    summary:
      "Personal finance tracker with bank sync, budgets and a fast keyboard-first interface.",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    cover: { tone: "sand", pattern: "bars" },
    repo: "https://github.com/",
  },
  {
    slug: "orbit",
    title: "Orbit",
    category: "Developer tool",
    year: "2023",
    summary:
      "Command-line tool that scaffolds, tests and deploys monorepo packages with one command.",
    stack: ["Go", "Docker", "GitHub Actions"],
    cover: { tone: "crimson", pattern: "waves" },
    repo: "https://github.com/",
  },
  {
    slug: "folio",
    title: "Folio",
    category: "Website",
    year: "2022",
    summary:
      "Award-winning website for a contemporary art museum, with WebGL transitions and a CMS.",
    stack: ["Vue", "WebGL", "Headless CMS"],
    cover: { tone: "cocoa", pattern: "rings" },
    url: "https://example.com",
  },
  {
    slug: "pulse",
    title: "Pulse",
    category: "Open source",
    year: "2021",
    summary:
      "Lightweight uptime monitor with status pages, alerts and a public API.",
    stack: ["Rust", "Redis", "AWS"],
    cover: { tone: "espresso", pattern: "bars" },
    repo: "https://github.com/",
  },
];
