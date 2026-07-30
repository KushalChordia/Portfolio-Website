"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { starField } from "@/utils/pixelArt";

const STAR_COUNT = 150;

/**
 * The star layer.
 *
 * Canvas rather than 150 DOM nodes: one composited surface, one rAF loop, no
 * layout cost. Stars are drawn as whole-pixel squares — no anti-aliasing, no
 * glow — so they belong to the same pixel grid as everything else.
 *
 * The loop stops when the tab is hidden and never starts at all if the user
 * prefers reduced motion (the field is still painted, just held still).
 */
export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const stars = starField(STAR_COUNT, 20260729);
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        // Each star has its own phase and speed, so the field shimmers
        // rather than pulsing in unison.
        const twinkle = prefersReducedMotion
          ? 1
          : 0.55 + 0.45 * Math.sin(time * 0.001 * star.speed + star.phase);
        ctx.globalAlpha = star.alpha * twinkle;
        ctx.fillStyle = star.hue;
        ctx.fillRect(
          Math.round(star.x * width),
          Math.round(star.y * height),
          star.size,
          star.size,
        );
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      if (!running) return;
      draw(time);
      frame = window.requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        window.cancelAnimationFrame(frame);
      } else if (!prefersReducedMotion) {
        running = true;
        frame = window.requestAnimationFrame(loop);
      }
    };

    resize();

    if (prefersReducedMotion) {
      draw(0);
    } else {
      frame = window.requestAnimationFrame(loop);
    }

    const observer = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
