"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Character } from "@/components/character/Character";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { slideBehind } from "@/animations/scroll";
import { ECELL, KOTAK, TIMELINE } from "@/constants/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ACCENT_BORDER, ACCENT_RULE, ACCENT_TEXT } from "@/utils/accents";
import { cn } from "@/utils/cn";

/**
 * EXPERIENCE
 *
 * The heading and the character stay pinned while the cards travel up over
 * them. Two mechanisms, doing different jobs:
 *
 *   • `position: sticky` plus z-index does the occlusion. The cards are simply
 *     in front. This works with no JavaScript at all, which is why the section
 *     still behaves correctly under reduced motion.
 *   • A scrubbed GSAP tween adds the depth cue — the header eases back, dims
 *     and drifts up as the cards arrive. Because it is scrubbed rather than
 *     played, scrolling back up retraces the identical frames in reverse.
 */
export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const header = headerRef.current;
    const cards = cardsRef.current;
    const section = sectionRef.current;
    if (!header || !cards || !section) return;

    return slideBehind({ header, cards, section });
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="relative scroll-mt-[var(--nav-h)] pt-10 pb-16 lg:pt-16 lg:pb-20"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* Pinned header + character                                        */}
        {/* ---------------------------------------------------------------- */}
        <div
          ref={headerRef}
          className="sticky top-[calc(var(--nav-h)+1.5rem)] z-0 will-change-transform"
        >
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              id="experience-heading"
              icon="briefcase"
              title="Experience"
              subtitle="Where I've Been"
              iconClass="text-primary"
            />
            <Character
              pose="typing"
              className="hidden w-[clamp(170px,22vw,320px)] md:block"
              sizes="(max-width: 767px) 0px, 22vw"
            />
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Cards — these ride up over the header                            */}
        {/* ---------------------------------------------------------------- */}
        <div ref={cardsRef} className="relative z-10 mt-3 space-y-8 lg:mt-4">
          {/* Kotak Securities */}
          <Reveal>
            <PixelCard
              accent="secondary"
              surface="bg-surface/97"
              className="p-6 sm:p-8 lg:p-10"
            >
              <header className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative h-8 w-8 shrink-0 overflow-hidden rounded-md border-2 sm:h-9 sm:w-9",
                    ACCENT_BORDER.secondary,
                  )}
                >
                  <Image src="/icons/Kotak.jpg" alt="" fill sizes="36px" className="object-cover" />
                </span>
                <h3 className="font-pixel text-lg text-secondary sm:text-xl">
                  {KOTAK.company}
                </h3>
                <span aria-hidden="true" className="font-pixel text-muted">
                  —
                </span>
                <p className="font-pixel text-base text-chalk sm:text-lg">{KOTAK.role}</p>
              </header>

              <div className="mt-6 space-y-4">
                {KOTAK.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="text-sm leading-relaxed sm:text-[0.9375rem]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </PixelCard>
          </Reveal>

          {/* E-Cell timeline — the whole card opens the event photo gallery */}
          <Reveal>
            <Link
              href="/ecell"
              aria-label={`${ECELL.org} — view the event photo gallery`}
              className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure/60"
            >
              <PixelCard
                accent="azure"
                surface="bg-surface/97"
                className="p-6 sm:p-8 lg:p-10"
              >
                <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <div className="flex flex-wrap items-center gap-x-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative h-8 w-8 shrink-0 overflow-hidden rounded-md border-2 sm:h-9 sm:w-9",
                        ACCENT_BORDER.azure,
                      )}
                    >
                      <Image src="/icons/ECell.jpg" alt="" fill sizes="36px" className="object-cover" />
                    </span>
                    <h3 className="font-pixel text-lg text-azure sm:text-xl">{ECELL.org}</h3>
                    <span aria-hidden="true" className="text-muted/50">
                      |
                    </span>
                    <p className="font-pixel text-base text-chalk sm:text-lg">{ECELL.team}</p>
                  </div>

                  <span className="flex items-center gap-1.5 font-pixel text-xs text-azure sm:text-sm">
                    View Gallery
                    <PixelIcon
                      name="arrow"
                      size={16}
                      className="transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                    />
                  </span>
                </header>

                <ol className="mt-9 space-y-9 md:space-y-11">
                  {TIMELINE.map((entry, index) => (
                    <li
                      key={entry.period}
                      className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-4 gap-y-4 md:grid-cols-[10rem_2.5rem_minmax(0,1fr)] md:gap-x-2"
                    >
                      {/* Period + role chip */}
                      <div className="col-span-2 md:col-span-1 md:col-start-1 md:row-start-1">
                        <div
                          className={cn(
                            "rounded-lg border px-4 py-3 text-center md:px-3",
                            ACCENT_BORDER[entry.accent],
                          )}
                        >
                          <p className={cn("font-pixel text-sm", ACCENT_TEXT[entry.accent])}>
                            {entry.period}
                          </p>
                          <div className="my-2 h-px bg-line" />
                          <p className="font-body text-[0.8125rem] text-chalk">{entry.role}</p>
                        </div>
                      </div>

                      {/* Rail */}
                      <div className="relative col-start-1 row-start-2 flex justify-center md:col-start-2 md:row-start-1 md:items-start md:pt-5">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-surface md:mt-0",
                            ACCENT_RULE[entry.accent],
                          )}
                        />
                        {index < TIMELINE.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="absolute top-5 -bottom-11 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-line md:top-9"
                          />
                        )}
                      </div>

                      {/* Body */}
                      <div className="col-start-2 row-start-2 md:col-start-3 md:row-start-1">
                        <div
                          className={cn(
                            "rounded-lg border bg-void/40 p-4 sm:p-5",
                            ACCENT_BORDER[entry.accent],
                          )}
                        >
                          <h4
                            className={cn(
                              "font-pixel text-[0.9375rem] leading-snug sm:text-base",
                              ACCENT_TEXT[entry.accent],
                            )}
                          >
                            {entry.headline}
                          </h4>
                          <p className="mt-3 text-sm leading-relaxed">{entry.body}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </PixelCard>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
