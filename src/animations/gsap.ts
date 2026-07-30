"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Registers GSAP plugins exactly once, on the client only.
 * Import `gsap` and `ScrollTrigger` from here — never from the package
 * directly — so registration can never be skipped.
 */
let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  // Lenis owns the rAF loop; lag smoothing would desync the two.
  gsap.ticker.lagSmoothing(0);
  registered = true;
}

export { gsap, ScrollTrigger };
