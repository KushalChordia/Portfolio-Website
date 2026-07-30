"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";

interface TypeOnceProps {
  /** Line 1 and line 2 of the hero heading, typed in order. */
  lines: readonly [string, string];
  /** Applied to the rendered <h1> so a section can reference it. */
  id?: string;
  className?: string;
  lineOneClass?: string;
  lineTwoClass?: string;
}

const CHAR_MS = 62;
const LINE_PAUSE_MS = 280;
const START_DELAY_MS = 380;

/**
 * Types the hero heading exactly once.
 *
 * "Once" is enforced by a ref rather than by state, so React's development
 * double-mount can't restart it and neither can a re-render from anywhere
 * else on the page. Scrolling away and back leaves the finished text alone.
 *
 * Accessibility: the real heading text is always present for assistive tech
 * via aria-label, and the animated characters are hidden from it. A screen
 * reader hears "Hi, I'm Kushal." immediately, never a stream of partial words.
 * With reduced motion the text is simply there on first paint.
 */
export function TypeOnce({ id, lines, className, lineOneClass, lineTwoClass }: TypeOnceProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  const full = lines[0].length + lines[1].length;
  const done = count >= full;

  useEffect(() => {
    if (hasRun.current) return;

    if (prefersReducedMotion) {
      hasRun.current = true;
      setCount(full);
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
      if (typed >= full) return;
      // A beat between the two lines, as if drawing breath.
      const isLineBreak = typed === lines[0].length;
      timer = window.setTimeout(step, isLineBreak ? LINE_PAUSE_MS : CHAR_MS);
    };

    timer = window.setTimeout(step, START_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, full, lines]);

  const firstShown = lines[0].slice(0, Math.min(count, lines[0].length));
  const secondShown = lines[1].slice(0, Math.max(0, count - lines[0].length));

  return (
    <h1 id={id} className={className} aria-label={`${lines[0]} ${lines[1]}`}>
      {/* Each line reserves its finished box with an invisible ghost, and the
          typed characters are painted over it. Nothing on the page moves while
          the heading types itself in — cumulative layout shift stays at zero. */}
      <span aria-hidden="true" className="block">
        <span className={cn("relative block", lineOneClass)}>
          <span className="invisible">{lines[0]}</span>
          <span className="absolute inset-0">{firstShown}</span>
        </span>
        <span className={cn("relative block", lineTwoClass)}>
          <span className="invisible">{lines[1]}</span>
          <span className="absolute inset-0 whitespace-nowrap">
            {secondShown}
            {!done && <span className="caret ml-1" />}
          </span>
        </span>
      </span>
    </h1>
  );
}
