import Link from "next/link";
import { Clock } from "@/components/Clock";
import { education, experience, profile, projects } from "@/content/site";
import { formatPeriod, pad } from "@/lib/format";
import styles from "./page.module.css";

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function HomePage() {
  const [firstName, ...rest] = profile.name.split(" ");
  const featured = projects.filter((project) => project.featured);

  const sections = [
    {
      href: "/experience/",
      label: "Experience",
      count: experience.length,
      latest: `${experience[0].role}, ${formatPeriod(experience[0].start, experience[0].end)}`,
    },
    {
      href: "/education/",
      label: "Education",
      count: education.length,
      latest: `${education[0].degree}, ${education[0].school}`,
    },
    {
      href: "/projects/",
      label: "Projects",
      count: projects.length,
      latest: `${projects[0].title}, ${projects[0].year}`,
    },
  ];

  return (
    <>
      <section className={`container ${styles.hero}`}>
        <p className={`mono reveal ${styles.status}`} style={delay(0)}>
          <span className={styles.dot} aria-hidden="true" />
          {profile.status}
        </p>

        <h1 className={styles.name}>
          <span className="reveal" style={delay(1)}>
            {firstName}
          </span>
          <span className={`serif reveal ${styles.surname}`} style={delay(2)}>
            {rest.join(" ")}
          </span>
        </h1>

        <div className={styles.intro}>
          <dl className={`reveal ${styles.facts}`} style={delay(3)}>
            <div>
              <dt className="mono">Role</dt>
              <dd>{profile.role}</dd>
            </div>
            <div>
              <dt className="mono">Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt className="mono">Local time</dt>
              <dd>
                <Clock timeZone={profile.timeZone} />
              </dd>
            </div>
          </dl>
          <p className={`reveal ${styles.lede}`} style={delay(4)}>
            {profile.intro}
          </p>
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="index-title">
        <h2 id="index-title" className={`mono reveal ${styles.label}`} style={delay(5)}>
          Index
        </h2>
        <ol className={styles.index}>
          {sections.map((section, i) => (
            <li key={section.href} className="reveal" style={delay(6 + i)}>
              <Link href={section.href} className={styles.indexRow}>
                <span className={`mono ${styles.indexNumber}`}>{pad(i + 1)}</span>
                <span className={styles.indexLabel}>{section.label}</span>
                <span className={styles.indexLatest}>{section.latest}</span>
                <span className={`mono ${styles.indexCount}`}>({pad(section.count)})</span>
                <span className={styles.indexArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="featured-title">
        <div className={styles.sectionHead}>
          <h2 id="featured-title" className={`mono ${styles.label}`}>
            Featured work
          </h2>
          <Link href="/projects/" className="mono link">
            All projects →
          </Link>
        </div>
        <ul className={styles.cards}>
          {featured.map((project, i) => (
            <li key={project.slug}>
              <a
                href={project.url ?? project.repo}
                className={styles.card}
                target="_blank"
                rel="noreferrer"
              >
                <span className={`mono ${styles.cardMeta}`}>
                  <span>{pad(i + 1)}</span>
                  <span>{project.year}</span>
                </span>
                <span className={styles.cardTitle}>{project.title}</span>
                <span className={styles.cardSummary}>{project.summary}</span>
                <span className={`mono ${styles.cardStack}`}>{project.stack.slice(0, 3).join(" · ")}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${styles.section} ${styles.about}`} aria-labelledby="about-title">
        <h2 id="about-title" className={`mono ${styles.label}`}>
          About
        </h2>
        <div className={styles.bio}>
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
