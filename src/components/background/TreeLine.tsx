import { coniferLine } from "@/utils/pixelArt";

const WIDTH = 1600;
const HEIGHT = 200;
const GRID = 5;

const TREES = coniferLine({
  width: WIDTH,
  baseline: HEIGHT,
  count: 34,
  grid: GRID,
  minRows: 4,
  maxRows: 8,
  seed: 90210,
});

/**
 * The nearest layer of the world: a stepped-pine treeline. It sits closest to
 * the reader, so it takes the largest parallax offset and the deepest colour —
 * dark enough to read as foreground without ever competing with the cards.
 */
export function TreeLine({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      className={className}
    >
      {TREES.map((tree, index) => (
        <g key={index}>
          <rect
            x={tree.trunk.x}
            y={tree.trunk.y}
            width={tree.trunk.w}
            height={tree.trunk.h}
            fill="#0A1A16"
          />
          <polygon points={tree.points} fill="#0E2A22" />
        </g>
      ))}
    </svg>
  );
}
