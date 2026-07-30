"use client";

import { motion } from "framer-motion";
import { Character } from "@/components/character/Character";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { interactive } from "@/animations/motion";
import { CONTACT_CHANNELS, SOCIALS } from "@/constants/content";
import { ACCENT_BORDER, ACCENT_TEXT } from "@/utils/accents";
import { cn } from "@/utils/cn";

/**
 * CONTACT
 *
 * Sized to exactly one screen below the fixed nav — `min-h-[calc(100svh-var(--nav-h))]`
 * with the content centred, so there is nothing to scroll past once you
 * arrive: the section's bottom lands exactly at the viewport's bottom rather
 * than spilling `--nav-h` worth of content past it. Every value is a real
 * link: the number dials, the address opens a compose window, the two social
 * marks open in a new tab. Nothing here is text you have to retype.
 *
 * On mobile it becomes two stacked columns, character first.
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative flex min-h-[calc(100svh-var(--nav-h))] scroll-mt-[var(--nav-h)] items-center py-4 lg:py-5"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-2 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-2">
          {/* ---------------------------------------------------------------- */}
          {/* Card                                                             */}
          {/* ---------------------------------------------------------------- */}
          <div className="order-2 w-full max-w-xl lg:order-none lg:max-w-none">
            <Reveal>
              <SectionHeading
                id="contact-heading"
                icon="envelope"
                title="Contact Me"
                subtitle="Let's build something great together."
                iconClass="text-secondary"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <PixelCard
                accent="secondary"
                interactiveCard={false}
                surface="bg-surface/92"
                frame="border-2 border-secondary/40"
                className="corner-ticks mt-4 p-4 text-secondary/70 sm:mt-5 sm:p-6"
              >
                <ul className="divide-y divide-dashed divide-line">
                  {CONTACT_CHANNELS.map((channel) => (
                    <li key={channel.label} className="py-2.5 first:pt-0">
                      <motion.a
                        href={channel.href}
                        {...interactive.icon}
                        className="group flex items-center gap-4 rounded-lg sm:gap-5"
                      >
                        <span
                          className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 sm:h-14 sm:w-14",
                            ACCENT_BORDER[channel.accent],
                            ACCENT_TEXT[channel.accent],
                          )}
                        >
                          <PixelIcon name={channel.icon} size={26} />
                        </span>
                        <span className="min-w-0">
                          <span
                            className={cn(
                              "block font-pixel text-xs sm:text-sm",
                              ACCENT_TEXT[channel.accent],
                            )}
                          >
                            {channel.label}
                          </span>
                          <span className="mt-1 block truncate font-body text-sm text-chalk sm:text-base">
                            {channel.value}
                          </span>
                        </span>
                      </motion.a>
                    </li>
                  ))}

                  {SOCIALS.map((social) => (
                    <li key={social.label} className="py-2.5">
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${social.label} — opens in a new tab`}
                        {...interactive.icon}
                        className="group flex items-center gap-4 rounded-lg sm:gap-5"
                      >
                        <span
                          className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 sm:h-14 sm:w-14",
                            ACCENT_BORDER[social.accent],
                            ACCENT_TEXT[social.accent],
                          )}
                        >
                          <PixelIcon name={social.icon} size={26} />
                        </span>
                        <span className="min-w-0">
                          <span
                            className={cn(
                              "block font-pixel text-xs sm:text-sm",
                              ACCENT_TEXT[social.accent],
                            )}
                          >
                            {social.label}
                          </span>
                          <span className="mt-1 block truncate font-body text-sm text-chalk sm:text-base">
                            {social.value}
                          </span>
                        </span>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </PixelCard>
            </Reveal>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Character                                                        */}
          {/* ---------------------------------------------------------------- */}
          <div className="order-1 flex w-full justify-center lg:order-none lg:justify-end">
            <Character
              pose="folded"
              className="h-[26svh] w-auto max-w-[52vw] sm:h-[30svh] lg:h-auto lg:w-[clamp(200px,20vw,290px)] lg:max-w-none"
              sizes="(max-width: 1023px) 52vw, 26vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
