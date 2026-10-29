"use client";

import { useEffect, useState } from "react";
import { Timecode } from "@/components/effects/Timecode";
import { navigation } from "@/content/navigation";
import { profile } from "@/content/site";
import { asset, initials } from "@/lib/format";
import styles from "./Header.module.css";

/** Links point at the home page so they also work from the 404 page. */
const href = (id: string) => asset(`/#${id}`);

export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Marks the section that crosses the middle of the viewport.
  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={styles.header}>
        <a href={asset("/")} className={styles.brand} aria-label={`${profile.name}, back to the top`}>
          {initials(profile.name)}.
        </a>

        <nav aria-label="Sections" className={styles.nav}>
          <ul className={styles.list}>
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={href(item.id)}
                  className={styles.item}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Timecode className={styles.timecode} />

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <div id="menu" className={styles.menu} data-open={open} inert={!open}>
        <ol className={styles.menuList}>
          {navigation.map((item, index) => (
            <li key={item.id} style={{ "--i": index } as React.CSSProperties}>
              <a href={href(item.id)} className={styles.menuLink} onClick={() => setOpen(false)}>
                <span className="label">0{index + 1}</span>
                <span className={styles.menuText}>{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
        <a href={`mailto:${profile.email}`} className={styles.menuEmail}>
          {profile.email}
        </a>
      </div>
    </>
  );
}
