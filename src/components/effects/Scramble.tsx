"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=<>/";

/**
 * Text that briefly scrambles into random glyphs and settles back
 * when its closest link or button is hovered.
 */
export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const trigger = element.closest("a, button") ?? element;

    let frame = 0;
    const run = () => {
      cancelAnimationFrame(frame);
      const start = performance.now();
      const tick = (now: number) => {
        const progress = (now - start) / 450;
        const settled = Math.floor(progress * text.length);
        element.textContent = [...text]
          .map((char, i) =>
            i < settled || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join("");
        if (progress < 1) frame = requestAnimationFrame(tick);
        else element.textContent = text;
      };
      frame = requestAnimationFrame(tick);
    };

    trigger.addEventListener("pointerenter", run);
    return () => {
      trigger.removeEventListener("pointerenter", run);
      cancelAnimationFrame(frame);
    };
  }, [text]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
