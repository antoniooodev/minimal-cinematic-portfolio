import { Marquee } from "@/components/effects/Marquee";
import { Logo } from "@/components/ui/Logo";
import { skills } from "@/content/site";
import styles from "./SkillsBand.module.css";

/** Crimson band with the logos of the stack scrolling by, between two dark scenes. */
export function SkillsBand() {
  return (
    <section className={styles.band} aria-labelledby="skills-title">
      <h2 id="skills-title" className="sr-only">
        Skills: {skills.map((skill) => skill.name).join(", ")}
      </h2>
      <Marquee
        speed={40}
        className={styles.marquee}
        items={skills.map((skill) => ({
          key: skill.name,
          node: <Logo icon={skill.icon} className={styles.logo} />,
        }))}
      />
    </section>
  );
}
