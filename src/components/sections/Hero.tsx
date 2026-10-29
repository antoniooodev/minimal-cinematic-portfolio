import { SplitText } from "@/components/effects/SplitText";
import { Clock } from "@/components/layout/Clock";
import { Photo } from "@/components/ui/Photo";
import { photos, profile } from "@/content/site";
import styles from "./Hero.module.css";

// The hero waits for the opening letterbox to part before it animates in.
const delay = (d: number) => ({ "--d": 30 + d }) as React.CSSProperties;

export function Hero() {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section className={`scene-dark ${styles.hero}`} aria-label="Introduction">
      <div className={styles.backdrop}>
        <Photo photo={photos.hero} className={styles.image} priority />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <p className="label" data-reveal style={delay(0)}>
            Sc. 01 — Opening
          </p>
          <p className={`label ${styles.status}`} data-reveal style={delay(1)}>
            {profile.location} / {profile.status}
          </p>
        </div>

        <div className={styles.title}>
          <p className="label" data-reveal style={delay(1)}>
            {profile.role}
          </p>
          <h1 className={`display ${styles.name}`}>
            <SplitText text={first} delay={31} />
            <SplitText text={`*${rest.join(" ")}*`} className={styles.last} delay={33} />
          </h1>
        </div>

        <div className={styles.bottom}>
          <p className={styles.intro} data-reveal style={delay(5)}>
            {profile.intro}
          </p>
          <a href="#work" className={`label link ${styles.cta}`} data-reveal style={delay(6)}>
            Explore work ↓
          </a>
          <p className={`label ${styles.time}`} data-reveal style={delay(7)}>
            Local time <Clock timeZone={profile.timeZone} />
          </p>
        </div>
      </div>
    </section>
  );
}
