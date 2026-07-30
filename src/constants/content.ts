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
    icon: "instagram",
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
      "Adobe's brief was to design a mobile-first AI photo editor called Dooby, built from scratch — not just another filter app, but something that actually rethought how people edit on a touchscreen.",
      "I led the end-to-end UI/UX design and product strategy, starting with 6 distinct AI-powered editing workflows: subject enhancement, depth-based object insertion, depth-based object removal, depth-based blurring, relighting, and moving a light source across depth. Every workflow had to work around one core constraint — zero cognitive overload. Most AI editing tools bury their power behind confusing menus, so we designed touch-first, single-gesture interactions so a first-time user could get a professional-looking edit in seconds.",
      "Not everything was flawless. Depth-based object insertion still struggled in scenes with too many overlapping objects at similar depths — something I'd flag as the first thing to fix in a v2. But all 6 workflows made it into a working, demoable prototype, not just concepts on a slide.",
      "We placed 3rd against 22 IITs at Inter IIT Tech Meet 14.0, hosted at IIT Patna.",
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
    lines: [
      "Pathway's brief was around building an AI-powered treasury management product, a genuinely unfamiliar domain for me going in, which made this one of the harder problem statements I've worked on.",
      "Instead of building another dashboard, I pitched and built Playground, a conversational simulation environment where treasury professionals could model real-time risk scenarios by talking to the system, rather than digging through static reports. To make sure this wasn't just a cool idea on paper, I validated it directly with actual treasury professionals at Andhra Bank and Citi Corp, sitting with them to understand where their real pain points were, then rebuilding parts of the simulation logic based on that feedback.",
      "We finished 8th against 22 IITs, a tougher result than Dooby, but this was also the more ambiguous, higher-difficulty problem statement of the two, and the one where I learned the most about designing for a domain I didn't start out understanding.",
    ],
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
      "Sharechat's brief was around monetization and engagement for Moj, their short-video app, specifically within India's growing micro-drama content ecosystem.",
      "We devised MojGigs, a feature that let content creators post real 'roles' within their micro-dramas, like a graphic designer, voice actor, actor, or singer, that everyday users could apply for and take up. The idea was to turn Moj from a passive content platform into something people joined to actually participate in, using real creative opportunities as a new user-acquisition channel, not just another content feed to scroll.",
      "Alongside this, we designed Mellos, a reward-based in-app currency letting users unlock exclusive Moj+ episodes, meant to drive engagement and monetization without feeling like a paywall.",
      "We built out the business case with projected impact, our solutions were modeled to boost user retention by 20%+, and presented against 1,200+ teams nationally, finishing 5th.",
    ],
    tags: ["Marketplace", "Growth", "Gamification"],
    place: "5th Place",
    scale: "1,200+ Teams",
    accent: "primary",
  },
  {
    org: "TurtleMint",
    logo: "turtlemint",
    title: "TurtleMint 48hr Buildathon 2025",
    lines: [
      "Built a growth and client-management product for insurance advisors in 48 hours.",
      "AI-powered call insights plus an automated client lifecycle tool for micro-entrepreneurs.",
      "Won 1st place among 14 teams.",
    ],
    tags: ["InsurTech", "AI", "Growth"],
    place: "1st Place",
    scale: "14 Teams",
    accent: "accent",
  },
  {
    org: "Civil Conclave",
    logo: "civilconclave",
    title: "Civil Conclave, Nirmaan '26 (IIT Roorkee)",
    lines: [
      "Led a team of 8 to build a geospatial landslide-risk application for Uttarakhand.",
      "Engineered hazard visualization and scenario simulation for geotechnical decision-makers.",
      "Validated the solution with IITM Geotechnical professors and won recognition from IIT Roorkee's panel.",
    ],
    tags: ["Geospatial", "Risk Modeling", "Civil Engineering"],
    place: "Panel Recognition",
    scale: "Team of 8",
    accent: "secondary",
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
