"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/navigation";
import { profile } from "@/content/site";
import { pad } from "@/lib/format";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

const trimSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

export function Header() {
  const pathname = trimSlash(usePathname() ?? "/");

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label={`${profile.name}, home`}>
          <span className={styles.mark} aria-hidden="true">
            {profile.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </span>
          <span className={styles.name}>{profile.name}</span>
        </Link>

        <nav className={styles.nav} aria-label="Main">
          <ol className={styles.list}>
            {navigation.map((item, index) => {
              const active = trimSlash(item.href) === pathname;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.item}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className={`mono ${styles.index}`}>{pad(index)}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ol>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
