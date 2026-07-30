import { cn } from "@/utils/cn";
import type { Accent } from "@/types";
import { ACCENT_BORDER_STRONG, ACCENT_TEXT } from "@/utils/accents";

interface PixelBadgeProps {
  place: string;
  scale: string;
  accent: Accent;
  className?: string;
}

/**
 * Result badge.
 *
 * Fixed width and fixed padding on purpose: all three badges are dimensionally
 * identical no matter how long the text is, so the column of results reads as
 * a single measurable scale rather than three differently-sized labels.
 * No emoji, no trophy — the placement is the whole message.
 */
export function PixelBadge({ place, scale, accent, className }: PixelBadgeProps) {
  return (
    <div
      className={cn(
        "flex w-[8.75rem] shrink-0 flex-col items-center justify-center gap-1",
        "rounded-lg border-2 px-4 py-3.5 text-center",
        ACCENT_BORDER_STRONG[accent],
        className,
      )}
    >
      <span className={cn("font-pixel text-[0.9375rem] leading-none", ACCENT_TEXT[accent])}>
        {place}
      </span>
      <span className="font-body text-xs leading-none text-muted">{scale}</span>
    </div>
  );
}
