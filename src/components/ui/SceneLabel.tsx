import { pad } from "@/lib/format";

/** Section heading styled as a film slate: "SC. 02 — About". */
export function SceneLabel({ scene, title, className }: { scene: number; title: string; className?: string }) {
  return (
    <p className={`label ${className ?? ""}`} data-reveal>
      Sc. {pad(scene)} — {title}
    </p>
  );
}
