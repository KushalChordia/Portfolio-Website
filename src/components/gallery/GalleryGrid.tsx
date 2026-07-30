"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { cn } from "@/utils/cn";

interface GalleryGridProps {
  photos: string[];
}

/* Every 5th tile is a 2x2 feature, the rest stay 1x1. A 2x2 block at the
   widest (4-col) breakpoint leaves a 4-cell notch beside it that only the
   following 4 plain tiles close — so a feature is only allowed when 4
   fillers still follow it. Otherwise it'd sit orphaned with empty cells
   around it, same hole bug as a plain row/col-span pattern. Only square
   shapes ever appear, so grid-flow-dense always has a piece that fits any
   leftover cell — the bento packs edge to edge with no holes. */
const FEATURE_EVERY = 5;
const isFeature = (index: number, total: number) => index % FEATURE_EVERY === 0 && index + 4 < total;

/**
 * Grid of event photos that opens into a full-screen lightbox on click.
 * Keyboard: Escape closes, arrow keys step through — same set as any native
 * image viewer, so nothing here needs explaining on the page itself.
 */
export function GalleryGrid({ photos }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((index) => (index === null ? null : (index - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const showNext = useCallback(
    () => setActiveIndex((index) => (index === null ? null : (index + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, showPrev, showNext]);

  return (
    <>
      <div className="mt-10 grid grid-flow-dense grid-cols-2 auto-rows-[140px] gap-3 sm:grid-cols-3 sm:auto-rows-[160px] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[190px]">
        {photos.map((src, index) => {
          const feature = isFeature(index, photos.length);
          return (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open photo ${index + 1} of ${photos.length}`}
              className={cn(
                "group relative overflow-hidden rounded-lg border border-line/80 bg-void shadow-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "hover:border-azure/50 hover:shadow-xl hover:shadow-azure/10",
                feature && "col-span-2 row-span-2",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes={
                  feature
                    ? "(max-width: 639px) 100vw, (max-width: 1023px) 66vw, 50vw"
                    : "(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                }
                className="object-cover grayscale-[45%] contrast-[1.05] brightness-[0.92] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:grayscale-0 group-hover:brightness-100"
              />
              {/* Permanent letterbox vignette for a moodier, cinematic base state */}
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/0 to-void/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-2.5 left-3 font-pixel text-[0.625rem] tracking-wide text-chalk/90">
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
          className="fixed inset-0 z-[100] flex animate-lightbox-in items-center justify-center bg-void/92 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-lg border border-line font-pixel text-xl text-chalk transition-colors duration-250 hover:border-azure/60 sm:right-6 sm:top-6"
          >
            ×
          </button>

          {photos.length > 1 && (
            <>
              <NavButton
                direction="prev"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrev();
                }}
              />
              <NavButton
                direction="next"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
              />
            </>
          )}

          <div
            className="relative h-full w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={photos[activeIndex]}
              src={photos[activeIndex]}
              alt={`Event photo ${activeIndex + 1} of ${photos.length}`}
              fill
              sizes="100vw"
              className="animate-lightbox-in object-contain"
              priority
            />
          </div>

          <div
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 sm:bottom-6"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="rounded-lg border border-line bg-void/80 px-3 py-1.5 font-pixel text-[0.6875rem] text-chalk">
              {activeIndex + 1} / {photos.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: (event: MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous photo" : "Next photo"}
      className={cn(
        "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg border border-line text-chalk transition-colors duration-250 hover:border-azure/60",
        direction === "prev" ? "left-2 sm:left-6" : "right-2 sm:right-6",
      )}
    >
      <PixelIcon name="arrow" size={22} className={direction === "prev" ? "rotate-180" : undefined} />
    </button>
  );
}
