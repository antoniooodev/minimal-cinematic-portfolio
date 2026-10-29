"use client";

import { useEffect, useRef } from "react";

/**
 * Paragraph whose words light up one by one as it scrolls through the viewport.
 */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spans = [...element.querySelectorAll<HTMLSpanElement>("[data-word]")];
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.35;
      const progress = (start - rect.top) / (start - end + rect.height * 0.5);
      const lit = Math.max(0, Math.min(1, progress)) * spans.length;
      spans.forEach((span, i) => {
        span.style.opacity = String(0.18 + 0.82 * Math.max(0, Math.min(1, lit - i)));
      });
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
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} data-word style={{ transition: "opacity 0.2s linear" }}>
          {word}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </p>
  );
}
