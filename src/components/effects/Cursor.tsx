"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.css";

type Mode = "default" | "hover" | "label";

/**
 * A ring that trails the pointer and reacts to what is under it:
 * it grows over links and buttons, and shows a label over elements
 * with a data-cursor attribute. Only active on precise pointers.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const query = matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let frame = 0;

    const loop = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      ring.current?.style.setProperty("translate", `${current.x}px ${current.y}px`);
      frame = requestAnimationFrame(loop);
    };

    const move = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      dot.current?.style.setProperty("translate", `${target.x}px ${target.y}px`);
      setVisible(true);
    };

    const over = (event: PointerEvent) => {
      const element = event.target as Element | null;
      const labelled = element?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.dataset.cursor ?? "");
      } else if (element?.closest("a, button, [role='button'], input, label")) {
        setMode("hover");
      } else {
        setMode("default");
      }
    };

    const leave = () => setVisible(false);

    frame = requestAnimationFrame(loop);
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={styles.root} data-visible={visible} data-mode={mode} aria-hidden="true">
      <div ref={ring} className={styles.ring}>
        <span className={styles.shape}>
          <span className={`mono ${styles.label}`}>{label}</span>
        </span>
      </div>
      <div ref={dot} className={styles.dot} />
    </div>
  );
}
