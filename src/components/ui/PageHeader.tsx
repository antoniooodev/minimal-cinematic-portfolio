import { SplitText } from "@/components/effects/SplitText";
import styles from "./PageHeader.module.css";

type Props = {
  index: string;
  label: string;
  title: string;
  /** Word rendered in the italic serif after the title. */
  accent?: string;
  lede: string;
  meta?: { label: string; value: string }[];
};

export function PageHeader({ index, label, title, accent, lede, meta = [] }: Props) {
  return (
    <header className={`container ${styles.header}`}>
      <p className={`mono ${styles.eyebrow}`} data-reveal>
        <span className={styles.index}>{index}</span>
        <span className={styles.rule} aria-hidden="true" />
        <span>{label}</span>
      </p>

      <h1 className={styles.title}>
        <SplitText text={title} delay={1} />
        {accent && (
          <>
            {" "}
            <SplitText text={accent} className="serif" delay={3} />
          </>
        )}
      </h1>

      <div className={styles.bottom}>
        <p className={styles.lede} data-reveal style={{ "--d": 4 } as React.CSSProperties}>
          {lede}
        </p>
        {meta.length > 0 && (
          <dl className={styles.meta}>
            {meta.map((item, i) => (
              <div key={item.label} data-reveal style={{ "--d": 5 + i } as React.CSSProperties}>
                <dt className="mono">{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}
