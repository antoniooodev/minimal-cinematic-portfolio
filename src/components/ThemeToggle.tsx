"use client";

import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies.
    }
  };

  return (
    <button type="button" className={styles.toggle} onClick={toggle} aria-label="Toggle colour theme">
      <span className={styles.disc} aria-hidden="true" />
    </button>
  );
}
