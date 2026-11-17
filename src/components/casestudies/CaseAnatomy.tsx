import React from 'react';
import { FileText, Search, Settings2, ShieldCheck, TrendingUp } from 'lucide-react';
import { Reveal } from '../Reveal';
import { INSIDE_EVERY_STUDY } from '../../data/caseStudiesContent';

const ICONS = [Search, Settings2, TrendingUp];
const EXHIBIT_LETTERS = ['A', 'B', 'C'];

/** Small, non-numeric diagnostics used as the exhibit on each sheet. */
const Evidence: React.FC<{ index: number }> = ({ index }) => {
  if (index === 0) {
    return (
      <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5" aria-hidden="true">
        <div className="flex items-center justify-between font-mono text-[7.5px] font-bold uppercase tracking-[0.16em]">
          <span className="text-slate-400">Signal audit</span>
          <span className="text-[#C61A1A]">3 leaks</span>
        </div>
        <div className="mt-2 space-y-1.5">
          {[
            ['Visibility', 46],
            ['Lead quality', 62],
            ['Paid spend', 38],
          ].map(([label, width]) => (
            <div key={label} className="flex items-center gap-2">
              <span className="w-14 shrink-0 text-[7.5px] font-semibold text-slate-500">{label}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-red-100">
                <span
                  className="block h-full rounded-full bg-[#C61A1A]"
                  style={{ width: `${width}%` }}
                />
              </span>
              <span className="text-[7px] font-extrabold text-[#C61A1A]">!</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5" aria-hidden="true">
        <div className="flex items-center justify-between font-mono text-[7.5px] font-bold uppercase tracking-[0.16em]">
          <span className="text-slate-400">Build sequence</span>
          <span className="text-[#C61A1A]">5D</span>
        </div>
        <div className="relative mt-3 flex items-start justify-between">
          <span className="absolute left-2 right-2 top-1 h-px bg-red-100" />
          {['Audit', 'Strategy', 'Build', 'Launch', 'Scale'].map((stage, i) => (
            <div key={stage} className="relative flex flex-1 flex-col items-center gap-1">
              <span
                className={`h-2 w-2 rounded-full ${
                  i < 4 ? 'bg-[#C61A1A]' : 'border border-[#C61A1A] bg-white'
                }`}
              />
              <span className="text-[6.5px] font-bold uppercase tracking-wide text-slate-400">
                {stage}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5" aria-hidden="true">
      <div className="flex items-center justify-between font-mono text-[7.5px] font-bold uppercase tracking-[0.16em]">
        <span className="text-slate-400">Measured after launch</span>
        <span className="text-[#C61A1A]">Verified</span>
      </div>
      <svg viewBox="0 0 120 34" className="mt-1 h-9 w-full">
        <path
          d="M2 30 C 20 28, 30 24, 45 20 S 75 12, 95 8 S 112 4, 118 3 L 118 34 L 2 34 Z"
          fill="#C61A1A"
          opacity="0.08"
        />
        <path
          d="M2 30 C 20 28, 30 24, 45 20 S 75 12, 95 8 S 112 4, 118 3"
          fill="none"
          stroke="#C61A1A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="118" cy="3" r="2.5" fill="#C61A1A" />
      </svg>
      <div className="mt-1 flex items-center justify-between font-mono text-[6.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
        <span>Leads</span>
        <span>Cost / lead</span>
        <span>Revenue</span>
      </div>
    </div>
  );
};

/**
 * CaseAnatomy — what every file contains, presented as one method folder
 * holding three sealed exhibit sheets.
 */
export const CaseAnatomy: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-[#F7F5F0] py-14 md:py-20">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-6 hidden select-none text-[150px] font-extrabold leading-none tracking-tighter text-slate-900/[0.035] lg:block"
      >
        METHOD
      </span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C61A1A]">
              <FileText className="h-3.5 w-3.5" /> Anatomy of a case file
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Same method. <span className="text-[#C61A1A]">Evidence at every step.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Every record follows the same three-beat structure, so you can compare outcomes
              instead of reading sales copy.
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto mt-10 max-w-6xl">
          <span className="absolute -top-2 left-5 z-10 inline-flex h-7 items-center rounded-t-xl border border-b-0 border-[#E7DCC6] bg-[#F5EDDD] px-4 font-mono text-[9px] font-extrabold uppercase tracking-[0.18em] text-slate-500 sm:left-8">
            The method file
          </span>
          <span className="absolute -top-1 right-4 z-10 hidden rotate-3 rounded border border-red-200 bg-white px-2.5 py-1 font-mono text-[8px] font-extrabold uppercase tracking-[0.16em] text-[#C61A1A] sm:inline-flex">
            Protocol · 5D
          </span>

          <div className="relative rounded-3xl border border-[#E7DCC6] bg-[#F5EDDD] p-3 pt-8 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.45)] sm:p-5 sm:pt-9">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 sm:gap-4">
              {INSIDE_EVERY_STUDY.map((item, i) => {
                const Icon = ICONS[i];
                return (
                  <Reveal key={item.number} delay={i * 0.08} className="h-full">
                    <article className="group relative flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_-26px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_20px_40px_-30px_rgba(198,26,26,0.35)] sm:p-5">
                      <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-[#C61A1A]/20 transition-colors group-hover:bg-[#C61A1A]" />

                      <div className="flex items-center justify-between gap-2 border-b border-dashed border-slate-200 pb-2.5">
                        <span className="font-mono text-[8px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                          Exhibit {EXHIBIT_LETTERS[i]}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-red-200 px-2 py-0.5 text-[7.5px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                          <ShieldCheck className="h-2.5 w-2.5" /> Sealed
                        </span>
                      </div>

                      <div className="mt-3.5 flex items-center gap-2.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
                          {item.number} / 03
                        </span>
                      </div>

                      <h3 className="mt-2.5 text-[15px] font-extrabold tracking-tight text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">
                        {item.body}
                      </p>

                      <div className="mt-auto pt-4">
                        <Evidence index={i} />
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between px-1 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400">
              <span>DIGIVIBZ · Case protocol</span>
              <span>3 exhibits · every file</span>
            </div>
          </div>

          <span className="absolute -bottom-3 right-6 rotate-[-6deg] rounded-md border-2 border-[#C61A1A] bg-white px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C61A1A] shadow-sm">
            Audited
          </span>
        </div>
      </div>
    </section>
  );
};
