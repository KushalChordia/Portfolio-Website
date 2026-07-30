import { createRng, snap } from "./rng";

/* ==========================================================================
   GENERATED PIXEL ART

   The landscape isn't an image — it's geometry, generated from a fixed seed
   and emitted as SVG paths whose edges only ever step in whole pixels. That
   keeps it crisp at any viewport width, weighs a few kilobytes, and lets each
   layer be parallaxed independently.
   ========================================================================== */

/**
 * A mountain ridge as a staircase silhouette.
 * Peaks are placed on a seeded random walk, then every vertex is snapped to
 * the pixel grid so the outline steps instead of sloping.
 */
export function ridgePath(options: {
  width: number;
  height: number;
  grid: number;
  peaks: number;
  minPeak: number;
  maxPeak: number;
  seed: number;
}): string {
  const { width, height, grid, peaks, minPeak, maxPeak, seed } = options;
  const rng = createRng(seed);

  // Control points across the width, one per peak plus the two edges.
  const nodes: Array<{ x: number; y: number }> = [];
  const span = width / peaks;
  nodes.push({ x: 0, y: height - minPeak * 0.55 });
  for (let i = 0; i < peaks; i += 1) {
    const jitter = (rng() - 0.5) * span * 0.35;
    const peakHeight = minPeak + rng() * (maxPeak - minPeak);
    nodes.push({ x: span * (i + 0.5) + jitter, y: height - peakHeight });
    nodes.push({ x: span * (i + 1), y: height - minPeak * (0.4 + rng() * 0.35) });
  }
  nodes.push({ x: width, y: height - minPeak * 0.5 });

  // Sample the piecewise-linear ridge on the pixel grid.
  const sampleAt = (x: number) => {
    for (let i = 0; i < nodes.length - 1; i += 1) {
      const a = nodes[i];
      const b = nodes[i + 1];
      if (x >= a.x && x <= b.x) {
        const t = b.x === a.x ? 0 : (x - a.x) / (b.x - a.x);
        return a.y + (b.y - a.y) * t;
      }
    }
    return nodes[nodes.length - 1].y;
  };

  let path = `M0,${height}`;
  let prevY = snap(sampleAt(0), grid);
  path += ` L0,${prevY}`;

  for (let x = grid; x <= width; x += grid) {
    const y = snap(sampleAt(x), grid);
    if (y !== prevY) path += ` V${y}`;
    path += ` H${x}`;
    prevY = y;
  }

  path += ` L${width},${height} Z`;
  return path;
}

export interface Conifer {
  points: string;
  trunk: { x: number; y: number; w: number; h: number };
}

/**
 * A treeline of stepped conifers. Each tree is one polygon whose edges rise in
 * discrete steps — the classic pixel-art pine.
 */
export function coniferLine(options: {
  width: number;
  baseline: number;
  count: number;
  grid: number;
  minRows: number;
  maxRows: number;
  seed: number;
}): Conifer[] {
  const { width, baseline, count, grid, minRows, maxRows, seed } = options;
  const rng = createRng(seed);
  const trees: Conifer[] = [];

  for (let i = 0; i < count; i += 1) {
    const rows = Math.round(minRows + rng() * (maxRows - minRows));
    const cx = snap((i + rng() * 0.9) * (width / count), grid);
    const rowH = grid * 2;
    const trunkH = grid * 2;
    const bottom = baseline - trunkH + grid;
    const top = bottom - rows * rowH;

    const left: string[] = [];
    const right: string[] = [];

    for (let r = 0; r < rows; r += 1) {
      const halfW = snap(grid * (0.9 + r * 1.05), grid);
      const yTop = top + r * rowH;
      const yBottom = yTop + rowH;
      left.push(`${cx - halfW},${yTop}`, `${cx - halfW},${yBottom}`);
      right.unshift(`${cx + halfW},${yTop}`, `${cx + halfW},${yBottom}`);
    }

    trees.push({
      points: [`${cx},${top - grid}`, ...left, ...right].join(" "),
      trunk: { x: cx - grid, y: bottom - grid, w: grid * 2, h: trunkH },
    });
  }

  return trees;
}

export interface PixelCloud {
  /** Blocks that make up one cloud, relative to its own origin. */
  blocks: Array<{ x: number; y: number; w: number; h: number }>;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  /** Seconds for one full drift across the sky. */
  duration: number;
  delay: number;
}

/** A bank of chunky pixel clouds, each drifting at its own pace. */
export function cloudBank(options: {
  count: number;
  grid: number;
  seed: number;
}): PixelCloud[] {
  const { count, grid, seed } = options;
  const rng = createRng(seed);
  const clouds: PixelCloud[] = [];

  for (let i = 0; i < count; i += 1) {
    const lobes = 3 + Math.floor(rng() * 3);
    const blocks: PixelCloud["blocks"] = [];
    let cursor = 0;

    for (let l = 0; l < lobes; l += 1) {
      const w = grid * (3 + Math.floor(rng() * 4));
      const h = grid * (1 + Math.floor(rng() * 2));
      blocks.push({ x: cursor, y: -h, w, h });
      cursor += w - grid;
    }
    // Flat base so the cloud reads as one mass, not a row of bricks.
    blocks.push({ x: 0, y: 0, w: cursor + grid, h: grid });

    clouds.push({
      blocks,
      x: rng() * 100,
      y: 6 + rng() * 34,
      scale: 0.7 + rng() * 0.9,
      opacity: 0.2 + rng() * 0.28,
      duration: 150 + rng() * 190,
      delay: -rng() * 200,
    });
  }

  return clouds;
}

export interface Star {
  x: number;
  y: number;
  size: number;
  /** Base brightness, before twinkle. */
  alpha: number;
  /** Independent phase and speed so no two stars pulse together. */
  phase: number;
  speed: number;
  hue: string;
}

/** Star positions for the canvas field. */
export function starField(count: number, seed: number): Star[] {
  const rng = createRng(seed);
  const palette = ["#F4F4F4", "#F4F4F4", "#F4F4F4", "#B8BDD0", "#FFC72C", "#4FA9FF"];

  return Array.from({ length: count }, () => ({
    x: rng(),
    y: rng() * 0.72,
    size: rng() > 0.86 ? 2 : 1,
    alpha: 0.25 + rng() * 0.55,
    phase: rng() * Math.PI * 2,
    speed: 0.25 + rng() * 0.8,
    hue: palette[Math.floor(rng() * palette.length)],
  }));
}
