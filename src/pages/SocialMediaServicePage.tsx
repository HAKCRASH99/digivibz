import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  CircleX,
  HelpCircle,
  Minus,
  PhoneCall,
  Plus,
  RefreshCw,
  Rocket,
  Route,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { CountUp } from '../components/CountUp';
import { SocialHeroScene } from '../components/social/SocialHeroScene';
import {
  CTAArrow,
  EffortGapSketch,
  FrameworkRail,
  OutcomeRows,
  PillarStepper,
  PlatformConsole,
} from '../components/social/SocialVisuals';
import {
  SMM_CTA,
  SMM_COMPARE,
  SMM_FAQ,
  SMM_FRAMEWORK,
  SMM_HERO,
  SMM_OUTCOMES,
  SMM_PLATFORMS,
  SMM_PROBLEM,
  SMM_PROCESS,
  SMM_STATS,
  SMM_STRATEGY,
  SMM_SYSTEM,
} from '../data/socialMediaContent';

interface SocialMediaServicePageProps {
  onOpenAudit: () => void;
}

/** Scroll helper — anchors would hijack the hash router, so we move manually. */
const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/** Slight paper tilts for pinned notes. */
const NOTE_TILT = ['', 'sm:rotate-1', 'sm:-rotate-1'] as const;

