import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Droplets,
  GripVertical,
  MoveHorizontal,
  Sparkles,
  TrendingDown,
  TrendingUp,
  X,
} from 'lucide-react';
import { Reveal } from '../Reveal';

/**
 * VersusLab — the draggable "old way vs DIGIVIBZ way" comparison used on every
 * service page. Two full-bleed layers share one geometry: a five-stage flow
 * that leaks on the left and compounds on the right. Dragging the handle
 * repaints the same diagram in place, exactly like the home-page comparison.
 *
 * Mobile gets a segmented switch with two stacked cards, so the interaction
 * still works on touch without fighting vertical scroll.
 */

export interface VersusSide {
  /** Small eyebrow above the title, e.g. "The old playbook". */
  label: string;
  /** One-line summary of this side. */
  title: string;
  /** Three short proof points. */
  points: readonly string[];
  /** One-line footnote under the points. */
  note: string;
}

export interface VersusLabProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  legacy: VersusSide;
  digivibz: VersusSide;
  /** Five stage labels for the central flow diagram. */
  stages: readonly [string, string, string, string, string];
  /** Optional outcome chip on the DIGIVIBZ side. */
  outcome?: { value: string; label: string };
  /** Section id for in-page anchors. */
  id?: string;
  className?: string;
}

const FADE = 40;
const clampPos = (v: number) => Math.min(97, Math.max(3, v));

const maskStyle = (mask: string): React.CSSProperties => ({
  maskImage: mask,
  WebkitMaskImage: mask,
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskSize: '100% 100%',
  WebkitMaskSize: '100% 100%',
});

/* ------------------------------------------------------------------ */
/*  The shared five-stage flow — one geometry, two paint jobs          */
/* ------------------------------------------------------------------ */

const LEGACY_WIDTHS = [82, 70, 57, 42, 27];
const MODERN_WIDTHS = [32, 48, 65, 83, 100];

