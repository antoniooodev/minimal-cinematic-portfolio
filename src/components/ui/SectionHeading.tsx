import Link from "next/link";
import { SplitText } from "@/components/effects/SplitText";
import styles from "./SectionHeading.module.css";

type Props = {
  index: string;
  label: string;
  title: string;
  accent?: string;
  action?: { href: string; label: string };
};

export function SectionHeading({ index, label, title, accent, action }: Props) {
  return (
    <div className={styles.heading}>
      <p className={`mono ${styles.eyebrow}`} data-reveal>
        <span className={styles.index}>{index}</span>
        <span>{label}</span>
      </p>
      <h2 className={styles.title}>
        <SplitText text={title} />
        {accent && (
          <>
            {" "}
            <SplitText text={accent} className="serif" delay={2} />
          </>
        )}
      </h2>
      {action && (
        <Link href={action.href} className={`mono ${styles.action}`} data-reveal>
          <span className="link">{action.label}</span> →
        </Link>
      )}
    </div>
  );
}
