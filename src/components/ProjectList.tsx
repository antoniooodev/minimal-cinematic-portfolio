"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/content/types";
import { pad } from "@/lib/format";
import styles from "./ProjectList.module.css";

const ALL = "All";

/** Technologies used by at least two projects, most common first. */
function sharedTags(projects: Project[]) {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const tag of project.stack) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

export function ProjectList({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState(ALL);
  const tags = useMemo(() => [ALL, ...sharedTags(projects)], [projects]);
  const visible = filter === ALL ? projects : projects.filter((p) => p.stack.includes(filter));

  return (
    <div className="container">
      <div
        className={`reveal ${styles.filters}`}
        style={{ "--i": 3 } as React.CSSProperties}
        role="group"
        aria-label="Filter projects by technology"
      >
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`mono ${styles.filter}`}
            aria-pressed={filter === tag}
            onClick={() => setFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Keyed by the filter so the entrance animation replays on every change. */}
      <ol key={filter} className={styles.list}>
        {visible.map((project, index) => {
          const href = project.url ?? project.repo;
          return (
            <li
              key={project.slug}
              className={`reveal ${styles.item}`}
              style={{ "--i": index + 4 } as React.CSSProperties}
            >
              <a href={href} className={styles.row} target="_blank" rel="noreferrer">
                <span className={`mono ${styles.number}`}>{pad(index + 1)}</span>
                <span className={styles.main}>
                  <span className={styles.title}>{project.title}</span>
                  <span className={styles.summary}>{project.summary}</span>
                </span>
                <span className={`mono ${styles.stack}`}>{project.stack.slice(0, 3).join(" · ")}</span>
                <span className={`mono ${styles.year}`}>{project.year}</span>
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
