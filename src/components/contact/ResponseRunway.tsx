import React from 'react';
import { Clock, FileText, Search, Target } from 'lucide-react';
import { Reveal } from '../Reveal';
import { WordReveal } from '../fx/FxKit';
import { CONTACT_STEPS } from '../../data/contactContent';

const STEP_ICONS = {
  search: Search,
  target: Target,
  file: FileText,
  clock: Clock,
} as const;

const TIMES = ['T+0h', 'T+2h', 'T+24h', 'T+48h'];

/** Slight rotations so the notes read as taped to a wall, not as cards. */
const TILT = ['', 'sm:rotate-1', 'sm:-rotate-1', 'sm:rotate-[1.6deg]'];

/**
 * ResponseRunway — the post-submission timeline as four taped desk memos.
 * Handwritten time stamps, circled step numbers and a red handwritten note
 * close out the route; nothing about it reads like a dashboard.
 */
export const ResponseRunway: React.FC = () => (
  <section
    id="what-next"
    className="relative overflow-hidden border-y border-slate-100 bg-[#FCFBF7] py-14 md:py-20"
  >
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-44 opacity-60"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(100,116,139,0.18) 1px, transparent 0)',
        backgroundSize: '24px 24px',
        maskImage: 'linear-gradient(to bottom, #000, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, #000, transparent)',
      }}
    />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C61A1A]">
              <Clock className="h-3.5 w-3.5" /> Notes from the desk
            </div>
          </Reveal>
          <WordReveal
            text="What Happens After You Submit the Form"
            highlight="After You Submit the Form"
            delay={0.08}
            className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl"
          />
          <Reveal delay={0.14}>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              One route, four stops, no black box. You always know who is reading your brief and
              what they are preparing.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="hidden shrink-0 pb-1 text-right md:block">
          <div className="font-serif text-sm italic text-slate-500">pinned to the studio wall</div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            First reply ≤ 48 hours
          </div>
        </Reveal>
      </div>

      {/* memo wall */}
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {CONTACT_STEPS.map((step, i) => {
          const Icon = STEP_ICONS[step.icon];
          return (
            <Reveal key={step.title} delay={i * 0.07} className={`${TILT[i]} transition-transform duration-300 hover:rotate-0`}>
              <div className="relative flex h-full flex-col rounded-md border border-[#E7DCC6] bg-white px-5 pb-5 pt-7 shadow-[0_16px_30px_-26px_rgba(15,23,42,0.5)]">
                {/* tape */}
                <span
                  aria-hidden="true"
                  className={`absolute -top-2 left-1/2 h-4 w-16 -translate-x-1/2 border border-[#D8C9AC]/70 bg-[#EFE4CD]/90 ${
                    i % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[2deg]'
                  }`}
                />

                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-red-50 px-2 py-1 font-mono text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#C61A1A]">
                    <span className="h-1 w-1 rounded-full bg-[#C61A1A]" />
                    {TIMES[i]}
                  </span>
                  <span className="rounded-full border-2 border-[#C61A1A]/35 px-2 py-0.5 font-serif text-[13px] font-bold italic leading-none text-[#C61A1A]">
                    0{i + 1}
                  </span>
                </div>

                <span className="mt-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-[#C61A1A]">
                  <Icon className="h-4 w-4" />
                </span>

                <h3 className="mt-3 text-[14px] font-extrabold leading-snug tracking-tight text-slate-900">
                  {step.heading}
                </h3>
                <p className="mt-1.5 flex-1 text-[12px] leading-relaxed text-slate-500">
                  {step.description}
                </p>

                <span className="mt-4 inline-flex w-fit items-center border-b border-dashed border-red-300 pb-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  {step.title.replace(/^Step \d+: /, '')}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* handwritten close */}
      <Reveal delay={0.12} className="mt-10">
        <div className="flex flex-col items-center justify-center gap-3 rounded-md bg-[#C61A1A] px-5 py-4 text-center sm:flex-row sm:gap-4">
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#C61A1A]">
            5D Growth Framework
          </span>
          <p className="text-[12.5px] font-semibold leading-relaxed text-white sm:text-sm">
            Your business growth becomes{' '}
            <span className="font-extrabold underline decoration-white/50 underline-offset-4">
              structured, measurable, and unstoppable.
            </span>
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);
