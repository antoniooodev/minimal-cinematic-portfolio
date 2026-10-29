"use client";

import Link from "next/link";
import { useEffect } from "react";
import { navigation } from "@/content/navigation";
import { profile } from "@/content/site";
import { pad, trimSlash } from "@/lib/format";
import styles from "./MobileMenu.module.css";

type Props = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

/** Full-screen navigation for small screens. */
export function MobileMenu({ open, pathname, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div id="mobile-menu" className={styles.menu} data-open={open} inert={!open}>
      <nav aria-label="Mobile">
        <ol className={styles.list}>
          {navigation.map((item, index) => (
            <li key={item.href} style={{ "--i": index } as React.CSSProperties}>
              <Link
                href={item.href}
                className={styles.link}
                aria-current={trimSlash(item.href) === pathname ? "page" : undefined}
                onClick={onClose}
              >
                <span className="label">{pad(index + 1)}</span>
                <span className={`display ${styles.text}`}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <div className={styles.footer}>
        <a href={`mailto:${profile.email}`} className="link-line">
          {profile.email}
        </a>
        <ul className={styles.socials}>
          {profile.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
