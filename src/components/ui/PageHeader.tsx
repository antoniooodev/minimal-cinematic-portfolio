import { SplitText } from "@/components/effects/SplitText";
import styles from "./PageHeader.module.css";

type Props = {
  label: string;
  /** Words wrapped in *asterisks* are set in the italic accent. */
  title: string;
  lede: string;
};

export function PageHeader({ label, title, lede }: Props) {
  return (
    <header className={`container row ${styles.header}`}>
      <p className="label" data-reveal>
        {label}
      </p>
      <div>
        <SplitText as="h1" text={title} className={`display ${styles.title}`} delay={1} />
        <p className={styles.lede} data-reveal style={{ "--d": 4 } as React.CSSProperties}>
          {lede}
        </p>
      </div>
    </header>
  );
}
