import {
  Bot,
  Code2,
  Film,
  LayoutTemplate,
  Mail,
  MapPin,
  Palette,
  PenLine,
  Rocket,
  Search,
  SearchCheck,
  Share2,
  ShieldCheck,
  Smartphone,
  Target,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Copy + data for the Services page (`/services`).
 *
 * NOTE: every entry carries a `slug` — the future detail pages will live at
 * `/service/<slug>`. Those pages are built in a later pass; for now the
 * cards are presentational and the slugs keep the URLs ready.
 */

export type ServiceCategoryId = 'growth' | 'creative' | 'web' | 'reputation';

export interface ServiceCategory {
  id: ServiceCategoryId;
  label: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'growth', label: 'Marketing & Growth' },
  { id: 'creative', label: 'Creative & Content' },
  { id: 'web', label: 'Web & Apps' },
  { id: 'reputation', label: 'Reputation & AI' },
];

export interface Service {
  /** Future service page: `/service/<slug>` */
  slug: string;
  name: string;
  category: ServiceCategoryId;
  description: string;
  icon: LucideIcon;
}

/** All fifteen services, in the order the client listed them. */
export const SERVICES: Service[] = [
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    category: 'growth',
    description: 'Consistent, on-brand social content and campaigns that turn followers into buyers.',
    icon: Share2,
  },
  {
    slug: 'application-development',
    name: 'Application Development',
    category: 'web',
    description: 'Fast, reliable mobile apps built around the way your customers actually use them.',
    icon: Smartphone,
  },
  {
    slug: 'content-writing',
    name: 'Content Writing',
    category: 'creative',
    description: 'Clear, persuasive copy for every page, post, and campaign in your funnel.',
    icon: PenLine,
  },
  {
    slug: 'online-reputation-management',
    name: 'Online Reputation Management',
    category: 'reputation',
    description: 'Monitor reviews, shape your narrative, and keep customer trust working in your favour.',
    icon: ShieldCheck,
  },
  {
    slug: 'graphic-designing',
    name: 'Graphic Designing',
    category: 'creative',
    description: 'Identity, collateral, and campaign creative that makes your brand look the part.',
    icon: Palette,
  },
  {
    slug: 'google-my-business',
    name: 'Google My Business',
    category: 'growth',
    description: 'Optimised listings that put you on the map — literally — for local searches.',
    icon: MapPin,
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    category: 'web',
    description: 'Custom builds with clean code, fast load times, and conversion paths baked in.',
    icon: Code2,
  },
  {
    slug: 'web-designing',
    name: 'Web Designing',
    category: 'web',
    description: 'Interfaces designed to guide attention, reduce friction, and earn the click.',
    icon: LayoutTemplate,
  },
  {
    slug: 'email-marketing',
    name: 'Email Marketing',
    category: 'growth',
    description: 'Automated sequences that nurture leads and bring customers back on schedule.',
    icon: Mail,
  },
  {
    slug: 'video-editing',
    name: 'Video Editing',
    category: 'creative',
    description: 'Scroll-stopping edits for ads, socials, and the story your brand needs to tell.',
    icon: Film,
  },
  {
    slug: 'influencer-marketing',
    name: 'Influencer Marketing',
    category: 'growth',
    description: 'The right voices, matched to your market, with performance you can track.',
    icon: Users,
  },
  {
    slug: 'ai-automation',
    name: 'Ai Automation',
    category: 'reputation',
    description: 'AI workflows that handle the repetitive work so your team can focus on closing.',
    icon: Bot,
  },
  {
    slug: 'google-ads-agency',
    name: 'Google Ads Agency',
    category: 'growth',
    description: 'Search campaigns built to capture existing demand and cut cost per acquisition.',
    icon: Target,
  },
  {
    slug: 'seo-services',
    name: 'SEO Services',
    category: 'growth',
    description: 'Technical, on-page, and local SEO that compounds into steady organic traffic.',
    icon: Search,
  },
  {
    slug: 'ai-seo-services',
    name: 'AI SEO Services',
    category: 'growth',
    description: 'AI-assisted research and content systems that scale rankings without scaling headcount.',
    icon: SearchCheck,
  },
];

/**
 * Slugs that already have a dedicated detail page at `/service/<slug>`.
 * Cards for these become links; the rest stay presentational until built.
 */
