import type { Accent } from "@/types";
import { ACCENT_TEXT } from "@/utils/accents";
import { cn } from "@/utils/cn";

/**
 * Renders body copy with `**marked**` spans picked out in the given accent.
 *
 * The marker lives in the content string itself (content.ts), not in JSX —
 * so a paragraph stays one plain string to read and edit, and every section
 * that renders prose (Experience, Competitions) shares the exact same
 * highlight styling instead of each hand-rolling its own spans.
 */
export function Highlighted({
  text,
  accent,
  className,
}: {
  text: string;
  accent: Accent;
  className?: string;
}) {
  const parts = text.split(/\*\*(.+?)\*\*/g);

  return (
    <p className={className}>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className={cn("font-semibold", ACCENT_TEXT[accent])}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </p>
  );
}
