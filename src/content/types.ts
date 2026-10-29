/** A single-colour logo drawn on a 24×24 grid, as provided by Simple Icons. */
export type Icon = {
  title: string;
  path: string;
};

export type Link = {
  label: string;
  href: string;
  /** Text shown in the contact list, e.g. "github.com/username". */
  handle?: string;
  /** Logo of the service, shown in the contact list instead of the label. */
  icon?: Icon;
};

export type Photo = {
  /** Path inside /public, e.g. "/images/hero.jpg". */
  src: string;
  alt: string;
  /** CSS object-position, to keep the subject in frame when cropped. */
  position?: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  /** IANA time zone used by the live clock, e.g. "Europe/Lisbon". */
  timeZone: string;
  /** Short line shown in the hero next to the location. */
  status: string;
  /** One-line pitch under the name. */
  intro: string;
  email: string;
  /** Optional link to a CV, relative to /public (e.g. "/resume.pdf") or absolute. */
  resume?: string;
  links: Link[];
};

/** Statement plus supporting text. Words wrapped in *asterisks* are set in the italic accent. */
export type Statement = {
  title: string;
  body: string[];
};

/** A technology shown as a logo in the skills band. Icons come from Simple Icons. */
export type Skill = {
  name: string;
  icon: Icon;
};

export type Point = {
  title: string;
  text: string;
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
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  url?: string;
};

export type CoverTone = "crimson" | "cocoa" | "sand" | "espresso";

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  stack: string[];
  /** Screenshot or photo for featured projects. Without one, a tone is used as backdrop. */
  image?: Photo;
  tone?: CoverTone;
  repo?: string;
  url?: string;
  /** Featured projects get the large sticky showcase; the others go in the archive. */
  featured?: boolean;
};
