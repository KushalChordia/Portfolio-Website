import { cloudBank } from "@/utils/pixelArt";

const GRID = 6;
const CLOUDS = cloudBank({ count: 9, grid: GRID, seed: 4417 });

/**
 * Clouds drift on pure CSS transforms — no JS, no scroll listener — so they
 * cost nothing per frame and keep moving while the main thread is busy.
 *
 * Two nested elements on purpose: the outer one owns the drift animation, the
 * inner one owns the scale. If both lived on one element, the animation's
 * transform would overwrite the scale.
 *
 * Each cloud gets a negative delay proportional to its starting position, so
 * the sky is already mid-drift on first paint instead of starting from a neat
 * line-up at the left edge.
 */
export function CloudBank() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {CLOUDS.map((cloud, index) => (
        <div
          key={index}
          className="absolute left-0 w-max will-change-transform motion-safe:animate-cloud-drift"
          style={{
            top: `${cloud.y}%`,
            opacity: cloud.opacity,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${-(cloud.x / 100) * cloud.duration}s`,
          }}
        >
          <div style={{ transform: `scale(${cloud.scale})`, transformOrigin: "left center" }}>
            <svg
              width={150}
              height={44}
              viewBox="0 0 150 44"
              fill="none"
              shapeRendering="crispEdges"
              className="overflow-visible"
            >
              <g transform="translate(0, 30)">
                {cloud.blocks.map((block, i) => (
                  <rect
                    key={i}
                    x={block.x}
                    y={block.y}
                    width={block.w}
                    height={block.h}
                    fill="var(--color-secondary)"
                  />
                ))}
              </g>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
