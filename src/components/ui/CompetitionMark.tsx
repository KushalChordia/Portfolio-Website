import Image from "next/image";
import type { Accent, Competition } from "@/types";
import { ACCENT_BORDER_STRONG } from "@/utils/accents";
import { cn } from "@/utils/cn";

const LOGO_SRC: Record<Competition["logo"], string> = {
  adobe: "/icons/Adobe.jpg",
  pathway: "/icons/Pathway.jpg",
  pmx: "/icons/PMx.jpg",
  turtlemint: "/icons/TurtleMint.png",
  civilconclave: "/icons/CivilConclave.jpg",
};

/**
 * The tile that identifies each competition partner — the partner's own
 * logo, framed on the same grid, weight and palette as the rest of the page.
 */
export function CompetitionMark({
  logo,
  org,
  accent,
}: {
  logo: Competition["logo"];
  org: string;
  accent: Accent;
}) {
  return (
    <div
      className={cn(
        "relative h-20 w-20 shrink-0 overflow-hidden sm:h-[7.5rem] sm:w-[7.5rem]",
        "rounded-lg border-2",
        // TurtleMint.png is pre-cropped to its white icon canvas (the
        // original had a black canvas well outside the rounded-icon
        // artwork); bg-white just backs up the now-flush edges.
        logo === "turtlemint" ? "bg-white" : "bg-void/50",
        ACCENT_BORDER_STRONG[accent],
      )}
    >
      {logo === "turtlemint" ? (
        // A `fill` image insets to the *padding* edge of its positioned
        // ancestor, so padding on the outer tile wouldn't actually inset it —
        // this inner box is what actually shrinks the mark, giving it the
        // breathing room the other partners' logos already have baked into
        // their own artwork.
        <div className="absolute inset-3 sm:inset-4">
          <Image
            src={LOGO_SRC[logo]}
            alt={org}
            fill
            sizes="(max-width: 639px) 64px, 96px"
            className="object-contain"
          />
        </div>
      ) : (
        <Image src={LOGO_SRC[logo]} alt={org} fill sizes="(max-width: 639px) 80px, 120px" className="object-cover" />
      )}
    </div>
  );
}
