import { SplitText } from "@/components/effects/SplitText";
import { asset } from "@/lib/format";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main id="content" className={`scene-dark ${styles.wrap}`}>
      <div className="container">
        <p className="label" data-reveal>
          Error 404 — Scene not found
        </p>
        <SplitText as="h1" text="This scene was *cut.*" className={`display ${styles.title}`} delay={1} />
        <p className={styles.text} data-reveal style={{ "--d": 3 } as React.CSSProperties}>
          The page you are looking for has moved or never existed.{" "}
          <a href={asset("/")} className="link">
            Back to the opening
          </a>
        </p>
      </div>
    </main>
  );
}
