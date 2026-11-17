import React from 'react';
import { FileText, Clock, MapPin, TrendingUp } from 'lucide-react';
import { Reveal } from '../Reveal';
import { WordReveal } from '../fx/FxKit';
import { ContactForm } from '../ContactForm';

const INCLUDED = [
  {
    icon: FileText,
    text: 'A personalized digital growth plan tailored to your business.',
  },
  {
    icon: Clock,
    text: 'We reach out within 24–48 hours with clear next steps.',
  },
  {
    icon: TrendingUp,
    text: 'Built on the 5D Growth Framework that has helped US businesses scale.',
  },
];

const DESK_STATS = [
  { value: '250+', label: 'Brands served', red: false },
  { value: '4X', label: 'Avg revenue growth', red: true },
  { value: '24–48h', label: 'First reply', red: false },
];

/**
 * BriefDesk — the intake docket. Proposition and desk notes on the left, the
 * actual brief (ContactForm) on the right, framed as a paper form.
 */
export const BriefDesk: React.FC = () => (
  <section
    id="audit-form"
    className="relative scroll-mt-24 border-t border-slate-100 bg-white py-14 md:py-20"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ------------------------------------------------ left: desk notes */}
        <div className="space-y-5 lg:col-span-5">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C61A1A]">
              <FileText className="h-3.5 w-3.5" /> Intake · Brief IN-01
            </div>
          </Reveal>

          <WordReveal
            text="Get Your Free Growth Audit From Our US Digital Marketing Experts"
            highlight="Digital Marketing Experts"
            delay={0.06}
            className="text-2xl font-extrabold leading-snug tracking-tight text-slate-900 sm:text-3xl"
          />

          <Reveal delay={0.12}>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Tell us where your business is today and what growth should look like. A senior
              strategist reads every brief — no queues, no scripts, no pressure.
            </p>
          </Reveal>

          {/* what lands in your inbox */}
          <Reveal delay={0.18}>
            <div className="overflow-hidden rounded-2xl border border-[#E7DCC6] bg-[#FCFBF7]">
              <div className="flex items-center justify-between gap-3 border-b border-[#EFE6D2] px-4 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C61A1A]" />
                  What lands in your inbox
                </span>
                <span>3 items</span>
              </div>
              <ul className="divide-y divide-[#EFE6D2]">
                {INCLUDED.map(({ icon: Icon, text }, i) => (
                  <li key={text} className="flex items-start gap-3 px-4 py-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-red-200 bg-white text-[#C61A1A]">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="flex-1 text-[12.5px] leading-relaxed text-slate-700">
                      {text}
                    </span>
                    <span className="pt-0.5 font-mono text-[8px] font-extrabold tabular-nums text-slate-300">
                      0{i + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* desk stats */}
          <Reveal delay={0.24}>
            <div className="grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-200 py-3">
              {DESK_STATS.map((stat) => (
                <div key={stat.label} className="px-2 text-center first:pl-0 last:pr-0">
                  <div
                    className={`text-lg font-extrabold leading-none tabular-nums sm:text-xl ${
                      stat.red ? 'text-[#C61A1A]' : 'text-slate-900'
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-600 shadow-2xs">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C61A1A]" />
              <span>
                <strong className="font-bold text-slate-800">Desk hours:</strong> Mon–Fri, 9:00–18:00
                ET · serving B2B businesses across the US.
              </span>
            </div>
          </Reveal>
        </div>

        {/* ------------------------------------------------ right: the brief */}
        <div className="lg:col-span-7">
          <Reveal direction="right" delay={0.1}>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <h3 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                Tell Us About Your Business Goals
              </h3>
              <span className="inline-flex items-center gap-1.5 pb-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C61A1A]" />
                6 fields · ~4 minutes
              </span>
            </div>
            <div className="relative mt-3 rounded-[20px] border border-[#E2D7BE] bg-[#F8F1E2] p-2.5 pt-5 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.5)] sm:p-3 sm:pt-6">
              <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rounded-t-md rounded-b-[3px] border border-slate-300 bg-gradient-to-b from-slate-200 to-slate-300 shadow-[inset_0_-3px_0_rgba(255,255,255,0.35)]"
              />
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
