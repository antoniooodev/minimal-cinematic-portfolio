"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  suffix?: string;
  /** Duration of the count in milliseconds. */
  duration?: number;
};

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/** Counts up from zero the first time it scrolls into view. */
export function Counter({ value, suffix = "", duration = 1800 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCurrent(Math.round(easeOutExpo(progress) * value));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    setCurrent(0);
    io.observe(element);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">
        {current}
        {suffix}
      </span>
    </span>
  );
}
