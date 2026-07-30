"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { transitions } from "@/animations/motion";
import { NAV_ITEMS } from "@/constants/site";
import type { SectionId } from "@/types";
import { cn } from "@/utils/cn";

interface MobileMenuProps {
  open: boolean;
  active: SectionId;
  onClose: () => void;
  onNavigate: (id: SectionId) => void;
}

/**
 * Full-width drop panel under the nav bar.
 *
 * Not a full-screen takeover: the panel stays anchored to the bar it came
 * from, so the page never disappears behind it. Escape closes it, background
 * scroll is locked while it's open, and the whole thing is a plain list of
 * buttons so keyboard and screen-reader navigation are identical to desktop.
 */
export function MobileMenu({ open, active, onClose, onNavigate }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={transitions.hover}
          className="absolute inset-x-0 top-full border-b border-line bg-void/97 backdrop-blur-md lg:hidden"
        >
          <ul className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-3.5",
                    "font-pixel text-base transition-colors duration-250",
                    "ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface",
                    active === item.id ? "text-primary" : "text-muted hover:text-chalk",
                  )}
                >
                  <span>{item.label}</span>
                  {active === item.id && (
                    <span aria-hidden="true" className="h-2 w-2 rounded-[1px] bg-primary" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
