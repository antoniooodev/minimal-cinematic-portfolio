import type { Metadata } from "next";
import { Marquee } from "@/components/effects/Marquee";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/ui/Timeline";
import { experience, skills, toolbox } from "@/content/site";
import { formatPeriod } from "@/lib/format";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work experience, roles and the tools used along the way.",
};

export default function ExperiencePage() {
  const firstYear = Math.min(...experience.map((item) => Number(item.start)));
  const companies = new Set(experience.map((item) => item.company)).size;

  return (
    <>
      <PageHeader
        index="01"
        label="Experience"
        title="Work"
        accent="experience"
        lede="Where I have worked, what I was responsible for and the tools I used to get it done."
        meta={[
          { label: "Since", value: String(firstYear) },
          { label: "Companies", value: String(companies) },
          { label: "Roles", value: String(experience.length) },
        ]}
      />

      <Timeline
        items={experience.map((item) => ({
          key: `${item.company}-${item.role}`,
          period: formatPeriod(item.start, item.end),
          title: item.role,
          org: item.company,
          orgUrl: item.companyUrl,
          badge: item.type,
          location: item.location,
          summary: item.summary,
          highlights: item.highlights,
          tags: item.stack,
        }))}
      />

      <section className={`container ${styles.section}`} aria-labelledby="toolbox-title">
        <SectionHeading index="02" label="Toolbox" title="Tools I" accent="rely on" />
        <dl className={styles.toolbox}>
          {toolbox.map((group, i) => (
            <div
              key={group.group}
              className={styles.group}
              data-reveal
              style={{ "--d": i } as React.CSSProperties}
            >
              <dt className="mono">{group.group}</dt>
              <dd>
                <ul className={styles.tools}>
                  {group.items.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className={styles.band} aria-hidden="true">
        <Marquee items={skills} speed={50} reverse className={styles.marquee} />
      </div>
    </>
  );
}
