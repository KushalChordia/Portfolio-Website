export type SectionId = "home" | "experience" | "competitions" | "contact";

export type Accent = "primary" | "secondary" | "accent" | "azure";

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface FeatureCard {
  index: string;
  title: string;
  body: string;
  accent: Accent;
  icon: PixelIconName;
}

export type PixelIconName =
  | "target"
  | "belt"
  | "palette"
  | "flame"
  | "briefcase"
  | "trophy"
  | "envelope"
  | "phone"
  | "mail"
  | "linkedin"
  | "instagram"
  | "arrow";

export interface TimelineEntry {
  period: string;
  role: string;
  headline: string;
  body: string;
  accent: Accent;
}

export interface Competition {
  org: string;
  logo: "adobe" | "pathway" | "pmx";
  title: string;
  lines: string[];
  tags: string[];
  place: string;
  scale: string;
  accent: Accent;
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  icon: PixelIconName;
  accent: Accent;
}

export interface SocialLink {
  label: string;
  value: string;
  href: string;
  icon: PixelIconName;
  accent: Accent;
}

/** Poses the character sprite can hold. Each maps to one idle motion recipe. */
export type CharacterPose = "wave" | "typing" | "writing" | "folded";
