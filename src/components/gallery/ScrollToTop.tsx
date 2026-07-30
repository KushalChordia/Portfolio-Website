"use client";

import { useEffect } from "react";

/** How long to actively hold the viewport at the top after mount. Generous
 *  on purpose — Next's client-side navigation cache can restore a
 *  previously-visited route's scroll position well after this component's
 *  own mount-time reset, and the exact delay isn't predictable. */
const LOCK_MS = 700;

/**
 * Forces the viewport to the top on mount and holds it there.
 *
 * A single `scrollTo(0, 0)` isn't enough: when this route has been visited
 * before in the same session, Next's router restores that route's last
 * scroll position *after* this effect runs, silently overwriting the reset —
 * and the user sees the page open mid- or end-scroll before it snaps back,
 * which reads as broken even once the final position is correct.
 *
 * `overflow: hidden` on the root makes that flash physically impossible
 * (nothing can scroll while it's set), and a rAF loop keeps re-asserting
 * scrollY 0 for the lock window in case something still tries to move it —
 * belt and suspenders, since the exact timing of Next's restoration isn't
 * something this component can observe directly.
 */
export function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    window.scrollTo(0, 0);

    let raf = 0;
    const start = performance.now();

    const hold = (now: number) => {
      window.scrollTo(0, 0);
      if (now - start < LOCK_MS) {
        raf = requestAnimationFrame(hold);
      } else {
        root.style.overflow = previousOverflow;
        window.scrollTo(0, 0);
      }
    };
    raf = requestAnimationFrame(hold);

    return () => {
      cancelAnimationFrame(raf);
      root.style.overflow = previousOverflow;
    };
  }, []);

  return null;
}
