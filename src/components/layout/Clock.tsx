"use client";

import { useEffect, useState } from "react";

function formatTime(timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }).format(
    new Date(),
  );
}

/** Live local time. Renders a placeholder on the server to avoid a hydration mismatch. */
export function Clock({ timeZone, className }: { timeZone: string; className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatTime(timeZone));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  const [hours, minutes] = (time ?? "--:--").split(":");

  return (
    <time className={className} suppressHydrationWarning>
      {hours}
      <span className="clock-colon">:</span>
      {minutes}
    </time>
  );
}
