import React from 'react';
import { useReducedMotion } from 'motion/react';
import { ArrowUpRight, CalendarClock, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Reveal } from '../Reveal';
import { WordReveal } from '../fx/FxKit';
import { CONNECT_WAYS } from '../../data/contactContent';

const WAY_ICONS = {
  mail: Mail,
  phone: Phone,
  calendar: CalendarClock,
  linkedin: Linkedin,
} as const;

const TILT = ['', 'sm:rotate-1', 'sm:-rotate-[1.2deg]', 'sm:rotate-[0.8deg]'];

/**
 * DirectLines — the four channels as calling cards pinned beside the desk.
 * Each card carries an extension code, the direct detail and a scribbled
 * underline; the strategy-call card is printed solid red as the recommended
 * route. No directory board, no table — this is paper.
 */
export const DirectLines: React.FC = () => {
  const reduce = useReducedMotion();

  const goForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document
      .getElementById('audit-form')
      ?.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth' });
  };

  return (
    <section id="connect" className="relative scroll-mt-24 bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C61A1A]">
                <Phone className="h-3.5 w-3.5" /> Direct lines
              </div>
            </Reveal>
            <WordReveal
              text="Multiple Ways to Connect With Our Digital Marketing Team"
              highlight="Digital Marketing Team"
              delay={0.08}
              className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl"
            />
            <Reveal delay={0.14}>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Four ways in, one team on the other side. Choose whatever is fastest for you — the
                reply time is the same.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="hidden shrink-0 pb-1 text-right md:block">
            <div className="font-serif text-sm italic text-slate-500">four lines, one desk</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              All answered in 24–48h
            </div>
          </Reveal>
        </div>

        {/* calling cards */}
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {CONNECT_WAYS.map((way, i) => {
            const Icon = WAY_ICONS[way.icon as keyof typeof WAY_ICONS];
            const external = way.href.startsWith('http');
            const internal = way.href.startsWith('#');
            const red = Boolean(way.highlight);

            return (
              <Reveal
                key={way.title}
                delay={i * 0.07}
                className={`${TILT[i]} transition-transform duration-300 hover:rotate-0`}
              >
                <a
                  href={way.href}
                  onClick={internal ? goForm : undefined}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className={`group relative flex h-full flex-col rounded-md px-6 pb-5 pt-8 transition-shadow duration-300 sm:px-7 ${
                    red
                      ? 'border border-[#9E1414] bg-[#C61A1A] text-white shadow-[0_26px_46px_-30px_rgba(198,26,26,0.75)] hover:shadow-[0_30px_52px_-28px_rgba(198,26,26,0.8)]'
                      : 'border border-[#E7DCC6] bg-[#FCFBF7] text-slate-900 shadow-[0_20px_38px_-32px_rgba(15,23,42,0.55)] hover:shadow-[0_26px_44px_-26px_rgba(15,23,42,0.4)]'
                  }`}
                >
                  {!red && (
                    <span
                      aria-hidden="true"
                      className={`absolute -top-1.5 left-9 h-4 w-16 border border-[#D8C9AC]/70 bg-[#EFE4CD]/90 ${
                        i % 2 === 0 ? 'rotate-[-4deg]' : 'rotate-[3deg]'
                      }`}
                    />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${
                        red
                          ? 'border border-white/40 bg-white/10 text-white'
                          : 'border border-slate-300 bg-white text-[#C61A1A]'
                      }`}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span
                      className={`font-mono text-[9px] font-extrabold uppercase tracking-[0.18em] ${
                        red ? 'text-white/70' : 'text-slate-400'
                      }`}
                    >
                      CH-0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold leading-snug tracking-tight">
                    {way.title}
                  </h3>
                  <span
                    className={`mt-1 block break-words text-sm font-bold ${
                      red
                        ? 'text-white underline decoration-white/45 underline-offset-4'
                        : 'text-[#C61A1A]'
                    }`}
                  >
                    {way.detail}
                  </span>
                  <span
                    className={`mt-2 block text-[12.5px] leading-relaxed ${
                      red ? 'text-white/80' : 'text-slate-500'
                    }`}
                  >
                    {way.note}
                  </span>

                  <span
                    className={`mt-auto flex items-center justify-between gap-3 pt-5 ${
                      red ? 'border-t border-white/25' : 'border-t border-dashed border-[#E2D7BE]'
                    }`}
                  >
                    <span
                      className={`inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] ${
                        red ? 'text-white' : 'text-slate-500 transition-colors group-hover:text-[#C61A1A]'
                      }`}
                    >
                      {way.highlight ? (
                        <span
                          className={`rounded-sm border border-dashed px-2 py-0.5 text-[8.5px] ${
                            red ? 'border-white/60 text-white' : 'border-[#C61A1A]/50 text-[#C61A1A]'
                          }`}
                        >
                          Recommended
                        </span>
                      ) : null}
                      {way.cta}
                    </span>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                        red
                          ? 'border border-white/50 text-white group-hover:bg-white group-hover:text-[#C61A1A]'
                          : 'border border-slate-300 text-slate-500 group-hover:border-[#C61A1A] group-hover:bg-[#C61A1A] group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.16}>
          <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-2.5 border-y border-dashed border-slate-200 py-3.5 sm:flex-row">
            <span className="inline-flex items-center gap-2 text-[11.5px] font-semibold text-slate-600">
              <MapPin className="h-3.5 w-3.5 text-[#C61A1A]" />
              Serving B2B businesses across the US
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#C61A1A]">
              Desk open · 24–48h reply
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
            We’re ready to review your goals, uncover growth opportunities, and show you how our 5D
            Growth Framework can take your business to the next level.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
