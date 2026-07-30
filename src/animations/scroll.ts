"use client";

import { gsap, ScrollTrigger } from "./gsap";

/* ==========================================================================
   SCROLL CHOREOGRAPHY

   All scroll-linked motion is `scrub`-based. That matters for the Experience
   section: because the animation is tied to scroll position rather than
   played as a timeline, scrolling back up retraces the exact same frames in
   reverse. There is no separate "reveal" animation to keep in sync.
   ========================================================================== */

interface SlideBehindOptions {
  /** The sticky block that holds the section heading and the character. */
  header: HTMLElement;
  /** The stack of cards that rides up over it. */
  cards: HTMLElement;
  /** Section wrapper — defines the scroll range. */
  section: HTMLElement;
}

/**
 * Heading + character stay put while the cards travel upward, then recede
 * fully out of sight — dimming to nothing, easing back and drifting up — as
 * the cards pass in front of them. z-index does the occlusion while they're
 * still overlapping; the opacity has to actually reach 0, otherwise the
 * header keeps showing through as a faint ghost once you've scrolled past it.
 */
export function slideBehind({ header, cards, section }: SlideBehindOptions) {
  const ctx = gsap.context(() => {
    gsap.to(header, {
      y: -56,
      scale: 0.94,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: cards,
        start: "top 82%",
        end: "top 30%",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
  }, section);

  return () => ctx.revert();
}

/**
 * Background parallax. Layers move at different rates against the page so the
 * world has depth without ever competing with the content — the furthest
 * layer barely moves, the treeline moves most.
 */
export function parallaxLayers(layers: Array<{ el: HTMLElement; distance: number }>) {
  const ctx = gsap.context(() => {
    layers.forEach(({ el, distance }) => {
      gsap.to(el, {
        y: distance,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });
  });

  return () => ctx.revert();
}

/** Refresh triggers once fonts and images have settled. */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
