import type { Transition, Variants } from "framer-motion";

/* ==========================================================================
   MOTION TOKENS
   One motion language for the whole site. Nothing bounces, nothing overshoots,
   nothing is elastic. Durations and easing are declared once here and imported
   everywhere — components never invent their own timing.
   ========================================================================== */

/** cubic-bezier equivalent of GSAP's power3.out */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
/** Symmetrical ease for looping ambient motion (breathing, drifting). */
export const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const;

export const DURATION = {
  press: 0.15,
  hover: 0.25,
  entrance: 0.6,
  section: 0.8,
} as const;

export const GSAP_EASE = "power3.out";

export const transitions = {
  entrance: { duration: DURATION.entrance, ease: EASE_OUT },
  hover: { duration: DURATION.hover, ease: EASE_OUT },
  press: { duration: DURATION.press, ease: EASE_OUT },
  section: { duration: DURATION.section, ease: EASE_OUT },
} satisfies Record<string, Transition>;

/* ==========================================================================
   SHARED VARIANTS
   ========================================================================== */

/** Rise-and-fade. The single entrance gesture used across the site. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.entrance },
};

/** Parent that releases children one after another. */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Interactive feedback shared by buttons, cards and icon targets.
 *  Ceilings from the brief: scale 1.03, translate 8px, rotate 5°. */
export const interactive = {
  card: {
    whileHover: { y: -8, scale: 1.01, transition: transitions.hover },
    whileTap: { scale: 0.995, transition: transitions.press },
  },
  button: {
    whileHover: { scale: 1.03, transition: transitions.hover },
    whileTap: { scale: 0.97, y: 2, transition: transitions.press },
  },
  icon: {
    whileHover: { y: -4, rotate: -5, transition: transitions.hover },
    whileTap: { scale: 0.94, transition: transitions.press },
  },
} as const;

/** How far a section is scrolled into view before it animates in. Sections
 *  begin appearing well before the previous one has left. */
export const VIEWPORT = { once: true, amount: 0.15, margin: "0px 0px -12% 0px" } as const;
