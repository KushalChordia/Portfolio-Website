"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { interactive, rise } from "@/animations/motion";
import type { Accent } from "@/types";
import { ACCENT_HOVER_BORDER } from "@/utils/accents";
import { cn } from "@/utils/cn";

interface PixelCardProps {
  children: ReactNode;
  accent?: Accent;
  className?: string;
  /** Set when the card lives inside a RevealGroup and should inherit stagger. */
  staggered?: boolean;
  interactiveCard?: boolean;
  /**
   * Background utility. Cards that scroll over the pinned Experience header
   * need to be opaque enough to occlude it; everywhere else a touch of the
   * night sky reads through. Passed as a prop rather than merged into
   * `className` so two background utilities can never collide.
   */
  surface?: string;
  /**
   * Border utility. Same reasoning as `surface` — width and colour travel
   * together as one prop so `border` and `border-2` can never both apply and
   * leave the winner up to stylesheet order.
   */
  frame?: string;
}

/**
 * The one card in the system.
 *
 * Every surface on the page — feature, experience, competition, contact —
 * is this component with different contents. Same radius, same border weight,
 * same padding scale, same hover. That consistency is doing more work for the
 * design than any individual flourish would.
 *
 * Hover lifts 8px (the brief's ceiling) and warms the border toward the card's
 * accent. No glow, no scale beyond 1.01, no shadow bloom.
 */
export function PixelCard({
  children,
  accent = "secondary",
  className,
  staggered = false,
  interactiveCard = true,
  surface = "bg-surface/85",
  frame = "border border-line",
}: PixelCardProps) {
  return (
    <motion.div
      variants={staggered ? rise : undefined}
      {...(interactiveCard ? interactive.card : {})}
      className={cn(
        "relative rounded-xl backdrop-blur-[2px]",
        frame,
        surface,
        "shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)]",
        "transition-colors duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
        interactiveCard && ACCENT_HOVER_BORDER[accent],
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
