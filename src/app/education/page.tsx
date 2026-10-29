import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/ui/Timeline";
import { certifications, education } from "@/content/site";
import { formatPeriod, pad } from "@/lib/format";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Education",
  description: "Degrees, schools and certifications.",
};

export default function EducationPage() {
  return (
    <>
      <PageHeader
        index="02"
        label="Education"
        title="Learning"
        accent="never stops"
        lede="The degrees and certifications behind my work, and what I focused on along the way."
        meta={[
          { label: "Degrees", value: pad(education.length) },
          { label: "Certifications", value: pad(certifications.length) },
        ]}
      />

      <Timeline
        items={education.map((item) => ({
          key: `${item.school}-${item.degree}`,
          period: formatPeriod(item.start, item.end),
          title: item.degree,
          org: item.school,
          orgUrl: item.schoolUrl,
          location: item.location,
          summary: item.summary,
          highlights: item.highlights,
          note: item.note,
        }))}
      />

      {certifications.length > 0 && (
        <section className={`container ${styles.section}`} aria-labelledby="certifications-title">
          <SectionHeading index="03" label="Certifications" title="Certified" accent="skills" />
          <ul className={styles.grid}>
            {certifications.map((certification, i) => (
              <li key={certification.title} data-reveal style={{ "--d": i } as React.CSSProperties}>
                <a
                  href={certification.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`spotlight ${styles.card}`}
                >
                  <span className={styles.top}>
                    <span className={styles.seal} aria-hidden="true">
                      ✦
                    </span>
                    <span className="mono">{certification.year}</span>
                  </span>
                  <span className={styles.title}>{certification.title}</span>
                  <span className={`serif ${styles.issuer}`}>{certification.issuer}</span>
                  <span className={`mono ${styles.verify}`}>
                    Verify credential <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
