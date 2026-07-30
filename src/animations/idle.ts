import type { TargetAndTransition, Transition } from "framer-motion";
import type { CharacterPose } from "@/types";
import { EASE_IN_OUT } from "./motion";

/* ==========================================================================
   CHARACTER IDLE MOTION

   The sprite artwork is final and is never altered — no redraw, no recolour,
   no change to pixel density. Every pose below is expressed purely as CSS
   transforms on the untouched image, with the transform origin set at the
   character's feet so rotation reads as a body sway rather than a spin.

   All amplitudes are deliberately under the brief's ceilings (rotate 5°,
   translate 8px). Where two readings were possible we took the quieter one.
   ========================================================================== */

const loop = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_IN_OUT,
  repeat: Infinity,
  repeatType: "mirror",
});

export interface IdleRecipe {
  /** Applied to the sprite wrapper. */
  animate: TargetAndTransition;
  transition: Transition;
  /** CSS transform-origin for the wrapper. */
  origin: string;
}

export const IDLE: Record<CharacterPose, IdleRecipe> = {
  /** Hero — a continuous, unhurried wave. The raised hand is part of the
   *  sprite, so the wave is carried by a small body rotation. */
  wave: {
    animate: { rotate: [-1.15, 1.15], y: [0, -3] },
    transition: loop(1.45),
    origin: "50% 96%",
  },

  /** Experience — the rhythm of someone typing: a fast, tiny settle. */
  typing: {
    animate: { y: [0, -1.6], rotate: [-0.25, 0.25] },
    transition: loop(0.46),
    origin: "50% 100%",
  },

  /** Competitions — writing. Slower, with the weight shifted into the pen. */
  writing: {
    animate: { rotate: [-0.7, 0.7], x: [0, 2] },
    transition: loop(1.05),
    origin: "42% 100%",
  },

  /** Contact — standing still, arms folded. Breath only. */
  folded: {
    animate: { y: [0, -4], scaleY: [1, 1.006] },
    transition: loop(3.4),
    origin: "50% 100%",
  },
};

/** Blink cadence: a natural, irregular 3.4–7.4s gap, 110ms closed. */
export const BLINK = {
  closedMs: 110,
  minGapMs: 3400,
  maxGapMs: 7400,
} as const;

/** Glitch cadence: frequent enough to actually be noticed. Duration must
 *  match the `character-glitch` keyframe length in globals.css. */
export const GLITCH = {
  durationMs: 650,
  minGapMs: 3000,
  maxGapMs: 6000,
} as const;
