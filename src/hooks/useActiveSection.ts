"use client";

import { usePathname } from "next/navigation";
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
  // Navbar is part of the root layout, so it never unmounts on route change —
  // without this, the observer set up on "/" keeps watching elements that get
  // detached the moment you navigate away (e.g. to /ecell), and never
  // re-attaches to the fresh ones when you come back. The underline just
  // freezes wherever it last was. Re-running the effect per route re-queries
  // the DOM and rebuilds the observer against whatever's actually mounted.
  const pathname = usePathname();

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
  }, [ids, fallback, pathname]);

  return active;
}
