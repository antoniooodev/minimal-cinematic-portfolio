import { profile } from "@/content/site";
import { Clock } from "./Clock";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  const contactHref = profile.email ? `mailto:${profile.email}` : profile.links[0].href;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.cta}>
          Have an idea worth building?{" "}
          <a href={contactHref} className={`serif ${styles.ctaLink}`}>
            Let&apos;s talk.
          </a>
        </p>

        <div className={styles.meta}>
          <span className="mono">
            © {year} {profile.name}
          </span>
          <span className={`mono ${styles.location}`}>
            {profile.location} · <Clock timeZone={profile.timeZone} />
          </span>
          <ul className={styles.links}>
            {profile.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="mono link" target="_blank" rel="noreferrer">
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
