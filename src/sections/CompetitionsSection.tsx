"use client";

import { Character } from "@/components/character/Character";
import { CompetitionMark } from "@/components/ui/CompetitionMark";
import { PixelBadge } from "@/components/ui/PixelBadge";
import { PixelCard } from "@/components/ui/PixelCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COMPETITIONS } from "@/constants/content";
import { ACCENT_BORDER, ACCENT_TEXT } from "@/utils/accents";
import { cn } from "@/utils/cn";

/**
 * COMPETITIONS
 *
 * Three results, three identical cards. The mark, the badge and the tag row
 * hold the same position and the same dimensions in all three, so the eye can
 * compare placements down the column without re-reading the layout each time.
 *
 * On mobile the row becomes a stack: mark and badge sit shoulder to shoulder
 * at the top, then the description, then the tags.
 */
export function CompetitionsSection() {
  return (
    <section
      id="competitions"
      aria-labelledby="competitions-heading"
      className="relative scroll-mt-[var(--nav-h)] pt-10 pb-16 lg:pt-16 lg:pb-20"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              id="competitions-heading"
              icon="trophy"
              title="Competitions"
              subtitle="Building Products Under Pressure"
              iconClass="text-primary"
            />
          </Reveal>

          <Character
            pose="writing"
            className="hidden w-[clamp(160px,20vw,290px)] md:block"
            sizes="(max-width: 767px) 0px, 20vw"
          />
        </div>

        <RevealGroup className="mt-3 space-y-6 lg:mt-4" gap={0.1}>
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

                      <div className="mt-4 space-y-2">
                        {competition.lines.map((line) => (
                          <p key={line.slice(0, 24)} className="text-sm leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>

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
