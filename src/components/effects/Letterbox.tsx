import { profile } from "@/content/site";
import styles from "./Letterbox.module.css";

/**
 * Opening shot: two black bars cover the screen with a short title card,
 * then slide apart to reveal the page. Pure CSS, played once per load and
 * skipped without JavaScript or with reduced motion.
 */
export function Letterbox() {
  return (
    <div className={styles.letterbox} aria-hidden="true">
      <div className={`${styles.bar} ${styles.top}`} />
      <div className={`${styles.bar} ${styles.bottom}`} />
      <p className={styles.card}>
        <span className="label">A film by</span>
        <span className={styles.name}>{profile.name}</span>
      </p>
    </div>
  );
}
