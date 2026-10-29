import type { Metadata } from "next";
import { EntryList } from "@/components/ui/EntryList";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { certifications, education } from "@/content/site";
import { formatPeriod } from "@/lib/format";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Education",
  description: "Degrees, schools and certifications.",
};

export default function EducationPage() {
  return (
    <>
      <PageHeader
        label="Education"
        title="Study & *practice*"
        lede="The degrees and certifications behind my work, and what I focused on along the way."
      />

      <EntryList
        entries={education.map((item) => ({
          key: `${item.school}-${item.degree}`,
          period: formatPeriod(item.start, item.end),
          meta: item.location,
          title: item.degree,
          org: item.school,
          orgUrl: item.schoolUrl,
          summary: item.summary,
          highlights: item.highlights,
          note: item.note,
        }))}
      />

      {certifications.length > 0 && (
        <Section label="Certifications">
          <ul className={styles.list}>
            {certifications.map((certification, i) => (
              <li key={certification.title} data-reveal style={{ "--d": i } as React.CSSProperties}>
                <a
                  href={certification.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.row}
                >
                  <span className={styles.year}>{certification.year}</span>
                  <span className={`display ${styles.title}`}>{certification.title}</span>
                  <span className={styles.issuer}>
                    {certification.issuer} <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
