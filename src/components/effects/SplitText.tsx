import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  /** Words wrapped in *asterisks* are rendered in italic accent. */
  text: string;
  as?: ElementType;
  className?: string;
  /** Delay step, multiplied by 80ms in CSS. */
  delay?: number;
};

/**
 * Renders a line whose words rise one after another when revealed.
 * Screen readers get the plain sentence.
 */
export function SplitText({ text, as: Tag = "span", className, delay = 0 }: Props) {
  const plain = text.replaceAll("*", "");
  let index = 0;

  // Split on *emphasis* first, then on spaces, keeping track of italics.
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean);
  const nodes: ReactNode[] = [];
  for (const part of parts) {
    const emphasis = part.startsWith("*") && part.endsWith("*");
    const words = (emphasis ? part.slice(1, -1) : part).split(" ").filter(Boolean);
    for (const word of words) {
      const i = index++;
      const inner = (
        <span className="word" style={{ "--w": i } as CSSProperties}>
          {word}
        </span>
      );
      nodes.push(
        <span key={i} className="word-mask">
          {emphasis ? <em>{inner}</em> : inner}
        </span>,
        " ",
      );
    }
  }
  nodes.pop();

  return (
    <Tag className={className} data-reveal="words" style={{ "--d": delay } as CSSProperties}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">{nodes}</span>
    </Tag>
  );
}

/** Renders text with *asterisk* emphasis as italic accent, without animation. */
export function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(\*[^*]+\*)/)
        .filter(Boolean)
        .map((part, i) =>
          part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part,
        )}
    </>
  );
}
