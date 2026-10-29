import { Marquee } from "@/components/effects/Marquee";
import { skills } from "@/content/site";
import styles from "./SkillsBand.module.css";

/** Crimson band with the stack scrolling by, between two dark scenes. */
export function SkillsBand() {
  return (
    <section className={styles.band} aria-label="Skills">
      <h2 className="sr-only">Skills</h2>
      <Marquee items={skills} speed={50} className={styles.marquee} />
    </section>
  );
}
