"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { transitions } from "@/animations/motion";
import { scrollToSection } from "@/hooks/useSmoothScroll";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_ITEMS, SITE } from "@/constants/site";
import type { SectionId } from "@/types";
import { cn } from "@/utils/cn";
import { MobileMenu } from "./MobileMenu";

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

/**
 * Sticky navigation.
 *
 * The active underline is a single element shared between all four links via
 * `layoutId` — Framer Motion interpolates it from one label to the next, so it
 * genuinely slides across rather than fading out in one place and in at
 * another. It also means the underline can never be out of sync with the
 * highlighted label, because there is only one of it.
 *
 * Which section is active comes from IntersectionObserver, not from click
 * state, so the bar stays correct whether you clicked, scrolled, or arrived
 * on a deep link.
 */
export function Navbar() {
  const active = useActiveSection(SECTION_IDS, "home");
  const [menuOpen, setMenuOpen] = useState(false);

  const go = useCallback((id: SectionId) => {
    setMenuOpen(false);
    scrollToSection(id);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative border-b border-line bg-void/88 backdrop-blur-md">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[var(--nav-h)] w-full max-w-7xl items-center justify-between px-5 sm:px-8"
        >
          <button
            type="button"
            onClick={() => go("home")}
            className="font-pixel text-lg text-primary transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] sm:text-xl"
          >
            {SITE.name}
          </button>

          {/* Desktop */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative px-4 py-2 font-pixel text-[0.9375rem]",
                      "transition-colors duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive ? "text-primary" : "text-muted hover:text-chalk",
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-primary"
                        transition={transitions.hover}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-chalk transition-colors duration-250 hover:border-primary/60 lg:hidden"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </nav>

        <MobileMenu
          open={menuOpen}
          active={active}
          onClose={() => setMenuOpen(false)}
          onNavigate={go}
        />
      </div>
    </header>
  );
}

/** Three pixel bars that fold into a cross. Same 250ms as every other hover. */
function HamburgerIcon({ open }: { open: boolean }) {
  const bar = "absolute h-0.5 w-5 bg-current transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]";
  return (
    <span aria-hidden="true" className="relative block h-5 w-5">
      <span className={cn(bar, open ? "top-2.5 rotate-45" : "top-1")} />
      <span className={cn(bar, "top-2.5", open && "opacity-0")} />
      <span className={cn(bar, open ? "top-2.5 -rotate-45" : "top-4")} />
    </span>
  );
}
