"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";

interface TypeOnScrollProps {
  text: string;
  id?: string;
  className?: string;
}

const CHAR_MS = 48;

/**
 * Types a heading exactly once, the moment it scrolls into view.
 *
 * Same "once" guarantee as `TypeOnce` (a ref, not state, survives dev
 * double-mount and repeat scroll-past), but gated on `useInView` instead of
 * mount — this is for headings that start below the fold.
 *
 * The real text is always present via `aria-label`; the animated characters
 * are aria-hidden, so a screen reader hears the whole word immediately.
 */
export function TypeOnScroll({ text, id, className }: TypeOnScrollProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);
  const done = count >= text.length;

  useEffect(() => {
    if (!inView || hasRun.current) return;

    if (prefersReducedMotion) {
      hasRun.current = true;
      setCount(text.length);
      return;
    }

    let timer: number;
    let typed = 0;

    const step = () => {
      // Marked here, not before scheduling — Strict Mode's mount-time
      // effect/cleanup/effect double-invoke would otherwise cancel this timer
      // and then see `hasRun` already true, silently killing the animation.
      hasRun.current = true;
      typed += 1;
      setCount(typed);
      if (typed >= text.length) return;
      timer = window.setTimeout(step, CHAR_MS);
    };

    timer = window.setTimeout(step, CHAR_MS);
    return () => window.clearTimeout(timer);
  }, [inView, prefersReducedMotion, text]);

  const shown = text.slice(0, count);

  return (
    <h2 id={id} ref={ref} className={cn("relative", className)} aria-label={text}>
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0 whitespace-nowrap">
        {shown}
        {!done && <span className="caret ml-1" />}
      </span>
    </h2>
  );
}
