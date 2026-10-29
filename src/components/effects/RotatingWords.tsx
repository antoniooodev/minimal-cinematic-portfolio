"use client";

import { useEffect, useState } from "react";
import styles from "./RotatingWords.module.css";

/** Cycles through a list of words with a vertical slide. */
export function RotatingWords({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={styles.wrap}>
      <span className="sr-only">{words.join(", ")}</span>
      <span className={styles.stack} aria-hidden="true">
        {words.map((word, i) => (
          <span
            key={word}
            className={styles.word}
            data-state={i === active ? "active" : i === (active - 1 + words.length) % words.length ? "leaving" : "idle"}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
