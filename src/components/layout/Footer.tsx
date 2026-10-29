import { SplitText } from "@/components/effects/SplitText";
import { profile } from "@/content/site";
import { Clock } from "./Clock";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container row ${styles.contact}`}>
        <p className="label" data-reveal>
          Contact
        </p>
        <div>
          <SplitText as="h2" text="Let's make something *worth keeping.*" className={`display ${styles.title}`} />
          <div className={styles.details}>
            <a href={`mailto:${profile.email}`} className={`link-line ${styles.email}`} data-reveal>
              {profile.email}
            </a>
            <ul className={styles.socials} data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              {profile.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer" className="link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>
          © {year} {profile.name}
        </span>
        <span>
          {profile.location} · <Clock timeZone={profile.timeZone} />
        </span>
        <a href="#top" className="link">
          Back to top
        </a>
      </div>
    </footer>
  );
}
