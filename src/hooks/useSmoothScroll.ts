"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { refreshScrollTriggers } from "@/animations/scroll";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Module-level handle so navigation can drive the same instance. */
let lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * Scrolls to a section, accounting for the sticky nav.
 * Falls back to native scrolling when Lenis is off (reduced motion), so the
 * navigation keeps working regardless.
 */
export function scrollToSection(id: string, offset = -72) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.1 });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "auto" });
  }
}

/**
 * Boots Lenis and hands the rAF loop to GSAP's ticker, so smooth scrolling and
 * every ScrollTrigger update run on one clock. Two loops would drift and cause
 * the pinned Experience header to judder.
 *
 * When the user prefers reduced motion, Lenis never starts — the page scrolls
 * natively and ScrollTrigger reads real scroll position instead.
 */
export function useSmoothScroll() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const instance = new Lenis({
      duration: 1.05,
      // Gentle exponential settle — no overshoot, no rubber band.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      autoRaf: false,
    });

    lenis = instance;

    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);

    // Late-loading fonts and sprites change layout height; re-measure once.
    const settle = window.setTimeout(refreshScrollTriggers, 250);
    document.fonts?.ready.then(refreshScrollTriggers).catch(() => {});

    return () => {
      window.clearTimeout(settle);
      gsap.ticker.remove(tick);
      instance.off("scroll", onScroll);
      instance.destroy();
      lenis = null;
    };
  }, [prefersReducedMotion]);
}
