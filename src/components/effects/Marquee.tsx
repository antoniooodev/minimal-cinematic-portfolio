import type { CSSProperties, ReactNode } from "react";
import styles from "./Marquee.module.css";

type Props = {
  items: ReactNode[];
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
  className?: string;
};

/** Endless horizontal strip. The content is duplicated so the loop has no seam. */
export function Marquee({ items, speed = 40, reverse = false, className }: Props) {
  const track = (hidden: boolean) => (
    <ul className={styles.track} aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className={styles.item}>
          {item}
          <span className={styles.separator} aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`${styles.marquee} ${reverse ? styles.reverse : ""} ${className ?? ""}`}
      style={{ "--speed": `${speed}s` } as CSSProperties}
    >
      {track(false)}
      {track(true)}
    </div>
  );
}
