import Image from "next/image";
import type { PixelIconName } from "@/types";
import { cn } from "@/utils/cn";
import { PixelIcon } from "./PixelIcon";
import { TypeOnScroll } from "./TypeOnScroll";

interface SectionHeadingProps {
  id: string;
  /** Either a pixel glyph or a real logo photo — exactly one is expected. */
  icon?: PixelIconName;
  iconImage?: { src: string; alt: string };
  title: string;
  subtitle: string;
  /** Tailwind text colour class for the pixel icon. */
  iconClass?: string;
  /** Tailwind border colour class for the logo photo frame. */
  iconImageBorderClass?: string;
  className?: string;
}

/**
 * Every section opens the same way: glyph or logo, title, one quiet subtitle
 * line. Keeping the pattern identical across sections is what lets the
 * character and the content underneath carry the personality.
 */
export function SectionHeading({
  id,
  icon,
  iconImage,
  title,
  subtitle,
  iconClass,
  iconImageBorderClass = "border-line",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex items-start gap-4 sm:gap-6", className)}>
      {iconImage ? (
        <span
          aria-hidden="true"
          className={cn(
            "relative mt-1 h-10 w-10 shrink-0 overflow-hidden rounded-lg border-2 sm:mt-2 sm:h-16 sm:w-16",
            iconImageBorderClass,
          )}
        >
          <Image src={iconImage.src} alt={iconImage.alt} fill sizes="64px" className="object-cover" />
        </span>
      ) : (
        icon && (
          <>
            <PixelIcon name={icon} size={64} className={cn("mt-2 hidden sm:block", iconClass)} />
            <PixelIcon name={icon} size={40} className={cn("mt-1 sm:hidden", iconClass)} />
          </>
        )
      )}
      <div className="min-w-0">
        <TypeOnScroll
          id={id}
          text={title}
          className="font-pixel text-[clamp(1.5rem,7.5vw,2.5rem)] leading-tight text-chalk sm:text-[3.5rem] sm:leading-none lg:text-[4.5rem] xl:text-[5.25rem]"
        />
        <p className="mt-3 font-pixel text-base text-secondary sm:text-lg">{subtitle}</p>
      </div>
    </div>
  );
}
