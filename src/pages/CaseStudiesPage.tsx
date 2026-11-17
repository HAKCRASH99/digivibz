import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, FileText, Layers, ShieldCheck } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { VersusSection } from '../components/versus/VersusSection';
import { Magnetic, WordReveal } from '../components/fx/FxKit';
import { CaseWall } from '../components/casestudies/CaseWall';
import { CaseFiles } from '../components/casestudies/CaseFiles';
import { CaseAnatomy } from '../components/casestudies/CaseAnatomy';
import {
  CASE_STUDIES_INTRO,
  CASE_STUDY_LIBRARY,
  INDEX_STATS,
} from '../data/caseStudiesContent';

interface CaseStudiesPageProps {
  onOpenAudit: () => void;
}

/**
 * Case-study index (`/case-studies`) — the proof archive.
 *
 * The hero is an evidence wall of real exhibits pinned to the centre seal.
 * The library below is a drawer of case folders: filter by case type, pull a
 * folder, and open the full file. A method folder explains the shared
 * challenge → build → measured-result structure before the closing pitch.
 */
export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onOpenAudit }) => {
  const reduceMotion = useReducedMotion();

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
  };

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const industries = new Set(CASE_STUDY_LIBRARY.map((s) => s.industry)).size;
  const resultsCount = CASE_STUDY_LIBRARY.reduce((n, s) => n + s.results.length, 0);

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — headline + evidence wall
      =================================================================== */}
      <section
        id="case-studies-hero"
        className="relative overflow-hidden bg-white pb-12 pt-6 md:pb-16 md:pt-8"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-70 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_38%,#000_70%,transparent_100%)]" />
        {!reduceMotion && (
          <div
            className="pointer-events-none absolute right-[4%] top-1/4 -z-10 h-[440px] w-[440px] rounded-full opacity-50 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(198,26,26,0.10) 0%, transparent 70%)',
              animation: 'dz-drift 15s ease-in-out infinite',
            }}
          />
        )}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-6">
            {/* copy */}
            <div className="space-y-5 lg:col-span-5">
              <motion.div
                {...rise(0.05)}
                className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#C61A1A] shadow-2xs"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C61A1A]" />
                Case Studies · The Proof Files
              </motion.div>

              <WordReveal
                as="h1"
                text="Every Case. Closed With Proof."
                highlight="Closed With Proof."
                delay={0.12}
                className="text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px]"
              />

              <motion.p
                {...rise(0.26)}
                className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base"
              >
                {CASE_STUDIES_INTRO}
              </motion.p>

              <motion.div {...rise(0.36)} className="flex flex-wrap items-center gap-3 pt-1">
                <Magnetic className="w-full sm:w-auto [&>span]:block [&>span]:w-full">
                  <button
                    onClick={onOpenAudit}
                    className="dz-btn-shine group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C61A1A] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#9E1414] hover:shadow-lg active:scale-[0.99] sm:w-auto sm:text-base"
                  >
                    <span>Get My Free Growth Audit</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Magnetic>
                <a
                  href="#case-files"
                  onClick={scrollTo('case-files')}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition-all hover:border-[#C61A1A] hover:text-[#C61A1A] sm:w-auto sm:text-base"
                >
                  Open the Case Wall
                  <ArrowRight className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
                </a>
              </motion.div>

              <motion.div
                {...rise(0.46)}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-slate-500 sm:text-sm"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-[#C61A1A]" />
                  {industries} industries · {resultsCount} measured results
                </span>
                <span className="hidden h-4 w-px bg-slate-200 sm:inline" />
                <span className="inline-flex items-center gap-1 font-medium">
                  <ShieldCheck className="h-4 w-4 text-[#C61A1A]" />
                  Every figure verified on the client account
                </span>
              </motion.div>
            </div>

            {/* evidence wall */}
            <div className="flex justify-center lg:col-span-7 lg:justify-end">
              <CaseWall studies={CASE_STUDY_LIBRARY} />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2. SUMMARY OF FINDINGS — the archive in four numbers
      =================================================================== */}
      <div className="border-y border-slate-200 bg-[#FCFBF7]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:gap-10 lg:px-8">
          <div className="shrink-0">
            <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C61A1A]" />
              Summary of findings
            </div>
            <div className="mt-1.5 text-[10px] font-semibold text-slate-400">
              All figures measured on client accounts
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
            {INDEX_STATS.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 0.06}
                className={`px-1 sm:px-4 ${i > 0 ? 'sm:border-l sm:border-slate-200' : ''}`}
              >
                <div className="text-2xl font-extrabold leading-none tabular-nums text-slate-900 sm:text-[28px]">
                  {stat.value}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  <span className="h-1 w-1 rotate-45 bg-[#C61A1A]" />
                  {stat.label}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="hidden shrink-0 -rotate-3 rounded-md border-2 border-[#C61A1A] px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C61A1A] lg:block">
            Verified
          </div>
        </div>
      </div>

      {/* ==================================================================
          3. THE LIBRARY — filterable case folders
      =================================================================== */}
      <CaseFiles studies={CASE_STUDY_LIBRARY} onOpenAudit={onOpenAudit} />

      <VersusSection slug="case-studies" />

      {/* ==================================================================
          4. METHOD — what every case file contains
      =================================================================== */}
      <CaseAnatomy />

      {/* ==================================================================
          5. CLOSING CTA — proof beats promises
      =================================================================== */}
      <section className="relative overflow-hidden bg-[#C61A1A] py-16 md:py-20">
        <div className="absolute left-0 top-0 h-1 w-40 bg-white/70" />
        <div className="absolute right-0 top-0 h-1 w-40 bg-white/70" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '3rem 3rem',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)',
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 -right-4 select-none text-[150px] font-extrabold leading-none tracking-tighter text-white/10 sm:text-[200px]"
        >
          PROOF
        </span>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
              <FileText className="h-3.5 w-3.5" /> The next file
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
              Proof beats promises.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              Bring us the next challenge. We will audit what is leaking, show you what to build
              first, and file the measured result once it ships.
            </p>
          </Reveal>
          <Reveal
            delay={0.18}
            className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic>
              <button
                onClick={onOpenAudit}
                className="dz-btn-shine group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-[#C61A1A] shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-lg sm:text-base"
              >
                <span>Get My Free Growth Audit</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
            <a
              href="#case-files"
              onClick={scrollTo('case-files')}
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 sm:text-base"
            >
              Back to the Case Wall
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-5 text-xs text-white/70">
              Free personalized plan · Uncover opportunities · Fix gaps · Zero obligation
            </p>
          </Reveal>
        </div>

        <span className="absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-[-8deg] rounded-lg border-2 border-dashed border-white/50 px-4 py-3 text-center font-mono text-[9px] font-extrabold uppercase leading-relaxed tracking-[0.2em] text-white/80 lg:block">
          Case file {String(CASE_STUDY_LIBRARY.length + 1).padStart(2, '0')}
          <br />
          Awaiting evidence
        </span>
      </section>
    </div>
  );
};
