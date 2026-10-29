"use client";

import { toggleTheme } from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <button type="button" className={styles.toggle} onClick={onClick} aria-label="Toggle colour theme">
      <span className={styles.disc} aria-hidden="true" />
    </button>
  );
}
