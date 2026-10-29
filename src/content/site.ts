import {
  siDocker,
  siFigma,
  siGithub,
  siGo,
  siGraphql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siRedis,
  siTailwindcss,
  siTypescript,
  siVercel,
  siX,
} from "simple-icons";
import { iconLinkedin } from "./icons";
import type {
  Certification,
  Education,
  Experience,
  Photo,
  Point,
  Profile,
  Project,
  Skill,
  Statement,
} from "./types";

// Every text and photo on the site is set in this file. Replace the
// placeholder content below with your own to make the template yours.

export const profile: Profile = {
  name: "Antonio Tangaro",
  role: "Full-Stack Developer",
  location: "Lisbon, Portugal",
  timeZone: "Europe/Lisbon",
  status: "Available for selected projects",
  intro: "Building fast, quiet and carefully made products for the web.",
  email: "hello@example.com",
  links: [
    { label: "GitHub", href: "https://github.com/", handle: "github.com/username", icon: siGithub },
    { label: "LinkedIn", href: "https://www.linkedin.com/", handle: "linkedin.com/in/username", icon: iconLinkedin },
    { label: "X", href: "https://x.com/", handle: "@username", icon: siX },
  ],
};

export const photos: Record<"hero" | "about" | "manifesto" | "craft", Photo> = {
  hero: { src: "/images/hero.jpg", alt: "A figure seen from behind, looking over a city in the haze", position: "55% 40%" },
  about: { src: "/images/about.jpg", alt: "Portrait of a person reading in soft window light", position: "60% 30%" },
  manifesto: { src: "/images/manifesto.jpg", alt: "A person in a scarf looking out at the sea", position: "50% 40%" },
  craft: { src: "/images/craft.jpg", alt: "Close-up of the keys of an old typewriter", position: "50% 50%" },
};

export const about: Statement = {
  title: "I turn *complex ideas* into products that feel simple.",
  body: [
    "Full-stack developer with seven years of experience across startups and studios, focused on performance, accessibility and clean, lasting code.",
  ],
};

export const principles: Point[] = [
  { title: "Performance", text: "Every millisecond is part of the experience." },
  { title: "Clarity", text: "Interfaces that explain themselves." },
  { title: "Craft", text: "Details nobody asks for, done anyway." },
];

export const manifesto: Statement = {
  title: "Good software should feel *invisible*: fast, calm and quietly intentional.",
  body: [
    "I work where engineering meets design. A product is more than features: it is the rhythm of its motion, the weight of its type and the time it takes to answer a click.",
    "I like small teams, honest feedback and shipping often, and I write code that the next person will be glad to read.",
  ],
};

// Logos from Simple Icons (https://simpleicons.org): import any icon by its
// "si" name and add it here.
export const skills: Skill[] = [
  { name: "TypeScript", icon: siTypescript },
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "Node.js", icon: siNodedotjs },
  { name: "GraphQL", icon: siGraphql },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Docker", icon: siDocker },
  { name: "Vercel", icon: siVercel },
  { name: "Redis", icon: siRedis },
  { name: "Figma", icon: siFigma },
  { name: "Go", icon: siGo },
];

export const process: Point[] = [
  { title: "Listen", text: "Understand the people, the problem and what success looks like." },
  { title: "Shape", text: "Sketch the structure, the content and the moments that matter." },
  { title: "Build", text: "Write clean, tested code and bring the interface to life." },
  { title: "Refine", text: "Measure, polish and iterate until it feels effortless." },
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
      "Leading the frontend of a collaborative analytics platform used by more than 2,000 teams; rebuilt the dashboard renderer and the shared design system.",
    stack: ["TypeScript", "React", "Next.js", "GraphQL"],
  },
  {
    role: "Full-Stack Developer",
    company: "Brightline",
    companyUrl: "https://example.com",
    type: "Full-time",
    location: "Lisbon",
    start: "2020",
    end: "2023",
    summary:
      "Built the booking flow and internal tools of a travel startup; shipped a checkout that raised conversion by 18%.",
    stack: ["Node.js", "React", "PostgreSQL", "AWS"],
  },
  {
    role: "Frontend Developer",
    company: "Studio Parallel",
    companyUrl: "https://example.com",
    type: "Agency",
    location: "Porto",
    start: "2018",
    end: "2020",
    summary: "Websites and campaigns for cultural institutions and consumer brands, with rich motion and WebGL.",
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
    stack: ["HTML", "CSS", "JavaScript", "PHP"],
  },
];

