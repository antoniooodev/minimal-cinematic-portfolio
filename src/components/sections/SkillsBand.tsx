import { Marquee } from "@/components/effects/Marquee";
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
        items={skills.map((skill) => ({
          key: skill.name,
          node: (
            <svg className={styles.logo} viewBox="0 0 24 24" aria-hidden="true">
              <title>{skill.name}</title>
              <path d={skill.icon.path} />
            </svg>
          ),
        }))}
      />
    </section>
  );
}
