import { Parallax } from "@/components/effects/Parallax";
import { ScrollText } from "@/components/effects/ScrollText";
import { Photo } from "@/components/ui/Photo";
import { SceneLabel } from "@/components/ui/SceneLabel";
import { manifesto, photos } from "@/content/site";
import styles from "./Manifesto.module.css";

export function Manifesto() {
  return (
    <section className={`scene-dark ${styles.manifesto}`} aria-label="Manifesto">
      <div className="container">
        <SceneLabel scene={3} title="Manifesto" />
        <ScrollText text={manifesto.title} className={`display ${styles.statement}`} />

        <div className={styles.grid}>
          <figure className={styles.figure}>
            <div className={styles.frame} data-reveal="clip">
              <Parallax speed={-0.1} className={styles.parallax}>
                <Photo photo={photos.manifesto} className={styles.image} />
              </Parallax>
            </div>
            <figcaption className="label">Still 03 — The quiet part</figcaption>
          </figure>

          <div className={styles.body}>
            {manifesto.body.map((paragraph, i) => (
              <p key={paragraph} data-reveal style={{ "--d": i } as React.CSSProperties}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
