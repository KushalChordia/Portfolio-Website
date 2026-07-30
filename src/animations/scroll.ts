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
  /** Section wrapper — defines the scroll range. */
  section: HTMLElement;
}

/** How much the user has to actually scroll through a section before its
 *  header finishes receding. Fixed and position-independent on purpose —
 *  see the note below. */
const FADE_SCROLL_DISTANCE_PX = 480;

/**
 * Heading + character stay put while the cards travel upward, then recede
 * fully out of sight — dimming to nothing, easing back and drifting up — as
 * the cards pass in front of them. z-index does the occlusion while they're
 * still overlapping; the opacity has to actually reach 0, otherwise the
 * header keeps showing through as a faint ghost once you've scrolled past it.
 *
 * The trigger is a fixed scroll *distance* from the section's own entry
 * ("top top" on the section, then 480px later), not the cards element's
 * position. Position-based triggers (e.g. "cards has reached the header's
 * bottom edge") sound right but aren't: cards sits immediately after header
 * in normal flow, so cards' top is already touching header's bottom at the
 * section's natural resting state, before any scrolling at all — the trigger
 * would fire from the very first frame. That's harmless on desktop, where
 * the header is short relative to the viewport so the fade is barely
 * perceptible before it's already scrolled away, but on mobile — where the
 * stacked character-then-heading layout is much taller relative to a short
 * viewport — it reads as the heading fading out on first sight instead of
 * after real scrolling. A fixed pixel distance sidesteps the geometry
 * entirely: progress is 0 exactly when the section reaches the top of the
 * viewport, full stop, regardless of how tall anything inside it is.
 */
export function slideBehind({ header, section }: SlideBehindOptions) {
  const ctx = gsap.context(() => {
    gsap.to(header, {
      y: -56,
      scale: 0.94,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${FADE_SCROLL_DISTANCE_PX}`,
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