export const education: Education[] = [
  {
    degree: "MSc in Computer Science",
    school: "Metropolitan University",
    schoolUrl: "https://example.com",
    location: "Lisbon",
    start: "2016",
    end: "2018",
    summary: "Human-computer interaction and distributed systems. Thesis on perceived performance.",
  },
  {
    degree: "BSc in Software Engineering",
    school: "Metropolitan University",
    schoolUrl: "https://example.com",
    location: "Lisbon",
    start: "2013",
    end: "2016",
    summary: "Algorithms, databases, networks and software design. Graduated with honours.",
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
    summary: "An open-source design system with sixty accessible components, design tokens and a live playground.",
    stack: ["TypeScript", "React", "Storybook"],
    image: { src: "/images/project-lumen.jpg", alt: "Laptop on a wooden table at night" },
    repo: "https://github.com/",
    featured: true,
  },
  {
    slug: "atlas",
    title: "Atlas",
    category: "Analytics platform",
    year: "2025",
    summary: "Real-time dashboards that turn millions of events into clear, shareable reports.",
    stack: ["Next.js", "GraphQL", "PostgreSQL"],
    image: { src: "/images/project-atlas.jpg", alt: "Laptop and a notebook with sketches seen from above" },
    url: "https://example.com",
    featured: true,
  },
  {
    slug: "relay",
    title: "Relay",
    category: "Open source",
    year: "2025",
    summary: "A tiny, type-safe event bus for TypeScript with zero dependencies and first-class React bindings.",
    stack: ["TypeScript", "Node.js"],
    image: { src: "/images/project-relay.jpg", alt: "Hand on a mouse next to a keyboard and a mug" },
    repo: "https://github.com/",
    featured: true,
  },
  {
    slug: "nimbus",
    title: "Nimbus",
    category: "Progressive web app",
    year: "2024",
    summary: "A calm weather app with offline support and animated forecasts.",
    stack: ["React", "PWA", "Canvas"],
    image: { src: "/images/project-nimbus.jpg", alt: "Desk by a window with a small laptop" },
    url: "https://example.com",
    featured: true,
  },
  {
    slug: "ledger",
    title: "Ledger",
    category: "Web app",
    year: "2024",
    summary: "Personal finance tracker with bank sync and a keyboard-first interface.",
    stack: ["Next.js", "PostgreSQL"],
    repo: "https://github.com/",
  },
  {
    slug: "orbit",
    title: "Orbit",
    category: "Developer tool",
    year: "2023",
    summary: "Command-line tool that scaffolds, tests and deploys monorepo packages.",
    stack: ["Go", "Docker"],
    repo: "https://github.com/",
  },
  {
    slug: "folio",
    title: "Folio",
    category: "Website",
    year: "2022",
    summary: "Website for a contemporary art museum, with WebGL transitions and a CMS.",
    stack: ["Vue", "WebGL"],
    url: "https://example.com",
  },
  {
    slug: "pulse",
    title: "Pulse",
    category: "Open source",
    year: "2021",
    summary: "Lightweight uptime monitor with status pages and alerts.",
    stack: ["Rust", "Redis"],
    repo: "https://github.com/",
  },
];

/** Template credit shown in small type at the very end of the page. */
export const designer = {
  name: "Antonio Tangaro",
  url: "https://www.antoniotangaro.dev/",
};
