import type { CSSProperties, ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Delay step, multiplied by 90ms in CSS. */
  delay?: number;
};

/**
 * Splits a line into words and characters that slide up one after another
 * when the element is revealed. Screen readers get the plain text.
 */
export function SplitText({ text, as: Tag = "span", className, delay = 0 }: Props) {
  let index = 0;
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      data-reveal="split"
      style={{ "--d": delay } as CSSProperties}
      aria-label={text}
    >
      {words.map((word, w) => (
        <span key={w} aria-hidden="true">
          <span className="split-word">
            {[...word].map((char, c) => (
              <span key={c} className="split-char" style={{ "--c": index++ } as CSSProperties}>
                {char}
              </span>
            ))}
          </span>
          {w < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
