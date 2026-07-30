/**
 * Deterministic pseudo-random generator (mulberry32).
 *
 * The night landscape is generated, not hand-drawn — a fixed seed means the
 * server render and the client hydration agree on every star, cloud and
 * mountain step, so there is no hydration mismatch and no layout shift.
 */
export function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Snap a value to a whole-pixel grid so generated art stays pixel-crisp. */
export function snap(value: number, grid: number): number {
  return Math.round(value / grid) * grid;
}
