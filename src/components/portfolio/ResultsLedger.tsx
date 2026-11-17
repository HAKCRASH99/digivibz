import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Activity, BarChart3, Gauge, Layers, TrendingUp } from 'lucide-react';
import { CountUp } from '../CountUp';
import { Reveal } from '../Reveal';

/**
 * ResultsLedger — the portfolio proof band.
 *
 * Replaces the old four-column stat rail with a data-dashboard bento:
 * a red hero metric with a self-drawing growth curve, a client-base card
 * with rising bars, a satisfaction gauge, and the campaign engine strip.
 * Every figure comes from PORTFOLIO_STATS copy.
 */

const REVEAL = { once: true, margin: '-60px' } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Rising area chart for the hero card (white on brand red). */
const GrowthCurve: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 320 96" className="w-full select-none" role="presentation">
      <defs>
        <linearGradient id="ledger-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[26, 52, 78].map((y) => (
        <line key={y} x1="4" y1={y} x2="316" y2={y} stroke="#FFFFFF" strokeOpacity="0.10" strokeWidth="1" />
      ))}

      <motion.path
        d="M6 84 C 56 82, 86 72, 122 60 S 190 44, 232 32 S 300 14, 314 10 L 314 84 L 6 84 Z"
        fill="url(#ledger-area)"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={REVEAL}
        transition={{ duration: 0.7, delay: 0.6 }}
      />
      <motion.path
        d="M6 84 C 56 82, 86 72, 122 60 S 190 44, 232 32 S 300 14, 314 10"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={REVEAL}
        transition={{ duration: 1.5, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.g
        initial={reduce ? false : { opacity: 0, scale: 0.3 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={REVEAL}
        transition={{ duration: 0.4, delay: 1.7, ease: 'backOut' }}
        style={{ transformOrigin: '314px 10px' }}
      >
        <circle cx="314" cy="10" r="8" fill="#FFFFFF" opacity="0.22" />
        <circle cx="314" cy="10" r="4" fill="#FFFFFF" />
      </motion.g>
    </svg>
  );
};

/** Satisfaction dial — the ring sweeps to 95% when scrolled into view. */
const SatisfactionDial: React.FC = () => {
  const reduce = useReducedMotion();
  const R = 34;
  const C = 2 * Math.PI * R;
  return (
    <div className="relative mx-auto mt-4 h-[104px] w-[104px]">
      <svg viewBox="0 0 88 88" className="h-full w-full -rotate-90" role="presentation">
        <circle cx="44" cy="44" r={R} fill="none" stroke="#F1F5F9" strokeWidth="6" />
        <motion.circle
          cx="44"
          cy="44"
          r={R}
          fill="none"
          stroke="#C61A1A"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={reduce ? false : { strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C * 0.05 }}
          viewport={REVEAL}
          transition={{ duration: 1.5, delay: 0.25, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-extrabold tabular-nums leading-none text-slate-900">
          <CountUp value="95%" />
        </span>
      </div>
    </div>
  );
};

/** Small equalizer used in the campaign-engine card. */
const CampaignBars: React.FC = () => {
  const reduce = useReducedMotion();
  const bars = [34, 52, 44, 66, 58, 76, 63, 88, 72, 94];
  return (
    <div className="flex h-16 items-end gap-1.5" aria-hidden="true">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-2 rounded-t-[3px] bg-gradient-to-t from-red-200 to-[#C61A1A]"
          style={{ height: `${h}%`, transformOrigin: 'bottom' }}
          initial={reduce ? false : { scaleY: 0, opacity: 0.4 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={REVEAL}
          transition={{ duration: 0.55, delay: 0.25 + i * 0.055, ease: EASE }}
        />
      ))}
    </div>
  );
};

export const ResultsLedger: React.FC = () => {
  return (
    <section id="results-ledger" className="relative overflow-hidden border-y border-slate-100 bg-white py-14 md:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-[340px] w-[340px] rounded-full blur-3xl opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(198,26,26,0.10) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C61A1A]">
                <BarChart3 className="h-3.5 w-3.5" /> Measured Outcomes
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                The Numbers Come With <span className="text-[#C61A1A]">Receipts.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Every figure below is pulled from a live client growth system — tracked in dashboards,
                reviewed monthly, and tied to revenue. No vanity metrics, no rounded-up guesses.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <span className="hidden items-center gap-2 font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C61A1A]" />
              Rolling 12 mo · client dashboards
            </span>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-2">
          {/* ------------------------------------------------ hero metric */}
          <Reveal className="lg:col-span-5 lg:row-span-2">
            <div className="relative flex h-full min-h-[19rem] flex-col overflow-hidden rounded-[26px] bg-[#C61A1A] p-6 text-white shadow-[0_40px_90px_-52px_rgba(198,26,26,0.8)] sm:p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.14]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                  backgroundSize: '2.5rem 2.5rem',
                  maskImage: 'radial-gradient(ellipse 80% 70% at 60% 20%, #000 30%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 60% 20%, #000 30%, transparent 100%)',
                }}
              />

              <div className="relative flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] ring-1 ring-white/25">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  Growth multiple
                </span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">
                  Metric 01
                </span>
              </div>

              <div className="relative mt-7">
                <div className="text-6xl font-black leading-none tracking-tighter tabular-nums sm:text-7xl lg:text-[86px]">
                  <CountUp value="4X" duration={1800} />
                </div>
                <p className="mt-3 max-w-[24rem] text-sm font-semibold leading-relaxed text-white/90">
                  Average revenue growth for clients over the last 12 months.
                </p>
              </div>

              <div className="relative mt-auto pt-8">
                <GrowthCurve />
                <div className="mt-2 flex items-center justify-between font-mono text-[8.5px] font-bold uppercase tracking-[0.18em] text-white/55">
                  <span>Baseline</span>
                  <TrendingUp className="h-3 w-3" />
                  <span>After 5D</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ------------------------------------------------ client base */}
          <Reveal delay={0.06} className="lg:col-span-4">
            <div className="dz-spot dz-spot-ring group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                  <Layers className="h-3.5 w-3.5 text-[#C61A1A]" />
                  Client base
                </span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-300">02</span>
              </div>
              <div className="mt-3 text-4xl font-extrabold tracking-tight tabular-nums text-slate-900 sm:text-5xl">
                <CountUp value="250+" />
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                Businesses generating consistent leads with our system.
              </p>
              <div className="mt-auto flex h-16 items-end gap-1.5 pt-5" aria-hidden="true">
                {[30, 46, 38, 58, 50, 70, 62, 84, 76, 94].map((h, i) => (
                  <motion.span
                    key={i}
                    className="flex-1 rounded-t-[3px] bg-slate-200 transition-colors duration-300 group-hover:bg-red-200"
                    style={{ height: `${h}%`, transformOrigin: 'bottom' }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.55, delay: 0.2 + i * 0.05, ease: EASE }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* ------------------------------------------------ satisfaction */}
          <Reveal delay={0.12} className="lg:col-span-3">
            <div className="dz-spot dz-spot-ring group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                  <Gauge className="h-3.5 w-3.5 text-[#C61A1A]" />
                  Retention
                </span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-300">03</span>
              </div>
              <SatisfactionDial />
              <p className="mt-4 text-center text-[12px] leading-relaxed text-slate-600">
                Client satisfaction rate, with measurable business results.
              </p>
            </div>
          </Reveal>

          {/* ------------------------------------------------ campaign engine */}
          <Reveal delay={0.18} className="lg:col-span-7">
            <div className="dz-spot dz-spot-ring group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                  <Activity className="h-3.5 w-3.5 text-[#C61A1A]" />
                  Campaign engine
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-[#C61A1A]">
                  <span className="h-1 w-1 rounded-full bg-[#C61A1A] animate-pulse" />
                  Live
                </span>
              </div>

              <div className="mt-3 flex items-end justify-between gap-5">
                <div className="min-w-0">
                  <div className="text-4xl font-extrabold tracking-tight tabular-nums text-slate-900 sm:text-5xl">
                    <CountUp value="1000+" />
                  </div>
                  <p className="mt-2 max-w-[19rem] text-[12.5px] leading-relaxed text-slate-600">
                    AI-driven campaigns optimising sales and conversions.
                  </p>
                </div>
                <CampaignBars />
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {['SEO', 'Google Ads', 'Social', 'Email', 'GMB', 'AI SEO'].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
