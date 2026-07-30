"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BLINK, IDLE } from "@/animations/idle";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SPRITES } from "@/constants/site";
import type { CharacterPose } from "@/types";
import { cn } from "@/utils/cn";

interface CharacterProps {
  pose: CharacterPose;
  /** Responsive width classes, e.g. "w-[220px] lg:w-[420px]". Height follows
   *  from the sprite's own aspect ratio, so it can never be distorted. */
  className?: string;
  /** next/image `sizes` hint — keep it aligned with the width classes. */
  sizes: string;
  priority?: boolean;
  /** Turn the blink off where the face renders too small for it to register. */
  blink?: boolean;
}

/**
 * THE CHARACTER
 *
 * The sprite is final artwork. This component never redraws it, never
 * recolours it, never resamples it and never changes its pixel density.
 * `image-rendering: pixelated` keeps every source pixel square, the aspect
 * ratio is locked to the sprite's own dimensions, and everything that moves is
 * a CSS transform on the untouched image.
 *
 * Two things are alive at once:
 *   1. an idle loop from `animations/idle.ts`, chosen by pose — a wave, the
 *      rhythm of typing, the weight of writing, or plain breathing;
 *   2. a blink, on an irregular 3.4–7.4s cadence.
 *
 * The blink deserves a note. The character wears glasses, so painting an
 * eyelid over the eyes would erase the frame and read as a glitch. Instead the
 * strip of pixels immediately above the eyes — brow and skin — is cloned from
 * the sprite itself and slid down over them for 110ms, so the blink is made
 * entirely of the character's own pixels. `eyeBandTop` and `eyeBandHeight` in
 * `constants/site.ts` are the only two numbers to touch if a sprite changes.
 */
export function Character({
  pose,
  className,
  sizes,
  priority = false,
  blink = true,
}: CharacterProps) {
  const sprite = SPRITES[pose];
  const idle = IDLE[pose];
  const prefersReducedMotion = usePrefersReducedMotion();
  const isBlinking = useBlink(blink && !prefersReducedMotion);

  return (
    <motion.div
      className={cn("relative select-none", className)}
      style={{
        transformOrigin: idle.origin,
        aspectRatio: `${sprite.width} / ${sprite.height}`,
      }}
      animate={prefersReducedMotion ? undefined : idle.animate}
      transition={prefersReducedMotion ? undefined : idle.transition}
    >
      <Image
        src={sprite.src}
        alt={sprite.alt}
        width={sprite.width}
        height={sprite.height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
        draggable={false}
        className="pixelated h-full w-full object-contain"
      />

      {blink && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 overflow-hidden"
          style={{
            top: `${sprite.eyeBandTop}%`,
            height: `${sprite.eyeBandHeight}%`,
            opacity: isBlinking ? 1 : 0,
          }}
        >
          {/* A full-size copy of the sprite, pulled up so the band of pixels
              just above the eyes lands exactly over them. The inner element is
              always the same height as the character, which is what makes the
              offset a simple subtraction. */}
          <div
            className="absolute inset-x-0 top-0"
            style={{
              height: `${10000 / sprite.eyeBandHeight}%`,
              transform: `translateY(-${sprite.eyeBandTop - sprite.eyeBandHeight}%)`,
            }}
          >
            <Image
              src={sprite.src}
              alt=""
              width={sprite.width}
              height={sprite.height}
              sizes={sizes}
              draggable={false}
              className="pixelated h-full w-full object-contain"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

/**
 * Blink timing. Real blinks aren't metronomic, so each gap is redrawn from a
 * 3.4–7.4s range. Timers are torn down on unmount and never scheduled at all
 * when blinking is off.
 */
function useBlink(enabled: boolean): boolean {
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setClosed(false);
      return;
    }

    let openTimer: number;
    let nextTimer: number;

    const schedule = () => {
      const gap = BLINK.minGapMs + Math.random() * (BLINK.maxGapMs - BLINK.minGapMs);
      nextTimer = window.setTimeout(() => {
        setClosed(true);
        openTimer = window.setTimeout(() => {
          setClosed(false);
          schedule();
        }, BLINK.closedMs);
      }, gap);
    };

    schedule();

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(nextTimer);
    };
  }, [enabled]);

  return closed;
}
