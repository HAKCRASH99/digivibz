import React, { useEffect, useRef } from 'react';
import { animate, stagger, useAnimate, useReducedMotion } from 'motion/react';
import { SERVICES } from '../data/servicesContent';

/**
 * Session-once brand intro — light stage, red identity system.
 *
 * Beat 1 — the white canvas and its red blueprint grid settle in.
 * Beat 2 — the official mark stamps into its ring while the ring draws itself,
 *          the wordmark wipes on and the counter races.
 * Beat 3 — the mark lifts, the stage dissolves.
 * Beat 4 — seven white strips, each edged in red, sweep upward and hand the
 *          page over.
 *
 * Sequenced with motion's `useAnimate` (timeline-style await chains).
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

const ICON_SRC = `${import.meta.env.BASE_URL}assets/digivibz-icon.png`;
const WORDMARK_SRC = `${import.meta.env.BASE_URL}assets/digivibz-wordmark.png`;

/** Progress ring geometry (viewBox 120 × 120). */
const RING_R = 54;
const RING_C = 2 * Math.PI * RING_R;

const STRIPS = [0, 1, 2, 3, 4, 5, 6];
const CORNERS = ['left-5 top-5', 'right-5 top-5', 'left-5 bottom-5', 'right-5 bottom-5'];

