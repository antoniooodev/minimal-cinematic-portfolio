import styles from "./EntryList.module.css";

export type Entry = {
  key: string;
  period: string;
  title: string;
  org: string;
  orgUrl?: string;
  meta?: string;
  summary: string;
  highlights: string[];
  note?: string;
  tags?: string[];
};

/** Career or study entries: period on the left, details on the right. */
export function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ol className={`container ${styles.list}`}>
      {entries.map((entry) => (
        <li key={entry.key} className={`row ${styles.entry}`} data-reveal>
          <div className={styles.aside}>
            <p className={styles.period}>{entry.period}</p>
            {entry.meta && <p className="label">{entry.meta}</p>}
          </div>

          <div className={styles.body}>
            <h2 className={`display ${styles.title}`}>{entry.title}</h2>
            <p className={styles.org}>
              {entry.orgUrl ? (
                <a href={entry.orgUrl} target="_blank" rel="noreferrer" className="link-line">
                  {entry.org}
                </a>
              ) : (
                entry.org
              )}
            </p>

            <p className={styles.summary}>{entry.summary}</p>

            {entry.highlights.length > 0 && (
              <ul className={styles.highlights}>
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}

            {entry.note && <p className={`display ${styles.note}`}>{entry.note}</p>}

            {entry.tags && entry.tags.length > 0 && (
              <p className={`label ${styles.tags}`}>{entry.tags.join("  ·  ")}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
