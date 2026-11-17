import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Activity,
  ArrowRight,
  Check,
  PenTool,
  Rocket,
  Search,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { VersusSection } from '../components/versus/VersusSection';
import { WordReveal, TiltCard } from '../components/fx/FxKit';
import { ProjectMockup } from '../components/ProjectMockup';
import { WorkDeck } from '../components/portfolio/WorkDeck';
import { ResultsLedger } from '../components/portfolio/ResultsLedger';
import { CoverWall } from '../components/portfolio/CoverWall';
import { WorkVault } from '../components/portfolio/WorkVault';
import {
  GROWTH_SYSTEM_CLOSER,
  GROWTH_SYSTEM_STEPS,
  PORTFOLIO_CTA,
  PORTFOLIO_INTRO,
  PORTFOLIO_PROJECTS,
  RESULTS_BOARD,
  WORKING_STYLE_PARAS,
  WORKING_STYLE_PHASES,
  type PortfolioProject,
} from '../data/portfolioContent';

/** Step icons for the 5D pipeline. */
const STEP_ICONS = [Search, PenTool, Wrench, Rocket, Activity] as const;

/** Pipeline node x-positions (viewBox 1000 wide, y = 46). */
const NODE_X = [80, 280, 480, 680, 880];

/* ------------------------------------------------------------------
   One selected-work spread — framed like a client file, with the
   mockup on a pointer-tilt card and a ghost project number behind.
------------------------------------------------------------------ */
const ProjectSpread: React.FC<{ project: PortfolioProject; index: number }> = ({ project, index }) => {
  const flip = index % 2 === 1;

  return (
    <Reveal delay={0.05}>
      <div className="group relative">
        {/* filed paper layers behind the dossier */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 -bottom-2.5 top-2.5 rounded-[28px] border border-slate-200/80 bg-white/70 transition-transform duration-500 group-hover:translate-y-1.5"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 -bottom-1 top-1 rounded-[28px] border border-slate-200 bg-white transition-transform duration-500 group-hover:translate-y-0.5"
        />

        <article className="dz-spot dz-spot-ring relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_70px_-52px_rgba(15,23,42,0.55)] transition-[border-color,box-shadow,transform] duration-500 group-hover:-translate-y-1 group-hover:border-red-200 group-hover:shadow-[0_40px_90px_-52px_rgba(198,26,26,0.45)]">
          {/* red rail sweeps across the file on hover */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-20 h-0.5 w-0 bg-[#C61A1A] transition-all duration-500 group-hover:w-full"
          />
          {/* blueprint grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:28px_28px] opacity-70"
          />
          {/* ghost index */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 right-3 select-none text-[120px] font-extrabold leading-none tracking-tighter text-slate-100 sm:text-[160px]"
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="relative grid grid-cols-1 items-center gap-8 p-5 sm:p-7 lg:grid-cols-2 lg:gap-12 lg:p-9">
            {/* mockup */}
            <div className={flip ? 'lg:order-2' : ''}>
              <TiltCard max={5} className="rounded-[22px]">
                <div className="relative rounded-[22px] border border-slate-200 bg-white p-2.5 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.45)] sm:p-3">
                  <ProjectMockup
                    variant={project.variant}
                    metric={project.metric.value}
                    url={project.variant === 'finance' ? 'atlasfinancial.com' : 'northbridgelegal.com'}
                    className="transition-transform duration-700 group-hover:scale-[1.015]"
                  />
                  <span className="absolute -top-2 right-4 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-slate-600 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                    Live rebuild
                  </span>
                </div>
              </TiltCard>

              <div className="mt-3 flex items-center justify-between px-1">
                <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Website · Funnel · Campaigns
                </span>
                <span className="inline-flex items-center gap-1.5 text-[8.5px] font-bold uppercase tracking-[0.16em] text-[#C61A1A]">
                  <span className="h-1 w-1 rounded-full bg-[#C61A1A]" />
                  Rebuilt end-to-end
                </span>
              </div>
            </div>

            {/* copy */}
            <div className={flip ? 'lg:order-1' : ''}>
              <div className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                <span className="h-px w-7 bg-[#C61A1A]" />
                Project {String(index + 1).padStart(2, '0')} / {String(PORTFOLIO_PROJECTS.length).padStart(2, '0')}
              </div>

              <div className="mt-3 inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-500">
                {project.industry}
              </div>

              <h3 className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                {project.name}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600 sm:text-[15px]">
                {project.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {['Website rebuild', 'Conversion funnel', 'AI-driven campaigns'].map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="flex items-baseline gap-2.5 rounded-xl bg-red-50 px-3.5 py-2.5 ring-1 ring-red-100">
                  <span className="text-2xl font-extrabold leading-none tabular-nums text-[#C61A1A]">
                    {project.metric.value}
                  </span>
                  <span className="max-w-[200px] text-[11px] font-semibold leading-tight text-slate-700">
                    {project.metric.label}
                  </span>
                </div>

                <a
                  href={`/case-study/${project.slug}`}
                  className="group/link inline-flex min-h-11 items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-800 transition-colors hover:text-[#C61A1A]"
                >
                  View case study
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 transition-all group-hover/link:rotate-45 group-hover/link:border-[#C61A1A] group-hover/link:bg-[#C61A1A] group-hover/link:text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* file footer */}
          <div className="relative flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-5 py-2.5 sm:px-7 lg:px-9">
            <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-slate-400">
              DIGIVIBZ / Case file {String(index + 1).padStart(2, '0')}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#C61A1A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C61A1A]" />
              Measured
            </span>
          </div>
        </article>
      </div>
    </Reveal>
  );
};


/**
 * Portfolio page (`/portfolio`) — the proof page: results board hero,
 * stats rail, client project previews, featured case-study grid, the 5D
 * pipeline, the working-style pulse board, and the closing audit CTA.
 */
export const PortfolioPage: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  /** In-page scroll WITHOUT touching the hash (hash = route switch). */
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
  };

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — headline + results board
      =================================================================== */}
      <section id="portfolio-hero" className="relative pt-6 pb-12 md:pt-8 md:pb-14 overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_38%,#000_70%,transparent_100%)] opacity-70 -z-10 pointer-events-none"
        />
        {!reduceMotion && (
          <div
            className="absolute top-1/4 right-[8%] w-[420px] h-[420px] rounded-full -z-10 pointer-events-none opacity-50 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(198,26,26,0.10) 0%, transparent 70%)',
              animation: 'dz-drift 14s ease-in-out infinite',
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 lg:items-center">
            {/* ---------------------------------------------------- copy */}
            <div className="lg:col-span-5 space-y-5">
              <motion.div
                {...rise(0.05)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 text-xs font-bold text-[#C61A1A] uppercase tracking-widest shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                Portfolio
              </motion.div>

              <WordReveal
                as="h1"
                text="The Work Behind Real Business Growth"
                highlight="Real Business Growth"
                delay={0.12}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.14]"
              />

              <motion.p {...rise(0.24)} className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                {PORTFOLIO_INTRO}
              </motion.p>

              <motion.div {...rise(0.34)} className="pt-1">
                <a
                  href="#featured-cases"
                  onClick={scrollTo('featured-cases')}
                  className="dz-btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.99] group cursor-pointer"
                >
                  <span>View Case Studies</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>

              <motion.div
                {...rise(0.44)}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm text-slate-500"
              >
                <span className="inline-flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#C61A1A]" />
                  <strong className="text-slate-800">4X</strong>&nbsp;avg revenue growth
                </span>
                <span className="hidden sm:inline w-px h-4 bg-slate-200" />
                <span>
                  <strong className="text-slate-800">250+</strong>&nbsp;US businesses served
                </span>
              </motion.div>
            </div>

            {/* ------------------------------------------------ work deck */}
            <div className="lg:col-span-7">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <WorkDeck />
              </motion.div>
            </div>
          </div>

          {/* ------------------------------------------- results ticker */}
          <motion.div
            {...rise(0.5)}
            className="mt-10 overflow-hidden border-y border-slate-200 bg-white/70 backdrop-blur-sm"
          >
            <div className="dz-marquee">
              <div className="dz-marquee-track flex w-max items-stretch">
                {[0, 1].map((pass) => (
                  <div key={pass} className="flex items-stretch" aria-hidden={pass === 1 || undefined}>
                    {RESULTS_BOARD.map((row) => (
                      <div
                        key={`${pass}-${row.label}`}
                        className="flex shrink-0 items-center gap-3 border-r border-slate-200/80 px-5 py-3.5 sm:px-7"
                      >
                        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          {row.label}
                        </span>
                        <span className="text-sm font-extrabold tabular-nums text-[#C61A1A]">
                          {row.value.toFixed(1)}X
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          growth
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================================================================
          2. RESULTS LEDGER — animated proof dashboard
      =================================================================== */}
      <ResultsLedger />

      {/* ==================================================================
          3. COVER WALL — every live file as a travelling cover wall
      =================================================================== */}
      <CoverWall />

      {/* ==================================================================
          3. SELECTED CLIENT WORK — Atlas + Northbridge spreads
      =================================================================== */}
      <section id="selected-work" className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5" /> Client Projects
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Selected <span className="text-[#C61A1A]">Client Work</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-xs text-[12.5px] leading-relaxed text-slate-500 sm:text-right">
                Two growth systems, rebuilt end-to-end. Every number below is measured, not estimated.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 space-y-6 sm:space-y-8">
            {PORTFOLIO_PROJECTS.map((project, i) => (
              <ProjectSpread key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. THE VAULT — pinned horizontal case-file gallery
      =================================================================== */}
      <WorkVault />

      {/* ==================================================================
          5. HOW WE DRIVE GROWTH — interactive 5D pipeline
      =================================================================== */}
      <section id="growth-system" className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" /> The System Behind The Results
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                How We Drive Consistent{' '}
                <span className="text-[#C61A1A]">Business Growth</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Every result you see isn’t random, it’s built on a structured system we apply to every business we
                work with. Our 5D Growth Framework ensures every decision is intentional, every action is
                measurable, and every outcome is aligned with real business growth.
              </p>
            </Reveal>
          </div>

          {/* pipeline track */}
          <Reveal delay={0.1} className="mt-10">
            <div className="dz-spot relative rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-32px_rgba(15,23,42,0.22)] overflow-hidden">
              <div className="flex items-center justify-between px-5 sm:px-6 pt-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C61A1A] animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    5D Growth Pipeline
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C61A1A] bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                  Repeatable
                </span>
              </div>

              <svg
                viewBox="0 0 1000 116"
                className="w-full select-none mt-2"
                role="img"
                aria-label="Pipeline diagram: Discover, Design, Develop, Deploy, Detect"
              >
                {/* base track */}
                <line x1="80" y1="46" x2="920" y2="46" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
                {/* animated flow */}
                <line
                  x1="80"
                  y1="46"
                  x2="920"
                  y2="46"
                  stroke="#C61A1A"
                  strokeWidth="3"
                  strokeDasharray="12 10"
                  strokeLinecap="round"
                  opacity={0.55}
                  className={reduceMotion ? undefined : 'dz-flow'}
                />

                {GROWTH_SYSTEM_STEPS.map((step, i) => {
                  const active = i === activeStep;
                  const x = NODE_X[i];
                  return (
                    <g
                      key={step.name}
                      onClick={() => setActiveStep(i)}
                      onMouseEnter={() => setActiveStep(i)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* halo for the active node */}
                      {active && !reduceMotion && (
                        <circle cx={x} cy={46} r="26" fill="none" stroke="#C61A1A" strokeWidth="1.5" opacity="0.35">
                          <animate attributeName="r" values="26;38;26" dur="2.4s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle
                        cx={x}
                        cy={46}
                        r="24"
                        fill={active ? '#C61A1A' : '#FFFFFF'}
                        stroke={active ? '#C61A1A' : '#E2E8F0'}
                        strokeWidth="2.5"
                      />
                      <text
                        x={x}
                        y={52}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="800"
                        fill={active ? '#FFFFFF' : '#C61A1A'}
                      >
                        0{i + 1}
                      </text>
                      <text
                        x={x}
                        y={94}
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="800"
                        fill={active ? '#C61A1A' : '#475569'}
                        letterSpacing="1"
                      >
                        {step.name.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* step cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4 sm:p-5 pt-1">
                {GROWTH_SYSTEM_STEPS.map((step, i) => {
                  const Icon = STEP_ICONS[i];
                  const active = i === activeStep;
                  return (
                    <div
                      key={step.name}
                      onMouseEnter={() => setActiveStep(i)}
                      className={`rounded-xl border p-4 transition-all cursor-default ${
                        active
                          ? 'border-[#C61A1A] bg-red-50/50 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-red-200'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          active ? 'bg-[#C61A1A] text-white' : 'bg-red-50 text-[#C61A1A]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <h3 className="mt-3 text-sm font-extrabold text-slate-900">{step.name}</h3>
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* closer band */}
          <Reveal delay={0.12} className="mt-8">
            <div className="rounded-2xl bg-[#C61A1A] px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#C61A1A] text-xs font-bold uppercase tracking-widest shrink-0">
                5D Growth Framework
              </span>
              <p className="text-sm sm:text-base font-semibold text-white leading-relaxed max-w-3xl">
                {GROWTH_SYSTEM_CLOSER}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          6. WHAT WORKING WITH US FEELS LIKE — copy + project pulse board
      =================================================================== */}
      <section id="working-style" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* copy */}
            <div className="lg:col-span-6 space-y-4">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-red-200 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5" /> The Experience
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  What Working With <span className="text-[#C61A1A]">Digivibz Feels Like</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14} className="space-y-3.5 pt-1">
                {WORKING_STYLE_PARAS.map((para, i) => (
                  <p
                    key={i}
                    className={`text-sm sm:text-base leading-relaxed ${
                      i === 0 ? 'font-semibold text-slate-800' : 'text-slate-600'
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </Reveal>
            </div>

            {/* project pulse board */}
            <Reveal direction="right" delay={0.1} className="lg:col-span-6">
              <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
                {/* header */}
                <div className="flex items-center justify-between px-5 sm:px-6 pt-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C61A1A] animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                      Project Pulse
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#C61A1A] bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                    On Track
                  </span>
                </div>

                {/* phases */}
                <div className="px-5 sm:px-6 py-5 space-y-4">
                  {WORKING_STYLE_PHASES.map((group, i) => (
                    <div key={group.phase} className="relative">
                      {i < WORKING_STYLE_PHASES.length - 1 && (
                        <span className="absolute left-[15px] top-9 bottom-[-18px] w-px bg-gradient-to-b from-red-200 to-red-100" />
                      )}
                      <div className="flex items-start gap-3.5">
                        <span className="relative z-10 w-8 h-8 rounded-full bg-[#C61A1A] text-white flex items-center justify-center text-[11px] font-extrabold shrink-0">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                            {group.phase}
                          </div>
                          <motion.ul
                            className="mt-1.5 space-y-1.5"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-40px' }}
                            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                          >
                            {group.items.map((item) => (
                              <motion.li
                                key={item}
                                variants={{
                                  hidden: { opacity: 0, x: -8 },
                                  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                                }}
                                className="flex items-start gap-2 text-sm text-slate-700"
                              >
                                <span className="p-0.5 rounded-full bg-red-100 text-[#C61A1A] mt-0.5 shrink-0">
                                  <Check className="w-3 h-3" />
                                </span>
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* footer */}
                <div className="px-5 sm:px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-[#C61A1A] shrink-0" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-600">
                    You always know what’s happening — and why.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <VersusSection slug="portfolio" />

      {/* ==================================================================
          7. CLOSING CTA — red band
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-[#C61A1A] overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-1 bg-white/70" />
        <div className="absolute top-0 right-0 w-40 h-1 bg-white/70" />
        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '3rem 3rem',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {PORTFOLIO_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">{PORTFOLIO_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.14} className="mt-7">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-100 text-[#C61A1A] font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>Get My Free Growth Audit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-xs text-white/75">
              Free personalized plan · Uncover opportunities · Fix gaps · Zero obligation
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
