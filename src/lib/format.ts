export function formatPeriod(start: string, end?: string) {
  return `${start} — ${end ?? "Present"}`;
}

export function pad(value: number, length = 2) {
  return String(value).padStart(length, "0");
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

/** Prefixes a path from /public with the base path the site is served from. */
export function asset(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