const StageFlow: React.FC<{
  stages: VersusLabProps['stages'];
  tone: 'legacy' | 'modern';
  compact?: boolean;
}> = ({ stages, tone, compact = false }) => {
  const modern = tone === 'modern';
  const widths = modern ? MODERN_WIDTHS : LEGACY_WIDTHS;

  return (
    <div
      className={`rounded-2xl border transition-colors duration-300 ${
        compact ? 'p-3.5' : 'p-4'
      } ${
        modern
          ? 'border-white/25 bg-white shadow-[0_30px_60px_-30px_rgba(80,1,1,0.75)]'
          : 'border-slate-200 bg-white shadow-[0_26px_54px_-32px_rgba(15,23,42,0.45)]'
      }`}
    >
      {/* panel head */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <span className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            {modern && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C61A1A] opacity-60" />
            )}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                modern ? 'bg-[#C61A1A]' : 'bg-slate-300'
              }`}
            />
          </span>
          <span
            className={`truncate font-mono uppercase tracking-[0.16em] ${
              compact ? 'text-[9px]' : 'text-[10px]'
            } ${modern ? 'font-bold text-slate-700' : 'font-semibold text-slate-500'}`}
          >
            {modern ? 'Compounding system' : 'Leaky funnel'}
          </span>
        </span>
        <span
          className={`shrink-0 font-mono uppercase tracking-[0.14em] ${
            compact ? 'text-[8px]' : 'text-[9px]'
          } ${modern ? 'text-[#C61A1A]' : 'text-slate-500'}`}
        >
          {modern ? 'after' : 'before'}
        </span>
      </div>

      {/* stage bars */}
      <div className={`${compact ? 'mt-3 space-y-2.5' : 'mt-4 space-y-3'}`}>
        {stages.map((label, i) => (
          <div key={label}>
            <div className="flex items-center justify-between gap-2">
              <span
                className={`flex min-w-0 items-center gap-1.5 truncate font-semibold ${
                  compact ? 'text-[10px]' : 'text-[11px]'
                } ${modern ? 'text-slate-700' : 'text-slate-600'}`}
              >
                <span
                  className={`font-mono text-[9px] ${
                    modern ? 'text-[#C61A1A]' : 'text-slate-400'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {label}
              </span>
              {modern ? (
                <Check className="h-3 w-3 shrink-0 text-[#C61A1A]" strokeWidth={3} />
              ) : (
                <X className="h-3 w-3 shrink-0 text-slate-400" strokeWidth={2.5} />
              )}
            </div>
            <div
              className={`mt-1.5 overflow-hidden rounded-full ${
                modern ? 'bg-red-50' : 'bg-slate-100'
              }`}
              style={{ height: compact ? 5 : 6 }}
            >
              <span
                className={`block h-full rounded-full transition-[width,background-color] duration-500 ease-out ${
                  modern
                    ? 'bg-gradient-to-r from-[#C61A1A] to-[#ff6b6b] shadow-[0_0_12px_rgba(198,26,26,0.45)]'
                    : 'bg-slate-300'
                }`}
                style={{ width: `${widths[i]}%`, transitionDelay: `${i * 40}ms` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* panel foot */}
      <div
        className="mt-3.5 flex items-center gap-1.5 border-t border-slate-100 pt-2.5 text-[10px] font-semibold text-slate-500"
      >
        {modern ? (
          <>
            <TrendingUp className="h-3 w-3 shrink-0 text-[#C61A1A]" />
            Every stage measured and reported
          </>
        ) : (
          <>
            <TrendingDown className="h-3 w-3 shrink-0 text-slate-400" />
            Budget out. No proof back.
          </>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Copy blocks                                                        */
/* ------------------------------------------------------------------ */

const SideCopy: React.FC<{
  side: VersusSide;
  tone: 'legacy' | 'modern';
  outcome?: VersusLabProps['outcome'];
}> = ({ side, tone, outcome }) => {
  const modern = tone === 'modern';
  return (
    <div className="flex flex-col">
      <span
        className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] ${
          modern
            ? 'border-white/25 bg-white/10 text-white'
            : 'border-slate-200 bg-white text-slate-500'
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${modern ? 'bg-white' : 'bg-slate-400'}`}
        />
        {side.label}
      </span>

      <h3
        className={`mt-4 text-lg font-extrabold leading-snug tracking-tight xl:text-xl ${
          modern ? 'text-white' : 'text-slate-800'
        }`}
      >
        {side.title}
      </h3>

      {modern && outcome ? (
        <div className="mt-4 flex w-fit items-center gap-2.5 rounded-xl border border-white/25 bg-white px-3.5 py-2.5 shadow-[0_18px_40px_-22px_rgba(80,1,1,0.8)]">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A]">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-xl font-extrabold tracking-tight text-[#C61A1A]">
              {outcome.value}
            </span>
            <span className="text-[10px] font-bold text-slate-600">{outcome.label}</span>
          </span>
        </div>
      ) : null}

      <ul className="mt-4 space-y-2.5">
        {side.points.map((point) => (
          <li
            key={point}
            className={`flex items-start gap-2.5 text-[13px] font-medium leading-snug ${
              modern ? 'text-white/95' : 'text-slate-500'
            }`}
          >
            <span
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                modern ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-400'
              }`}
            >
              {modern ? (
                <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
              ) : (
                <X className="h-2.5 w-2.5" strokeWidth={3} />
              )}
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <p
        className={`mt-4 flex items-start gap-2 text-[11px] font-semibold leading-relaxed ${
          modern ? 'text-white/70' : 'text-slate-400'
        }`}
      >
        {modern ? (
          <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/80" />
        ) : (
          <Droplets className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300" />
        )}
        {side.note}
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Mobile card                                                        */
/* ------------------------------------------------------------------ */

const MobileSideCard: React.FC<{
  side: VersusSide;
  tone: 'legacy' | 'modern';
  stages: VersusLabProps['stages'];
  outcome?: VersusLabProps['outcome'];
}> = ({ side, tone, stages, outcome }) => {
  const modern = tone === 'modern';
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 ${
        modern
          ? 'border-[#C61A1A] bg-[linear-gradient(150deg,#C61A1A_0%,#A51615_100%)] text-white shadow-[0_30px_60px_-30px_rgba(198,26,26,0.7)]'
          : 'border-slate-200 bg-[linear-gradient(150deg,#FFFFFF_0%,#F1F5F9_100%)]'
      }`}
    >
      {modern && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, #000 20%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 70% at 50% 0%, #000 20%, transparent 100%)',
          }}
        />
      )}
      <div className="relative">
        <SideCopy side={side} tone={tone} outcome={outcome} />
        <div className="mt-5">
          <StageFlow stages={stages} tone={tone} compact />
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const VersusLab: React.FC<VersusLabProps> = ({
  eyebrow = 'The shift',
  title,
  intro,
  legacy,
  digivibz,
  stages,
  outcome,
  id,
  className = '',
}) => {
  const [pos, setPos] = useState(50);
  const [interacted, setInteracted] = useState(false);
  const [hint, setHint] = useState(true);
  const [tab, setTab] = useState<'legacy' | 'modern'>('modern');
  const reduce = useReducedMotion();

  const panelRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const demoRef = useRef<{ stop: () => void } | null>(null);
  const inView = useInView(panelRef, { once: true, amount: 0.35 });

  /* One teach-by-doing sweep the first time the panel is seen. */
  useEffect(() => {
    if (reduce || !inView || interacted) return;
    const trip = { v: 50 };
    const controls = animate(trip, { v: [50, 78, 24, 50] }, {
      duration: 2.8,
      delay: 0.55,
      ease: 'easeInOut',
      onUpdate: () => setPos(clampPos(trip.v)),
      onComplete: () => setHint(false),
    });
    demoRef.current = controls;
    return () => {
      controls.stop();
      demoRef.current = null;
    };
  }, [reduce, inView, interacted]);

  const stopDemo = () => {
    demoRef.current?.stop();
    setHint(false);
    if (!interacted) setInteracted(true);
  };

  const jumpTo = (clientX: number) => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    setPos(clampPos(((clientX - rect.left) / rect.width) * 100));
  };

  const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const onHandle = !!(e.target as HTMLElement).closest?.('[data-slider-handle]');
    if (e.pointerType === 'touch' && !onHandle) return;
    stopDemo();
    draggingRef.current = true;
    try {
      panelRef.current?.setPointerCapture(e.pointerId);
    } catch {
      /* synthetic pointers may not be capturable */
    }
    jumpTo(e.clientX);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    jumpTo(e.clientX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    try {
      panelRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const onHandleKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === 'ArrowLeft') {
      stopDemo();
      e.preventDefault();
      setPos((p) => clampPos(p - step));
    } else if (e.key === 'ArrowRight') {
      stopDemo();
      e.preventDefault();
      setPos((p) => clampPos(p + step));
    } else if (e.key === 'Home') {
      stopDemo();
      e.preventDefault();
      setPos(3);
    } else if (e.key === 'End') {
      stopDemo();
      e.preventDefault();
      setPos(97);
    }
  };

  const legacyMask = `linear-gradient(to right, #000 0, #000 calc(${pos}% - ${FADE}px), transparent ${pos}%)`;
  const modernMask = `linear-gradient(to left, #000 0, #000 calc(${100 - pos}% - ${FADE}px), transparent ${100 - pos}%)`;

  return (
    <section
      id={id}
      className={`relative overflow-hidden border-y border-slate-100 bg-slate-50 py-16 sm:py-20 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:20px_20px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-700 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
              {eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              {title}
            </h2>
          </Reveal>
          {intro && (
            <Reveal delay={0.1}>
              <p className="mt-3.5 text-sm leading-relaxed text-slate-600 sm:text-base">{intro}</p>
            </Reveal>
          )}
        </div>

        {/* ---------------- mobile: segmented cards ---------------- */}
        <div className="mt-9 lg:hidden">
          <div
            role="tablist"
            aria-label="Compare the old way with the DIGIVIBZ way"
            className="mx-auto flex w-full max-w-xs rounded-full border border-slate-200 bg-white p-1 shadow-2xs"
          >
            {(
              [
                ['legacy', 'The old way'],
                ['modern', 'The DIGIVIBZ way'],
              ] as const
            ).map(([key, label]) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(key)}
                  className={`relative flex min-h-11 flex-1 items-center justify-center rounded-full px-2 py-2 text-[11.5px] font-extrabold transition-colors cursor-pointer ${
                    active ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="versus-tab-pill"
                      className={`absolute inset-0 rounded-full ${
                        key === 'modern' ? 'bg-[#C61A1A]' : 'bg-slate-600'
                      }`}
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5">
            <motion.div
              key={tab}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === 'legacy' ? (
                <MobileSideCard side={legacy} tone="legacy" stages={stages} />
              ) : (
                <MobileSideCard side={digivibz} tone="modern" stages={stages} outcome={outcome} />
              )}
            </motion.div>
          </div>
        </div>

        {/* ---------------- desktop: draggable split ---------------- */}
        <Reveal className="mt-10 hidden lg:block">
          <div
            ref={panelRef}
            onPointerDown={startDrag}
            onPointerMove={onMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onLostPointerCapture={endDrag}
            className="relative h-[580px] select-none overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_40px_90px_-50px_rgba(15,23,42,0.5)] cursor-ew-resize"
          >
            {/* ============ legacy layer ============ */}
            <div className="absolute inset-0 z-0" style={maskStyle(legacyMask)}>
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#F8FAFC_0%,#EDF1F5_60%,#E7ECF2_100%)]" />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.055] bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:22px_22px]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(255,255,255,0.9),transparent_75%)]"
              />

              <div className="absolute inset-y-0 left-0 flex w-[31%] flex-col justify-center pl-8 pr-3 xl:pl-12">
                <SideCopy side={legacy} tone="legacy" />
              </div>
            </div>

            {/* ============ DIGIVIBZ layer ============ */}
            <div className="absolute inset-0 z-10" style={maskStyle(modernMask)}>
              <div className="absolute inset-0 bg-[linear-gradient(145deg,#C61A1A_0%,#B01515_45%,#8E1111_100%)]" />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.16]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)',
                  backgroundSize: '46px 46px',
                  maskImage:
                    'radial-gradient(ellipse at 50% 50%, #000 12%, transparent 78%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse at 50% 50%, #000 12%, transparent 78%)',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-red-400/20 blur-3xl"
              />

              <div className="absolute inset-y-0 right-0 flex w-[31%] flex-col justify-center pl-3 pr-8 xl:pr-12">
                <SideCopy side={digivibz} tone="modern" outcome={outcome} />
              </div>
            </div>

            {/* one flow card, repainted as the handle crosses the middle */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[34%] min-w-[286px] max-w-[342px] -translate-x-1/2 -translate-y-1/2"
              style={{ marginTop: 28 }}
            >
              <StageFlow stages={stages} tone={pos >= 50 ? 'modern' : 'legacy'} />
            </div>

            {/* seeker */}
            <div
              className="pointer-events-none absolute inset-y-0 z-10 w-[3px] -translate-x-1/2 bg-[#C61A1A]"
              style={{ left: `${pos}%` }}
            />
            <button
              type="button"
              data-slider-handle
              role="slider"
              aria-label={`Compare ${legacy.label} with ${digivibz.label}`}
              aria-orientation="horizontal"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`${Math.round(pos)}% of the panel showing the DIGIVIBZ system`}
              onKeyDown={onHandleKey}
              onPointerDown={() => stopDemo()}
              className="absolute top-[22px] z-40 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[#C61A1A] text-white shadow-[0_12px_30px_-10px_rgba(198,26,26,0.65)] transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:ring-offset-2 cursor-ew-resize"
              style={{ left: `${pos}%`, touchAction: 'none' }}
            >
              {hint && !interacted && !reduce && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full bg-white/40 animate-ping motion-reduce:animate-none"
                />
              )}
              <MoveHorizontal className="relative h-4 w-4" />
            </button>
          </div>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-center text-xs text-slate-400">
            <GripVertical className="h-3.5 w-3.5 text-[#C61A1A]" />
            Drag the handle — the old way on the left, the DIGIVIBZ system on the right
            <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
          </p>
        </Reveal>
      </div>
    </section>
  );
};
