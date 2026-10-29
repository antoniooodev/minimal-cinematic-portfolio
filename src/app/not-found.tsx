import Link from "next/link";
import { SplitText } from "@/components/effects/SplitText";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={`container row ${styles.wrap}`}>
      <p className="label" data-reveal>
        Error 404
      </p>
      <div>
        <SplitText as="h1" text="This page is *missing.*" className={`display ${styles.title}`} delay={1} />
        <p className={styles.text} data-reveal style={{ "--d": 3 } as React.CSSProperties}>
          It may have moved, or it never existed.{" "}
          <Link href="/" className="link-line">
            Back to home
          </Link>
        </p>
      </div>
    </section>
  );
}
