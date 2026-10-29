"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Scramble } from "@/components/effects/Scramble";
import { navigation } from "@/content/navigation";
import { profile } from "@/content/site";
import { initials, pad, trimSlash } from "@/lib/format";
import { openPalette } from "@/lib/theme";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

export function Header() {
  const pathname = trimSlash(usePathname() ?? "/");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const pillRef = useRef<HTMLLIElement>(null);

  // Hide the header while scrolling down, bring it back when scrolling up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > 160 && y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Moves the pill behind a nav item; with no item it returns to the active page.
  const movePill = useCallback((target?: HTMLElement | null) => {
    const pill = pillRef.current;
    const list = listRef.current;
    if (!pill || !list) return;
    const element = target ?? list.querySelector<HTMLElement>("[aria-current='page']");
    if (!element) {
      pill.style.opacity = "0";
      return;
    }
    pill.style.opacity = "1";
    pill.style.width = `${element.offsetWidth}px`;
    pill.style.transform = `translateX(${element.offsetLeft}px)`;
  }, []);

  useLayoutEffect(() => {
    movePill();
    const onResize = () => movePill();
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname, movePill]);

  return (
    <>
      <header
        className={styles.header}
        data-hidden={hidden && !menuOpen}
        data-scrolled={scrolled || menuOpen}
      >
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.brand} aria-label={`${profile.name}, home`}>
            <span className={styles.mark} aria-hidden="true">
              {initials(profile.name)}
            </span>
            <span className={styles.name}>
              <span>{profile.name}</span>
              <span className={`mono ${styles.role}`}>{profile.role}</span>
            </span>
          </Link>

          <nav className={styles.nav} aria-label="Main">
            <ol ref={listRef} className={styles.list} onPointerLeave={() => movePill()}>
              <li ref={pillRef} className={styles.pill} aria-hidden="true" />
              {navigation.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.item}
                    aria-current={trimSlash(item.href) === pathname ? "page" : undefined}
                    onPointerEnter={(event) => movePill(event.currentTarget)}
                  >
                    <span className={`mono ${styles.index}`}>{pad(index)}</span>
                    <Scramble text={item.label} />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.actions}>
            <button type="button" className={`mono ${styles.palette}`} onClick={openPalette}>
              <span aria-hidden="true">⌘K</span>
              <span className="sr-only">Open command menu</span>
            </button>
            <ThemeToggle />
            <button
              type="button"
              className={styles.burger}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span className={styles.burgerLines} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} pathname={pathname} onClose={() => setMenuOpen(false)} />
    </>
  );
}
