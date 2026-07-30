import { ridgePath } from "@/utils/pixelArt";

interface RidgeProps {
  seed: number;
  peaks: number;
  minPeak: number;
  maxPeak: number;
  /** Fill colour token, e.g. "var(--color-secondary)". */
  fill: string;
  opacity: number;
  className?: string;
}

const WIDTH = 1600;
const HEIGHT = 320;
const GRID = 8;

/**
 * One mountain ridge. Stacking two or three of these at different opacities
 * and parallax rates is what gives the horizon depth.
 *
 * `preserveAspectRatio="none"` lets a single generated path stretch to any
 * viewport width without regenerating geometry; `shapeRendering="crispEdges"`
 * keeps the staircase silhouette free of anti-aliasing.
 */
export function Ridge({ seed, peaks, minPeak, maxPeak, fill, opacity, className }: RidgeProps) {
  const d = ridgePath({
    width: WIDTH,
    height: HEIGHT,
    grid: GRID,
    peaks,
    minPeak,
    maxPeak,
    seed,
  });

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      className={className}
    >
      <path d={d} fill={fill} opacity={opacity} />
    </svg>
  );
}
