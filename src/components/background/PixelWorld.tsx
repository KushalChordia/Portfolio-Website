"use client";

import { useEffect, useRef } from "react";
import { parallaxLayers } from "@/animations/scroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CloudBank } from "./CloudBank";
import { Ridge } from "./Ridge";
import { StarField } from "./StarField";
import { TreeLine } from "./TreeLine";

/**
 * THE WORLD
 *
 * A single fixed layer behind the whole page. It never scrolls with the
 * content — instead each band drifts by a different, small amount, which reads
 * as depth without ever pulling focus. The furthest ridge barely moves; the
 * treeline moves most.
 *
 * A gradient scrim sits on top of the art and under the content. It is the
 * reason cards stay legible over a detailed background: contrast is guaranteed
 * by the scrim, not by luck.
 */
export function PixelWorld() {
  const farRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const candidates: Array<{ el: HTMLElement | null; distance: number }> = [
      { el: farRef.current, distance: 26 },
      { el: midRef.current, distance: 58 },
      { el: nearRef.current, distance: 104 },
    ];

    const layers = candidates.flatMap(({ el, distance }) => (el ? [{ el, distance }] : []));

    return parallaxLayers(layers);
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* Sky — a night gradient that never reaches pure black. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#070B1A_0%,#0B1230_38%,#151B48_66%,#1B1F55_100%)]" />

      <StarField />
      <CloudBank />

      {/* Far ridge — hazy, low contrast, almost still. */}
      <div ref={farRef} className="absolute inset-x-0 bottom-0 h-[46vh] will-change-transform">
        <Ridge
          seed={311}
          peaks={7}
          minPeak={90}
          maxPeak={250}
          fill="var(--color-secondary)"
          opacity={0.2}
          className="absolute inset-x-0 bottom-0 h-full w-full"
        />
      </div>

      {/* Mid ridge. */}
      <div ref={midRef} className="absolute inset-x-0 bottom-0 h-[34vh] will-change-transform">
        <Ridge
          seed={787}
          peaks={5}
          minPeak={70}
          maxPeak={220}
          fill="#232A6B"
          opacity={0.85}
          className="absolute inset-x-0 bottom-0 h-full w-full"
        />
      </div>

      {/* Near treeline — the foreground band. */}
      <div ref={nearRef} className="absolute inset-x-0 bottom-0 h-[22vh] will-change-transform">
        <TreeLine className="absolute inset-x-0 bottom-0 h-full w-full" />
      </div>

      {/* Legibility scrim. Sits above every layer of art, below all content. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_0%,rgba(7,11,26,0.35)_55%,rgba(7,11,26,0.82)_100%)]" />
    </div>
  );
}
