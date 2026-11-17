import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import type { CaseStudy } from '../../types';

interface CaseWallProps {
  studies: CaseStudy[];
}

interface Exhibit {
  id: string;
  label: string;
  rotate: string;
  metricIndex: number;
  pos: React.CSSProperties;
}

/**
 * Four filed exhibits pinned to the wall. Positions are percentages of the
 * board so the collage holds from 340px phones up to the 560px desktop frame.
 */
const EXHIBITS: Exhibit[] = [
  {
    id: 'revival-research',
    label: 'Organic traffic',
    rotate: '-rotate-3',
    metricIndex: 0,
    pos: { left: '2.5%', top: '6%', width: '37%' },
  },
  {
    id: 'schaefer-lyndon',
    label: 'Calls generated',
    rotate: 'rotate-2',
    metricIndex: 0,
    pos: { right: '2.5%', top: '9%', width: '33%' },
  },
  {
    id: 'keyguard-locksmith',
    label: 'Cost per lead',
    rotate: 'rotate-1',
    metricIndex: 1,
    pos: { left: '3.5%', bottom: '5%', width: '34%' },
  },
  {
    id: 'cups-n-chai',
    label: 'Keywords ranked',
    rotate: '-rotate-2',
    metricIndex: 0,
    pos: { right: '3%', bottom: '4%', width: '34%' },
  },
];

/** Slack string runs, drawn from each exhibit's pin to the centre seal. */
const STRINGS = [
  'M21 7 C 28 22, 40 38, 50 47',
  'M81 11 C 71 25, 60 38, 50 47',
  'M21 64 C 30 58, 40 53, 50 49',
  'M82 65 C 71 59, 60 53, 50 49',
];

const clamp = (text: string, max: number) =>
  text.length > max ? text.slice(0, max - 1).trimEnd() + '…' : text;

/**
 * CaseWall — the index hero. A pinboard of real client exhibits linked to the
 * centre seal; every pinned file opens its full case study.
 */
export const CaseWall: React.FC<CaseWallProps> = ({ studies }) => {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="relative rounded-[26px] border border-slate-200 bg-white p-3 shadow-[0_36px_80px_-46px_rgba(15,23,42,0.45)] sm:p-3.5">
        {/* frame header */}
        <div className="flex items-center justify-between px-1.5 pb-2.5 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:text-[9px]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C61A1A]" />
            Evidence wall
          </span>
          <span>Fig. 01 · {String(studies.length).padStart(2, '0')} files</span>
        </div>

        {/* board */}
        <div
          className="relative aspect-[11/10] overflow-hidden rounded-2xl border border-slate-200 bg-[#FCFBF7]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(100,116,139,0.22) 1px, transparent 0)',
            backgroundSize: '16px 16px',
          }}
        >
          {/* red string runs */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {STRINGS.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="#C61A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={
                  reduce ? { duration: 0 } : { duration: 1.1, delay: 0.55 + i * 0.12, ease: 'easeOut' }
                }
              />
            ))}
          </svg>

          {/* pinned exhibits */}
          {EXHIBITS.map((ex, i) => {
            const study = studies.find((s) => s.id === ex.id);
            if (!study) return null;
            const metric = study.results[ex.metricIndex] ?? study.results[0];
            return (
              <motion.div
                key={ex.id}
                initial={reduce ? false : { opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.4 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                style={ex.pos}
                className={`group absolute z-10 ${ex.rotate} transition-transform duration-300 hover:z-30 hover:rotate-0 motion-reduce:transition-none`}
              >
                <a
                  href={`/case-study/${study.id}`}
                  aria-label={`Open the ${study.category} case study`}
                  className="block rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_14px_30px_-20px_rgba(15,23,42,0.5)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-red-300 group-hover:shadow-[0_24px_44px_-22px_rgba(198,26,26,0.45)]"
                >
                  {/* pushpin */}
                  <span className="absolute -top-1.5 left-1/2 z-20 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-[#C61A1A] shadow-[0_2px_4px_rgba(198,26,26,0.45)]" />

                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
                    <img
                      src={study.image}
                      alt=""
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="h-full w-full object-cover grayscale-[18%] transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                    <span className="absolute left-1 top-1 rounded-sm bg-white/95 px-1.5 py-0.5 font-mono text-[7px] font-extrabold uppercase tracking-widest text-[#C61A1A] shadow-xs">
                      EX. {String.fromCharCode(65 + i)}
                    </span>
                  </div>

                  <div className="px-0.5 pb-0.5 pt-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate font-mono text-[7px] font-bold uppercase tracking-wider text-slate-400 sm:text-[8px]">
                        {clamp(study.category, 20)}
                      </span>
                      <ArrowUpRight className="h-2.5 w-2.5 shrink-0 text-slate-300 transition-colors group-hover:text-[#C61A1A]" />
                    </div>
                    <div className="mt-0.5 flex items-baseline gap-1">
                      <span className="text-[11px] font-extrabold leading-none tabular-nums text-[#C61A1A] sm:text-[13px]">
                        {metric.value}
                      </span>
                      <span className="truncate text-[7.5px] font-semibold text-slate-500 sm:text-[9px]">
                        {ex.label}
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })}

          {/* centre seal */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 z-20 flex aspect-square w-[28%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#C61A1A] text-center text-white shadow-[0_24px_50px_-18px_rgba(198,26,26,0.65)]"
          >
            <span className={`absolute inset-[6%] rounded-full border border-dashed border-white/40 ${reduce ? '' : 'dz-spin'}`} />
            <span className="relative text-2xl font-extrabold leading-none tabular-nums sm:text-[32px]">
              {studies.length}
            </span>
            <span className="relative mt-0.5 text-[6px] font-bold uppercase tracking-[0.2em] opacity-90 sm:text-[7.5px]">
              Cases filed
            </span>
            <span className="relative mt-1 hidden items-center gap-1 text-[6px] font-bold uppercase tracking-[0.16em] text-white/80 sm:inline-flex">
              <ShieldCheck className="h-2.5 w-2.5" /> Verified
            </span>
            {!reduce && (
              <span className="absolute inset-[-6%] animate-ping rounded-full border border-[#C61A1A]/30" />
            )}
          </motion.div>

          {/* board stamps */}
          <span className="absolute left-2.5 top-2.5 z-0 rotate-[-4deg] rounded border border-red-200 bg-red-50/90 px-1.5 py-0.5 font-mono text-[6.5px] font-extrabold uppercase tracking-[0.16em] text-[#C61A1A] sm:text-[7.5px]">
            Sealed evidence
          </span>
        </div>

        {/* frame footer */}
        <div className="flex items-center justify-between px-1.5 pt-2.5 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-[9px]">
          <span>Hover to inspect · click to open</span>
          <span className="text-[#C61A1A]">Archive 2024—26</span>
        </div>
      </div>

      {/* side tab */}
      <span className="absolute -right-2 top-24 hidden rounded-b-md bg-[#C61A1A] px-1.5 py-3 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white [writing-mode:vertical-rl] sm:block">
        Open files
      </span>

      {/* verified stamp */}
      <span className="absolute -bottom-3 -left-2 hidden rotate-[-8deg] rounded-md border-2 border-[#C61A1A] bg-white px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C61A1A] shadow-sm sm:block">
        Verified
      </span>
    </div>
  );
};
