"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { rise, stagger, VIEWPORT } from "@/animations/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds before this element starts its entrance. */
  delay?: number;
  as?: "div" | "li" | "section" | "header";
}

/**
 * The site's single entrance gesture: rise 24px and fade, 600ms, power3.out.
 *
 * `VIEWPORT.margin` fires it while the element is still below the fold, which
 * is what makes each section start appearing before the previous one has
 * finished leaving. `once: true` means nothing re-animates on the way back up.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

/** Parent wrapper that releases its Reveal children in sequence. */
export function RevealGroup({
  children,
  className,
  gap = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

/** Child of RevealGroup — inherits the parent's stagger timing. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={rise}>
      {children}
    </motion.div>
  );
}
