import { CompetitionsSection } from "@/sections/CompetitionsSection";
import { ContactSection } from "@/sections/ContactSection";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { HomeSection } from "@/sections/HomeSection";

/**
 * One page, four sections, no routing. Sections overlap slightly in scroll
 * space and each reveals before the previous one has fully left, so the page
 * reads as a single continuous scene rather than four screens in sequence.
 */
export default function Page() {
  return (
    <>
      <HomeSection />
      <ExperienceSection />
      <CompetitionsSection />
      <ContactSection />
    </>
  );
}
