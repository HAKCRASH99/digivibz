import type { VersusLabProps } from '../components/versus/VersusLab';

/**
 * Per-service content for the interactive "old way vs DIGIVIBZ way" lab.
 *
 * Every entry is grounded in the page's own copy: legacy points mirror the
 * Problem section, DIGIVIBZ points mirror the Why / Diff / Pitch sections, and
 * outcome numbers only reuse stats already published on that page.
 *
 * Stage labels are the five steps of that service's flow — the diagram on both
 * sides of the slider uses the same five steps, so dragging repaints the same
 * system from leaking to compounding.
 */

type VersusConfig = Pick<
  VersusLabProps,
  'title' | 'intro' | 'legacy' | 'digivibz' | 'stages' | 'outcome'
> & { eyebrow: string };

export const VERSUS = {
  'seo-services': {
    eyebrow: 'Old SEO vs the DIGIVIBZ system',
    title: 'Activity does not rank. A system does.',
    intro:
      'Most retainers sell you more content and a monthly report. DIGIVIBZ builds one flow where every technical fix, page and link has a job to do.',
    legacy: {
      label: 'The old SEO playbook',
      title: 'Activity with no through-line',
      points: [
        'Publish more and hope something ranks',
        'React to algorithm updates after they hit',
        'Reports full of numbers, no decisions',
      ],
      note: 'Effort goes in. Visibility leaks out.',
    },
    digivibz: {
      label: 'The DIGIVIBZ system',
      title: 'Every stage has a job',
      points: [
        'Intent mapped before volume',
        'Technical fixes that hold their ground',
        'Every ranking move tied to a decision',
      ],
      note: 'One flow: crawl, index, rank, click, convert.',
    },
    stages: ['Crawl', 'Index', 'Rank', 'Click', 'Convert'],
    outcome: { value: '4X', label: 'average revenue growth' },
  },

  'ai-seo-services': {
    eyebrow: 'Search visibility, re-engineered',
    title: 'Ranking is no longer the finish line.',
    intro:
      'Buyers now get answers from AI before they ever see a results page. Being cited is the new being found — and it takes a different system.',
    legacy: {
      label: 'The traditional SEO lens',
      title: 'Optimised for ten blue links',
      points: [
        'Rankings tracked, AI answers ignored',
        'Brand mentions left to chance',
        'Content built for keywords, not questions',
      ],
      note: 'You rank, but the answer never mentions you.',
    },
    digivibz: {
      label: 'The DIGIVIBZ answer system',
      title: 'Visible wherever the answer appears',
      points: [
        'AI answers monitored across platforms',
        'Brand mentions engineered into sources',
        'Content shaped around real questions',
      ],
      note: 'One presence across search and AI answers.',
    },
    stages: ['Prompt', 'Source', 'Citation', 'Mention', 'Enquiry'],
  },

  'google-ads-agency': {
    eyebrow: 'Ad spend, under a system',
    title: 'Ad spend does not compound on autopilot.',
    intro:
      'An unmanaged account still spends every day. DIGIVIBZ treats every dollar like it has to earn its place — and proves which ones did.',
    legacy: {
      label: 'The set-and-forget account',
      title: 'Budget running without a watcher',
      points: [
        'Spend spread across cold keywords',
        'Campaigns launched once, then ignored',
        'Reports that hide where money leaked',
      ],
      note: 'Clicks arrive. Nothing proves what paid.',
    },
    digivibz: {
      label: 'The DIGIVIBZ ad system',
      title: 'Every dollar has a job',
      points: [
        'Spend mapped to intent and margin',
        'Weekly refinements, not monthly guesses',
        'Waste cut before it compounds',
      ],
      note: 'One account, reviewed and refined every week.',
    },
    stages: ['Search', 'Click', 'Lead', 'Qualify', 'Close'],
  },

  'social-media-marketing': {
    eyebrow: 'From posting to pipeline',
    title: 'Posting is not a strategy. A system is.',
    intro:
      'A busy feed can still produce a flat pipeline. DIGIVIBZ connects content, community and paid reach to the only metric that matters: revenue.',
    legacy: {
      label: 'The post-and-hope calendar',
      title: 'Busy, but disconnected from sales',
      points: [
        'Post daily and hope for reach',
        'Chase likes, saves and vanity metrics',
        'Campaigns that never touch the pipeline',
      ],
      note: 'The feed looks alive. Revenue stays flat.',
    },
    digivibz: {
      label: 'The DIGIVIBZ growth system',
      title: 'One funnel across every platform',
      points: [
        'Content built around buying intent',
        'Creative tested against real data',
        'Every channel feeds one growth system',
      ],
      note: 'Content, community and paid working as one.',
    },
    stages: ['Hook', 'Reach', 'Engage', 'Lead', 'Customer'],
  },

  'web-development': {
    eyebrow: 'A site that earns its keep',
    title: 'A website should earn its keep every day.',
    intro:
      'Launch day is the start line, not the finish. DIGIVIBZ builds sites that load fast, earn trust and keep converting long after handover.',
    legacy: {
      label: 'The launch-and-leave build',
      title: 'A one-time project',
      points: [
        'Shipped once, then left untouched',
        'Speed and mobile treated as extras',
        'Traffic arrives and quietly leaves',
      ],
      note: 'Money spent once. Value stops at launch.',
    },
    digivibz: {
      label: 'The DIGIVIBZ build',
      title: 'A long-term revenue asset',
      points: [
        'Performance budgets from day one',
        'Mobile-first, conversion-first builds',
        'A platform you can keep improving',
      ],
      note: 'Fast, stable and built to compound.',
    },
    stages: ['Load', 'Trust', 'Explore', 'Convert', 'Retain'],
    outcome: { value: '40%', label: 'average conversion lift' },
  },

  'web-designing': {
    eyebrow: 'Design with a job to do',
    title: 'Pretty is the baseline. Conversion is the job.',
    intro:
      'Most design is judged on taste alone. DIGIVIBZ judges every layout on one question: does it move the visitor closer to acting?',
    legacy: {
      label: 'The taste-led design',
      title: 'Aesthetics without a goal',
      points: [
        'Design chosen on personal preference',
        'Templates stretched to fit the brand',
        'Beautiful pages that never convert',
      ],
      note: 'Looks good in a mockup. Fails in the wild.',
    },
    digivibz: {
      label: 'The DIGIVIBZ design system',
      title: 'Every layout starts with the goal',
      points: [
        'Structure shaped around user behaviour',
        'One brand system across every format',
        'Design decisions tied to outcomes',
      ],
      note: 'Beautiful, consistent and built to convert.',
    },
    stages: ['First look', 'Clarity', 'Trust', 'Action', 'Loyalty'],
  },

  'application-development': {
    eyebrow: 'From build to business asset',
    title: 'An app is not the asset. A system is.',
    intro:
      'Most apps fail at the thinking stage, not the coding stage. DIGIVIBZ designs software around how your business actually runs.',
    legacy: {
      label: 'The feature-list build',
      title: 'Built around a checklist',
      points: [
        'Features added without a clear direction',
        'No connection to daily operations',
        'Shipped once, rarely adopted',
      ],
      note: 'A build that looks complete but does not fit.',
    },
    digivibz: {
      label: 'The DIGIVIBZ app system',
      title: 'Designed around real usage',
      points: [
        'Architecture mapped to operations',
        'One team from planning to launch',
        'Built to scale past release day',
      ],
      note: 'Software your team actually uses every day.',
    },
    stages: ['Idea', 'Architecture', 'Build', 'Adoption', 'Scale'],
  },

  'content-writing': {
    eyebrow: 'Words with intent',
    title: 'Publishing more is not the answer. Writing with intent is.',
    intro:
      'Content that disappears is a cost, not an asset. DIGIVIBZ writes every piece to be found, read and acted on.',
    legacy: {
      label: 'The content treadmill',
      title: 'Volume without a plan',
      points: [
        'Publish to stay busy, not to rank',
        'One voice for every channel',
        'No plan past the next post',
      ],
      note: 'Hours in. Silence out.',
    },
    digivibz: {
      label: 'The DIGIVIBZ content system',
      title: 'Research before the first draft',
      points: [
        'Every piece built around intent',
        'Voice matched to channel and reader',
        'Each asset tied to a next step',
      ],
      note: 'Content that ranks, reads well and converts.',
    },
    stages: ['Research', 'Draft', 'Edit', 'Publish', 'Convert'],
    outcome: { value: '500+', label: 'projects delivered' },
  },

  'email-marketing': {
    eyebrow: 'From inbox to revenue',
    title: 'Sending email is not the same as earning revenue.',
    intro:
      'A send that never lands, or lands on the wrong segment, costs you twice. DIGIVIBZ treats deliverability and segmentation as revenue work.',
    legacy: {
      label: 'The batch-and-blast',
      title: 'One message for everyone',
      points: [
        'Same blast sent to the whole list',
        'Deliverability left to luck',
        'No idea which sends earn money',
      ],
      note: 'Emails out. Opens, clicks and trust leak away.',
    },
    digivibz: {
      label: 'The DIGIVIBZ email system',
      title: 'Built around the inbox and the buyer',
      points: [
        'Segmented sends built on intent',
        'Deliverability treated as strategy',
        'Revenue per send tracked and improved',
      ],
      note: 'Every campaign measured from inbox to income.',
    },
    stages: ['List', 'Send', 'Deliver', 'Open', 'Revenue'],
    outcome: { value: '5X', label: 'average email ROI' },
  },

  'google-my-business': {
    eyebrow: 'Own the local search',
    title: 'Local customers are searching. The question is what they find.',
    intro:
      'A half-finished profile quietly sends buyers to the competitor next door. DIGIVIBZ turns your profile into a verified local storefront.',
    legacy: {
      label: 'The neglected profile',
      title: 'Invisible where it matters',
      points: [
        'Profile left incomplete or unverified',
        'Buried outside the Google Map Pack',
        'Reviews ignored until they hurt',
      ],
      note: 'Nearby buyers find someone else.',
    },
    digivibz: {
      label: 'The DIGIVIBZ local system',
      title: 'A storefront that keeps working',
      points: [
        'Verified, complete and consistent',
        'Signals that lift the Map Pack',
        'Reviews turned into a growth loop',
      ],
      note: 'Found, trusted and chosen in local search.',
    },
    stages: ['Verify', 'Rank locally', 'Map pack', 'Call', 'Visit'],
    outcome: { value: '4.9★', label: 'average client rating' },
  },

  'video-editing': {
    eyebrow: 'Craft that holds attention',
    title: 'Good footage still needs a strong edit.',
    intro:
      'Audiences decide in seconds. DIGIVIBZ edits for pacing, retention and the platform — not just clean transitions.',
    legacy: {
      label: 'The clip-and-cut edit',
      title: 'Technically finished, strategically flat',
      points: [
        'Good footage, weak pacing',
        'Edits that ignore the platform',
        'Deadlines that slip',
      ],
      note: 'Viewers leave before the message lands.',
    },
    digivibz: {
      label: 'The DIGIVIBZ edit system',
      title: 'Every cut serves the story',
      points: [
        'Pacing built for the feed',
        'One team across every format',
        'A repeatable production pipeline',
      ],
      note: 'Watches, trust and action — by design.',
    },
    stages: ['Hook', 'Retention', 'Story', 'Action', 'Reach'],
  },

  'influencer-marketing': {
    eyebrow: 'Reach that actually converts',
    title: 'Followers are not the metric. Fit is.',
    intro:
      'A big audience means little if it never buys. DIGIVIBZ matches creators to the people you actually want in your pipeline.',
    legacy: {
      label: 'The follower-count pitch',
      title: 'Reach without relevance',
      points: [
        'Creators picked on follower count',
        'Cold outreach and one-off posts',
        'Vanity metrics sold as results',
      ],
      note: 'Impressions spike. Pipeline does not.',
    },
    digivibz: {
      label: 'The DIGIVIBZ creator system',
      title: 'Matched to audience and intent',
      points: [
        'Creators vetted for audience fit',
        'Relationships built for repeat campaigns',
        'Performance tracked to the last click',
      ],
      note: 'One team managing creators, briefs and results.',
    },
    stages: ['Brief', 'Match', 'Content', 'Reach', 'Conversion'],
  },

  'online-reputation-management': {
    eyebrow: 'Reputation built before the call',
    title: 'Your reputation is decided before the first conversation.',
    intro:
      'Buyers search you before they speak to you. DIGIVIBZ monitors, responds and rebuilds the story those searches tell.',
    legacy: {
      label: 'The react-after-damage approach',
      title: 'Reputation left unmanaged',
      points: [
        'Old reviews left unanswered',
        'Negative pages ranking unchallenged',
        'Fixes only after damage is done',
      ],
      note: 'One bad result quietly closes the sale.',
    },
    digivibz: {
      label: 'The DIGIVIBZ reputation system',
      title: 'Monitored, answered, rebuilt',
      points: [
        'Daily monitoring across the web',
        'Fast, on-brand responses',
        'A reputation that compounds over time',
      ],
      note: 'Trust protected before the first search.',
    },
    stages: ['Search', 'Review', 'Respond', 'Rebuild', 'Protect'],
    outcome: { value: '95%', label: 'improvement rate' },
  },

  'graphic-designing': {
    eyebrow: 'Design as a business tool',
    title: 'Design is not decoration. It is a business tool.',
    intro:
      'Every visual either earns trust or burns it. DIGIVIBZ builds one design system that looks sharp and sells consistently.',
    legacy: {
      label: 'The taste-only studio',
      title: 'Visuals without a system',
      points: [
        'Design chosen on personal taste',
        'Assets that do not scale',
        'A brand that blends into the crowd',
      ],
      note: 'Looks fine in isolation. Fails across formats.',
    },
    digivibz: {
      label: 'The DIGIVIBZ design system',
      title: 'One brand, every format',
      points: [
        'Every visual starts with the brief',
        'A scalable, consistent identity',
        'A brand people actually remember',
      ],
      note: 'Creativity backed by strategy and proof.',
    },
    stages: ['Brief', 'Concept', 'System', 'Rollout', 'Recall'],
    outcome: { value: '98%', label: 'client satisfaction' },
  },

  'ai-automation': {
    eyebrow: 'Hours back, every week',
    title: 'Repetition should not be your growth ceiling.',
    intro:
      'Manual follow-up and disconnected tools cap how fast you can grow. DIGIVIBZ connects the work so it runs without waiting on a person.',
    legacy: {
      label: 'The manual workaround',
      title: 'Growth capped by human hours',
      points: [
        'Lead follow-up waits on a person',
        'Tools that never talk to each other',
        'Repetitive tasks eating the week',
      ],
      note: 'Every busy week steals growth time.',
    },
    digivibz: {
      label: 'The DIGIVIBZ automation system',
      title: 'Workflows that run themselves',
      points: [
        'Follow-up triggered the moment a lead lands',
        'One connected, observable stack',
        'Hours returned to your team every week',
      ],
      note: 'A system that scales without more headcount.',
    },
    stages: ['Trigger', 'Route', 'Respond', 'Qualify', 'Close'],
  },

  about: {
    eyebrow: 'The vendor model vs the growth system',
    title: 'Most agencies sell services. We build one growth system.',
    intro:
      'The difference is not the list of deliverables. It is whether those deliverables are connected to one plan — and measured on revenue, not activity.',
    legacy: {
      label: 'The vendor model',
      title: 'Services sold in silos',
      points: [
        'Starts by selling services, not solving a problem',
        'Campaigns launched without a growth strategy',
        'Traffic, website and ads handled by separate teams',
        'Reports that explain numbers but not decisions',
      ],
      note: 'Several vendors, several reports, nobody owning growth.',
    },
    digivibz: {
      label: 'The DIGIVIBZ way',
      title: 'One plan, one owner',
      points: [
        'Discovery first, so the plan starts from your numbers',
        'Every channel connected into one revenue system',
        'Optimised for leads, sales and ROI — not activity',
        'Insights that end in actions and next steps',
      ],
      note: 'One team, one plan, measured on the same outcome you are.',
    },
    stages: ['Discover', 'Design', 'Develop', 'Deploy', 'Detect'],
    outcome: { value: '4X', label: 'average revenue growth' },
  },

  services: {
    eyebrow: 'Ten vendors or one system',
    title: 'You do not need ten vendors. You need one system.',
    intro:
      'Every service we offer plugs into the same 5D framework, so the work compounds instead of competing for the same budget.',
    legacy: {
      label: 'The patchwork stack',
      title: 'Services bought one at a time',
      points: [
        'A new vendor for every channel',
        'Budgets quietly competing with each other',
        'Nobody accountable for the whole picture',
      ],
      note: 'Every invoice looks fine. The total never adds up.',
    },
    digivibz: {
      label: 'The DIGIVIBZ system',
      title: 'Every service in one framework',
      points: [
        'One strategy across all fifteen services',
        'Budgets pointed at the same growth goal',
        'One team accountable end to end',
      ],
      note: 'Pick the entry point. The system handles the rest.',
    },
    stages: ['Audit', 'Strategy', 'Build', 'Launch', 'Scale'],
  },

  portfolio: {
    eyebrow: 'Scattered vendors vs one system',
    title: 'Random acts of marketing do not add up to growth.',
    intro:
      'Most portfolios show a highlight reel. Ours shows the system behind each result — one plan, one team, one set of numbers you can trace.',
    legacy: {
      label: 'The scattered approach',
      title: 'Activity without a system',
      points: [
        'A freelancer for ads, another for the site',
        'Every channel reporting to a different owner',
        'Wins that cannot be repeated on purpose',
      ],
      note: 'Good months happen by accident.',
    },
    digivibz: {
      label: 'The DIGIVIBZ system',
      title: 'One team behind every result',
      points: [
        'One growth plan across every channel',
        'The same 5D system behind each case study',
        'Numbers measured before and after',
      ],
      note: 'Every result here has a repeatable cause.',
    },
    stages: ['Audit', 'Plan', 'Build', 'Launch', 'Compound'],
    outcome: { value: '4x', label: 'top-line growth delivered' },
  },

  'case-studies': {
    eyebrow: 'Highlight reels vs the whole record',
    title: 'Anyone can show a good quarter. We publish the whole record.',
    intro:
      'Each study opens the challenges, the work, and the measured result — in the order it happened, with the numbers we actually tracked.',
    legacy: {
      label: 'The highlight reel',
      title: 'Screenshots without context',
      points: [
        'Only the best month makes the deck',
        'No starting point, so no real change',
        'Results that cannot be repeated',
      ],
      note: 'A number with no baseline proves nothing.',
    },
    digivibz: {
      label: 'The DIGIVIBZ record',
      title: 'Before, after and how',
      points: [
        'The starting numbers, stated plainly',
        'The exact work shipped, step by step',
        'Results measured on the client account',
      ],
      note: 'Every figure on this site was measured, not projected.',
    },
    stages: ['Baseline', 'Challenge', 'Work', 'Result', 'Scale'],
  },
} satisfies Record<string, VersusConfig>;

export type VersusKey = keyof typeof VERSUS;
