import type { Accent } from "@/types";

/**
 * Accent → Tailwind class lookups.
 *
 * Tailwind needs literal class strings at build time, so accents resolve
 * through these maps rather than through interpolation. One place to change,
 * and no colour can enter the page that isn't in the palette.
 */
export const ACCENT_TEXT: Record<Accent, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  azure: "text-azure",
};

export const ACCENT_BORDER: Record<Accent, string> = {
  primary: "border-primary/45",
  secondary: "border-secondary/45",
  accent: "border-accent/45",
  azure: "border-azure/45",
};

export const ACCENT_BORDER_STRONG: Record<Accent, string> = {
  primary: "border-primary/70",
  secondary: "border-secondary/70",
  accent: "border-accent/70",
  azure: "border-azure/70",
};

export const ACCENT_HOVER_BORDER: Record<Accent, string> = {
  primary: "hover:border-primary/60 focus-within:border-primary/60",
  secondary: "hover:border-secondary/60 focus-within:border-secondary/60",
  accent: "hover:border-accent/60 focus-within:border-accent/60",
  azure: "hover:border-azure/60 focus-within:border-azure/60",
};

export const ACCENT_RULE: Record<Accent, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  azure: "bg-azure",
};

export const ACCENT_HEX: Record<Accent, string> = {
  primary: "#FFC72C",
  secondary: "#A970FF",
  accent: "#44D17A",
  azure: "#4FA9FF",
};
