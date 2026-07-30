"use client";

import { useEffect } from "react";

/**
 * Forces the viewport to the top on mount.
 *
 * The browser's own scroll restoration can otherwise land this page mid- or
 * end-of-scroll when it's opened from a client-side navigation, since Next
 * doesn't reset scroll position for every route change in every browser.
 */
export function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
