import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Section.module.css";

type Props = {
  label: string;
  children: ReactNode;
  action?: { href: string; label: string };
  id?: string;
};

/** A labelled block of the page: label on the left, content on the right. */
export function Section({ label, children, action, id }: Props) {
  return (
    <section id={id} className={`container row ${styles.section}`} aria-label={label}>
      <div className={styles.aside}>
        <h2 className="label" data-reveal>
          {label}
        </h2>
        {action && (
          <Link href={action.href} className={`link ${styles.action}`} data-reveal>
            {action.label} →
          </Link>
        )}
      </div>
      <div>{children}</div>
    </section>
  );
}
