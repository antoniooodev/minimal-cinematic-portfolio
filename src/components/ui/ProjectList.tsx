"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/content/types";
import { pad } from "@/lib/format";
import { ProjectCover } from "./ProjectCover";
import styles from "./ProjectList.module.css";

const ALL = "All";

type Props = {
  projects: Project[];
  /** Show category filters above the list. */
  filterable?: boolean;
};

/**
 * Numbered project list. On devices with a mouse, a cover preview trails the
 * pointer over the hovered row; on touch screens each row shows a thumbnail.
 */
export function ProjectList({ projects, filterable = false }: Props) {
  const [filter, setFilter] = useState(ALL);
  const [hovered, setHovered] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const counts = new Map<string, number>([[ALL, projects.length]]);
    for (const project of projects) counts.set(project.category, (counts.get(project.category) ?? 0) + 1);
    return [...counts.entries()];
  }, [projects]);

  const visible = filter === ALL ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || !matchMedia("(hover: hover)").matches) return;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const move = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };
    const loop = () => {
      current.x += (target.x - current.x) * 0.15;
      current.y += (target.y - current.y) * 0.15;
      preview.style.translate = `${current.x}px ${current.y}px`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div>
      {filterable && (
        <div className={styles.filters} role="group" aria-label="Filter projects by category" data-reveal>
          {categories.map(([name, count]) => (
            <button
              key={name}
              type="button"
              className={styles.filter}
              aria-pressed={filter === name}
              onClick={() => {
                setFilter(name);
                setHovered(null);
              }}
            >
              {name}
              <span className={styles.count}>{count}</span>
            </button>
          ))}
        </div>
      )}

      <ol key={filter} className={styles.list} onPointerLeave={() => setHovered(null)}>
        {visible.map((project, index) => (
          <li
            key={project.slug}
            className={styles.item}
            data-reveal
            data-dimmed={hovered !== null && hovered !== index}
            style={{ "--d": index % 6 } as React.CSSProperties}
          >
            <a
              href={project.url ?? project.repo}
              target="_blank"
              rel="noreferrer"
              className={styles.row}
              onPointerEnter={() => setHovered(index)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
            >
              <span className={`label ${styles.index}`}>{pad(index + 1)}</span>
              <ProjectCover project={project} labelled={false} className={styles.thumb} />
              <span className={styles.main}>
                <span className={`display ${styles.title}`}>{project.title}</span>
                <span className={styles.summary}>{project.summary}</span>
              </span>
              <span className={styles.category}>{project.category}</span>
              <span className={styles.year}>{project.year}</span>
            </a>
          </li>
        ))}
      </ol>

      <div ref={previewRef} className={styles.preview} data-active={hovered !== null} aria-hidden="true">
        <div className={styles.frame}>
          <div className={styles.reel} style={{ transform: `translateY(${-(hovered ?? 0) * 100}%)` }}>
            {visible.map((project) => (
              <ProjectCover key={project.slug} project={project} className={styles.reelCover} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
