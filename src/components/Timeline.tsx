import styles from "./Timeline.module.css";

export type TimelineItem = {
  key: string;
  period: string;
  title: string;
  org: string;
  orgUrl?: string;
  location: string;
  summary: string;
  highlights: string[];
  tags?: string[];
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className={`container ${styles.list}`}>
      {items.map((item, index) => (
        <li
          key={item.key}
          className={`reveal ${styles.item}`}
          style={{ "--i": index + 3 } as React.CSSProperties}
        >
          <div className={styles.aside}>
            <p className="mono">{item.period}</p>
            <p className={`mono ${styles.location}`}>{item.location}</p>
          </div>

          <div className={styles.body}>
            <h2 className={styles.title}>{item.title}</h2>
            <p className={styles.org}>
              {item.orgUrl ? (
                <a href={item.orgUrl} className="serif link" target="_blank" rel="noreferrer">
                  {item.org}
                </a>
              ) : (
                <span className="serif">{item.org}</span>
              )}
            </p>
            <p className={styles.summary}>{item.summary}</p>

            {item.highlights.length > 0 && (
              <ul className={styles.highlights}>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}

            {item.tags && item.tags.length > 0 && (
              <ul className={styles.tags} aria-label="Technologies">
                {item.tags.map((tag) => (
                  <li key={tag} className="mono">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
