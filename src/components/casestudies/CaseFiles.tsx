import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, FileText } from 'lucide-react';
import { Reveal } from '../Reveal';
import { WordReveal } from '../fx/FxKit';
import type { CaseStudy } from '../../types';

interface CaseFilesProps {
  studies: CaseStudy[];
  onOpenAudit: () => void;
}

const GROUPS = [
  { id: 'all', label: 'All files' },
  { id: 'local', label: 'Trades & local' },
  { id: 'health', label: 'Health & clinics' },
  { id: 'retail', label: 'Food & retail' },
  { id: 'b2b', label: 'B2B & education' },
] as const;

type GroupId = (typeof GROUPS)[number]['id'];

/** Case type groups — one home per study, so the filter counts add up. */
const GROUP_MEMBERS: Record<Exclude<GroupId, 'all'>, string[]> = {
  local: [
    'schaefer-lyndon',
    'all-about-concrete',
    'roof-claim',
    'plumbex',
    'brightspark-electrical',
    'keyguard-locksmith',
    'rapidrestore',
  ],
  health: ['revival-research', 'lung-n-sleep'],
  retail: ['cups-n-chai', 'lumiere-fine-jewelry'],
  b2b: ['bk-industrial-coatings', 'uav-coach-academy'],
};

const shortLabel = (label: string) => {
  const clean = label.split(' within ')[0].split(',')[0].trim();
  return clean.length > 34 ? clean.slice(0, 33).trimEnd() + '…' : clean;
};

/**
 * CaseFiles — the library as a drawer of case folders. Each folder holds an
 * exhibit print, the brief, and the measured result stamps; hovering lifts the
 * file, and the whole card opens the full case study.
 */
