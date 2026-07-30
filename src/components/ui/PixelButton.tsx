"use client";

import { motion } from "framer-motion";
import { interactive } from "@/animations/motion";
import { cn } from "@/utils/cn";
import { PixelIcon } from "./PixelIcon";

interface PixelButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

/**
 * The page has exactly one primary action, so there is exactly one button
 * style. Hover lifts the whole control and slides the arrow forward; press
 * settles it 2px down — the depression reads as a real key travel rather than
 * a colour change.
 */
export function PixelButton({ label, onClick, className }: PixelButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      {...interactive.button}
      className={cn(
        "group inline-flex items-center gap-3 rounded-lg border-2 border-azure/70",
        "bg-surface/80 px-6 py-3.5 font-pixel text-sm text-chalk",
        "transition-colors duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:border-azure hover:bg-surface-2/80",
        className,
      )}
    >
      <span>{label}</span>
      <PixelIcon
        name="arrow"
        size={18}
        className="text-primary transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      />
    </motion.button>
  );
}
