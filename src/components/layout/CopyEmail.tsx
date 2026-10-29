"use client";

import { useState } from "react";
import styles from "./Footer.module.css";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className={`mono ${styles.copy}`} onClick={copy} aria-live="polite">
      {copied ? "Copied ✓" : "Copy email"}
    </button>
  );
}
