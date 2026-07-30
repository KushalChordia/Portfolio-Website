"use client";

import { useEffect, useRef, useState } from "react";
import { Character } from "@/components/character/Character";
import { CompetitionMark } from "@/components/ui/CompetitionMark";
import { Highlighted } from "@/components/ui/Highlighted";
import { PixelBadge } from "@/components/ui/PixelBadge";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { slideBehind } from "@/animations/scroll";
import { COMPETITIONS } from "@/constants/content";
import type { Competition } from "@/types";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ACCENT_BORDER, ACCENT_TEXT } from "@/utils/accents";
import { cn } from "@/utils/cn";

/**
 * COMPETITIONS
 *
 * Same pinned-header choreography as Experience: the heading and character
 * stay put while the card stack rides up over them, then recede — dimming,
 * easing back — as the cards pass in front.
 *
 * Three results, three identical cards. The mark, the badge and the tag row
 * hold the same position and the same dimensions in all three, so the eye can
 * compare placements down the column without re-reading the layout each time.
 *
 * On mobile the row becomes a stack: mark and badge sit shoulder to shoulder
 * at the top, then the description, then the tags.
 */
export function CompetitionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const header = headerRef.current;
    const section = sectionRef.current;
    if (!header || !section) return;

    return slideBehind({ header, section });
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="competitions"
      aria-labelledby="competitions-heading"
      className="relative scroll-mt-[var(--nav-h)] pt-10 pb-16 lg:pt-16 lg:pb-20"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div
          ref={headerRef}
          className="sticky top-[calc(var(--nav-h)+1.5rem)] z-0 flex items-end justify-between gap-6 will-change-transform"
        >
          <SectionHeading
            id="competitions-heading"
            icon="trophy"
            title="Competitions"
            subtitle="Building Products Under Pressure"
            iconClass="text-primary"
          />

          <Character
            pose="writing"
            className="hidden w-[clamp(160px,20vw,290px)] md:block"
            sizes="(max-width: 767px) 0px, 20vw"
          />
        </div>

        <RevealGroup className="relative z-10 mt-3 space-y-6 lg:mt-4" gap={0.1}>
          {COMPETITIONS.map((competition) => (
            <RevealItem key={competition.title}>
              <PixelCard accent={competition.accent} className="p-5 sm:p-7 lg:p-8">
                <article>
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                    {/* Mark + badge share a row on mobile, split apart on desktop */}
                    <div className="flex items-start justify-between gap-4 lg:block">
                      <CompetitionMark
                        logo={competition.logo}
                        org={competition.org}
                        accent={competition.accent}
                      />
                      <div className="lg:hidden">
                        <PixelBadge
                          place={competition.place}
                          scale={competition.scale}
                          accent={competition.accent}
                        />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-pixel text-lg leading-snug text-chalk sm:text-xl lg:text-2xl">
                        {competition.title}
                      </h3>

                      <CompetitionLines competition={competition} />

                      <div className="mt-5 border-t border-dashed border-line pt-5">
                        <ul className="flex flex-wrap gap-2.5" aria-label="Focus areas">
                          {competition.tags.map((tag) => (
                            <li key={tag}>
                              <span
                                className={cn(
                                  "inline-block rounded-md border px-3 py-1.5 font-pixel text-[0.6875rem]",
                                  ACCENT_BORDER[competition.accent],
                                  ACCENT_TEXT[competition.accent],
                                )}
                              >
                                {tag}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="hidden lg:block">
                      <PixelBadge
                        place={competition.place}
                        scale={competition.scale}
                        accent={competition.accent}
                      />
                    </div>
                  </div>
                </article>
              </PixelCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/**
 * First paragraph always shows. The rest collapses behind "View more" — these
 * write-ups run long, and showing all of them by default would make the
 * column impossible to scan. The grid-rows trick animates height without
 * ever measuring the collapsed content in JS.
 */
function CompetitionLines({ competition }: { competition: Competition }) {
  const [expanded, setExpanded] = useState(false);
  const [first, ...rest] = competition.lines;
  const hasMore = rest.length > 0;

  return (
    <div className="mt-4">
      <Highlighted text={first} accent={competition.accent} className="text-sm leading-relaxed" />

      {hasMore && (
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="space-y-2 pt-2">
              {rest.map((line) => (
                <Highlighted
                  key={line.slice(0, 24)}
                  text={line}
                  accent={competition.accent}
                  className="text-sm leading-relaxed"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className={cn(
            "mt-3 flex items-center gap-1.5 font-pixel text-[0.6875rem] uppercase tracking-wide",
            "transition-opacity duration-250 hover:opacity-75",
            ACCENT_TEXT[competition.accent],
          )}
        >
          {expanded ? "View less" : "View more"}
          <PixelIcon
            name="arrow"
            size={12}
            className={cn("transition-transform duration-250", expanded ? "-rotate-90" : "rotate-90")}
          />
        </button>
      )}
    </div>
  );
}
