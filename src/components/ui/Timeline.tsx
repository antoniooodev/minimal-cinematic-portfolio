import { initials } from "@/lib/format";
import { TimelineProgress } from "./TimelineProgress";
import styles from "./Timeline.module.css";

export type TimelineItem = {
  key: string;
  period: string;
  title: string;
  org: string;
  orgUrl?: string;
  badge?: string;
  location: string;
  summary: string;
  highlights: string[];
  note?: string;
  tags?: string[];
};

/** Vertical timeline whose line fills in as the visitor scrolls through it. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <TimelineProgress className={`container ${styles.timeline}`}>
      <ol className={styles.list}>
        {items.map((item) => (
          <li key={item.key} className={styles.item} data-reveal>
            <div className={styles.aside}>
              <span className={styles.node} aria-hidden="true" />
              <p className={`mono ${styles.period}`}>{item.period}</p>
              <p className={`mono ${styles.location}`}>{item.location}</p>
            </div>

            <article className={`spotlight ${styles.card}`}>
              <header className={styles.head}>
                <span className={styles.logo} aria-hidden="true">
                  {initials(item.org)}
                </span>
                <div>
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
                </div>
                {item.badge && <span className={`mono ${styles.badge}`}>{item.badge}</span>}
              </header>

              <p className={styles.summary}>{item.summary}</p>

              {item.highlights.length > 0 && (
                <ul className={styles.highlights}>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}

              {item.note && <p className={`serif ${styles.note}`}>{item.note}</p>}

              {item.tags && item.tags.length > 0 && (
                <ul className={styles.tags} aria-label="Technologies">
                  {item.tags.map((tag) => (
                    <li key={tag} className="mono">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>
    </TimelineProgress>
  );
}