export const CaseFiles: React.FC<CaseFilesProps> = ({ studies, onOpenAudit }) => {
  const reduce = useReducedMotion();
  const [group, setGroup] = useState<GroupId>('all');

  const filtered =
    group === 'all' ? studies : studies.filter((s) => GROUP_MEMBERS[group].includes(s.id));

  const countFor = (id: GroupId) =>
    id === 'all' ? studies.length : studies.filter((s) => GROUP_MEMBERS[id].includes(s.id)).length;

  return (
    <section id="case-files" className="relative overflow-hidden bg-white py-14 md:py-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(100,116,139,0.18) 1px, transparent 0)',
          backgroundSize: '22px 22px',
          maskImage: 'linear-gradient(to bottom, #000, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000, transparent)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C61A1A]">
                <FileText className="h-3.5 w-3.5" /> The library · {studies.length} case files
              </div>
            </Reveal>
            <WordReveal
              text="Open a file. Read the whole case."
              highlight="whole case."
              delay={0.08}
              className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl"
            />
            <Reveal delay={0.14}>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Filter by case type, then pull a folder: the challenge, the exact build, and the
                measured result — filed in the order it happened.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="hidden shrink-0 pb-1 text-right md:block">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              File room
            </div>
            <div className="mt-1 font-mono text-sm font-extrabold tabular-nums text-slate-700">
              CF-01 → CF-{String(studies.length).padStart(2, '0')}
            </div>
            <div className="mt-1 text-[10px] font-semibold text-slate-400">
              Every file verified on the client account
            </div>
          </Reveal>
        </div>

        {/* file-type tabs */}
        <Reveal delay={0.1} className="mt-7">
          <div className="rounded-2xl border border-[#E7DCC6] bg-[#FCFBF7] p-1.5 shadow-xs">
            <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {GROUPS.map((g) => {
                const active = group === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setGroup(g.id)}
                    aria-pressed={active}
                    className={`relative shrink-0 rounded-xl px-3.5 py-2.5 text-[11px] font-bold transition-all duration-300 sm:text-xs ${
                      active
                        ? 'border border-slate-200 bg-white text-[#C61A1A] shadow-sm'
                        : 'border border-transparent text-slate-500 hover:bg-white/70 hover:text-slate-800'
                    }`}
                  >
                    {active && (
                      <span className="absolute inset-x-2 top-0 h-0.5 rounded-full bg-[#C61A1A]" />
                    )}
                    {g.label}
                    <span
                      className={`ml-1.5 font-mono text-[10px] font-extrabold tabular-nums ${
                        active ? 'text-[#C61A1A]/70' : 'text-slate-400'
                      }`}
                    >
                      {countFor(g.id)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* folder grid */}
        <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((study, index) => {
              const fileNo = studies.findIndex((s) => s.id === study.id) + 1;
              const ref = `CF-${String(fileNo).padStart(2, '0')}`;
              return (
                <motion.article
                  layout
                  key={study.id}
                  initial={reduce ? false : { y: 18 }}
                  whileInView={{
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: reduce ? 0 : (index % 3) * 0.05,
                    },
                  }}
                  viewport={{ once: true, margin: '-40px' }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative pt-2"
                >
                  {/* folder tab */}
                  <span className="absolute left-4 top-0 z-10 inline-flex h-5 items-center rounded-t-lg border border-b-0 border-[#E7DCC6] bg-[#F5EDDD] px-3 font-mono text-[9px] font-extrabold uppercase tracking-[0.16em] text-slate-500 transition-colors duration-300 group-hover:border-red-300 group-hover:bg-[#C61A1A] group-hover:text-white">
                    {ref}
                  </span>

                  <a
                    href={`/case-study/${study.id}`}
                    aria-label={`Open ${study.title}`}
                    className="relative flex h-full flex-col overflow-hidden rounded-2xl rounded-tl-none border border-[#E7DCC6] bg-[#FCFBF7] shadow-[0_18px_40px_-30px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-red-300 hover:shadow-[0_30px_60px_-34px_rgba(198,26,26,0.42)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C61A1A]"
                  >
                    <span className="absolute inset-x-0 top-0 z-10 h-0.5 w-0 bg-[#C61A1A] transition-all duration-500 group-hover:w-full" />

                    <div className="flex items-center justify-between gap-2 border-b border-[#EFE6D2] bg-[#F8F1E2] px-3.5 py-2">
                      <span className="shrink-0 font-mono text-[9px] font-extrabold uppercase tracking-widest text-slate-500">
                        {ref} / {String(studies.length).padStart(2, '0')}
                      </span>
                      <span className="truncate text-[9px] font-bold uppercase tracking-wider text-[#C61A1A]">
                        {study.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                      {/* exhibit print */}
                      <div className="relative">
                        <div className="overflow-hidden rounded-lg border-[3px] border-white bg-white shadow-[0_12px_28px_-18px_rgba(15,23,42,0.5)]">
                          <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                            <img
                              src={study.image}
                              alt=""
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              className="h-full w-full object-cover saturate-[0.92] transition-transform duration-700 group-hover:scale-[1.04]"
                            />
                            <span className="absolute left-2 top-2 rounded-sm bg-white/95 px-1.5 py-0.5 font-mono text-[8px] font-extrabold uppercase tracking-widest text-[#C61A1A] shadow-xs">
                              Exhibit A
                            </span>
                            <span className="absolute bottom-2 right-2 rounded-sm border border-red-200 bg-white/95 px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                              Verified
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-white px-2 py-1.5 font-mono text-[8px] uppercase tracking-widest">
                            <span className="text-slate-400">Ref · {ref}</span>
                            <span className="text-[#C61A1A]">{study.results.length} results</span>
                          </div>
                        </div>
                        <span className="absolute -top-2 left-1/2 h-3.5 w-12 -translate-x-1/2 rotate-[-3deg] border border-red-200/80 bg-red-100/85" />
                        <span className="absolute -top-1.5 right-3 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#C61A1A] shadow-[0_2px_4px_rgba(198,26,26,0.4)]" />
                      </div>

                      <h3 className="mt-3.5 line-clamp-3 text-[14px] font-extrabold leading-snug tracking-tight text-slate-900 sm:text-[15px]">
                        {study.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-slate-600 sm:text-[12.5px]">
                        {study.summary}
                      </p>

                      {/* result stamps */}
                      <div className="mt-3 grid grid-cols-3 gap-1.5">
                        {study.results.slice(0, 3).map((r) => (
                          <div
                            key={r.label}
                            className="min-w-0 rounded-md border border-dashed border-red-200 bg-red-50/60 px-1.5 py-1.5"
                          >
                            <div className="truncate text-[12px] font-extrabold leading-none tabular-nums text-[#C61A1A] sm:text-[13px]">
                              {r.value}
                            </div>
                            <div className="mt-1 line-clamp-2 text-[8px] font-semibold leading-tight text-slate-500">
                              {shortLabel(r.label)}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#EFE6D2] pt-2.5">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
                          <span className="h-1 w-1 rounded-full bg-[#C61A1A]" /> Case closed
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 transition-colors group-hover:text-[#C61A1A]">
                          Open file
                          <ArrowUpRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.article>
              );
            })}
          </AnimatePresence>

          {/* next case file */}
          <motion.div layout className="relative pt-2 lg:col-span-2">
            <span className="absolute left-4 top-0 z-10 inline-flex h-5 items-center rounded-t-lg border border-b-0 border-[#9E1414] bg-[#C61A1A] px-3 font-mono text-[9px] font-extrabold uppercase tracking-[0.16em] text-white">
              CF-{String(studies.length + 1).padStart(2, '0')} · Unopened
            </span>
            <div className="relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl rounded-tl-none border border-[#9E1414] bg-[#C61A1A] p-6 text-white shadow-[0_30px_60px_-36px_rgba(198,26,26,0.6)] sm:p-8">
              <span className="pointer-events-none absolute -bottom-12 -right-4 select-none text-[170px] font-extrabold leading-none text-white/10">
                {String(studies.length + 1).padStart(2, '0')}
              </span>
              <span className="pointer-events-none absolute right-5 top-5 rotate-6 rounded border border-dashed border-white/45 px-2.5 py-1 font-mono text-[8px] font-extrabold uppercase tracking-[0.18em] text-white/75">
                Awaiting evidence
              </span>

              <div className="relative max-w-lg">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" /> Next case file
                </span>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Your business could be case file {String(studies.length + 1).padStart(2, '0')}.
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                  Bring us the leak. We will return the evidence: what is broken, what to build
                  first, and the number we expect it to move.
                </p>
              </div>

              <div className="relative mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenAudit}
                  className="dz-btn-shine inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#C61A1A] shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-lg active:scale-[0.99]"
                >
                  Get My Free Growth Audit
                  <ArrowRight className="h-4 w-4" />
                </button>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/70">
                  No projections · measured after launch
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
