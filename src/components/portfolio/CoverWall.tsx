import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES } from '../../data/content';
import { Reveal } from '../Reveal';

/**
 * CoverWall — a full-bleed wall of live case-study covers.
 *
 * Two rows travel in opposite directions; hovering pauses the row so the
 * cover can be inspected (grayscale lifts to color) and clicked through to
 * its case file. Acts as the visual bridge between the hero and the numbers.
 */

const ROW_B = [...CASE_STUDIES.slice(5), ...CASE_STUDIES.slice(0, 5)];

const WallRow: React.FC<{
  items: typeof CASE_STUDIES;
  reverse?: boolean;
  seconds: number;
  label: string;
}> = ({ items, reverse, seconds, label }) => (
  <div className="dz-marquee overflow-hidden" aria-label={label}>
    <div
      className="dz-marquee-track flex w-max items-stretch"
      style={{ animationDuration: `${seconds}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
    >
      {[0, 1].map((pass) => (
        <div key={pass} className="flex shrink-0 items-stretch" aria-hidden={pass === 1 || undefined}>
          {items.map((study) => {
            const fileIndex = CASE_STUDIES.findIndex((item) => item.id === study.id) + 1;
            return (
            <a
              key={`${pass}-${study.id}`}
              href={`/case-study/${study.id}`}
              tabIndex={pass === 1 ? -1 : 0}
              className="group relative mr-3 h-[126px] w-[196px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 outline-none transition-colors duration-300 hover:border-red-300 focus-visible:ring-2 focus-visible:ring-[#C61A1A] sm:mr-4 sm:h-[152px] sm:w-[244px]"
            >
              <img
                src={study.image}
                alt={study.title}
                referrerPolicy="no-referrer"
                draggable={false}
                className="h-full w-full object-cover opacity-90 grayscale-[42%] transition-all duration-700 group-hover:scale-[1.06] group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A]/85 via-[#08080A]/20 to-transparent" />

              <span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.13em] text-slate-900 shadow-xs sm:text-[9px]">
                {study.category.length > 18 ? `${study.category.slice(0, 17)}…` : study.category}
              </span>
              <span className="absolute right-2.5 top-2.5 rounded-full bg-black/30 px-1.5 py-0.5 font-mono text-[9px] font-bold tabular-nums text-white/85 backdrop-blur-sm">
                {String(fileIndex).padStart(2, '0')}
              </span>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                <span className="line-clamp-2 text-[11px] font-bold leading-snug text-white sm:text-[12px]">
                  {study.title}
                </span>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/30 text-white/80 transition-colors group-hover:border-[#C61A1A] group-hover:bg-[#C61A1A] group-hover:text-white">
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>

              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#C61A1A] transition-transform duration-500 group-hover:scale-x-100" />
            </a>
            );
          })}
        </div>
      ))}
    </div>
  </div>
);

export const CoverWall: React.FC = () => (
  <section aria-label="Cover wall of client case studies" className="relative overflow-hidden border-y border-slate-100 bg-white py-12 sm:py-14">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C61A1A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
              The Wall · {CASE_STUDIES.length} Live Files
            </div>
            <p className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Different industries. <span className="text-[#C61A1A]">Same growth system.</span>
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <span className="hidden font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:inline-flex sm:items-center sm:gap-2">
            Hover to pause · click to open a file
            <ArrowUpRight className="h-3.5 w-3.5 text-[#C61A1A]" />
          </span>
        </Reveal>
      </div>
    </div>

    <div className="mt-7 space-y-3 sm:space-y-4">
      <div className="[transform:rotate(-0.8deg)_scale(1.02)]">
        <WallRow items={CASE_STUDIES} seconds={70} label="Case study covers, row one" />
      </div>
      <div className="[transform:rotate(0.8deg)_scale(1.02)]">
        <WallRow items={ROW_B} reverse seconds={88} label="Case study covers, row two" />
      </div>
    </div>
  </section>
);
