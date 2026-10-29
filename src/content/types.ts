export type Link = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  /** IANA time zone used by the live clock, e.g. "Europe/Rome". */
  timeZone: string;
  /** Short line shown next to the green status dot. */
  status: string;
  intro: string;
  bio: string[];
  email?: string;
  links: Link[];
};

export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
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
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  stack: string[];
  repo?: string;
  url?: string;
  featured?: boolean;
};
