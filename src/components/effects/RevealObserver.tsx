"use client";

import { useEffect } from "react";

/**
 * Reveals every [data-reveal] element as it scrolls into view, in both
 * directions. When an element leaves the viewport it is reset, and
 * data-from records the side it left from, so it comes back in from that
 * side: from below when scrolling down, from above when scrolling up.
 * Elements added later (a new route, a filtered list) are picked up by a
 * MutationObserver, so components only need the data attribute.
 */
export function RevealObserver() {
  useEffect(() => {
    // Shows elements once they are a little inside the viewport.
    const enter = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    // Resets elements only once they are completely out of view, so
    // nothing disappears while it can still be seen.
    const exit = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting || !element.classList.contains("is-visible")) continue;
        element.dataset.from = entry.boundingClientRect.top < 0 ? "above" : "below";
        element.dataset.seen = "";
        element.classList.remove("is-visible");
      }
    });

    const watched = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll("[data-reveal]").forEach((element) => {
        if (watched.has(element)) return;
        watched.add(element);
        enter.observe(element);
        exit.observe(element);
      });
    };

    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      enter.disconnect();
      exit.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
