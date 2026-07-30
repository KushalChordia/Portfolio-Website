"use client";

import { useEffect, useState } from "react";
import type { SectionId } from "@/types";

/**
 * Reports which section currently owns the viewport.
 *
 * Uses IntersectionObserver rather than scroll maths so it costs nothing per
 * frame. The band is biased toward the upper-middle of the screen, which is
 * where a reader's attention actually sits.
 */
export function useActiveSection(ids: SectionId[], fallback: SectionId): SectionId {
  const [active, setActive] = useState<SectionId>(fallback);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let best: SectionId = fallback;
        let bestRatio = 0;
        ids.forEach((id) => {
          const ratio = visibility.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });

        if (bestRatio > 0) setActive(best);
      },
      {
        // Ignore the sticky nav strip, and weight the top half of the viewport.
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, fallback]);

  return active;
}
