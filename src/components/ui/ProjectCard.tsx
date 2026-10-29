import type { Project } from "@/content/types";
import { ProjectCover } from "./ProjectCover";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url ?? project.repo}
      target="_blank"
      rel="noreferrer"
      className={styles.card}
      data-cursor="View"
    >
      <ProjectCover project={project} className={styles.cover} />
      <span className={styles.body}>
        <span className={styles.title}>
          {project.title}
          <span className={styles.arrow} aria-hidden="true">
            ↗
          </span>
        </span>
        <span className={styles.summary}>{project.summary}</span>
        <span className={styles.stack}>
          {project.stack.map((tag) => (
            <span key={tag} className="mono">
              {tag}
            </span>
          ))}
        </span>
      </span>
    </a>
  );
}
