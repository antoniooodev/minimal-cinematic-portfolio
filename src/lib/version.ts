export type Version = "colour" | "mono";

export const VERSION_KEY = "version";

/**
 * Switches between the colour version and the black-and-white one.
 * The choice is stored, and the boot script in the layout applies it
 * before the first paint on the next visit.
 */
export function toggleVersion() {
  const root = document.documentElement;
  const next: Version = root.dataset.theme === "mono" ? "colour" : "mono";

  const apply = () => {
    if (next === "mono") root.dataset.theme = "mono";
    else delete root.dataset.theme;
    try {
      localStorage.setItem(VERSION_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the switch still applies.
    }
  };

  // Cross-fade between the two versions where the browser supports it.
  if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.startViewTransition(apply);
  } else {
    apply();
  }
}
