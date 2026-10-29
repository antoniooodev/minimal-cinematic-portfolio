import { SplitText } from "@/components/effects/SplitText";
import { SceneLabel } from "@/components/ui/SceneLabel";
import { certifications, education, experience } from "@/content/site";
import { formatPeriod } from "@/lib/format";
import styles from "./Career.module.css";

type Row = {
  key: string;
  period: string;
  title: string;
  org: string;
  orgUrl?: string;
  meta: string;
  text: string;
};

function Rows({ rows }: { rows: Row[] }) {
  return (
    <ol className={styles.rows}>
      {rows.map((row, i) => (
        <li key={row.key} className={styles.row} data-reveal style={{ "--d": i % 4 } as React.CSSProperties}>
          <p className={styles.period}>{row.period}</p>
          <div>
            <h3 className={`display ${styles.rowTitle}`}>{row.title}</h3>
            <p className={styles.org}>
              {row.orgUrl ? (
                <a href={row.orgUrl} target="_blank" rel="noreferrer" className="link">
                  {row.org}
                </a>
              ) : (
                row.org
              )}
            </p>
          </div>
          <div className={styles.detail}>
            <p>{row.text}</p>
            <p className="label">{row.meta}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Experience, education and certifications, in one ivory scene. */
export function Career() {
  return (
    <section id="experience" className={`scene-light ${styles.career}`}>
      <div className="container">
        <SceneLabel scene={5} title="Experience" />
        <SplitText as="h2" text="The *story* so far" className={`display ${styles.title}`} />

        <Rows
          rows={experience.map((item) => ({
            key: `${item.company}-${item.role}`,
            period: formatPeriod(item.start, item.end),
            title: item.role,
            org: item.company,
            orgUrl: item.companyUrl,
            meta: `${item.type} · ${item.location} · ${item.stack.join(", ")}`,
            text: item.summary,
          }))}
        />

        <div className={styles.split}>
          <div>
            <h3 className={`label ${styles.subhead}`} data-reveal>
              Education
            </h3>
            <ul className={styles.compact}>
              {education.map((item) => (
                <li key={item.degree} data-reveal>
                  <span className={styles.period}>{formatPeriod(item.start, item.end)}</span>
                  <span className={`display ${styles.compactTitle}`}>{item.degree}</span>
                  <span className={styles.org}>
                    {item.school}, {item.location}
                  </span>
                  <span className={styles.compactText}>{item.summary}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`label ${styles.subhead}`} data-reveal>
              Certifications
            </h3>
            <ul className={styles.compact}>
              {certifications.map((item) => (
                <li key={item.title} data-reveal>
                  <span className={styles.period}>{item.year}</span>
                  <a href={item.url} target="_blank" rel="noreferrer" className={`display ${styles.compactTitle} ${styles.cert}`}>
                    {item.title} <span aria-hidden="true">↗</span>
                  </a>
                  <span className={styles.org}>{item.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
