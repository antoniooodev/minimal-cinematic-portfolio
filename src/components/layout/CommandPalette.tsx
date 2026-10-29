"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { navigation } from "@/content/navigation";
import { profile, projects } from "@/content/site";
import { PALETTE_EVENT, toggleTheme } from "@/lib/theme";
import styles from "./CommandPalette.module.css";

type Command = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

/** Keyboard-driven menu opened with ⌘K / Ctrl+K to jump anywhere on the site. */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const external = (href: string) => () => window.open(href, "_blank", "noopener");
    return [
      ...navigation.map((item) => ({
        id: `page-${item.href}`,
        group: "Pages",
        label: item.label,
        hint: "Page",
        run: () => router.push(item.href),
      })),
      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        group: "Projects",
        label: project.title,
        hint: project.category,
        run: external(project.url ?? project.repo ?? "/"),
      })),
      {
        id: "theme",
        group: "Actions",
        label: "Toggle theme",
        hint: "Light / Dark",
        run: () => toggleTheme(),
      },
      {
        id: "email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        run: () => navigator.clipboard?.writeText(profile.email),
      },
      ...profile.links.map((link) => ({
        id: `link-${link.href}`,
        group: "Links",
        label: link.label,
        hint: link.handle,
        run: external(link.href),
      })),
    ];
  }, [router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.group} ${command.hint ?? ""}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  const show = useCallback(() => {
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) setOpen(false);
        else show();
      }
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_EVENT, onOpen);
    };
  }, [open, show]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const execute = (command?: Command) => {
    if (!command) return;
    setOpen(false);
    command.run();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") setOpen(false);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    }
    if (event.key === "Enter") execute(results[active]);
  };

  let lastGroup = "";

  return (
    <div className={styles.overlay} data-open={open} inert={!open} onClick={() => setOpen(false)}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className={styles.search}>
          <span className={styles.prompt} aria-hidden="true">
            →
          </span>
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Search pages, projects and actions…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            aria-controls="palette-results"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
          />
          <kbd className={`mono ${styles.kbd}`}>Esc</kbd>
        </div>

        <ul id="palette-results" ref={listRef} className={styles.results} role="listbox">
          {results.length === 0 && <li className={styles.empty}>No results for “{query}”</li>}
          {results.map((command, index) => {
            const showGroup = command.group !== lastGroup;
            lastGroup = command.group;
            return (
              <li key={command.id} role="presentation">
                {showGroup && <p className={`mono ${styles.group}`}>{command.group}</p>}
                <div
                  id={`cmd-${command.id}`}
                  role="option"
                  aria-selected={index === active}
                  data-index={index}
                  className={styles.option}
                  onPointerMove={() => setActive(index)}
                  onClick={() => execute(command)}
                >
                  <span>{command.label}</span>
                  {command.hint && <span className={`mono ${styles.hint}`}>{command.hint}</span>}
                </div>
              </li>
            );
          })}
        </ul>

        <div className={`mono ${styles.footer}`}>
          <span>↑↓ to move</span>
          <span>↵ to open</span>
        </div>
      </div>
    </div>
  );
}
