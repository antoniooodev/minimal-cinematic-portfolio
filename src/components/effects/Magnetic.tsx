"use client";

import { useRef, type ReactNode } from "react";
import styles from "./Magnetic.module.css";

type Props = {
  children: ReactNode;
  /** How far the element follows the pointer, from 0 to 1. */
  strength?: number;
  className?: string;
};

/** Pulls its content towards the pointer while hovered. */
export function Magnetic({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const move = (event: React.PointerEvent) => {
    const element = ref.current;
    if (!element || event.pointerType !== "mouse") return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      className={`${styles.magnetic} ${className ?? ""}`}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </span>
  );
}
