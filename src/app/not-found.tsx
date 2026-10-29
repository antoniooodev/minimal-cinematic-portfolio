import Link from "next/link";
import { SplitText } from "@/components/effects/SplitText";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={`container ${styles.wrap}`}>
      <p className="mono" data-reveal>
        Error 404
      </p>
      <h1 className={styles.title}>
        <SplitText text="Lost in" delay={1} /> <SplitText text="space." className="serif accent" delay={2} />
      </h1>
      <p className={styles.text} data-reveal style={{ "--d": 3 } as React.CSSProperties}>
        The page you are looking for has moved or never existed.
      </p>
      <Link href="/" className={styles.button} data-reveal style={{ "--d": 4 } as React.CSSProperties}>
        Back to home →
      </Link>
    </section>
  );
}
