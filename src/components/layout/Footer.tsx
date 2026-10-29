import { Magnetic } from "@/components/effects/Magnetic";
import { SplitText } from "@/components/effects/SplitText";
import { profile } from "@/content/site";
import { Clock } from "./Clock";
import { CopyEmail } from "./CopyEmail";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.cta}`}>
        <p className={`mono ${styles.eyebrow}`} data-reveal>
          <span className={styles.dot} aria-hidden="true" />
          {profile.status}
        </p>
        <h2 className={styles.title}>
          <SplitText text="Let's build something" />{" "}
          <SplitText text="together." className="serif accent" delay={3} />
        </h2>

        <div className={styles.actions} data-reveal style={{ "--d": 4 } as React.CSSProperties}>
          <Magnetic>
            <a href={`mailto:${profile.email}`} className={styles.button} data-cursor="Say hi">
              {profile.email}
              <span aria-hidden="true">↗</span>
            </a>
          </Magnetic>
          <CopyEmail email={profile.email} />
        </div>
      </div>

      <div className={`container ${styles.grid}`}>
        <div data-reveal>
          <p className={`mono ${styles.label}`}>Socials</p>
          <ul className={styles.socials}>
            {profile.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer" className={styles.social}>
                  <span>{link.label}</span>
                  <span className={`mono ${styles.handle}`}>{link.handle} ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          <p className={`mono ${styles.label}`}>Local time</p>
          <p className={styles.big}>
            <Clock timeZone={profile.timeZone} />
          </p>
          <p className={styles.muted}>{profile.location}</p>
        </div>

        <div data-reveal style={{ "--d": 2 } as React.CSSProperties}>
          <p className={`mono ${styles.label}`}>Credits</p>
          <p className={styles.big}>© {year}</p>
          <p className={styles.muted}>{profile.name}. All rights reserved.</p>
          <a href="#top" className={`mono link ${styles.top}`}>
            Back to top ↑
          </a>
        </div>
      </div>

      <div className={styles.wordmark} aria-hidden="true">
        <span>{profile.name}</span>
      </div>
    </footer>
  );
}