export const SERVICE_DETAIL_SLUGS: string[] = [
  'social-media-marketing',
  'application-development',
  'content-writing',
  'online-reputation-management',
  'graphic-designing',
  'google-my-business',
  'web-development',
  'web-designing',
  'email-marketing',
  'video-editing',
  'influencer-marketing',
  'ai-automation',
  'google-ads-agency',
  'seo-services',
  'ai-seo-services',
];

/** "One system" diagram — inputs on the left, outcomes on the right. */
export const CONVERGENCE_SERVICES = [
  'SEO',
  'Google Ads',
  'Web Design',
  'Content',
  'Social Media',
  'Automation',
] as const;

export const CONVERGENCE_OUTCOMES = [
  'Qualified Leads',
  'Lower Cost Per Lead',
  'Revenue Growth',
] as const;

/** Hero intro paragraph. */
export const SERVICES_INTRO =
  'From SEO to application development, every service plugs into the same 5D Growth Framework — so your channels, creative, and technology pull in one direction: revenue.';

/** "One system" section copy. */
export const SYSTEM_COPY = {
  p1: 'Most agencies hand you a checklist — run some ads here, post some content there — and nothing ever compounds.',
  p2: 'We connect every service to one framework. Research informs creative, creative feeds the site, the site feeds the campaigns, and the data loops back into all of it.',
  p3: 'One strategy. One team. One number that matters: revenue.',
} as const;

/** Closing CTA copy. */
export const SERVICES_CTA = {
  title: 'Not Sure Which Services You Need?',
  body: 'Share your website and goals, and we’ll return a free Growth Audit showing which services will move the needle first — and which can wait.',
} as const;

/* ------------------------------------------------------------------
   Discipline narrative — the sticky scroll story on /services
   ------------------------------------------------------------------ */

export interface DisciplineStory {
  id: ServiceCategoryId;
  /** Oversized ghost numeral shown in the sticky console. */
  numeral: string;
  tagline: string;
  blurb: string;
}

export const DISCIPLINE_STORY: DisciplineStory[] = [
  {
    id: 'growth',
    numeral: '01',
    tagline: 'Demand, engineered.',
    blurb:
      'Search, social, and paid media run as one demand engine — every campaign measured against pipeline and revenue, never vanity metrics.',
  },
  {
    id: 'creative',
    numeral: '02',
    tagline: 'Content that converts.',
    blurb:
      'Copy, design, and video built from the same strategy, so every asset sells the same promise in the customer’s own language.',
  },
  {
    id: 'web',
    numeral: '03',
    tagline: 'Experiences built to sell.',
    blurb:
      'Websites and apps engineered as the conversion layer of the system — fast, persuasive, and wired to capture every lead we generate.',
  },
  {
    id: 'reputation',
    numeral: '04',
    tagline: 'Trust, compounding.',
    blurb:
      'Reviews, listings, and AI-readiness managed continuously, so the moment a buyer checks you out, the answer is already yes.',
  },
];

/* ------------------------------------------------------------------
   Goal matcher — "start with your outcome" interactive
   ------------------------------------------------------------------ */

export interface ServiceGoal {
  id: string;
  label: string;
  icon: LucideIcon;
  note: string;
  /** Recommended service slugs, in suggested order. */
  slugs: string[];
}

export const SERVICE_GOALS: ServiceGoal[] = [
  {
    id: 'leads',
    label: 'More qualified leads',
    icon: Target,
    note: 'Capture demand that already exists, then turn the website into the closest thing to a salesperson you own.',
    slugs: ['google-ads-agency', 'seo-services', 'web-development'],
  },
  {
    id: 'local',
    label: 'Dominate my local market',
    icon: MapPin,
    note: 'Own the map pack and the reviews beneath it, so local buyers choose you before they ever call.',
    slugs: ['google-my-business', 'online-reputation-management', 'seo-services'],
  },
  {
    id: 'brand',
    label: 'A brand that looks the part',
    icon: Palette,
    note: 'One visual and verbal identity across every channel — designed to make trust the default reaction.',
    slugs: ['graphic-designing', 'social-media-marketing', 'video-editing'],
  },
  {
    id: 'launch',
    label: 'Launch a site or app',
    icon: Rocket,
    note: 'From first wireframe to live product, built around the way your customers actually behave.',
    slugs: ['web-designing', 'web-development', 'application-development'],
  },
  {
    id: 'ai',
    label: 'Scale with AI & automation',
    icon: Bot,
    note: 'Put the repetitive work on rails and surface in AI answers, so growth stops costing more hours.',
    slugs: ['ai-automation', 'ai-seo-services', 'content-writing'],
  },
];
