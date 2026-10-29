import styles from "./PageHeader.module.css";

type Props = {
  index: string;
  title: string;
  /** Word rendered in the italic serif, appended to the title. */
  accent?: string;
  lede: string;
  count?: number;
};

export function PageHeader({ index, title, accent, lede, count }: Props) {
  return (
    <header className={`container ${styles.header}`}>
      <p className={`mono reveal ${styles.eyebrow}`} style={{ "--i": 0 } as React.CSSProperties}>
        <span className={styles.index}>{index}</span>
        <span className={styles.rule} aria-hidden="true" />
        {count !== undefined && <span>{count} entries</span>}
      </p>
      <h1 className={`reveal ${styles.title}`} style={{ "--i": 1 } as React.CSSProperties}>
        {title}
        {accent && (
          <>
            {" "}
            <span className="serif">{accent}</span>
          </>
        )}
      </h1>
      <p className={`reveal ${styles.lede}`} style={{ "--i": 2 } as React.CSSProperties}>
        {lede}
      </p>
    </header>
  );
}
