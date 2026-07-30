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
    title: "Fun Fact",
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
    "Neome, Kotak Neo's AI assistant, couldn't answer basic questions about Futures & Options - even though the data existed elsewhere in the app.",
    "I rebuilt the routing logic in the orchestrator prompt, added intent classification for F&O queries, and wrote the guardrails. Tested it across **12+ categories** before shipping, then again in regression until it hit **95% accuracy**.",
    "Also worked on the complete UI/UX redesign of Stockcase, a stock-basket discovery feature used by **90,000+ active users**. Validated changes through a targeted survey and direct calls with active users.",
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
    body: "Joined Startup Services in my 1st year as an Associate Manager. My job was execution, not strategy. I organized **Startup Meetup, Elevate 8.0 and Summer InternFair 2025**.",
    accent: "secondary",
  },
  {
    period: "Mid '25",
    role: "Manager",
    headline: "Given a real mandate, and a real number to hit",
    body: "Promoted to Manager and handed ownership of Startup Meetup '25-26 end to end. Connected **1,000+ startups and investors** across India and personally closed partnerships with Wadhwani Foundation, India Accelerator (Delhi), and StartupTN. Co-executed Startup Expo '26 which drew **1,500+ footfall and 80 filled stalls**.",
    accent: "azure",
  },
  {
    period: "Present",
    role: "Core",
    headline: "Leading 8 initiatives, 20+ people, and setting my own targets",
    body: "Now leading Startup Services as Core, spearheading a **20+ member team across 8 initiatives**. Currently building Yearlong Internfair to create a persistent talent pipeline connecting IITM students with startups.",
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
      "Adobe's brief was to design a mobile-first AI photo editor called Dooby, built from scratch - not just another filter app, but something that actually rethought how people edit on a touchscreen.",
      "I led the end-to-end UI/UX design and product strategy, starting with **6 distinct AI-powered editing workflows**: subject enhancement, depth-based object insertion, depth-based object removal, depth-based blurring, relighting, and moving a light source across depth. Every workflow had to work around one core constraint - zero cognitive overload. Most AI editing tools bury their power behind confusing menus, so we designed touch-first, single-gesture interactions so a first-time user could get a professional-looking edit in seconds.",
      "Not everything was flawless. Depth-based object insertion still struggled in scenes with too many overlapping objects at similar depths - something I'd flag as the first thing to fix in a v2. But all 6 workflows made it into a working, demoable prototype, not just concepts on a slide.",
      "We placed **3rd against 22 IITs** at Inter IIT Tech Meet 14.0, hosted at IIT Patna.",
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
      "Instead of building another dashboard, I pitched and built Playground, a conversational simulation environment where treasury professionals could model real-time risk scenarios by talking to the system, rather than digging through static reports. To make sure this wasn't just a cool idea on paper, I validated it directly with actual treasury professionals at **Andhra Bank and Citi Corp**, sitting with them to understand where their real pain points were, then rebuilding parts of the simulation logic based on that feedback.",
      "We finished **8th against 22 IITs**, a tougher result than Dooby, but this was also the more ambiguous, higher-difficulty problem statement of the two, and the one where I learned the most about designing for a domain I didn't start out understanding.",
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
      "We built out the business case with projected impact, our solutions were modeled to boost user retention by **20%+**, and presented against **1,200+ teams nationally, finishing 5th**.",
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
      "Insurance advisors struggle to grow because of limited digital skills, poor online presence, and weak customer retention. As a team of 4, we built Razzmatazz, a growth and client-management platform built specifically for them.",
      "The product had three core pieces: an AI-powered call analysis tool that turns a sales call recording into a transcript, sentiment analysis, and actionable coaching tips, a built-in CRM connected to that same AI summarizer for tracking clients and running mass email/WhatsApp campaigns, and marketing tools - a website builder plus AI content generators for WhatsApp and Instagram, that only need a one-line prompt.",
      "We sized the opportunity too, India's insurance broker market is worth hundreds of billions of dollars, growing at **9.2% CAGR**, with **58% of advisors' marketing budgets** already going digital.",
      "We secured **1st place among 14 teams across 3 IIT Madras Guilds**.",
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
      "Uttarakhand records 300+ landslides a year, and existing monitoring systems miss the real danger zones. Analyzing 7,182 historical landslides ourselves, we found **72% originate in concave terrain hollows** and **84% occur within 150m of a road**, exactly where most models fall short.",
      "I led a team of 8, owning strategy, research, and UI. We built a system modeling both rainfall and seismic triggers separately, using soil mechanics equations (Richards equation, Mohr-Coulomb criterion) for rainfall risk, and a trained XGBoost model for seismic displacement, hitting an **R² of 0.90**.",
      "The result is an interactive app where a user taps a location on a map and instantly gets terrain, soil, and hazard data pulled from satellite imagery and our own models.",
      "We validated it with IITM Geotechnical professors, and it was recognized by IIT Roorkee's panel, aligning with the UN SDGs for Sustainable Cities and Climate Action. We placed **first among 20 teams across IITs and NITs**.",
    ],
    tags: ["Geospatial", "Risk Modeling", "Civil Engineering"],
    place: "1st Place",
    scale: "20 Teams",
    accent: "secondary",
  },
];

/* -------------------------------------------------------------------------- */
/*  CONTACT                                                                   */
/* -------------------------------------------------------------------------- */

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    label: "Mobile",
    value: "+91 72084 80806",
    href: "tel:+917208480806",
    icon: "phone",
    accent: "accent",
  },
  {
    label: "Email",
    value: "ce24b081@smail.iitm.ac.in",
    href: "mailto:ce24b081@smail.iitm.ac.in",
    icon: "mail",
    accent: "azure",
  },
];

export const SOCIALS: SocialLink[] = [
  
  {
    label: "LinkedIn",
    value: "kushal-chordia",
    href: "https://www.linkedin.com/in/kushal-chordia-075b2a33a/",
    icon: "linkedin",
    accent: "azure",
  },
  {
    label: "Instagram",
    value: "kushxl_08",
    href: "https://www.instagram.com/kushxl_08",
    icon: "instagram",
    accent: "secondary",
  },
];
