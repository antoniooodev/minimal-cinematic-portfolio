import type { Project } from "@/content/types";
import { asset } from "@/lib/format";
import styles from "./ProjectCover.module.css";

/** Small deterministic pseudo-random generator, so covers look the same on every build. */
function random(seed: string) {
  let h = 2166136261;
  for (const char of seed) h = Math.imul(h ^ char.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function Pattern({ project }: { project: Project }) {
  const rand = random(project.slug);
  const stroke = "rgba(255,255,255,0.35)";

  switch (project.cover.pattern) {
    case "grid":
      return (
        <g stroke={stroke} strokeWidth="1">
          {Array.from({ length: 17 }, (_, i) => (
            <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="300" />
          ))}
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 25} x2="400" y2={i * 25} />
          ))}
          <rect x="150" y="75" width="125" height="125" fill="rgba(255,255,255,0.18)" stroke="none" />
        </g>
      );
    case "rings":
      return (
        <g fill="none" stroke={stroke} strokeWidth="1.2">
          {Array.from({ length: 14 }, (_, i) => (
            <circle key={i} cx="320" cy="60" r={20 + i * 26} />
          ))}
          <circle cx="320" cy="60" r="20" fill="rgba(255,255,255,0.4)" stroke="none" />
        </g>
      );
    case "waves":
      return (
        <g fill="none" stroke={stroke} strokeWidth="1.2">
          {Array.from({ length: 14 }, (_, i) => {
            const y = 20 + i * 20;
            const amp = 10 + rand() * 18;
            return (
              <path
                key={i}
                d={`M -10 ${y} C 90 ${y - amp}, 140 ${y + amp}, 200 ${y} S 320 ${y - amp}, 410 ${y}`}
              />
            );
          })}
        </g>
      );
    case "bars":
      return (
        <g fill="rgba(255,255,255,0.22)">
          {Array.from({ length: 16 }, (_, i) => {
            const h = 40 + rand() * 180;
            return <rect key={i} x={16 + i * 24} y={300 - h} width="14" height={h} rx="2" />;
          })}
        </g>
      );
    case "dots":
      return (
        <g fill="rgba(255,255,255,0.45)">
          {Array.from({ length: 12 }, (_, row) =>
            Array.from({ length: 16 }, (_, col) => {
              const r = Math.max(0.6, 5 * (1 - Math.hypot(col - 11, row - 4) / 13));
              return <circle key={`${row}-${col}`} cx={12 + col * 25} cy={12 + row * 25} r={r} />;
            }),
          )}
        </g>
      );
  }
}

type Props = {
  project: Project;
  className?: string;
  /** Show the title and meta on top of the cover. */
  labelled?: boolean;
};

/** Project artwork: the cover image when set, otherwise a generated composition. */
export function ProjectCover({ project, className, labelled = true }: Props) {
  const { from, to } = project.cover;

  return (
    <div
      className={`${styles.cover} ${className ?? ""}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {project.image ? (
        // Static export: images are served as they are, without optimisation.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset(project.image)} alt="" className={styles.image} loading="lazy" />
      ) : (
        <svg className={styles.art} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <Pattern project={project} />
        </svg>
      )}

      {labelled && (
        <div className={styles.overlay} aria-hidden="true">
          <span className={`mono ${styles.meta}`}>
            <span>{project.category}</span>
            <span>{project.year}</span>
          </span>
          <span className={`serif ${styles.title}`}>{project.title}</span>
        </div>
      )}
    </div>
  );
}
