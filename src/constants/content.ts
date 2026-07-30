import type {
  Competition,
  ContactChannel,
  FeatureCard,
  SocialLink,
  TimelineEntry,
} from "@/types";

/* -------------------------------------------------------------------------- */
/*  HOME                                                                      */
/* -------------------------------------------------------------------------- */

export const HERO = {
  greeting: "Hi, I'm",
  name: "Kushal.",
  subheading:
    "I build products, lead teams, and get bored easily enough that I've turned it into a personality trait.",
  cta: { label: "Explore My Work", target: "experience" },
} as const;

/** Ordered 01–04: this is a set, not a sequence, but the numbering is how the
 *  four sides of the person are indexed on the page and in the mobile rail. */
export const FEATURES: FeatureCard[] = [
  {
    index: "01",
    title: "Product Manager",
    body: "I find where users get stuck, then rebuild the system underneath to solve those problems.",
    accent: "primary",
    icon: "target",
  },
  {
    index: "02",
    title: "Taekwondo",
    body: "I'm a National-level player, Kukkiwon-certified 1st Black Belt. More than a decade of discipline.",
    accent: "azure",
    icon: "belt",
  },
  {
    index: "03",
    title: "Painting & Art",
    body: "I paint, sing, play guitar, and sometimes sculpt 3D artifacts out of M-seal.",
    accent: "secondary",
    icon: "palette",
  },
  {
    index: "04",
    title: "Meme Page",
    body: "In 9th grade, during lockdown, I ran a Free Fire meme page that grew to 8,000 followers.",
    accent: "accent",
    icon: "flame",
  },
];

/* -------------------------------------------------------------------------- */
/*  EXPERIENCE                                                                */
/* -------------------------------------------------------------------------- */

export const KOTAK = {
  company: "Kotak Securities",
  role: "Product Management Intern",
  paragraphs: [
    "Neome, Kotak Neo's AI assistant, couldn't answer basic questions about Futures & Options — even though the data existed elsewhere in the app.",
    "I rebuilt the routing logic in the orchestrator prompt, added intent classification for F&O queries, and wrote the guardrails. Tested it across 12+ categories before shipping, then again in regression until it hit 95% accuracy.",
    "Also worked on the complete UI/UX redesign of Stockcase, a stock-basket discovery feature used by 90,000+ active users. Validated changes through a targeted survey and direct calls with active users.",
  ],
} as const;

export const ECELL = {
  org: "E-Cell, IIT Madras",
  team: "Startup Services",
} as const;

export const TIMELINE: TimelineEntry[] = [
  {
    period: "Nov '24",
    role: "Associate Manager",
    headline: "Learning how everything works",
    body: "Joined Startup Services in my 1st year as an Associate Manager. My job was execution, not strategy. I organized Startup Meetup, Elevate 8.0 and Summer InternFair 2025.",
    accent: "secondary",
  },
  {
    period: "Mid '25",
    role: "Manager",
    headline: "Given a real mandate, and a real number to hit",
    body: "Promoted to Manager and handed ownership of Startup Meetup '25-26 end to end. Connected 1,000+ startups and investors across India and personally closed partnerships with Wadhwani Foundation, India Accelerator (Delhi), and StartupTN. Co-executed Startup Expo '26 which drew 1,500+ footfall and 80 filled stalls.",
    accent: "azure",
  },
  {
    period: "Present",
    role: "Core",
    headline: "Leading 8 initiatives, 20+ people, and setting my own targets",
    body: "Now leading Startup Services as Core, spearheading a 20+ member team across 8 initiatives. Currently building Yearlong Internfair to create a persistent talent pipeline connecting IITM students with startups.",
    accent: "accent",
  },
];

/* -------------------------------------------------------------------------- */
/*  COMPETITIONS                                                              */
/* -------------------------------------------------------------------------- */

export const COMPETITIONS: Competition[] = [
  {
    org: "Adobe",
    logo: "adobe",
    title: "Inter IIT Tech Meet 14.0 × Adobe",
    lines: [
      "Designed the end-to-end UI/UX and product strategy for Dooby, a mobile-first AI photo editor.",
      "Built 6 AI-powered editing workflows focused on zero cognitive overload for touch-first editing.",
    ],
    tags: ["UI/UX", "AI", "Product Strategy"],
    place: "3rd Place",
    scale: "22 IITs",
    accent: "secondary",
  },
  {
    org: "Pathway",
    logo: "pathway",
    title: "Inter IIT Tech Meet 14.0 × Pathway",
    lines: ["Built Playground, a conversational treasury risk simulation platform."],
    tags: ["Enterprise AI", "FinTech", "Research"],
    place: "8th Place",
    scale: "22 IITs",
    accent: "azure",
  },
  {
    org: "PMx",
    logo: "pmx",
    title: "PMx 2026 × ShareChat",
    lines: [
      "Built MojGigs connecting creators with jobs and Mellos, a reward-based in-app currency.",
    ],
    tags: ["Marketplace", "Growth", "Gamification"],
    place: "5th Place",
    scale: "1,200+ Teams",
    accent: "primary",
  },
];

/* -------------------------------------------------------------------------- */
/*  CONTACT                                                                   */
/* -------------------------------------------------------------------------- */

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    label: "Mobile",
    value: "+91 97738 95509",
    href: "tel:+919773895509",
    icon: "phone",
    accent: "accent",
  },
  {
    label: "Email",
    value: "kushal.chordia@icloud.com",
    href: "mailto:kushal.chordia@icloud.com",
    icon: "mail",
    accent: "azure",
  },
];

export const SOCIALS: SocialLink[] = [
  {
    label: "LinkedIn",
    value: "kushal-chordia",
    href: "https://www.linkedin.com/in/kushal-chordia",
    icon: "linkedin",
    accent: "azure",
  },
  {
    label: "Instagram",
    value: "kushal.chordia",
    href: "https://www.instagram.com/kushal.chordia",
    icon: "instagram",
    accent: "secondary",
  },
];
