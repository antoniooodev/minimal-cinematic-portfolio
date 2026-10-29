import type { Icon } from "@/content/types";

/** A single-colour logo that takes the current text colour. */
export function Logo({ icon, className }: { icon: Icon; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}
