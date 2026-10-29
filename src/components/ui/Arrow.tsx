const ROTATION = { "up-right": -45, right: 0, down: 90, up: -90 } as const;

type Props = {
  direction?: keyof typeof ROTATION;
  className?: string;
};

/**
 * Drawn arrow. Arrow characters such as ↗ are shown as colour emoji on
 * some phones, so the site draws its own to keep them identical everywhere.
 */
export function Arrow({ direction = "up-right", className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width="0.8em"
      height="0.8em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "-0.05em", transform: `rotate(${ROTATION[direction]}deg)` }}
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}
