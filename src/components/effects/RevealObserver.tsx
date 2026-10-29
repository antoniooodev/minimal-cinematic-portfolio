"use client";

import { useEffect } from "react";

/**
 * Reveals every [data-reveal] element when it scrolls into view.
 * A MutationObserver picks up elements added later, such as a new route
 * or a filtered list, so components only need the data attribute.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -2% 0px" },
    );

    const scan = () => {
      document
        .querySelectorAll("[data-reveal]:not(.is-visible)")
        .forEach((element) => io.observe(element));
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