/* ------------------------------------------------------------------
   Hero — white stage, dot grid, copy left / live account-boost card right.
------------------------------------------------------------------ */
const HeroSection: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white pt-14 pb-16 sm:pt-20 sm:pb-24">
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:20px_20px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(55% 45% at 78% 30%, rgba(198,26,26,0.09), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(198,26,26,0.06), transparent 70%)',
        }}
        aria-hidden="true"
      />
      {!reduce && (
        <div
          aria-hidden="true"
          className="absolute -top-28 left-1/2 -ml-[300px] w-[600px] h-[380px] rounded-full pointer-events-none blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(198,26,26,0.13) 0%, transparent 70%)',
            animation: 'dz-drift 16s ease-in-out infinite',
          }}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* ---------------------------------------------------- copy */}
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E7DCC6] bg-white text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-700 shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
              {SMM_HERO.badge}
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08]"
            >
              {SMM_HERO.titleLead}
              <span className="relative inline-block text-[#C61A1A]">
                {SMM_HERO.titleHighlight}
                {!reduce && (
                  <motion.span
                    className="absolute -bottom-1.5 left-0 h-1 bg-[#C61A1A] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl"
            >
              {SMM_HERO.intro}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={onOpenAudit}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C61A1A] hover:bg-[#9E1414] text-white text-sm font-extrabold shadow-[0_20px_45px_-20px_rgba(198,26,26,0.85)] transition-colors cursor-pointer"
              >
                {SMM_HERO.cta}
                <CTAArrow />
              </button>
              <button
                onClick={() => scrollToSection('smm-framework')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#D8C9AC] bg-[#FCFBF7] hover:border-[#C61A1A]/50 hover:text-[#C61A1A] text-slate-700 text-sm font-bold transition-colors cursor-pointer"
              >
                See the 5D framework
              </button>
            </motion.div>
          </div>

          {/* ------------------------------------------- feed studio */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <SocialHeroScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------
   Problem — copy left, activity-vs-results chart right, noise cards below.
------------------------------------------------------------------ */
const ProblemSection: React.FC = () => (
  <section className="py-20 bg-white relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:18px_18px]"
      aria-hidden="true"
    />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <Reveal>
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#C61A1A]">
            <span className="w-6 h-0.5 bg-[#C61A1A] rounded" />
            {SMM_PROBLEM.kicker}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {SMM_PROBLEM.title}
          </h2>
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* copy + bullets */}
        <div>
          <Reveal>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{SMM_PROBLEM.p1}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-base sm:text-lg font-extrabold text-slate-900">
              {SMM_PROBLEM.lead}
            </p>
          </Reveal>
          <div className="mt-4 divide-y divide-dashed divide-[#E2D7BE] border-y border-dashed border-[#E2D7BE]">
            {SMM_PROBLEM.bullets.map((b, i) => (
              <Reveal key={b} delay={0.12 + i * 0.07}>
                <div className="flex items-start gap-3 py-3">
                  <CircleX className="w-4.5 h-4.5 text-[#C61A1A] mt-0.5 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700 leading-snug">{b}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.34}>
            <p className="mt-5 inline-flex -rotate-1 items-center gap-2 rounded-sm border-l-2 border-[#C61A1A] bg-[#FCFBF7] px-4 py-2 font-serif text-sm italic text-slate-800 shadow-sm">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C61A1A]" />
              {SMM_PROBLEM.focus}
            </p>
          </Reveal>
        </div>

        {/* sketch */}
        <Reveal delay={0.12} direction="right">
          <EffortGapSketch />
        </Reveal>
      </div>

      {/* the noise block */}
      <div className="dz-mobile-rail mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[SMM_PROBLEM.p2, SMM_PROBLEM.p3, SMM_PROBLEM.p4].map((p, i) => (
          <Reveal key={i} delay={i * 0.08} className={`${NOTE_TILT[i]} transition-transform duration-300 hover:rotate-0`}>
            <div className="relative h-full rounded-md border border-[#E7DCC6] bg-[#FCFBF7] p-5 pt-7 shadow-[0_16px_30px_-26px_rgba(15,23,42,0.5)]">
              <span
                aria-hidden="true"
                className={`absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 border border-[#D8C9AC]/70 bg-[#EFE4CD]/90 ${
                  i % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[2deg]'
                }`}
              />
              <span className="block font-serif text-[15px] font-bold italic text-[#C61A1A] mb-2">
                0{i + 1}
              </span>
              <p className="text-sm text-slate-600 leading-relaxed">{p}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-3xl mx-auto text-center text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
          {SMM_PROBLEM.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Comparison — 6 v 6 split cards.
------------------------------------------------------------------ */
const ComparisonSection: React.FC = () => {
  const [tone, setTone] = useState<'traditional' | 'digivibz'>('traditional');

  return (
  <section className="relative overflow-hidden border-y border-[#EFE6D2] bg-[#FCFBF7] py-20">
    <div
      className="pointer-events-none absolute inset-0 opacity-50"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(100,116,139,0.14) 1px, transparent 0)',
        backgroundSize: '22px 22px',
      }}
      aria-hidden="true"
    />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
          {SMM_COMPARE.titleLead}{' '}
          <span className="text-[#C61A1A]">{SMM_COMPARE.titleHighlight}</span>
        </h2>
      </Reveal>

      {/* Phones: one side at a time, same content as the desktop split */}
      <div
        role="tablist"
        aria-label="Compare the old social media approach with the DIGIVIBZ system"
        className="mx-auto mt-7 flex max-w-sm rounded-md border border-[#E7DCC6] bg-white p-1 shadow-2xs md:hidden"
      >
        {(
          [
            ['traditional', 'The old way'],
            ['digivibz', 'The DIGIVIBZ way'],
          ] as const
        ).map(([key, label]) => {
          const active = tone === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTone(key)}
              className={`flex min-h-11 flex-1 items-center justify-center rounded-sm px-2 py-2 text-[11.5px] font-extrabold transition-colors ${
                active
                  ? key === 'digivibz'
                    ? 'bg-[#C61A1A] text-white'
                    : 'bg-slate-600 text-white'
                  : 'text-slate-500'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-1 md:mt-10 md:grid-cols-2 gap-5 lg:gap-6 items-start">
        {/* traditional */}
        <Reveal direction="left" className={tone === 'traditional' ? '' : 'hidden md:block'}>
          <div className="relative h-full rounded-md border border-[#E7DCC6] bg-white p-5 pt-8 shadow-[0_20px_40px_-34px_rgba(15,23,42,0.5)] sm:p-7 sm:pt-9 md:-rotate-[0.6deg]">
            <span
              aria-hidden="true"
              className="absolute -top-2 left-9 h-4 w-16 rotate-[-4deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90"
            />
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#F1F5F9] border border-slate-200 text-slate-500 text-[11px] font-extrabold uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              {SMM_COMPARE.traditional.label}
            </span>
            <h3 className="mt-4 text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {SMM_COMPARE.traditional.heading}
            </h3>
            <div className="mt-4 divide-y divide-dashed divide-slate-200 border-y border-dashed border-slate-200">
              {SMM_COMPARE.traditional.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 py-3"
                >
                  <span className="w-5 h-5 rounded-full border border-slate-300 bg-[#FCFBF7] text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Minus className="w-3 h-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-slate-600 font-medium leading-snug">{item}</span>
                </motion.div>
              ))}
            </div>
            <p className="mt-4 font-serif text-[12px] italic text-slate-400">yes, this is still most feeds.</p>
          </div>
        </Reveal>

        {/* digivibz */}
        <Reveal direction="right" className={tone === 'digivibz' ? '' : 'hidden md:block'}>
          <div className="relative h-full rounded-md border border-[#C61A1A]/45 bg-white p-5 pt-8 shadow-[0_30px_60px_-42px_rgba(198,26,26,0.5)] sm:p-7 sm:pt-9 md:rotate-[0.5deg]">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 rounded-t-[3px] bg-[#C61A1A]" />
            <span
              aria-hidden="true"
              className="absolute -top-2 right-10 h-4 w-16 rotate-[3deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90"
            />
            <span className="relative inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#C61A1A] text-white text-[11px] font-extrabold uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              {SMM_COMPARE.digivibz.label}
            </span>
            <h3 className="relative mt-4 text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {SMM_COMPARE.digivibz.heading}
            </h3>
            <div className="relative mt-4 divide-y divide-dashed divide-red-200/70 border-y border-dashed border-red-200/70">
              {SMM_COMPARE.digivibz.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 py-3"
                >
                  <span className="w-5 h-5 rounded-full border border-[#C61A1A] text-[#C61A1A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" strokeWidth={3.5} />
                  </span>
                  <span className="text-sm text-slate-700 font-medium leading-snug">{item}</span>
                </motion.div>
              ))}
            </div>
            <p className="mt-4 font-serif text-[12px] italic text-[#C61A1A]">one system, every post accounted for.</p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-3xl mx-auto text-center font-serif text-sm sm:text-base italic text-slate-600 leading-relaxed">
          {SMM_COMPARE.closing}
        </p>
      </Reveal>
    </div>
  </section>
  );
};

/* ------------------------------------------------------------------
   Strategy + stats band.
------------------------------------------------------------------ */
const StrategySection: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {SMM_STRATEGY.title}
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                {SMM_STRATEGY.p1}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                {SMM_STRATEGY.p2}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 text-base sm:text-lg font-extrabold text-slate-900">
                {SMM_STRATEGY.lead}
              </p>
            </Reveal>
            <div className="mt-4 divide-y divide-dashed divide-[#E2D7BE] border-y border-dashed border-[#E2D7BE]">
              {SMM_STRATEGY.bullets.map((b, i) => (
                <Reveal key={b} delay={0.22 + i * 0.07}>
                  <div className="flex items-center gap-3 py-3">
                    <span className="w-6 h-6 rounded-full border border-[#C61A1A] text-[#C61A1A] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                    </span>
                    <span className="text-sm font-semibold text-slate-700">{b}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* plan sheet */}
          <Reveal delay={0.1} direction="right">
            <div className="relative rounded-[18px] border border-[#E7DCC6] bg-[#FCFBF7] p-6 pt-8 shadow-[0_26px_56px_-42px_rgba(15,23,42,0.5)] sm:p-8 sm:pt-9">
              <span
                aria-hidden="true"
                className="absolute -top-2 left-10 h-4 w-16 rotate-[-3deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90"
              />
              <span className="relative flex items-center gap-2 font-serif text-[12.5px] italic text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                not guesswork
              </span>
              <p className="relative mt-3 text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                {SMM_STRATEGY.p3}
              </p>

              {/* predictability sketch */}
              <div className="relative mt-6 rounded-sm border border-dashed border-[#D8C9AC] bg-white px-4 pb-3 pt-4">
                <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  <span>Predictability</span>
                  <span className="text-[#C61A1A]">Structured</span>
                </div>
                <svg viewBox="0 0 320 120" className="mt-2 w-full select-none" aria-hidden="true">
                  <path d="M20 102 C110 101 220 103 300 100" stroke="#B9AA8A" strokeWidth="2" strokeLinecap="round" />
                  {[16, 30, 46, 64, 86].map((h, i) => (
                    <motion.rect
                      key={i}
                      x={28 + i * 54}
                      y={100 - h}
                      width="36"
                      height={h}
                      rx="3"
                      fill="#C61A1A"
                      fillOpacity={0.10 + i * 0.04}
                      stroke="#C61A1A"
                      strokeWidth="2.2"
                      initial={reduce ? false : { scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: `${46 + i * 54}px 100px` }}
                    />
                  ))}
                  <motion.path
                    d="M44 84 C100 76 150 64 196 48 C228 37 252 30 276 20"
                    fill="none"
                    stroke="#C61A1A"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeDasharray="1 0"
                    initial={reduce ? false : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease: 'easeInOut' }}
                  />
                  <path d="M268 16 L 280 18 L 276 29" fill="none" stroke="#C61A1A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="196" y="70" fontSize="12" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fill="#C61A1A" transform="rotate(-16 196 70)">
                    compounding
                  </text>
                  <text x="24" y="116" fontSize="9" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fill="#A8A29E">
                    month 1
                  </text>
                  <text x="300" y="116" textAnchor="end" fontSize="9" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fill="#A8A29E">
                    month 6
                  </text>
                </svg>
              </div>

              <p className="relative mt-5 font-serif text-[12.5px] italic leading-relaxed text-slate-500">
                {SMM_STRATEGY.transition}
              </p>
            </div>
          </Reveal>
        </div>

        {/* stats band */}
        <Reveal delay={0.08}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 rounded-md border border-[#E7DCC6] bg-[#FCFBF7] overflow-hidden">
            {SMM_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`relative px-6 py-7 text-center ${
                  i > 0 ? 'border-t sm:border-t-0 sm:border-l border-dashed border-[#D8C9AC]' : ''
                }`}
              >
                <div className="font-serif text-3xl sm:text-4xl italic font-bold text-[#C61A1A] tabular-nums leading-none">
                  <CountUp value={stat.value} />
                </div>
                <div className="mt-2 text-xs font-extrabold uppercase tracking-widest text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex justify-center">
            <button
              onClick={onOpenAudit}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C61A1A] hover:bg-[#9E1414] text-white text-sm font-extrabold shadow-[0_20px_45px_-22px_rgba(198,26,26,0.8)] transition-colors cursor-pointer"
            >
              {SMM_OUTCOMES.cta}
              <CTAArrow />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------
   Section header helper (kicker pill + title + intro).
------------------------------------------------------------------ */
const SectionHead: React.FC<{
  kicker: string;
  title: string;
  intro?: string;
  align?: 'center' | 'left';
}> = ({ kicker, title, intro, align = 'center' }) => (
  <div className={align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}>
    <Reveal>
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E7DCC6] text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs ${
          align === 'center' ? '' : ''
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
        {kicker}
      </span>
    </Reveal>
    <Reveal delay={0.06}>
      <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>
    </Reveal>
    {intro && (
      <Reveal delay={0.12}>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{intro}</p>
      </Reveal>
    )}
  </div>
);

/* ------------------------------------------------------------------
   Process — five steps on a vertical rail.
------------------------------------------------------------------ */
const PROCESS_ICONS = [PhoneCall, Route, Rocket, BarChart3, RefreshCw];

const ProcessSection: React.FC = () => (
  <section className="relative py-20 bg-[#FCFBF7] border-t border-[#EFE6D2] overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:20px_20px]"
      aria-hidden="true"
    />
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#C61A1A]">
            {SMM_PROCESS.lead}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {SMM_PROCESS.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {SMM_PROCESS.intro}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 relative">
        <span
          className="hidden md:block absolute left-1/2 top-6 bottom-6 w-0 border-l border-dashed border-[#D8C9AC] -translate-x-1/2"
          aria-hidden="true"
        />
        <div className="space-y-4 md:space-y-6">
          {SMM_PROCESS.steps.map((step, i) => {
            const Icon = PROCESS_ICONS[i];
            const isLeft = i % 2 === 0;
            return (
              <Reveal key={step.title} delay={i * 0.07}>
                <div
                  className={`md:w-[calc(50%-2.5rem)] ${
                    isLeft ? 'md:mr-auto md:text-right' : 'md:ml-auto'
                  }`}
                >
                  <div className="relative rounded-md border border-[#E7DCC6] bg-white p-5 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.45)] transition-all duration-300 hover:border-[#C61A1A]/35 hover:shadow-[0_24px_48px_-30px_rgba(198,26,26,0.4)]">
                    <span
                      className={`absolute top-6 hidden md:flex w-11 h-11 rounded-full bg-[#C61A1A] text-white items-center justify-center shadow-[0_12px_26px_-12px_rgba(198,26,26,0.8)] ${
                        isLeft ? '-right-[3.6rem]' : '-left-[3.6rem]'
                      }`}
                      aria-hidden="true"
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <div className={`flex items-center gap-3 ${isLeft ? 'md:justify-end' : ''}`}>
                      <span className="md:hidden w-9 h-9 rounded-full bg-[#C61A1A] text-white flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C61A1A]">
                        Step {String(i + 1).padStart(2, '0')} / 05
                      </span>
                    </div>
                    <h3 className="mt-2 text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center max-w-2xl mx-auto font-serif text-sm sm:text-base italic text-slate-600 leading-relaxed">
          {SMM_PROCESS.closing}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   FAQ accordion.
------------------------------------------------------------------ */
const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#C61A1A]">
              {SMM_FAQ.lead}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {SMM_FAQ.title}
            </h2>
          </Reveal>
        </div>

        <div className="space-y-3">
          {SMM_FAQ.items.map((item, i) => {
            const isOpen = openId === i;
            return (
              <Reveal key={item.q} delay={Math.min(i * 0.05, 0.3)}>
                <div
                  className={`rounded-md border transition-all duration-300 ${
                    isOpen
                      ? 'border-[#C61A1A]/40 bg-[#FCFBF7] shadow-[0_20px_44px_-32px_rgba(198,26,26,0.45)]'
                      : 'border-[#E7DCC6] bg-white hover:border-[#D8C9AC]'
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  >
                    <span className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          isOpen ? 'bg-[#C61A1A] text-white' : 'bg-[#F3EEE2] text-slate-500'
                        }`}
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </span>
                      <span
                        className={`text-sm sm:text-base font-extrabold leading-snug ${
                          isOpen ? 'text-[#C61A1A]' : 'text-slate-800'
                        }`}
                      >
                        {item.q}
                      </span>
                    </span>
                    <span
                      className={`mt-0.5 w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'border-[#C61A1A] bg-[#C61A1A] text-white'
                          : 'border-[#E2D7BE] text-slate-500'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" strokeWidth={3} />
                      ) : (
                        <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pl-[3.25rem]">
                          {'a' in item ? (
                            <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                          ) : (
                            <div className="space-y-2">
                              {item.aLines.map((line, li) =>
                                /^\d\./.test(line) ? (
                                  <p
                                    key={li}
                                    className="text-sm font-extrabold text-slate-800 tracking-tight"
                                  >
                                    {line}
                                  </p>
                                ) : (
                                  <p key={li} className="text-sm text-slate-600 leading-relaxed">
                                    {line}
                                  </p>
                                ),
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.08}>
          <p className="mt-10 text-center font-serif text-base sm:text-lg italic text-slate-700">
            {SMM_FAQ.transition}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------
   Final CTA — full-bleed brand-red band.
------------------------------------------------------------------ */
const FinalCtaSection: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#C61A1A] py-16 sm:py-20">
      <div
        className="absolute inset-0 opacity-[0.16] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 15%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 15%, transparent 75%)',
        }}
        aria-hidden="true"
      />
      {!reduce && (
        <motion.span
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-white/25"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      )}

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {SMM_CTA.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">{SMM_CTA.body}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <button
            onClick={onOpenAudit}
            className="group mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-[#C61A1A] hover:text-[#9E1414] text-sm font-extrabold shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)] transition-colors cursor-pointer"
          >
            {SMM_CTA.button}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Reveal>
      </div>
    </section>
  );
};

/* ==========================================================================
   Page
   ========================================================================== */
export const SocialMediaServicePage: React.FC<SocialMediaServicePageProps> = ({ onOpenAudit }) => {
  return (
    <main className="bg-white">
      <HeroSection onOpenAudit={onOpenAudit} />
      <ProblemSection />
      <ComparisonSection />
      <StrategySection onOpenAudit={onOpenAudit} />

      {/* ---------------------------------------------- system pillars */}
      <section className="relative py-20 bg-[#FBF7EE] border-y border-[#EFE6D2] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.055] pointer-events-none bg-[radial-gradient(#7C5A2E_1px,transparent_1px)] [background-size:18px_18px]"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead kicker={SMM_SYSTEM.label} title={SMM_SYSTEM.title} intro={SMM_SYSTEM.intro} />
          <div className="mt-12">
            <Reveal delay={0.1}>
              <PillarStepper />
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <p className="mt-10 text-center max-w-3xl mx-auto text-sm sm:text-base font-bold text-slate-700 leading-relaxed">
              {SMM_SYSTEM.transition}
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- platforms */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Platform playbooks"
            title={SMM_PLATFORMS.title}
            intro={SMM_PLATFORMS.intro}
          />
          <div className="mt-10">
            <Reveal delay={0.1}>
              <PlatformConsole />
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <p className="mt-10 text-center max-w-3xl mx-auto text-sm sm:text-base font-bold text-slate-700 leading-relaxed">
              {SMM_PLATFORMS.transition}
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------- framework */}
      <section
        id="smm-framework"
        className="relative py-20 bg-[#F8F1E2] border-y border-[#EFE6D2] overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#7C5A2E_1px,transparent_1px)] [background-size:18px_18px]"
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E2D7BE] bg-white text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                5D Growth Framework
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {SMM_FRAMEWORK.title}
              </h2>
            </Reveal>
          </div>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-4xl mx-auto">
            {SMM_FRAMEWORK.paras.map((p, i) => (
              <Reveal key={i} delay={0.08 + i * 0.05}>
                <p className="text-sm text-slate-600 leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="relative mt-12 rounded-[18px] border border-[#E7DCC6] bg-white p-5 pt-8 shadow-[0_36px_80px_-52px_rgba(15,23,42,0.5)] sm:p-8 sm:pt-9">
            <span
              aria-hidden="true"
              className="absolute -top-2 left-10 h-4 w-16 rotate-[-3deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90"
            />
            <span
              aria-hidden="true"
              className="absolute -top-2 right-12 h-4 w-16 rotate-[2deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90"
            />
            <div className="mb-5 flex items-center justify-between border-b border-dashed border-[#E2D7BE] pb-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Fig. 07 · the operating system
              </span>
              <span className="inline-flex -rotate-2 items-center rounded-sm border border-[#C61A1A]/50 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-[#C61A1A]">
                repeatable
              </span>
            </div>
            <Reveal delay={0.1}>
              <FrameworkRail />
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <p className="mt-9 text-center max-w-3xl mx-auto font-serif text-sm sm:text-base italic text-slate-600">
              {SMM_FRAMEWORK.transition}
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- outcomes */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="What changes"
            title={SMM_OUTCOMES.title}
            intro={SMM_OUTCOMES.intro}
          />
          <div className="mt-10">
            <OutcomeRows />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 text-center font-serif text-sm sm:text-base italic text-slate-600">
              {SMM_OUTCOMES.closing}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-7 flex justify-center">
              <button
                onClick={onOpenAudit}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C61A1A] hover:bg-[#9E1414] text-white text-sm font-extrabold shadow-[0_20px_45px_-22px_rgba(198,26,26,0.8)] transition-colors cursor-pointer"
              >
                {SMM_OUTCOMES.cta}
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <ProcessSection />
      <FaqSection />
      <FinalCtaSection onOpenAudit={onOpenAudit} />
    </main>
  );
};