export const Preloader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [scope, run] = useAnimate();
  const reduce = useReducedMotion();
  const counterRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (reduce) {
      doneRef.current();
      return;
    }
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    let cancelled = false;
    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      document.documentElement.style.overflow = previousOverflow;
      doneRef.current();
    };

    const sequence = async () => {
      /* 0–0.9s — atmosphere + blueprint grid */
      run('#pl-grid', { opacity: [0, 1] }, { duration: 0.9, ease: 'easeOut' });
      run('#pl-corners', { opacity: [0, 1] }, { duration: 0.7, delay: 0.1 });
      run('#pl-sheen', { x: ['0%', '400%'] }, { duration: 1.1, ease: EASE_IN_OUT });

      /* 0–1.2s — mark stamps in, ring draws, counter races */
      const arc = run(
        '#pl-arc',
        { strokeDashoffset: [RING_C, 0] },
        { duration: 1.2, ease: EASE_IN_OUT },
      );
      run(
        '#pl-badge',
        { opacity: [0, 1], scale: [0.55, 1.06, 1] },
        { duration: 0.62, ease: EASE_OUT },
      );
      run('#pl-halo', { opacity: [0, 1] }, { duration: 0.5 });

      const counter = { v: 0 };
      animate(counter, { v: 100 }, {
        duration: 1.2,
        ease: 'easeInOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
          }
        },
      });
      run('#pl-counter, #pl-ticker', { opacity: [0, 1] }, { duration: 0.4 });
      run('#pl-bar', { scaleX: [0, 1] }, { duration: 1.2, ease: EASE_IN_OUT });

      /* 0.25–1.4s — wordmark wipes on, underline draws, caption rises */
      const word = run(
        '#pl-word',
        { x: ['-101%', '0%'] },
        { duration: 0.62, delay: 0.22, ease: EASE_OUT },
      );
      run(
        '#pl-underline',
        { scaleX: [0, 1] },
        { duration: 0.55, delay: 0.55, ease: EASE_OUT },
      );
      run(
        '#pl-caption .pl-cap',
        { y: ['110%', '0%'], opacity: [0, 1] },
        { duration: 0.45, delay: stagger(0.045, { startDelay: 0.5 }), ease: EASE_OUT },
      );

      /* 1.2–1.6s — ring closes, mark lifts, stage dissolves into the curtain */
      await arc;
      await word;
      await run('#pl-badge', { scale: 1.07 }, { duration: 0.16, ease: EASE_OUT });
      run('#pl-stage', { opacity: 0 }, { duration: 0.3, ease: 'easeInOut' });

      /* 1.4–2.3s — red-edged curtain sweeps up while the stage clears */
      await run(
        '#pl-strip',
        { y: '-103%' },
        { duration: 0.55, delay: stagger(0.04, { startDelay: 0.1 }), ease: EASE_IN_OUT },
      );
      finish();
    };

    sequence();
    return () => {
      cancelled = true;
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [reduce, run]);

  if (reduce) return null;

  return (
    <div ref={scope} className="fixed inset-0 z-[100]" aria-hidden="true">
      {/* curtain strips — together they ARE the white stage */}
      <div className="absolute inset-0 flex">
        {STRIPS.map((s) => (
          <div key={s} id="pl-strip" className="relative flex-1 bg-white">
            <span className="absolute inset-x-0 bottom-0 h-px bg-[#C61A1A]/50 shadow-[0_0_14px_rgba(198,26,26,0.3)]" />
          </div>
        ))}
      </div>

      {/* content stage */}
      <div id="pl-stage" className="absolute inset-0 overflow-hidden bg-white">
        {/* warm atmosphere */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(198,26,26,0.045),transparent_42%),radial-gradient(circle_at_84%_90%,rgba(198,26,26,0.045),transparent_40%)]" />

        {/* red blueprint grid */}
        <div
          id="pl-grid"
          className="absolute inset-0 opacity-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(198,26,26,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(198,26,26,0.07) 1px, transparent 1px)',
            backgroundSize: '3.5rem 3.5rem',
            maskImage: 'radial-gradient(ellipse 68% 62% at 50% 46%, #000 30%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 68% 62% at 50% 46%, #000 30%, transparent 100%)',
          }}
        />

        {/* single light sweep across the canvas */}
        <div
          id="pl-sheen"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(100deg,transparent,rgba(198,26,26,0.11),transparent)]"
        />

        {/* corner registration marks */}
        <div id="pl-corners" className="absolute inset-0 opacity-0">
          {CORNERS.map((pos) => (
            <span
              key={pos}
              className={`absolute ${pos} text-lg font-light leading-none text-[#C61A1A]/40`}
            >
              +
            </span>
          ))}
        </div>

        {/* ── centre composition ───────────────────────────────────────── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <div className="relative flex h-[168px] w-[168px] items-center justify-center sm:h-[200px] sm:w-[200px] lg:h-[224px] lg:w-[224px]">
            {/* slowly rotating dashed orbit */}
            <span
              className="dz-spin absolute inset-0 rounded-full border border-dashed border-[#C61A1A]/30"
              style={{ animationDuration: '18s' }}
            />
            <span className="absolute inset-3 rounded-full border border-[#C61A1A]/10" />
            <span className="absolute -inset-5 rounded-full border border-[#C61A1A]/5" />

            {/* progress ring */}
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="58"
                fill="none"
                stroke="rgba(198,26,26,0.22)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="0.8 4.6"
              />
              <circle
                cx="60"
                cy="60"
                r={RING_R}
                fill="none"
                stroke="rgba(198,26,26,0.08)"
                strokeWidth="1.5"
              />
              <circle
                id="pl-arc"
                cx="60"
                cy="60"
                r={RING_R}
                fill="none"
                stroke="url(#pl-arc-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                style={{ strokeDashoffset: RING_C }}
              />
              <defs>
                <linearGradient id="pl-arc-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff7b7b" />
                  <stop offset="45%" stopColor="#C61A1A" />
                  <stop offset="100%" stopColor="#9E1414" />
                </linearGradient>
              </defs>
            </svg>

            {/* halo pulse */}
            <span
              id="pl-halo"
              className="dz-pulse-ring absolute h-[108px] w-[108px] rounded-full border border-[#C61A1A]/40 opacity-0 sm:h-[128px] sm:w-[128px] lg:h-[144px] lg:w-[144px]"
            />

            {/* official mark */}
            <span
              id="pl-badge"
              className="relative flex h-[108px] w-[108px] items-center justify-center rounded-full bg-white opacity-0 shadow-[0_24px_60px_-24px_rgba(198,26,26,0.6)] ring-1 ring-[#C61A1A]/10 sm:h-[128px] sm:w-[128px] lg:h-[144px] lg:w-[144px]"
            >
              <img
                src={ICON_SRC}
                alt=""
                className="h-14 w-auto select-none sm:h-16 lg:h-[72px]"
                draggable={false}
              />
            </span>
          </div>

          {/* wordmark + red rule + caption */}
          <div className="relative mt-8 sm:mt-10">
            <span className="block overflow-hidden">
              <span id="pl-word" className="block" style={{ transform: 'translateX(-101%)' }}>
                <img
                  src={WORDMARK_SRC}
                  alt="DIGIVIBZ"
                  className="block h-7 w-auto select-none sm:h-9 lg:h-10"
                  draggable={false}
                />
              </span>
            </span>
            <span
              id="pl-underline"
              className="absolute -bottom-2 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#C61A1A] via-[#C61A1A]/70 to-transparent"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          <div
            id="pl-caption"
            className="mt-5 flex items-center gap-2 overflow-hidden text-[9px] font-bold uppercase tracking-[0.28em] text-[#C61A1A]/85 sm:text-[10px] lg:text-[11px]"
          >
            {'AI-POWERED GROWTH SYSTEM'.split(' ').map((wordText, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span
                  className="pl-cap inline-block"
                  style={{ transform: 'translateY(110%)', opacity: 0 }}
                >
                  {wordText}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* ── bottom chrome ────────────────────────────────────────────── */}
        <div className="absolute inset-x-6 bottom-7 flex items-end justify-between gap-6 sm:inset-x-10">
          <div id="pl-ticker" className="max-w-[52%] overflow-hidden opacity-0">
            <div className="dz-marquee">
              <div className="dz-marquee-track flex w-max items-center gap-5 [animation-duration:16s]">
                {[...SERVICES, ...SERVICES].map((s, i) => (
                  <span
                    key={`${s.slug}-${i}`}
                    className="flex items-center gap-5 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400 sm:text-[10px]"
                  >
                    {s.name}
                    <span className="h-1 w-1 rotate-45 shrink-0 bg-[#C61A1A]/70" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <span
            id="pl-counter"
            ref={counterRef}
            className="text-4xl font-extrabold leading-none tabular-nums text-[#C61A1A]/15 opacity-0 sm:text-5xl lg:text-6xl"
          >
            000
          </span>
        </div>

        {/* hairline progress rail */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#C61A1A]/10">
          <span
            id="pl-bar"
            className="block h-full w-full origin-left bg-gradient-to-r from-[#C61A1A] via-[#E23B3B] to-[#ff7b7b]"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  );
};
