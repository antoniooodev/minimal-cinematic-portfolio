import { Parallax } from "@/components/effects/Parallax";
import { SplitText } from "@/components/effects/SplitText";
import { Photo } from "@/components/ui/Photo";
import { SceneLabel } from "@/components/ui/SceneLabel";
import { photos, process } from "@/content/site";
import { pad } from "@/lib/format";
import styles from "./Craft.module.css";

/** Full-bleed photo with the working process laid over it. */
export function Craft() {
  return (
    <section className={`scene-dark ${styles.craft}`} aria-label="Process">
      <div className={styles.backdrop} aria-hidden="true">
        <Parallax speed={-0.15} className={styles.parallax}>
          <Photo photo={photos.craft} className={styles.image} />
        </Parallax>
      </div>

      <div className={`container ${styles.inner}`}>
        <SceneLabel scene={6} title="Process" />
        <SplitText as="h2" text="Every frame *matters.*" className={`display ${styles.title}`} />
        <p className={styles.lede} data-reveal>
          From the first conversation to the last pixel, the same care goes into structure, motion and speed.
        </p>

        <ol className={styles.steps}>
          {process.map((step, i) => (
            <li key={step.title} data-reveal style={{ "--d": i } as React.CSSProperties}>
              <span className="label">{pad(i + 1)}</span>
              <h3 className={`display ${styles.stepTitle}`}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
