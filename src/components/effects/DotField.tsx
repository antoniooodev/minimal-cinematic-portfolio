"use client";

import { useEffect, useRef } from "react";
import styles from "./DotField.module.css";

const SPACING = 26;
const RADIUS = 150;

/**
 * Canvas grid of dots that are pushed away from the pointer and tinted
 * with the accent colour. It only animates while it is on screen.
 */
export function DotField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    let dots: { x: number; y: number; ox: number; oy: number }[] = [];
    let width = 0;
    let height = 0;
    let colors = { base: "#000", accent: "#f00" };
    let frame = 0;
    let running = false;

    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      colors = {
        base: style.getPropertyValue("--faint").trim(),
        accent: style.getPropertyValue("--accent").trim(),
      };
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      dots = [];
      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) dots.push({ x, y, ox: 0, oy: 0 });
      }
      draw();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (const dot of dots) {
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const force = reduced ? 0 : Math.max(0, 1 - distance / RADIUS);
        const push = force * force * 18;
        const tx = distance > 0 ? (dx / distance) * push : 0;
        const ty = distance > 0 ? (dy / distance) * push : 0;
        dot.ox += (tx - dot.ox) * 0.12;
        dot.oy += (ty - dot.oy) * 0.12;

        context.globalAlpha = 0.55 + force * 0.45;
        context.fillStyle = force > 0.05 ? colors.accent : colors.base;
        context.beginPath();
        context.arc(dot.x + dot.ox, dot.y + dot.oy, 1 + force * 1.4, 0, Math.PI * 2);
        context.fill();
      }
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    readColors();
    resize();

    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    visibility.observe(canvas);
    const theme = new MutationObserver(() => {
      readColors();
      draw();
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      stop();
      visibility.disconnect();
      theme.disconnect();
      sizeObserver.disconnect();
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={canvasRef} className={`${styles.canvas} ${className ?? ""}`} aria-hidden="true" />;
}
