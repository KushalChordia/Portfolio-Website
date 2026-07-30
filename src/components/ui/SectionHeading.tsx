import type { PixelIconName } from "@/types";
import { cn } from "@/utils/cn";
import { PixelIcon } from "./PixelIcon";
import { TypeOnScroll } from "./TypeOnScroll";

interface SectionHeadingProps {
  id: string;
  icon: PixelIconName;
  title: string;
  subtitle: string;
  /** Tailwind text colour class for the icon. */
  iconClass: string;
  className?: string;
}

/**
 * Every section opens the same way: pixel glyph, title, one quiet subtitle
 * line. Keeping the pattern identical across four sections is what lets the
 * character and the content underneath carry the personality.
 */
export function SectionHeading({
  id,
  icon,
  title,
  subtitle,
  iconClass,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex items-start gap-4 sm:gap-6", className)}>
      <PixelIcon
        name={icon}
        size={64}
        className={cn("mt-2 hidden sm:block", iconClass)}
      />
      <PixelIcon name={icon} size={40} className={cn("mt-1 sm:hidden", iconClass)} />
      <div>
        <TypeOnScroll
          id={id}
          text={title}
          className="font-pixel text-[2.5rem] leading-none text-chalk sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.25rem]"
        />
        <p className="mt-3 font-pixel text-base text-secondary sm:text-lg">{subtitle}</p>
      </div>
    </div>
  );
}
