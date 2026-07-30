import Image from "next/image";
import type { Accent, Competition } from "@/types";
import { ACCENT_BORDER_STRONG } from "@/utils/accents";
import { cn } from "@/utils/cn";

const LOGO_SRC: Record<Competition["logo"], string> = {
  adobe: "/icons/Adobe.jpg",
  pathway: "/icons/Pathway.jpg",
  pmx: "/icons/PMx.jpg",
  turtlemint: "/icons/TurtleMint.jpg",
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
        // TurtleMint's source icon sits inset on a white canvas rather than
        // filling the frame edge to edge, so the tile's own corners show
        // through — a dark fallback there reads as a broken/cropped image.
        logo === "turtlemint" ? "bg-white" : "bg-void/50",
        ACCENT_BORDER_STRONG[accent],
      )}
    >
      <Image src={LOGO_SRC[logo]} alt={org} fill sizes="(max-width: 639px) 80px, 120px" className="object-cover" />
    </div>
  );
}
