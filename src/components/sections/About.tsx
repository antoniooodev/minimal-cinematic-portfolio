import { Parallax } from "@/components/effects/Parallax";
import { SplitText } from "@/components/effects/SplitText";
import { Photo } from "@/components/ui/Photo";
import { SceneLabel } from "@/components/ui/SceneLabel";
import { about, photos, principles, profile } from "@/content/site";
import { asset, pad } from "@/lib/format";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={`scene-light ${styles.about}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.text}>
          <SceneLabel scene={2} title="About" />
          <SplitText as="h2" text={about.title} className={`display ${styles.title}`} />

          <div className={styles.details}>
            <div className={styles.body} data-reveal>
              {about.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {profile.resume && (
                <a href={asset(profile.resume)} className={`label link ${styles.resume}`}>
                  Download résumé ↗
                </a>
              )}
            </div>

            <ol className={styles.principles}>
              {principles.map((point, i) => (
                <li key={point.title} data-reveal style={{ "--d": i + 1 } as React.CSSProperties}>
                  <span className={`display ${styles.number}`}>{pad(i + 1)}</span>
                  <h3 className={styles.pointTitle}>{point.title}</h3>
                  <p className={styles.pointText}>{point.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <figure className={styles.figure}>
          <div className={styles.frame} data-reveal="clip">
            <Parallax speed={-0.08} className={styles.parallax}>
              <Photo photo={photos.about} className={styles.image} />
            </Parallax>
          </div>
          <figcaption className="label">Still 02 — Behind the work</figcaption>
        </figure>
      </div>
    </section>
  );
}
