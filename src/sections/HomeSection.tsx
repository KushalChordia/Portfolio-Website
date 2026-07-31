"use client";

import { useEffect, useRef } from "react";
import { Character } from "@/components/character/Character";
import { PixelButton } from "@/components/ui/PixelButton";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { TypeOnce } from "@/components/ui/TypeOnce";
import { slideBehind } from "@/animations/scroll";
import { FEATURES, HERO } from "@/constants/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { scrollToSection } from "@/hooks/useSmoothScroll";
import { ACCENT_TEXT } from "@/utils/accents";

/**
 * HOME
 *
 * Same pinned-header choreography as Experience and Competitions: the hero
 * copy and character stay put while the feature cards ride up over them,
 * then recede as the cards pass in front.
 *
 * Desktop: text left, character right, four feature cards along the bottom.
 * Mobile: the character takes the top ~38vh and the heading stacks underneath
 * it, and the four cards become a snap carousel — a different layout, not a
 * shrunken one.
 *
 * DOM order is heading-first in both cases; the character is moved above it on
 * small screens with `order`, so assistive tech always meets the h1 first.
 */
export function HomeSection() {
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
      id="home"
      aria-labelledby="home-heading"
      className="relative flex min-h-svh scroll-mt-[var(--nav-h)] flex-col pt-[var(--nav-h)]"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 sm:px-8">
        <div
          ref={headerRef}
          className="sticky top-[calc(var(--nav-h)+1.5rem)] z-0 flex flex-col items-center gap-2 will-change-transform lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-10"
        >
          {/* ---------------------------------------------------------------- */}
          {/* Copy                                                             */}
          {/* ---------------------------------------------------------------- */}
          <div className="w-full max-w-xl text-center lg:max-w-none lg:text-left">
            <TypeOnce
              id="home-heading"
              lines={[HERO.greeting, HERO.name]}
              className="font-pixel"
              lineOneClass="text-[1.75rem] leading-[1.05] text-chalk sm:text-[2.5rem] lg:text-[3.25rem] xl:text-[3.75rem]"
              lineTwoClass="text-[2.25rem] leading-[1.05] text-primary sm:text-[3.25rem] lg:text-[4.25rem] xl:text-[5rem]"
            />

            <Reveal delay={0.55}>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base lg:mx-0 lg:max-w-lg">
                {HERO.subheading}
              </p>
            </Reveal>

            <Reveal delay={0.68}>
              <div className="mt-5 flex justify-center lg:justify-start">
                <PixelButton
                  label={HERO.cta.label}
                  onClick={() => scrollToSection(HERO.cta.target)}
                />
              </div>
            </Reveal>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Character                                                        */}
          {/* ---------------------------------------------------------------- */}
          <div className="order-first flex w-full justify-center lg:order-none lg:justify-end">
            <Character
              pose="wave"
              priority
              glitch
              className="h-[20svh] w-auto max-w-[48vw] sm:h-[24svh] lg:h-auto lg:w-[clamp(190px,18vw,260px)] lg:max-w-none"
              sizes="(max-width: 1023px) 48vw, 18vw"
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Feature cards                                                      */}
      {/* ------------------------------------------------------------------ */}
      <RevealGroup
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-3 pb-4 sm:px-8 lg:pt-2 lg:pb-4"
        gap={0.07}
      >
        {/* Named so the h1 -> h3 jump doesn't leave a hole in the outline.
            Visible users get the numbering; screen readers get the label. */}
        <h2 id="features-heading" className="sr-only">
          What I spend my time on
        </h2>
        <ul
          aria-labelledby="features-heading"
          className="snap-rail no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0"
        >
          {FEATURES.map((feature) => (
            <li
              key={feature.index}
              className="w-[80%] max-w-sm shrink-0 snap-center sm:w-[58%] lg:w-auto lg:max-w-none lg:shrink"
            >
              <PixelCard accent={feature.accent} staggered className="h-full p-4 sm:p-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-pixel text-lg text-primary">{feature.index}</span>
                  <h3
                    className={`font-pixel text-[0.9375rem] sm:text-base ${ACCENT_TEXT[feature.accent]}`}
                  >
                    {feature.title}
                  </h3>
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <PixelIcon
                    name={feature.icon}
                    size={32}
                    className={ACCENT_TEXT[feature.accent]}
                  />
                  <p className="text-[0.8125rem] leading-snug text-muted">{feature.body}</p>
                </div>
              </PixelCard>
            </li>
          ))}
        </ul>
      </RevealGroup>
    </section>
  );
}
