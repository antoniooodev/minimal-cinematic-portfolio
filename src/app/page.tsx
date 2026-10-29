import Link from "next/link";
import { Counter } from "@/components/effects/Counter";
import { DotField } from "@/components/effects/DotField";
import { Magnetic } from "@/components/effects/Magnetic";
import { Marquee } from "@/components/effects/Marquee";
import { RotatingWords } from "@/components/effects/RotatingWords";
import { ScrollText } from "@/components/effects/ScrollText";
import { SplitText } from "@/components/effects/SplitText";
import { Clock } from "@/components/layout/Clock";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilities, education, experience, profile, projects, skills, stats } from "@/content/site";
import { formatPeriod, pad } from "@/lib/format";
import styles from "./page.module.css";

const delay = (d: number) => ({ "--d": d }) as React.CSSProperties;

export default function HomePage() {
  const [firstName, ...lastName] = profile.name.split(" ");
  const featured = projects.filter((project) => project.featured).slice(0, 4);
  const journey = [
    ...experience.slice(0, 3).map((item) => ({
      period: formatPeriod(item.start, item.end),
      title: item.role,
      org: item.company,
      href: "/experience/",
    })),
    ...education.slice(0, 1).map((item) => ({
      period: formatPeriod(item.start, item.end),
      title: item.degree,
      org: item.school,
      href: "/education/",
    })),
  ];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero}>
        <DotField />
        <div className={`container ${styles.heroInner}`}>
          <p className={`mono ${styles.status}`} data-reveal>
            <span className={styles.pulse} aria-hidden="true" />
            {profile.status}
          </p>

          <h1 className={styles.name}>
            <SplitText text={firstName} className={styles.first} delay={1} />
            <SplitText text={lastName.join(" ")} className={`serif ${styles.last}`} delay={2} />
          </h1>

          <div className={styles.heroBottom}>
            <p className={styles.headline} data-reveal style={delay(5)}>
              I build <RotatingWords words={profile.headline} />
              <br />
              <span className={styles.muted}>for the web.</span>
            </p>

            <div className={styles.heroAside} data-reveal style={delay(6)}>
              <p className={styles.intro}>{profile.intro}</p>
              <div className={styles.ctas}>
                <Magnetic>
                  <Link href="/projects/" className={styles.primary}>
                    View projects <span aria-hidden="true">→</span>
                  </Link>
                </Magnetic>
                <Magnetic>
                  <a href={`mailto:${profile.email}`} className={styles.secondary}>
                    Get in touch
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>

          <dl className={styles.facts} data-reveal style={delay(7)}>
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
            <div className={styles.scroll}>
              <dt className="mono">Scroll</dt>
              <dd aria-hidden="true">
                <span className={styles.scrollLine} />
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ---------- Skills marquee ---------- */}
      <section className={styles.band} aria-label="Skills">
        <Marquee items={skills} speed={45} className={styles.marqueeBig} />
        <Marquee
          items={capabilities.map((c) => c.title)}
          speed={35}
          reverse
          className={`mono ${styles.marqueeSmall}`}
        />
      </section>

      {/* ---------- About ---------- */}
      <section className={`container ${styles.section}`} aria-labelledby="about-title">
        <SectionHeading index="01" label="About" title="A little" accent="about me" />
        <div className={styles.about}>
          <ScrollText text={profile.bio[0]} className={styles.aboutLead} />
          <div className={styles.aboutSide}>
            {profile.bio.slice(1).map((paragraph) => (
              <p key={paragraph} data-reveal>
                {paragraph}
              </p>
            ))}
            {profile.resume && (
              <a href={profile.resume} className="mono link" data-reveal>
                Download résumé ↗
              </a>
            )}
          </div>
        </div>

        <dl className={styles.stats}>
          {stats.map((stat, i) => (
            <div key={stat.label} className={styles.stat} data-reveal style={delay(i)}>
              <dt className={`mono ${styles.statLabel}`}>{stat.label}</dt>
              <dd className={styles.statValue}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Selected work ---------- */}
      <section className={`container ${styles.section}`} aria-labelledby="work-title">
        <SectionHeading
          index="02"
          label="Selected work"
          title="Featured"
          accent="projects"
          action={{ href: "/projects/", label: `All projects (${pad(projects.length)})` }}
        />
        <ul className={styles.work}>
          {featured.map((project, i) => (
            <li key={project.slug} data-reveal style={delay(i % 2)}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Capabilities ---------- */}
      <section className={`container ${styles.section}`} aria-labelledby="services-title">
        <SectionHeading index="03" label="Capabilities" title="What I" accent="do best" />
        <ul className={styles.capabilities}>
          {capabilities.map((capability, i) => (
            <li
              key={capability.title}
              className={`spotlight ${styles.capability}`}
              data-reveal
              style={delay(i)}
            >
              <span className={`serif ${styles.capabilityIndex}`}>{pad(i + 1)}</span>
              <h3 className={styles.capabilityTitle}>{capability.title}</h3>
              <p className={styles.capabilityText}>{capability.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Journey ---------- */}
      <section className={`container ${styles.section}`} aria-labelledby="journey-title">
        <SectionHeading
          index="04"
          label="Journey"
          title="Where I've"
          accent="been"
          action={{ href: "/experience/", label: "Full experience" }}
        />
        <ol className={styles.journey}>
          {journey.map((item, i) => (
            <li key={`${item.org}-${item.title}`} data-reveal style={delay(i)}>
              <Link href={item.href} className={styles.journeyRow}>
                <span className={`mono ${styles.journeyPeriod}`}>{item.period}</span>
                <span className={styles.journeyTitle}>{item.title}</span>
                <span className={`serif ${styles.journeyOrg}`}>{item.org}</span>
                <span className={styles.journeyArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
