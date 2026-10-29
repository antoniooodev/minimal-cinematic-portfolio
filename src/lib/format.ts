export function formatPeriod(start: string, end?: string) {
  return `${start} — ${end ?? "Present"}`;
}

export function pad(value: number, length = 2) {
  return String(value).padStart(length, "0");
}
