import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES } from '../../data/content';

/**
 * WorkDeck — the hero visual for /portfolio.
 *
 * A physical-feeling stack of live case-study cards. The front card is the
 * selected project; the rest fan out behind it. Hovering pauses the deck,
 * clicking a back card pulls it to the front, clicking the front card opens
 * the full case study. Auto-advances slowly so the hero never looks static.
 */

const DECK_SIZE = 5;

/** Visual offsets per stack depth (depth 0 = front). */
const LAYERS = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, blur: 0 },
  { x: 26, y: 14, rotate: 3.5, scale: 0.955, opacity: 1, blur: 0 },
  { x: 46, y: 26, rotate: 6.5, scale: 0.91, opacity: 0.96, blur: 0 },
  { x: 62, y: 36, rotate: 9, scale: 0.865, opacity: 0.62, blur: 0.4 },
  { x: 74, y: 44, rotate: 11, scale: 0.82, opacity: 0.28, blur: 1 },
] as const;

export const WorkDeck: React.FC = () => {
  const reduce = useReducedMotion();
  const deck = CASE_STUDIES.slice(0, DECK_SIZE);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % deck.length);
    }, 4400);
    return () => window.clearInterval(timer);
  }, [reduce, paused, deck.length]);

  const front = deck[active];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* ------------------------------------------------- decorative frame */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* rotating orbit type */}
        <svg
          viewBox="0 0 400 400"
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-60 sm:h-[360px] sm:w-[360px] lg:h-[404px] lg:w-[404px]"
        >
          <defs>
            <path id="workdeck-orbit" d="M200,200 m-186,0 a186,186 0 1,1 372,0 a186,186 0 1,1 -372,0" />
          </defs>
          <g className={reduce ? undefined : 'dz-spin'} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <text fill="#94A3B8" fontSize="10" fontWeight="700" letterSpacing="4.2">
              <textPath href="#workdeck-orbit">
                DIGIVIBZ · SELECTED WORK · MEASURED GROWTH · DIGIVIBZ ·
              </textPath>
            </text>
          </g>
        </svg>
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-red-200/70 sm:h-[360px] sm:w-[360px]" />
        <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/80 sm:h-[268px] sm:w-[268px]" />
        <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-slate-300" />
        <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-slate-300" />
        <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-slate-300" />
        <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-slate-300" />
        <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 rotate-90 text-[9px] font-bold uppercase tracking-[0.34em] text-slate-400 sm:block">
          Selected work
        </span>
      </div>

      {/* ------------------------------------------------------------ deck */}
      <div className="relative mx-auto flex h-[356px] w-full max-w-[420px] items-center justify-center sm:h-[408px] lg:h-[440px]">
        {deck.map((study, index) => {
          const depth = (index - active + deck.length) % deck.length;
          const layer = LAYERS[Math.min(depth, LAYERS.length - 1)];
          const isFront = depth === 0;
          const hidden = depth >= LAYERS.length;

          return (
            <motion.a
              key={study.id}
              href={`/case-study/${study.id}`}
              aria-hidden={hidden || undefined}
              tabIndex={hidden ? -1 : 0}
              onClick={(event) => {
                if (!isFront) {
                  event.preventDefault();
                  setActive(index);
                }
              }}
              onKeyDown={(event) => {
                if (!isFront && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  setActive(index);
                }
              }}
              animate={{
                x: layer.x,
                y: layer.y,
                rotate: layer.rotate,
                scale: layer.scale,
                opacity: hidden ? 0 : layer.opacity,
                filter: `blur(${layer.blur}px)`,
              }}
              transition={{ type: 'spring', stiffness: 210, damping: 26 }}
              style={{ zIndex: 10 + (DECK_SIZE - depth), originX: 0.5, originY: 1 }}
              className={`absolute h-[318px] w-[244px] select-none overflow-hidden rounded-[22px] border bg-slate-900 shadow-[0_26px_60px_-24px_rgba(15,23,42,0.55)] outline-none focus-visible:ring-2 focus-visible:ring-[#C61A1A] focus-visible:ring-offset-2 sm:h-[356px] sm:w-[276px] lg:h-[382px] lg:w-[294px] ${
                isFront ? 'cursor-pointer border-white/20' : 'cursor-pointer border-white/10'
              }`}
            >
              <img
                src={study.image}
                alt={study.title}
                referrerPolicy="no-referrer"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/55 to-[#08080A]/10" />

              {/* file number + industry */}
              <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
                <span className="rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-slate-900 shadow-xs">
                  {study.industry.split('/')[0].trim()}
                </span>
                <span className="rounded-full bg-black/30 px-2 py-0.5 font-mono text-[10px] font-bold tabular-nums text-white/85 backdrop-blur-sm">
                  {String(index + 1).padStart(2, '0')} / {String(CASE_STUDIES.length).padStart(2, '0')}
                </span>
              </div>

              {/* card body */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <span className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-red-300">
                  {study.category}
                </span>
                <h3 className="mt-1.5 text-[15px] font-bold leading-snug text-white sm:text-base">
                  {study.title.length > 62 ? `${study.title.slice(0, 62).trimEnd()}…` : study.title}
                </h3>

                <div className="mt-3.5 grid grid-cols-2 gap-2">
                  {study.results.slice(0, 2).map((result) => (
                    <div
                      key={result.label}
                      className="rounded-lg border border-white/15 bg-white/[0.07] px-2.5 py-2 backdrop-blur-sm"
                    >
                      <div className="text-base font-extrabold leading-none tabular-nums text-white">
                        {result.value}
                      </div>
                      <div className="mt-1 text-[9px] font-semibold leading-tight text-white/65">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3.5 flex items-center justify-between border-t border-white/15 pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
                    {isFront ? 'Open case study' : 'Bring to front'}
                  </span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                      isFront ? 'bg-[#C61A1A] text-white' : 'border border-white/25 text-white/70'
                    }`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* ------------------------------------------------- deck controls */}
      <div className="relative mt-1 flex items-center justify-center gap-3">
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Featured work deck">
          {deck.map((study, index) => (
            <button
              key={study.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show ${study.category} case study`}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active ? 'w-7 bg-[#C61A1A]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] font-bold tabular-nums text-slate-400">
          {String(active + 1).padStart(2, '0')}
          <span className="text-slate-300"> / </span>
          {String(deck.length).padStart(2, '0')}
        </span>
      </div>

      <p className="mt-2 text-center text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        {front.category} · {front.results[0]?.value} {front.results[0]?.label}
      </p>
    </div>
  );
};
