"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/content/types";
import { pad } from "@/lib/format";
import { ProjectCard } from "./ProjectCard";
import { ProjectCover } from "./ProjectCover";
import styles from "./ProjectList.module.css";

const ALL = "All";
type View = "list" | "grid";

/** Categories in order of appearance, each with the number of projects in it. */
function categories(projects: Project[]) {
  const counts = new Map<string, number>();
  for (const project of projects) counts.set(project.category, (counts.get(project.category) ?? 0) + 1);
  return [[ALL, projects.length] as const, ...counts.entries()];
}

export function ProjectList({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>(ALL);
  const [view, setView] = useState<View>("list");
  const [hovered, setHovered] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const filters = useMemo(() => categories(projects), [projects]);
  const visible = filter === ALL ? projects : projects.filter((p) => p.category === filter);

  // The preview trails the pointer with a little inertia.
  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || view !== "list") return;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const move = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };
    const loop = () => {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      preview.style.translate = `${current.x}px ${current.y}px`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, [view]);

  return (
    <div className="container">
      <div className={styles.toolbar} data-reveal>
        <div className={styles.filters} role="group" aria-label="Filter projects by category">
          {filters.map(([name, count]) => (
            <button
              key={name}
              type="button"
              className={styles.filter}
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
              <sup className="mono">{pad(count)}</sup>
            </button>
          ))}
        </div>

        <div className={styles.views} role="group" aria-label="Layout">
          {(["list", "grid"] as const).map((option) => (
            <button
              key={option}
              type="button"
              className={`mono ${styles.view}`}
              aria-pressed={view === option}
              onClick={() => setView(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {view === "list" ? (
        <ol key={filter} className={styles.list} onPointerLeave={() => setHovered(null)}>
          {visible.map((project, index) => (
            <li
              key={project.slug}
              className={styles.row}
              data-reveal
              style={{ "--d": index % 6 } as React.CSSProperties}
              data-dimmed={hovered !== null && hovered !== index}
            >
              <a
                href={project.url ?? project.repo}
                target="_blank"
                rel="noreferrer"
                className={styles.rowLink}
                data-cursor="View"
                onPointerEnter={() => setHovered(index)}
                onFocus={() => setHovered(index)}
              >
                <span className={`mono ${styles.number}`}>{pad(index + 1)}</span>
                <ProjectCover project={project} labelled={false} className={styles.thumb} />
                <span className={styles.main}>
                  <span className={styles.title}>{project.title}</span>
                  <span className={styles.summary}>{project.summary}</span>
                </span>
                <span className={`mono ${styles.category}`}>{project.category}</span>
                <span className={`mono ${styles.year}`}>{project.year}</span>
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ol>
      ) : (
        <ul key={filter} className={styles.grid}>
          {visible.map((project, index) => (
            <li key={project.slug} data-reveal style={{ "--d": index % 2 } as React.CSSProperties}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}

      {view === "list" && (
        <div ref={previewRef} className={styles.preview} data-active={hovered !== null} aria-hidden="true">
          <div className={styles.previewFrame}>
            <div
              className={styles.previewReel}
              style={{ transform: `translateY(${-(hovered ?? 0) * 100}%)` }}
            >
              {visible.map((project) => (
                <ProjectCover key={project.slug} project={project} className={styles.previewCover} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
