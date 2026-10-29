import { SplitText } from "@/components/effects/SplitText";
import { Logo } from "@/components/ui/Logo";
import { SceneLabel } from "@/components/ui/SceneLabel";
import { iconEmail } from "@/content/icons";
import { designer, profile } from "@/content/site";
import styles from "./Contact.module.css";
import { Arrow } from "@/components/ui/Arrow";

/** Contact details followed by closing credits, like the end of a film. */
export function Contact() {
  const year = new Date().getFullYear();
  const channels = [
    { label: "Email", href: `mailto:${profile.email}`, handle: profile.email, icon: iconEmail },
    ...profile.links.map((link) => ({
      label: link.label,
      href: link.href,
      handle: link.handle ?? link.label,
      icon: link.icon,
    })),
  ];
  const credits = [
    { role: "Written and developed by", names: [profile.name] },
    { role: "Filmed in", names: [profile.location] },
    { role: "Set in", names: ["Instrument Serif", "Geist"] },
    { role: "Built with", names: ["Next.js", "TypeScript"] },
    { role: "Photography", names: ["Unsplash"] },
  ];

  return (
    <footer id="contact" className={`scene-dark ${styles.contact}`}>
      <div className="container">
        <SceneLabel scene={7} title="Contact" />
        <SplitText as="h2" text="Let's make something *worth keeping.*" className={`display ${styles.title}`} />
        <p className={styles.lede} data-reveal>
          {profile.status}. Based in {profile.location}, working everywhere.
        </p>

        <ul className={styles.channels}>
          {channels.map((channel, i) => (
            <li key={channel.label} data-reveal style={{ "--d": i } as React.CSSProperties}>
              <a
                href={channel.href}
                className={styles.channel}
                {...(channel.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {channel.icon ? (
                  <span className={styles.service}>
                    <Logo icon={channel.icon} className={styles.serviceLogo} />
                    <span className="sr-only">{channel.label}</span>
                  </span>
                ) : (
                  <span className={`label ${styles.service}`}>{channel.label}</span>
                )}
                <span className={`display ${styles.handle}`}>{channel.handle}</span>
                <span className={styles.arrow}>
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.credits}>
          <p className="label" data-reveal>
            Credits
          </p>
          <dl className={styles.roll}>
            {credits.map((credit) => (
              <div key={credit.role} data-reveal>
                <dt>{credit.role}</dt>
                <dd>
                  {credit.names.map((name) => (
                    <span key={name}>{name}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <p className={`display ${styles.end}`} data-reveal>
            <em>Fin.</em>
          </p>
        </div>

        <div className={styles.bottom}>
          <span>
            © {year} {profile.name}
          </span>
          <span className={styles.designer}>
            Designed by{" "}
            <a href={designer.url} target="_blank" rel="noreferrer" className="link">
              {designer.name}
            </a>
          </span>
          <a href="#top" className={`link ${styles.top}`}>
            Back to the opening <Arrow direction="up" />
          </a>
        </div>
      </div>
    </footer>
  );
}
