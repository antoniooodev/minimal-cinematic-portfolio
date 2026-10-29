import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={`container ${styles.wrap}`}>
      <p className="mono reveal">Error 404</p>
      <h1 className={`reveal ${styles.title}`} style={{ "--i": 1 } as React.CSSProperties}>
        Nothing <span className="serif">here.</span>
      </h1>
      <p className={`reveal ${styles.text}`} style={{ "--i": 2 } as React.CSSProperties}>
        The page you are looking for has moved or never existed.{" "}
        <Link href="/" className="link">
          Back to the index →
        </Link>
      </p>
    </section>
  );
}
