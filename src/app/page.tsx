import Link from "next/link";
import { SplitText } from "@/components/effects/SplitText";
import { Clock } from "@/components/layout/Clock";
import { ProjectList } from "@/components/ui/ProjectList";
import { Section } from "@/components/ui/Section";
import { education, experience, profile, projects, toolbox } from "@/content/site";
import { formatPeriod } from "@/lib/format";
import styles from "./page.module.css";

const delay = (d: number) => ({ "--d": d }) as React.CSSProperties;

export default function HomePage() {
  const featured = projects.filter((project) => project.featured);
  const career = [
    ...experience.slice(0, 3).map((item) => ({
      period: formatPeriod(item.start, item.end),
      title: item.role,
      org: item.company,
    })),
    ...education.slice(0, 1).map((item) => ({
      period: formatPeriod(item.start, item.end),
      title: item.degree,
      org: item.school,
    })),
  ];

  return (
    <>
      <section className={`container ${styles.hero}`}>
        <p className={`label ${styles.intro}`} data-reveal>
          {profile.available && <span className={styles.dot} aria-hidden="true" />}
          {profile.status}
        </p>

        <SplitText as="h1" text={profile.headline} className={`display ${styles.headline}`} delay={1} />

        <div className={`row ${styles.heroFoot}`}>
          <dl className={styles.facts} data-reveal style={delay(6)}>
            <div>
              <dt className="label">Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt className="label">Local time</dt>
              <dd>
                <Clock timeZone={profile.timeZone} />
              </dd>
            </div>
          </dl>
          <div className={styles.lede} data-reveal style={delay(7)}>
            <p>{profile.intro}</p>
            <p className={styles.ctas}>
              <Link href="/projects/" className="link-line">
                Selected work
              </Link>
              <a href={`mailto:${profile.email}`} className="link-line">
                Get in touch
              </a>
            </p>
          </div>
        </div>
      </section>

      <Section label="Selected work" action={{ href: "/projects/", label: "All projects" }}>
        <ProjectList projects={featured} />
      </Section>

      <Section label="About">
        <div className={styles.about}>
          {profile.bio.map((paragraph, i) => (
            <p key={paragraph} data-reveal style={delay(i)} className={i === 0 ? styles.aboutLead : undefined}>
              {paragraph}
            </p>
          ))}
        </div>
        <dl className={styles.toolbox}>
          {toolbox.slice(0, 3).map((group, i) => (
            <div key={group.group} data-reveal style={delay(i)}>
              <dt className="label">{group.group}</dt>
              <dd>{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section label="Experience" action={{ href: "/experience/", label: "Full experience" }}>
        <ol className={styles.career}>
          {career.map((item, i) => (
            <li key={`${item.org}-${item.title}`} className={styles.careerRow} data-reveal style={delay(i)}>
              <span className={styles.careerPeriod}>{item.period}</span>
              <span className={`display ${styles.careerTitle}`}>{item.title}</span>
              <span className={styles.careerOrg}>{item.org}</span>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
