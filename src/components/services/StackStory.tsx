import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../Reveal';
import { WordReveal } from '../fx/FxKit';
import {
  DISCIPLINE_STORY,
  SERVICE_CATEGORIES,
  SERVICE_DETAIL_SLUGS,
  SERVICES,
  type ServiceCategoryId,
} from '../../data/servicesContent';

/**
 * StackStory — "the system, assembled".
 *
 * A drafting-board panel shows four isometric service layers; scrolling the
 * narrative right raises the layer you're reading. Vertical assembly, not a
 * horizontal shelf — the services page needed its own spatial metaphor.
 */

const categoryLabel = (id: ServiceCategoryId) =>
  SERVICE_CATEGORIES.find((c) => c.id === id)?.label ?? '';

const servicesOf = (id: ServiceCategoryId) => SERVICES.filter((s) => s.category === id);

const PLATE = { w: 252, h: 128 };

const LayerStack: React.FC<{
  active: ServiceCategoryId;
  progress: ReturnType<typeof useSpring>;
  onJump: (id: ServiceCategoryId) => void;
  reduceMotion: boolean | null;
}> = ({ active, progress, onJump, reduceMotion }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)]">
    {/* panel header */}
    <div className="flex items-center justify-between border-b border-slate-200 bg-[#FCFBF8] px-4 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
      <span>FIG. 02 — Layer assembly</span>
      <span className="inline-flex items-center gap-1.5 text-slate-500">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C61A1A]" />
        Live
      </span>
    </div>

    {/* isometric viewport */}
    <div className="relative h-[352px] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(to right, #EDE9E3 1px, transparent 1px), linear-gradient(to bottom, #EDE9E3 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 35%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 35%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(198,26,26,0.12) 0%, transparent 70%)' }}
      />

      {/* active layer tag */}
      <div className="absolute left-4 top-4 z-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-2 rounded border border-red-200 bg-white/95 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#C61A1A] shadow-xs backdrop-blur"
          >
            Layer {DISCIPLINE_STORY.find((d) => d.id === active)?.numeral} ·{' '}
            {categoryLabel(active)}
            <span className="text-slate-400">
              {String(servicesOf(active).length).padStart(2, '0')} srv
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 [perspective:1200px]">
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {DISCIPLINE_STORY.map((d, i) => {
            const isActive = d.id === active;
            return (
              <motion.div
                key={d.id}
                className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
                style={{ width: PLATE.w, height: PLATE.h, marginLeft: -PLATE.w / 2, marginTop: -PLATE.h / 2 }}
                animate={{
                  y: (i - 1.5) * 60,
                  z: (3 - i) * 26 + (isActive ? 30 : 0),
                  rotateX: 56,
                  rotateZ: -34,
                  scale: isActive ? 1.025 : 1,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 160, damping: 24 }
                }
              >
                {/* thickness */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-xl border ${
                    isActive ? 'border-red-300 bg-red-100' : 'border-slate-300 bg-[#E9E5DE]'
                  }`}
                  style={{ transform: 'translateZ(-12px)' }}
                />
                {/* top face */}
                <div
                  className={`absolute inset-0 rounded-xl border bg-white transition-colors duration-300 ${
                    isActive
                      ? 'border-[#C61A1A] shadow-[0_18px_50px_-18px_rgba(198,26,26,0.6)]'
                      : 'border-slate-300/90 shadow-[0_12px_24px_-18px_rgba(15,23,42,0.5)]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-2.5 top-2.5 h-2 w-2 rounded-full ${
                      isActive ? 'bg-[#C61A1A]' : 'bg-slate-300'
                    }`}
                  />
                  <span aria-hidden="true" className="absolute right-2.5 top-2.5 font-mono text-[8px] font-bold tracking-[0.18em] text-slate-400">
                    {d.numeral}
                  </span>

                  {/* etched layer numeral + engraved rule */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`font-mono text-[62px] font-extrabold leading-none tracking-tighter transition-colors duration-300 ${
                        isActive ? 'text-[#C61A1A]/20' : 'text-slate-900/[0.06]'
                      }`}
                    >
                      {d.numeral}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-6 bottom-5 border-t border-dashed border-slate-300/70"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-end justify-between font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
        <span>5D framework</span>
        <span>Revenue</span>
      </div>
    </div>

    {/* layer legend / jump rail */}
    <div className="border-t border-slate-200">
      {DISCIPLINE_STORY.map((d) => {
        const isActive = d.id === active;
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => onJump(d.id)}
            className={`group flex w-full cursor-pointer items-center gap-3 border-b border-slate-100 px-4 py-2.5 text-left transition-colors last:border-0 ${
              isActive ? 'bg-[#FEF3F3]' : 'hover:bg-[#FAF8F5]'
            }`}
          >
            <span
              className={`font-mono text-[10px] font-bold tabular-nums ${
                isActive ? 'text-[#C61A1A]' : 'text-slate-300'
              }`}
            >
              {d.numeral}
            </span>
            <span
              className={`flex-1 truncate text-[11.5px] font-bold ${
                isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'
              }`}
            >
              {categoryLabel(d.id)}
            </span>
            <span className="font-mono text-[9px] tabular-nums text-slate-400">
              {String(servicesOf(d.id).length).padStart(2, '0')}
            </span>
            <span
              className={`h-px w-8 transition-all duration-300 ${
                isActive ? 'bg-[#C61A1A]' : 'bg-slate-200 group-hover:bg-slate-300'
              }`}
            />
          </button>
        );
      })}
    </div>

    <div className="border-t border-slate-200 bg-[#FCFBF8] px-4 py-3">
      <div className="flex items-center justify-between font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400">
        <span>Assembly progress</span>
        <span className="tabular-nums text-slate-500">
          {String(DISCIPLINE_STORY.findIndex((d) => d.id === active) + 1).padStart(2, '0')} / 04
        </span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          style={{ scaleX: progress }}
          className="h-full origin-left bg-[linear-gradient(90deg,#9E1414,#C61A1A,#ff5a5a)]"
        />
      </div>
    </div>
  </div>
);

export const StackStory: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<ServiceCategoryId>('growth');
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end start'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  const jump = (id: ServiceCategoryId) => {
    document
      .getElementById(`layer-${id}`)
      ?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'center' });
  };

  return (
    <section id="story" className="relative border-y border-slate-200 bg-[#F7F5F0] py-16 md:py-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2 -top-8 select-none font-mono text-[19vw] font-extrabold leading-none text-slate-900/[0.04]"
      >
        4×
      </span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C61A1A]" />
                Fig. 02 · The system
              </div>
            </Reveal>
            <WordReveal
              text="One system, assembled in four layers."
              highlight="four layers."
              delay={0.06}
              className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl"
            />
          </div>
          <Reveal delay={0.12} className="md:col-span-5">
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base md:pb-1">
              Each discipline is a load-bearing layer, not a separate invoice. Scroll the chapters —
              the stack raises the layer you are reading.
            </p>
          </Reveal>
        </div>

        {/* mobile layer chips */}
        <div className="mt-8 grid grid-cols-2 gap-2 lg:hidden">
          {DISCIPLINE_STORY.map((d) => {
            const isActive = d.id === active;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => jump(d.id)}
                className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                  isActive
                    ? 'border-red-300 bg-white shadow-xs'
                    : 'border-slate-300 bg-white/60'
                }`}
              >
                <span
                  className={`font-mono text-[10px] font-bold tabular-nums ${
                    isActive ? 'text-[#C61A1A]' : 'text-slate-400'
                  }`}
                >
                  {d.numeral}
                </span>
                <span className={`flex-1 text-[11px] font-bold ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                  {categoryLabel(d.id)}
                </span>
                <span className="font-mono text-[9px] text-slate-400">
                  {String(servicesOf(d.id).length).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 md:mt-12 lg:grid-cols-12 lg:gap-14">
          {/* sticky assembly panel */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <LayerStack active={active} progress={progress} onJump={jump} reduceMotion={reduceMotion} />
              <p className="mt-3 text-center font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Fig. 02a — Exploded axonometric · not to scale
              </p>
            </div>
          </div>

          {/* narrative chapters */}
          <div ref={trackRef} className="space-y-16 lg:col-span-7 lg:space-y-28 lg:pb-44">
            {DISCIPLINE_STORY.map((d) => {
              const list = servicesOf(d.id);
              return (
                <motion.article
                  key={d.id}
                  id={`layer-${d.id}`}
                  onViewportEnter={() => setActive(d.id)}
                  viewport={{ margin: '-38% 0px -42% 0px' }}
                  className="scroll-mt-28"
                >
                  <Reveal>
                    <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      <span className="text-[#C61A1A]">Layer {d.numeral}</span>
                      <span className="h-px flex-1 bg-slate-300" />
                      <span>{String(list.length).padStart(2, '0')} services</span>
                    </div>

                    <div className="mt-5 flex items-start gap-4">
                      <span className="hidden font-mono text-4xl font-extrabold leading-none tracking-tighter text-slate-900/15 sm:block">
                        {d.numeral}
                      </span>
                      <div>
                        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                          {categoryLabel(d.id)}
                        </h3>
                        <p className="mt-1 text-sm font-bold text-[#C61A1A]">{d.tagline}</p>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                          {d.blurb}
                        </p>
                      </div>
                    </div>
                  </Reveal>

                  <div className="mt-6 border-t border-slate-300">
                    {list.map((s, i) => {
                      const Icon = s.icon;
                      const hasPage = SERVICE_DETAIL_SLUGS.includes(s.slug);
                      const body = (
                        <>
                          <span className="w-5 shrink-0 font-mono text-[10px] font-bold tabular-nums text-slate-300 transition-colors group-hover:text-[#C61A1A]">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-[#C61A1A] transition-all duration-300 group-hover:border-[#C61A1A] group-hover:bg-[#C61A1A] group-hover:text-white">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[13.5px] font-extrabold leading-snug tracking-tight text-slate-900 sm:text-[15px]">
                              {s.name}
                            </span>
                            <span className="mt-0.5 block text-[12px] leading-relaxed text-slate-500">
                              {s.description}
                            </span>
                          </span>
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-[#C61A1A] group-hover:bg-[#C61A1A] group-hover:text-white">
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </span>
                        </>
                      );
                      return hasPage ? (
                        <a
                          key={s.slug}
                          href={`/service/${s.slug}`}
                          aria-label={`View ${s.name} service page`}
                          className="group flex items-center gap-3 border-b border-dashed border-slate-300 px-1 py-3.5 transition-colors hover:bg-white/70 sm:gap-4"
                        >
                          {body}
                        </a>
                      ) : (
                        <div
                          key={s.slug}
                          className="group flex items-center gap-3 border-b border-dashed border-slate-300 px-1 py-3.5 sm:gap-4"
                        >
                          {body}
                        </div>
                      );
                    })}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
