import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ECELL } from "@/constants/content";

export const metadata: Metadata = {
  title: "E-Cell Gallery",
  description: `Photos from ${ECELL.org} — ${ECELL.team}.`,
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/** Drop image files into `public/ecell/` and they show up here — no code changes needed. */
function getGalleryPhotos(): string[] {
  const dir = path.join(process.cwd(), "public", "ecell");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/ecell/${file}`);
}

export default function EcellGalleryPage() {
  const photos = getGalleryPhotos();

  return (
    <section className="relative pt-[calc(var(--nav-h)+2rem)] pb-20 lg:pb-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Link
          href="/#experience"
          className="group inline-flex items-center gap-2 font-pixel text-sm text-muted transition-colors duration-250 hover:text-azure"
        >
          <PixelIcon name="arrow" size={16} className="rotate-180" />
          Back to Experience
        </Link>

        <SectionHeading
          id="ecell-gallery-heading"
          icon="briefcase"
          title={ECELL.org}
          subtitle={`${ECELL.team} — Moments from the journey`}
          iconClass="text-azure"
          className="mt-6"
        />

        {photos.length > 0 ? (
          <GalleryGrid photos={photos} />
        ) : (
          <p className="mt-12 font-body text-sm leading-relaxed text-muted">
            Photos coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
