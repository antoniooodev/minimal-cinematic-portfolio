import type { CoverTone, Project } from "@/content/types";
import { asset } from "@/lib/format";
import styles from "./ProjectCover.module.css";

/** Background, line and text colours of each palette tone. */
const TONES: Record<CoverTone, { from: string; to: string; line: string; text: string; mark: string }> = {
  crimson: { from: "#a7010d", to: "#7c0009", line: "rgba(246,241,233,0.28)", text: "#f6f1e9", mark: "#f6f1e9" },
  cocoa: { from: "#7a5341", to: "#583a2c", line: "rgba(246,241,233,0.24)", text: "#f6f1e9", mark: "#dccdb9" },
  sand: { from: "#e6dac8", to: "#d4c3ac", line: "rgba(110,75,58,0.32)", text: "#4b3a33", mark: "#a7010d" },
  espresso: { from: "#2e201b", to: "#1a110e", line: "rgba(220,205,185,0.2)", text: "#efe7dc", mark: "#a7010d" },
};

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

function Pattern({ project, line, mark }: { project: Project; line: string; mark: string }) {
  const rand = random(project.slug);

  switch (project.cover.pattern) {
    case "grid":
      return (
        <g stroke={line} strokeWidth="0.8">
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="300" />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} />
          ))}
          <circle cx="280" cy="120" r="6" fill={mark} stroke="none" />
        </g>
      );
    case "rings":
      return (
        <g fill="none" stroke={line} strokeWidth="0.8">
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx="300" cy="90" r={18 + i * 24} />
          ))}
          <circle cx="300" cy="90" r="6" fill={mark} stroke="none" />
        </g>
      );
    case "waves":
      return (
        <g fill="none" stroke={line} strokeWidth="0.8">
          {Array.from({ length: 16 }, (_, i) => {
            const y = 20 + i * 18;
            const amp = 8 + rand() * 14;
            return <path key={i} d={`M -10 ${y} C 100 ${y - amp}, 160 ${y + amp}, 220 ${y} S 340 ${y - amp}, 410 ${y}`} />;
          })}
        </g>
      );
    case "bars":
      return (
        <g fill="none" stroke={line} strokeWidth="0.8">
          {Array.from({ length: 18 }, (_, i) => {
            const h = 30 + rand() * 170;
            return <line key={i} x1={30 + i * 20} y1={300} x2={30 + i * 20} y2={300 - h} />;
          })}
          <circle cx={30 + 11 * 20} cy="70" r="6" fill={mark} stroke="none" />
        </g>
      );
    case "dots":
      return (
        <g fill={line}>
          {Array.from({ length: 10 }, (_, row) =>
            Array.from({ length: 14 }, (_, col) => {
              const r = Math.max(0.8, 3.6 * (1 - Math.hypot(col - 10, row - 3) / 12));
              return <circle key={`${row}-${col}`} cx={20 + col * 28} cy={20 + row * 28} r={r} />;
            }),
          )}
        </g>
      );
  }
}

type Props = {
  project: Project;
  className?: string;
  /** Show the title and category on top of the cover. */
  labelled?: boolean;
};

/** Project artwork: the cover image when set, otherwise a composition in the site palette. */
export function ProjectCover({ project, className, labelled = true }: Props) {
  const tone = TONES[project.cover.tone];

  return (
    <div
      className={`${styles.cover} ${className ?? ""}`}
      style={{ background: `linear-gradient(160deg, ${tone.from}, ${tone.to})`, color: tone.text }}
    >
      {project.image ? (
        // Static export: images are served as they are, without optimisation.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset(project.image)} alt="" className={styles.art} loading="lazy" />
      ) : (
        <svg className={styles.art} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <Pattern project={project} line={tone.line} mark={tone.mark} />
        </svg>
      )}

      {labelled && (
        <div className={styles.overlay} aria-hidden="true">
          <span className={styles.meta}>{project.category}</span>
          <span className={styles.title}>{project.title}</span>
        </div>
      )}
    </div>
  );
}
