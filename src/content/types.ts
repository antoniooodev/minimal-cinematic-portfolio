export type Link = {
  label: string;
  href: string;
  /** Short handle shown next to the label, e.g. "@username". */
  handle?: string;
};

export type Profile = {
  name: string;
  role: string;
  /** Words that rotate in the hero headline: "I build {word}". */
  headline: string[];
  location: string;
  /** IANA time zone used by the live clock, e.g. "Europe/Lisbon". */
  timeZone: string;
  /** Short line shown next to the status dot. */
  status: string;
  available: boolean;
  intro: string;
  bio: string[];
  email: string;
  /** Optional link to a CV, relative to /public (e.g. "/resume.pdf") or absolute. */
  resume?: string;
  links: Link[];
};

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export type Capability = {
  title: string;
  description: string;
};

export type ToolGroup = {
  group: string;
  items: string[];
};

export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  type: string;
  location: string;
  start: string;
  /** Leave empty for an ongoing position. */
  end?: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type Education = {
  degree: string;
  school: string;
  schoolUrl?: string;
  location: string;
  start: string;
  end?: string;
  summary: string;
  highlights: string[];
  /** Extra detail such as a grade or thesis title. */
  note?: string;
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  url?: string;
};

export type CoverPattern = "grid" | "rings" | "waves" | "bars" | "dots";

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  stack: string[];
  /** Colours and pattern of the generated cover, used when no image is set. */
  cover: { from: string; to: string; pattern: CoverPattern };
  /** Optional cover image, relative to /public (e.g. "/projects/lumen.jpg"). */
  image?: string;
  repo?: string;
  url?: string;
  featured?: boolean;
};
