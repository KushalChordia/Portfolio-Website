import type { CharacterPose, NavItem } from "@/types";

export const SITE = {
  name: "Kushal Chordia",
  role: "Product Manager",
  url: "https://kushalchordia.com",
  description:
    "Kushal Chordia - product manager, Taekwondo black belt, and Core at E-Cell IIT Madras. Product work at Kotak Securities, competition wins across Inter IIT and PMx.",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "competitions", label: "Competitions" },
  { id: "contact", label: "Contact" },
];

/**
 * Sprite registry.
 *
 * These PNGs are FINAL artwork — never re-rendered, re-coloured, or smoothed.
 * They are drawn with `image-rendering: pixelated` and animated with
 * transforms only.
 *
 * `eyeBandTop` / `eyeBandHeight` are percentages of the sprite's own height and
 * describe where the eyes sit. The blink micro-interaction borrows the strip of
 * pixels directly above the eyes and slides it down for ~110ms — so a blink is
 * built from the sprite's own pixels, never from new artwork. Nudge these two
 * numbers if you ever swap a sprite.
 */
export const SPRITES: Record<
  CharacterPose,
  {
    src: string;
    width: number;
    height: number;
    alt: string;
    eyeBandTop: number;
    eyeBandHeight: number;
  }
> = {
  wave: {
    src: "/sprites/hero-wave.png",
    width: 436,
    height: 583,
    alt: "Pixel-art illustration of Kushal in a blue hoodie and glasses, waving hello.",
    eyeBandTop: 19.4,
    eyeBandHeight: 3.2,
  },
  typing: {
    src: "/sprites/experience-laptop.png",
    width: 417,
    height: 307,
    alt: "Pixel-art illustration of Kushal typing on a laptop, looking at the screen.",
    eyeBandTop: 22.5,
    eyeBandHeight: 4.4,
  },
  writing: {
    src: "/sprites/competitions-writing.png",
    width: 387,
    height: 373,
    alt: "Pixel-art illustration of Kushal writing in a notebook with a pen.",
    eyeBandTop: 20.5,
    eyeBandHeight: 4.0,
  },
  folded: {
    src: "/sprites/contact-folded.png",
    width: 483,
    height: 846,
    alt: "Pixel-art illustration of Kushal facing forward with his arms folded, smiling.",
    eyeBandTop: 14.6,
    eyeBandHeight: 2.4,
  },
};
