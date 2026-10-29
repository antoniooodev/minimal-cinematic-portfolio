"use client";

import { useEffect, useRef } from "react";

/**
 * Paragraph whose words light up one by one as it scrolls through the
 * viewport. Words wrapped in *asterisks* are set in the italic accent.
 */
/** Splits a sentence into words, flagging those inside *asterisks*. */
function toWords(text: string) {
  let emphasis = false;
  return text.split(" ").map((raw) => {
    if (raw.startsWith("*")) emphasis = true;
    const word = { text: raw.replaceAll("*", ""), italic: emphasis };
    if (/\*[.,:;!?]?$/.test(raw)) emphasis = false;
    return word;
  });
}

export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = toWords(text);

  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spans = [...element.querySelectorAll<HTMLSpanElement>("[data-word]")];
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.3;
      const progress = (start - rect.top) / (start - end + rect.height * 0.6);
      const lit = Math.max(0, Math.min(1, progress)) * spans.length;
      spans.forEach((span, i) => {
        span.style.opacity = String(0.16 + 0.84 * Math.max(0, Math.min(1, lit - i)));
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
        <span key={i} data-word style={{ transition: "opacity 0.25s linear" }}>
          {word.italic ? <em>{word.text}</em> : word.text}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </p>
  );
}
