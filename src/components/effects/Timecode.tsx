"use client";

import { useEffect, useRef } from "react";

/** Length of the "film" in seconds: the whole page maps onto this runtime. */
const RUNTIME = 3 * 60;
const FPS = 24;

const two = (n: number) => String(Math.floor(n)).padStart(2, "0");

function format(seconds: number) {
  const frames = Math.floor((seconds % 1) * FPS);
  return `${two(seconds / 3600)}:${two((seconds / 60) % 60)}:${two(seconds % 60)}:${two(frames)}`;
}

/** Film timecode that follows the scroll position, from 00:00:00:00 to the end credits. */
export function Timecode({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (ref.current) ref.current.textContent = format(progress * RUNTIME);
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
    <span className={className} aria-hidden="true">
      <span ref={ref}>00:00:00:00</span>
    </span>
  );
}
