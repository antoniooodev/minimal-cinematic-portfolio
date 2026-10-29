"use client";

import { useEffect } from "react";

/** Writes the pointer position into --mx / --my of the hovered .spotlight element. */
export function SpotlightTracker() {
  useEffect(() => {
    const move = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      target.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => document.removeEventListener("pointermove", move);
  }, []);

  return null;
}
