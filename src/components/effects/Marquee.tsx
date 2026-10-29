import type { CSSProperties, ReactNode } from "react";
import styles from "./Marquee.module.css";

type Props = {
  items: { key: string; node: ReactNode }[];
  /** Seconds for one full loop. */
  speed?: number;
  className?: string;
};

/** Endless horizontal strip. The content is duplicated so the loop has no seam. */
export function Marquee({ items, speed = 40, className }: Props) {
  const track = (hidden: boolean) => (
    <ul className={styles.track} aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item.key} className={styles.item}>
          {item.node}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`${styles.marquee} ${className ?? ""}`} style={{ "--speed": `${speed}s` } as CSSProperties}>
      {track(false)}
      {track(true)}
    </div>
  );
}
