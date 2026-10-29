"use client";

import { useEffect, useRef, useState } from "react";
import { SplitText } from "@/components/effects/SplitText";
import { Photo } from "@/components/ui/Photo";
import { SceneLabel } from "@/components/ui/SceneLabel";
import { projects } from "@/content/site";
import type { CoverTone } from "@/content/types";
import { pad } from "@/lib/format";
import styles from "./Work.module.css";

const TONES: Record<CoverTone, string> = {
  crimson: "var(--crimson)",
  cocoa: "var(--cocoa)",
  sand: "var(--sand)",
  espresso: "var(--night-raised)",
};

/**
 * Featured projects scroll by on the left while a sticky frame on the right
 * shows the one crossing the middle of the screen. The rest of the projects
 * follow in a compact archive.
 */
export function Work() {
  const featured = projects.filter((project) => project.featured);
  const archive = projects.filter((project) => !project.featured);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-index]");
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className={`scene-dark ${styles.work}`}>
      <div className="container">
        <div className={styles.head}>
          <SceneLabel scene={4} title="Work" />
          <SplitText as="h2" text="Selected *work*" className={`display ${styles.title}`} />
        </div>

        <div className={styles.showcase}>
          <ol ref={listRef} className={styles.list}>
            {featured.map((project, index) => (
              <li
                key={project.slug}
                data-index={index}
                className={styles.item}
                data-active={active === index}
                onPointerEnter={() => setActive(index)}
              >
                <div className={styles.inlineFrame} aria-hidden="true">
                  {project.image ? (
                    <Photo photo={project.image} className={styles.image} />
                  ) : (
                    <div className={styles.tone} style={{ background: TONES[project.tone ?? "cocoa"] }} />
                  )}
                </div>
                <p className="label">
                  {pad(index + 1)} / {project.category}
                </p>
                <h3 className={`display ${styles.projectTitle}`}>{project.title}</h3>
                <p className={styles.summary}>{project.summary}</p>
                <p className={`label ${styles.meta}`}>
                  <span>{project.stack.join(" · ")}</span>
                  <span>{project.year}</span>
                </p>
                <a href={project.url ?? project.repo} target="_blank" rel="noreferrer" className={`label link ${styles.view}`}>
                  {project.url ? "View project" : "View code"} ↗
                </a>
              </li>
            ))}
          </ol>

          <div className={styles.stage} aria-hidden="true">
            <div className={styles.frame}>
              {featured.map((project, index) => (
                <div key={project.slug} className={styles.shot} data-active={active === index}>
                  {project.image ? (
                    <Photo photo={project.image} className={styles.image} />
                  ) : (
                    <div className={styles.tone} style={{ background: TONES[project.tone ?? "cocoa"] }} />
                  )}
                </div>
              ))}
            </div>
            <p className={`label ${styles.counter}`}>
              <span>{featured[active]?.title}</span>
              <span>
                {pad(active + 1)} / {pad(featured.length)}
              </span>
            </p>
          </div>
        </div>

        {archive.length > 0 && (
          <div className={styles.archive}>
            <p className="label" data-reveal>
              Archive
            </p>
            <ul className={styles.rows}>
              {archive.map((project, i) => (
                <li key={project.slug} data-reveal style={{ "--d": i } as React.CSSProperties}>
                  <a href={project.url ?? project.repo} target="_blank" rel="noreferrer" className={styles.row}>
                    <span className={styles.rowYear}>{project.year}</span>
                    <span className={`display ${styles.rowTitle}`}>{project.title}</span>
                    <span className={styles.rowSummary}>{project.summary}</span>
                    <span className={`label ${styles.rowCategory}`}>{project.category}</span>
                    <span className={styles.rowArrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
