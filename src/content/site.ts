import type { Education, Experience, Profile, Project } from "./types";

// Every text on the site lives in this file. Edit it to update the portfolio.

export const profile: Profile = {
  name: "Antonio Tangaro",
  role: "Software Developer",
  location: "Padua, Italy",
  timeZone: "Europe/Rome",
  status: "Open to new opportunities",
  intro:
    "Computer Engineering student at the University of Padua. I build software where engineering meets learning systems: reinforcement learning, computer vision and clean, fast web interfaces.",
  bio: [
    "I like problems that sit between theory and product. Most of my work starts from a model or an algorithm and ends as something a person can actually use: a trained agent, a vision pipeline, a small web app.",
    "Outside of coursework I ship side projects, contribute templates to the university community and design sites for people whose work deserves a quiet, well-made frame.",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/antoniooodev" },
    { label: "Website", href: "https://antoniotangaro.dev" },
  ],
};

export const experience: Experience[] = [
  {
    role: "Freelance Web Developer",
    company: "Independent",
    location: "Remote",
    start: "2024",
    summary:
      "Design and development of portfolio sites and small web applications for creatives and small brands.",
    highlights: [
      "Delivered static, dependency-free portfolio sites with editorial layouts and smooth, accessible motion.",
      "Built a full-stack tool that turns product photos and brand guidelines into ready-to-publish social captions.",
      "Own every step of the work: brief, design, development, deployment and handover.",
    ],
    stack: ["TypeScript", "Next.js", "React", "Node.js", "CSS"],
  },
  {
    role: "Machine Learning Projects",
    company: "University of Padua",
    companyUrl: "https://www.unipd.it",
    location: "Padua, Italy",
    start: "2023",
    summary:
      "Research-oriented projects in reinforcement learning, optimal control and computer vision, carried out alongside the degree.",
    highlights: [
      "Trained model-free RL agents for autonomous driving and racing, benchmarked against optimal-control baselines.",
      "Built real-time detection and pose estimation pipelines in PyTorch and C++/OpenCV.",
      "Studied Age of Information in crowdfinding networks through simulation and analysis.",
    ],
    stack: ["Python", "PyTorch", "Stable-Baselines3", "C++", "OpenCV"],
  },
];

export const education: Education[] = [
  {
    degree: "MSc in Computer Engineering",
    school: "University of Padua",
    schoolUrl: "https://www.unipd.it",
    location: "Padua, Italy",
    start: "2024",
    summary:
      "Master's degree focused on artificial intelligence, robotics and intelligent systems.",
    highlights: [
      "Reinforcement learning, machine learning and computer vision.",
      "Group projects in C++ and Python with a strong focus on reproducible results.",
    ],
  },
  {
    degree: "BSc in Information Engineering",
    school: "University of Padua",
    schoolUrl: "https://www.unipd.it",
    location: "Padua, Italy",
    start: "2021",
    end: "2024",
    summary:
      "Bachelor's degree covering programming, algorithms, signals, control and computer architecture.",
    highlights: [
      "Final thesis written with a LaTeX template later published for other students.",
      "Software projects in Java, C++ and JavaScript.",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "ten-tenths",
    title: "Ten Tenths",
    year: "2026",
    summary:
      "Pure model-free reinforcement learning that drives a GT4 race car at the limit of grip on Catalunya, within 3–4% of the minimum-time lap. No demonstrations, no reference line, no shield.",
    stack: ["Python", "PPO", "Stable-Baselines3", "CasADi", "Gymnasium"],
    repo: "https://github.com/antoniooodev/ten-tenths",
    featured: true,
  },
  {
    slug: "autonomous-driving-rl",
    title: "Autonomous Driving RL",
    year: "2026",
    summary:
      "Reinforcement learning agents for autonomous driving scenarios, with a comparison of algorithms, reward designs and training setups.",
    stack: ["Python", "PyTorch", "Gymnasium"],
    repo: "https://github.com/antoniooodev/autonomous-driving-rl",
    featured: true,
  },
  {
    slug: "aoi-crowdfinding",
    title: "AoI Crowdfinding",
    year: "2025",
    summary:
      "Simulation and analysis of Age of Information in crowdfinding networks, measuring how fresh location updates stay as the crowd changes.",
    stack: ["Python", "NumPy", "Simulation"],
    repo: "https://github.com/antoniooodev/aoi_crowdfinding",
  },
  {
    slug: "document-scanner",
    title: "Document Scanner",
    year: "2025",
    summary:
      "Detects a sheet of paper in a photo, corrects its perspective and returns a clean, flat scan.",
    stack: ["C++", "OpenCV"],
    repo: "https://github.com/antoniooodev/document-scanner",
    featured: true,
  },
  {
    slug: "object-detect-cv25",
    title: "Object Detection CV25",
    year: "2025",
    summary: "Object detection system written in C++ on top of OpenCV.",
    stack: ["C++", "OpenCV"],
    repo: "https://github.com/antoniooodev/object-detect-cv25",
  },
  {
    slug: "unipd-presentation",
    title: "Unipd Presentation",
    year: "2025",
    summary:
      "LaTeX template for thesis presentations at the Department of Information Engineering, with the required academic format and handy custom commands.",
    stack: ["LaTeX", "Beamer"],
    repo: "https://github.com/antoniooodev/Unipd_Presentation",
  },
  {
    slug: "savorsound",
    title: "SavorSound",
    year: "2024",
    summary:
      "Browse, explore and control a music library from several sources through a sleek web interface.",
    stack: ["JavaScript", "Node.js"],
    repo: "https://github.com/antoniooodev/SavorSound",
  },
  {
    slug: "klotski",
    title: "Klotski",
    year: "2023",
    summary:
      "Multiplatform Klotski sliding-block puzzle with a built-in solver.",
    stack: ["Java", "LibGDX"],
    repo: "https://github.com/antoniooodev/klotski",
  },
];
