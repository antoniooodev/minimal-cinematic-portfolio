"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Writes how far the viewport centre has travelled through the element into --progress. */
export function TimelineProgress({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const progress = (window.innerHeight * 0.55 - rect.top) / rect.height;
      element.style.setProperty("--progress", String(Math.min(Math.max(progress, 0), 1)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
