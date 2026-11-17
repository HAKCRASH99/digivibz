import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';
import { CASE_STUDIES } from '../../data/content';
import type { CaseStudy } from '../../types';

/**
 * WorkVault — the signature /portfolio section.
 *
 * Desktop pins the viewport while the case files travel horizontally.
 * Cards sit at a slight 3D angle, the current file reports into a live HUD
 * with a progress rail, and the final card opens the full library.
 * Mobile (and reduced motion) get the same files as a snap-scroll rail.
 */

const pad = (n: number) => String(n).padStart(2, '0');
const TOTAL = CASE_STUDIES.length;

const VaultCard: React.FC<{
  study: CaseStudy;
  index: number;
  active?: boolean;
  flat?: boolean;
  className?: string;
  style?: React.CSSProperties;
}> = ({ study, index, active, flat, className = '', style }) => (
  <a
    href={`/case-study/${study.id}`}
    aria-label={`Open case study: ${study.title}`}
    style={style}
    className={`group relative block shrink-0 overflow-hidden rounded-[26px] border bg-slate-900 outline-none transition-[transform,box-shadow,border-color] duration-500 focus-visible:ring-2 focus-visible:ring-[#C61A1A] focus-visible:ring-offset-2 ${
      active
        ? 'border-[#C61A1A]/70 shadow-[0_40px_90px_-42px_rgba(198,26,26,0.6)]'
        : 'border-white/10 shadow-[0_34px_80px_-44px_rgba(15,23,42,0.7)]'
    } ${flat ? '' : 'hover:-translate-y-1'} ${className}`}
  >
    <img
      src={study.image}
      alt={study.title}
      referrerPolicy="no-referrer"
      draggable={false}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/45 to-[#08080A]/5" />
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ background: 'radial-gradient(420px circle at 50% 105%, rgba(198,26,26,0.3), transparent 65%)' }}
    />
    <span
      aria-hidden="true"
      className={`absolute inset-x-0 top-0 h-1 origin-left bg-[#C61A1A] transition-transform duration-500 ${
        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}
    />

    {/* top strip */}
    <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
      <span className="rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-slate-900 shadow-xs">
        {study.category}
      </span>
      <span className="rounded-full bg-black/30 px-2 py-0.5 font-mono text-[10px] font-bold tabular-nums text-white/85 backdrop-blur-sm">
        {pad(index + 1)} / {pad(TOTAL)}
      </span>
    </div>

    {/* story */}
    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-300">
        {study.industry.split('/')[0].trim()}
      </span>
      <h3 className="mt-1.5 line-clamp-3 text-[14px] font-bold leading-snug text-white sm:text-[15px]">
        {study.title}
      </h3>

      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {study.results.slice(0, 3).map((result) => (
          <div key={result.label} className="rounded-lg border border-white/15 bg-white/[0.07] px-2 py-1.5 backdrop-blur-sm">
            <div className="text-[13px] font-extrabold leading-none tabular-nums text-white">{result.value}</div>
            <div className="mt-1 line-clamp-2 text-[8px] font-semibold leading-tight text-white/60">{result.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-2.5">
        <span className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-white/75">Open case file</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C61A1A] text-white transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  </a>
);

const VaultEndCard: React.FC<{
  flat?: boolean;
  className?: string;
  style?: React.CSSProperties;
}> = ({ flat, className = '', style }) => (
  <a
    href="/case-studies"
    style={style}
    className={`dz-btn-shine group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[26px] bg-[#C61A1A] p-6 text-white shadow-[0_34px_80px_-44px_rgba(198,26,26,0.85)] outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:p-7 ${
      flat ? '' : 'hover:-translate-y-1'
    } transition-transform duration-500 ${className}`}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-8 -right-4 select-none text-[150px] font-black leading-none tracking-tighter text-white/10"
    >
      {TOTAL}
    </span>
    <div className="relative flex items-center justify-between">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] ring-1 ring-white/25">
        <FolderOpen className="h-3 w-3" />
        The full library
      </span>
      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">Index</span>
    </div>
    <div className="relative">
      <h3 className="text-2xl font-extrabold leading-tight tracking-tight">
        See all {TOTAL} case studies.
      </h3>
      <p className="mt-2 max-w-[15rem] text-[12.5px] leading-relaxed text-white/80">
        Every challenge, every build, every measured result — in full.
      </p>
      <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em]">
        Open the library
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#C61A1A] transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight className="h-4 w-4" />
        </span>
      </span>
    </div>
  </a>
);

export const WorkVault: React.FC = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const x = useSpring(rawX, { stiffness: 130, damping: 30, mass: 0.45 });

  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const measure = () => {
      setIsDesktop(mq.matches);
      const track = trackRef.current;
      if (track && mq.matches) {
        setTravel(Math.max(0, track.scrollWidth - window.innerWidth + 24));
      }
    };
    measure();
    const settle = window.setTimeout(measure, 400);
    window.addEventListener('resize', measure);
    mq.addEventListener('change', measure);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener('resize', measure);
      mq.removeEventListener('change', measure);
    };
  }, [reduce]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!travel) return;
    const next = Math.min(TOTAL - 1, Math.floor(value * TOTAL));
    setActive((current) => (current === next ? current : next));
  });

  const pinned = isDesktop && !reduce;
  const current = CASE_STUDIES[Math.min(active, TOTAL - 1)];

  const nudge = (direction: 1 | -1) => {
    const section = sectionRef.current;
    if (!section || travel <= 0) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const step = travel / (TOTAL - 1);
    const target = Math.min(top + travel, Math.max(top, window.scrollY + direction * step));
    window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="featured-cases"
      className="relative scroll-mt-24 border-y border-slate-100 bg-slate-50"
      style={pinned && travel > 0 ? { height: `calc(100vh + ${travel}px)` } : undefined}
    >
      {/* ============================================== pinned desktop vault */}
      {!reduce && (
        <div className="sticky top-0 hidden h-screen overflow-hidden lg:block">
          {/* ghost backdrop */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-24 flex justify-center">
            <span className="dz-ghost-num select-none text-[17vw] font-black uppercase leading-none tracking-tighter">
              Case Files
            </span>
          </div>

          {/* header */}
          <div className="absolute inset-x-0 top-[8.75rem] z-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex items-end justify-between gap-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-[#C61A1A]">
                    <FolderOpen className="h-3.5 w-3.5" />
                    The Vault · {TOTAL} Case Files
                  </div>
                  <h2 className="mt-3 text-[28px] font-extrabold tracking-tight text-slate-900 xl:text-[34px]">
                    Scroll Through <span className="text-[#C61A1A]">the Work.</span>
                  </h2>
                </div>
                <div className="hidden max-w-[18rem] text-right md:block">
                  <p className="text-[12px] leading-relaxed text-slate-500">
                    Every file is a full growth story — the challenge, the build, the measured result.
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Scroll to travel
                    <ChevronRight className="h-3.5 w-3.5 animate-pulse text-[#C61A1A]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* travelling shelf */}
          <div className="absolute inset-x-0 bottom-[6.5rem] top-[14rem] flex items-center" style={{ perspective: 1600 }}>
            <motion.div
              ref={trackRef}
              style={{
                x,
                paddingLeft: 'max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))',
                paddingRight: '6rem',
              }}
              className="flex shrink-0 items-center gap-5 will-change-transform xl:gap-6"
            >
              {CASE_STUDIES.map((study, index) => (
                <VaultCard
                  key={study.id}
                  study={study}
                  index={index}
                  active={index === active}
                  className="w-[22rem] xl:w-[24rem]"
                  style={{
                    height: 'min(28rem, calc(100vh - 21rem))',
                    transform: `perspective(1600px) rotateY(${
                      index === active ? 0 : index % 2 === 0 ? -4.5 : 4.5
                    }deg) translateY(${index === active ? -8 : 0}px)`,
                  }}
                />
              ))}
              <VaultEndCard
                className="w-[19rem] xl:w-[20rem]"
                style={{ height: 'min(28rem, calc(100vh - 21rem))' }}
              />
            </motion.div>
          </div>

          {/* live HUD */}
          <div className="absolute inset-x-0 bottom-5 z-20">
            <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6 lg:px-8">
              <div className="min-w-0">
                <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C61A1A]" />
                  Now showing · File {pad(active + 1)} / {pad(TOTAL)}
                </div>
                <p className="mt-1 truncate text-[15px] font-extrabold text-slate-900 xl:text-base">
                  {current.category}
                  {current.industry.split('/')[0].trim().toLowerCase() !== current.category.toLowerCase() && (
                    <span className="font-semibold text-slate-400">
                      {' '}
                      · {current.industry.split('/')[0].trim()}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <div className="hidden items-center gap-3 md:flex">
                  <span className="font-mono text-[10px] font-bold tabular-nums text-slate-400">
                    {pad(active + 1)} / {pad(TOTAL)}
                  </span>
                  <div className="h-1 w-44 overflow-hidden rounded-full bg-slate-200 lg:w-56">
                    <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left rounded-full bg-[#C61A1A]" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => nudge(-1)}
                    aria-label="Previous case file"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-[#C61A1A] hover:text-[#C61A1A]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => nudge(1)}
                    aria-label="Next case file"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-[#C61A1A] hover:text-[#C61A1A]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================== rail: phones + reduced motion */}
      <div className={`${reduce ? '' : 'lg:hidden '}py-14 md:py-16`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-[#C61A1A]">
            <FolderOpen className="h-3.5 w-3.5" />
            The Vault · {TOTAL} Case Files
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Scroll Through <span className="text-[#C61A1A]">the Work.</span>
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            Every file is a full growth story — the challenge, the build, and the measured result. Drag to browse, tap to open.
          </p>

          <div className="dz-rail mt-6 pb-3">
            {CASE_STUDIES.map((study, index) => (
              <VaultCard
                key={study.id}
                study={study}
                index={index}
                flat
                className="h-[26rem] w-[82vw] max-w-[380px]"
              />
            ))}
            <VaultEndCard flat className="h-[26rem] w-[72vw] max-w-[320px]" />
          </div>

          <div className="mt-3 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
            <span className="h-px w-8 bg-slate-300" />
            Swipe to browse · {TOTAL} files
            <ArrowRight className="h-3.5 w-3.5 text-[#C61A1A]" />
          </div>
        </div>
      </div>
    </section>
  );
};
