import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, MapPin, Play, Search, ShieldCheck, Sparkles } from 'lucide-react';

/**
 * Bespoke layouts for the service-list sections. Each service page gets its
 * own motif so the same client copy never reads as a repeated card wall:
 * search index, answer feed, campaign board, conveyor, roster, edit bay,
 * specimen board, audit sheet, ledger and manuscript.
 */

const RED = '#C61A1A';
const SERIF = "Georgia, 'Times New Roman', serif";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ShowcaseItem {
  title: string;
  body: string;
  platform?: string;
}

interface ShowcaseGroup {
  key: string;
  desc?: string;
  items: readonly ShowcaseItem[];
}

const pad = (n: number) => String(n).padStart(2, '0');

/* ------------------------------------------------------------------ */
/* 1. SEO — search index: chapter rail + result sheet                  */
/* ------------------------------------------------------------------ */

export const SeoSearchIndex: React.FC<{ groups: readonly ShowcaseGroup[] }> = ({ groups }) => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const group = groups[active];

  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_70px_-58px_rgba(15,23,42,0.6)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-red-100 bg-red-50 text-[#C61A1A]">
            <Search className="h-4 w-4" strokeWidth={2.6} />
          </span>
          <div>
            <p className="text-sm font-extrabold text-slate-900">Search index</p>
            <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-slate-400">
              every intent, one sheet
            </p>
          </div>
        </div>
        <span className="rounded-full border border-slate-200 px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-slate-500">
          {groups.length} chapters · live
        </span>
      </div>

      <div className="grid lg:grid-cols-[264px_minmax(0,1fr)]">
        {/* chapter rail */}
        <div className="hidden border-r border-slate-100 bg-slate-50/60 p-3 lg:block">
          {groups.map((g, i) => {
            const on = i === active;
            return (
              <button
                key={g.key}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={on}
                className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  on ? 'bg-white shadow-sm' : 'hover:bg-white/70'
                }`}
              >
                <span
                  className={`font-mono text-[10px] font-bold ${on ? 'text-[#C61A1A]' : 'text-slate-400'}`}
                >
                  {pad(i + 1)}
                </span>
                <span
                  className={`flex-1 text-[12.5px] font-bold leading-snug ${
                    on ? 'text-slate-900' : 'text-slate-600'
                  }`}
                >
                  {g.key}
                </span>
                <span className="font-mono text-[9.5px] font-bold text-slate-400">
                  {pad(g.items.length)}
                </span>
                {on && (
                  <motion.span
                    layoutId="seo-index-mark"
                    className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-[#C61A1A]"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* phone chapter chips */}
        <div className="dz-chip-scroll flex gap-2 overflow-x-auto px-4 pt-4 lg:hidden">
          {groups.map((g, i) => (
            <button
              key={g.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`rail-chip shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-bold transition-colors ${
                i === active
                  ? 'border-[#C61A1A] bg-[#C61A1A] text-white'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              {pad(i + 1)} {g.key.replace(/ Services$/, '')}
            </button>
          ))}
        </div>

        {/* result sheet */}
        <div className="min-w-0 p-4 sm:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <div className="flex items-baseline justify-between gap-3 border-b-2 border-slate-900 pb-2.5">
                <div className="min-w-0">
                  <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    chapter {pad(active + 1)} / {pad(groups.length)}
                  </p>
                  <h3 className="mt-1 text-base font-extrabold leading-snug text-slate-900 sm:text-lg">
                    {group.key}
                  </h3>
                </div>
                <span className="shrink-0 font-mono text-[10px] font-bold text-[#C61A1A]">
                  {group.items.length} results
                </span>
              </div>

              <ol className="mt-1 divide-y divide-dashed divide-slate-200">
                {group.items.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.04 * i, ease: EASE }}
                    className="group flex items-start gap-4 py-3.5"
                  >
                    <span className="mt-0.5 font-mono text-[10px] font-bold text-[#C61A1A]">
                      {pad(i + 1)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[13.5px] font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-[#C61A1A]">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{item.body}</p>
                    </div>
                    <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-300 transition-colors group-hover:text-[#C61A1A]" />
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 2. AI SEO — answer feed: query chips + cited answer sheet           */
/* ------------------------------------------------------------------ */

export const AiSeoAnswerFeed: React.FC<{ groups: readonly ShowcaseGroup[] }> = ({ groups }) => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const group = groups[active];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap justify-center gap-2">
        {groups.map((g, i) => {
          const on = i === active;
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`rounded-full border px-3.5 py-1.5 text-[11px] font-bold transition-colors ${
                on
                  ? 'border-[#C61A1A] bg-[#C61A1A] text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:text-[#C61A1A]'
              }`}
            >
              <span className={`mr-1.5 font-mono text-[9px] ${on ? 'text-white/70' : 'text-slate-400'}`}>
                Q{pad(i + 1)}
              </span>
              {g.key}
            </button>
          );
        })}
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_70px_-58px_rgba(15,23,42,0.6)]">
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-5">
          <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-slate-400">
            ask
          </span>
          <span className="min-w-0 flex-1 truncate font-mono text-[11px] font-semibold text-slate-700">
            {group.key.toLowerCase()}
          </span>
          <motion.span
            aria-hidden="true"
            animate={reduce ? undefined : { opacity: [1, 0.1, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            className="h-3.5 w-[2px] shrink-0 bg-[#C61A1A]"
          />
          <span className="hidden shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500 sm:block">
            {group.items.length} answers
          </span>
        </div>

        <div className="p-4 sm:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="grid gap-3 sm:grid-cols-2"
            >
              {group.items.map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: 0.05 * i, ease: EASE }}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-red-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      answer {pad(i + 1)}
                    </span>
                    <span className="grid h-5 w-5 place-items-center rounded-full border border-[#C61A1A]/35 text-[#C61A1A]">
                      <Check className="h-3 w-3" strokeWidth={3.4} />
                    </span>
                  </div>
                  <h4 className="mt-2.5 text-[13.5px] font-extrabold leading-snug text-slate-900">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">{item.body}</p>
                  <span className="mt-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#C61A1A]/70">
                    <span className="h-1 w-1 rounded-full bg-[#C61A1A]" />
                    cited · structured
                  </span>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-slate-400">
        Every surface checked · answered · cited
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 3. Google Ads — campaign board: brief panel + ad units              */
/* ------------------------------------------------------------------ */

export const GaCampaignBoard: React.FC<{ groups: readonly ShowcaseGroup[] }> = ({ groups }) => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const group = groups[active];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });

  return (
    <div
      ref={ref}
      className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_70px_-58px_rgba(15,23,42,0.6)]"
    >
      <div className="dz-chip-scroll flex gap-2 overflow-x-auto border-b border-slate-100 p-3 lg:flex-wrap lg:overflow-visible">
        {groups.map((g, i) => {
          const on = i === active;
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`rail-chip flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors ${
                on
                  ? 'border-[#C61A1A]/40 bg-red-50/70'
                  : 'border-slate-200 bg-white hover:border-red-200'
              }`}
            >
              <span className={`font-mono text-[9.5px] font-bold ${on ? 'text-[#C61A1A]' : 'text-slate-400'}`}>
                {pad(i + 1)}
              </span>
              <span
                className={`max-w-[220px] truncate text-[11px] font-bold ${
                  on ? 'text-slate-900' : 'text-slate-600'
                }`}
              >
                {g.key}
              </span>
              <span className="rounded-full bg-white px-1.5 py-0.5 font-mono text-[8.5px] font-bold text-slate-400 ring-1 ring-slate-200">
                {g.items.length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.55fr)]">
        {/* brief */}
        <div className="border-b border-slate-100 bg-[#FCFBF7] p-5 sm:p-6 lg:sticky lg:top-24 lg:m-4 lg:self-start lg:rounded-2xl lg:border">
          <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-slate-400">
            campaign brief
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <h3 className="mt-2 text-base font-extrabold leading-snug text-slate-900">
                {group.key}
              </h3>
              {group.desc && (
                <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">{group.desc}</p>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 space-y-4">
            {(['reach', 'relevance', 'return'] as const).map((label, i) => (
              <div key={label}>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    {label}
                  </span>
                  <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.14em] text-[#C61A1A]/70">
                    planned
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <motion.span
                    initial={reduce ? false : { width: 0 }}
                    animate={inView ? { width: `${[92, 78, 86][i]}%` } : undefined}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
                    className="block h-full rounded-full bg-[#C61A1A]"
                    style={{ opacity: 0.9 - i * 0.16 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-7 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C61A1A]" />
            {group.items.length} ad units · live
          </p>
        </div>

        {/* ad units */}
        <div className="min-w-0 p-4 sm:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="grid gap-3 sm:grid-cols-2"
            >
              {group.items.map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.36, delay: 0.04 * i, ease: EASE }}
                  className="group rounded-xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-red-200 hover:shadow-[0_20px_40px_-34px_rgba(198,26,26,0.45)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      ad {pad(i + 1)}
                    </span>
                    <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      sponsored
                    </span>
                  </div>
                  <h4 className="mt-2.5 text-[13.5px] font-extrabold leading-snug text-slate-900">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 line-clamp-5 text-[12.5px] leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                  <div className="mt-3 flex items-center gap-2 border-t border-dashed border-slate-200 pt-2.5 font-mono text-[9px] font-bold text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C61A1A]" />
                    yourbrand.com
                    <span className="ml-auto text-[#C61A1A]/70">bid · set</span>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 4. AI Automation — conveyor lanes with a travelling pulse           */
/* ------------------------------------------------------------------ */

export const AutomationConveyor: React.FC<{ groups: readonly ShowcaseGroup[] }> = ({ groups }) => {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      {groups.map((group, gi) => (
        <div key={group.key}>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-red-100 bg-red-50 font-mono text-[11px] font-extrabold text-[#C61A1A]">
              {pad(gi + 1)}
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-extrabold leading-snug text-slate-900">{group.key}</h3>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                {group.items.length} steps · runs on its own
              </p>
            </div>
            <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
          </div>

          {group.desc && (
            <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-slate-600">{group.desc}</p>
          )}

          <div className="relative mt-4">
            <span
              aria-hidden="true"
              className="absolute left-4 right-4 top-[44px] hidden border-t border-dashed border-slate-300 lg:block"
            />
            {!reduce && (
              <motion.span
                aria-hidden="true"
                className="absolute top-[38px] hidden h-2.5 w-2.5 rounded-full bg-[#C61A1A] shadow-[0_0_0_4px_rgba(198,26,26,0.12)] lg:block"
                animate={{ left: ['2%', '96%'] }}
                transition={{ duration: 7 + gi, repeat: Infinity, ease: 'linear', delay: gi * 0.6 }}
              />
            )}

            <div className="dz-mobile-rail gap-3 pb-1 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:overflow-visible">
              {group.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3), ease: EASE }}
                  className="group relative min-w-0 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-red-200 hover:shadow-[0_22px_44px_-36px_rgba(198,26,26,0.45)]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#C61A1A]/30 bg-red-50 font-mono text-[9px] font-extrabold text-[#C61A1A]">
                    {pad(i + 1)}
                  </span>
                  <h4 className="mt-2.5 flex items-start justify-between gap-2 text-[13px] font-extrabold leading-snug text-slate-900">
                    {item.title}
                    <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300 transition-colors group-hover:text-[#C61A1A]" />
                  </h4>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600">{item.body}</p>
                  <span className="mt-3 flex items-center gap-1.5 border-t border-dashed border-slate-200 pt-2 font-mono text-[8.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    <span className="h-1 w-1 rounded-full bg-[#C61A1A]" />
                    {i === 0 ? 'trigger' : i === group.items.length - 1 ? 'delivered' : 'auto-run'}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 5. Influencer — casting board: folder tabs + taped creator cards    */
/* ------------------------------------------------------------------ */

const PlatformGlyph: React.FC<{ id?: string }> = ({ id }) => {
  const common = { className: 'h-3.5 w-3.5', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8 } as const;
  switch (id) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="4" y="4" width="16" height="16" rx="4.5" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M14.5 8.5V6.8c0-.8.4-1.3 1.2-1.3H17V2.8h-2.2c-2.3 0-3.6 1.3-3.6 3.6v2.1H9v2.9h2.2V21h3.3v-9.6h2.4l.4-2.9z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="M10.2 9.3l4.6 2.7-4.6 2.7z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M13.5 3.5v10.2a3.3 3.3 0 1 1-3.3-3.3" />
          <path d="M13.5 3.5c.5 2.4 2 3.8 4.6 4.1" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
          <path d="M7.5 10.5V17M7.5 7.6v.1M11.5 17v-3.6a2.3 2.3 0 0 1 4.6 0V17" />
        </svg>
      );
    case 'snapchat':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 3.5c3 0 4.5 2 4.5 4.7 0 1.4-.2 2.4-.2 3 .8.6 1.7.7 2.4.4-.2 1.2-.9 1.8-1.9 2.1.4 1.1 1.3 1.7 2.2 2-.6.9-1.8 1.1-2.7 1.2-.5 1.2-1.5 1.6-2.3 1.9-.7.3-1.3.7-2 .7s-1.3-.4-2-.7c-.8-.3-1.8-.7-2.3-1.9-.9-.1-2.1-.3-2.7-1.2.9-.3 1.8-.9 2.2-2-1-.3-1.7-.9-1.9-2.1.7.3 1.6.2 2.4-.4 0-.6-.2-1.6-.2-3C7.5 5.5 9 3.5 12 3.5z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
  }
};

const ROSTER_TILT = ['sm:-rotate-1', 'sm:rotate-[0.8deg]', 'sm:-rotate-[0.5deg]', 'sm:rotate-[1.1deg]'];

export const InfluencerRoster: React.FC<{ groups: readonly ShowcaseGroup[] }> = ({ groups }) => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const group = groups[active];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="dz-chip-scroll flex gap-2 overflow-x-auto lg:flex-wrap lg:justify-center lg:overflow-visible">
        {groups.map((g, i) => {
          const on = i === active;
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`rail-chip relative flex shrink-0 flex-col justify-center rounded-t-lg border border-b-0 px-3.5 pb-2 pt-2.5 text-left transition-colors ${
                on
                  ? 'border-[#C61A1A]/35 bg-white'
                  : 'border-slate-200 bg-slate-50/80 text-slate-500 hover:bg-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`font-mono text-[9px] font-bold ${on ? 'text-[#C61A1A]' : 'text-slate-400'}`}>
                  FOLDER {pad(i + 1)}
                </span>
                <span className="rounded-full bg-white px-1.5 font-mono text-[8px] font-bold text-slate-400 ring-1 ring-slate-200">
                  {g.items.length}
                </span>
              </span>
              <span className={`mt-0.5 block max-w-[230px] text-[11px] font-bold leading-snug line-clamp-2 ${on ? 'text-slate-900' : ''}`}>
                {g.key}
              </span>
              {on && (
                <motion.span
                  layoutId="roster-tab"
                  className="absolute inset-x-0 bottom-[-1px] h-[3px] rounded-full bg-[#C61A1A]"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="relative mt-3 rounded-2xl border border-slate-200 bg-[#FBF9F4] p-4 shadow-[0_26px_60px_-50px_rgba(15,23,42,0.55)] sm:p-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-[#D8C9AC]/70"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {group.items.map((item, i) => (
              <motion.article
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, delay: 0.04 * i, ease: EASE }}
                className={`group relative rounded-lg border border-[#E7DCC6] bg-white p-4 pb-5 shadow-[0_16px_34px_-30px_rgba(92,64,25,0.55)] transition-transform duration-300 hover:rotate-0 ${ROSTER_TILT[i % ROSTER_TILT.length]}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 left-1/2 h-3 w-12 -translate-x-1/2 rotate-[-2deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90"
                />
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-[#C61A1A]/30 bg-[#FCFBF7] text-[#C61A1A]">
                    <PlatformGlyph id={item.platform} />
                  </span>
                  <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.16em] text-[#B9AA8A]">
                    brief {pad(i + 1)}
                  </span>
                  <span className="ml-auto grid h-5 w-5 place-items-center rounded-full border border-[#C61A1A]/30 text-[#C61A1A]">
                    <Check className="h-2.5 w-2.5" strokeWidth={3.4} />
                  </span>
                </div>
                <h4 className="mt-2.5 text-[13px] font-extrabold leading-snug text-slate-900">
                  {item.title}
                </h4>
                <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600">{item.body}</p>
                <span className="mt-3 block border-t border-dashed border-[#E7DCC6] pt-2 font-serif text-[10.5px] italic text-[#B9AA8A]">
                  matched to the brief
                </span>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 6. Video — edit bay: sequence tabs, clip timeline, preview monitor  */
/* ------------------------------------------------------------------ */

export const VideoEditBay: React.FC<{ groups: readonly ShowcaseGroup[] }> = ({ groups }) => {
  const [seq, setSeq] = useState(0);
  const [clip, setClip] = useState(0);
  const reduce = useReducedMotion();
  const group = groups[seq];
  const selected = group.items[Math.min(clip, group.items.length - 1)];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="dz-chip-scroll flex gap-2 overflow-x-auto lg:flex-wrap lg:justify-center lg:overflow-visible">
        {groups.map((g, i) => {
          const on = i === seq;
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => {
                setSeq(i);
                setClip(0);
              }}
              aria-pressed={on}
              className={`rail-chip flex shrink-0 items-center gap-2 rounded-md border px-3 py-2 transition-colors ${
                on
                  ? 'border-[#C61A1A] bg-[#C61A1A] text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-red-200'
              }`}
            >
              <span className={`font-mono text-[9px] font-bold ${on ? 'text-white/70' : 'text-slate-400'}`}>
                SEQ {pad(i + 1)}
              </span>
              <span className="max-w-[210px] truncate text-[11px] font-bold">{g.key}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_26px_60px_-52px_rgba(15,23,42,0.55)]">
        {/* timeline */}
        <div className="border-b border-slate-100 bg-[#FCFBF7] px-3 pb-4 pt-3 sm:px-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
              timeline · sequence {pad(seq + 1)}
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#C61A1A]/80">
              clip {pad(clip + 1)} / {pad(group.items.length)}
            </span>
          </div>

          <div
            aria-hidden="true"
            className="mt-2 h-2.5 rounded-sm bg-[radial-gradient(circle,#CBD5E1_1.2px,transparent_1.4px)] [background-size:12px_8px]"
          />

          <div className="flex snap-x gap-1.5 overflow-x-auto pb-1 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {group.items.map((item, i) => {
              const on = i === clip;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setClip(i)}
                  aria-pressed={on}
                  className={`relative min-w-[132px] flex-1 snap-start rounded-md border px-2.5 pb-2.5 pt-5 text-left transition-colors ${
                    on
                      ? 'border-[#C61A1A] bg-red-50/60'
                      : 'border-slate-200 bg-white hover:border-red-200'
                  }`}
                >
                  <span
                    className={`font-mono text-[8px] font-bold uppercase tracking-[0.14em] ${
                      on ? 'text-[#C61A1A]' : 'text-slate-400'
                    }`}
                  >
                    clip {pad(i + 1)}
                  </span>
                  <span
                    className={`mt-1 block text-[10.5px] font-bold leading-snug ${
                      on ? 'text-slate-900' : 'text-slate-600'
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-2 flex h-3 items-end gap-[2px] opacity-60"
                  >
                    {[5, 9, 4, 11, 7, 10, 3].map((h, j) => (
                      <span
                        key={j}
                        className={on ? 'w-[2px] bg-[#C61A1A]' : 'w-[2px] bg-slate-300'}
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </span>
                  {on && (
                    <motion.span
                      layoutId="edit-playhead"
                      aria-hidden="true"
                      className="absolute -top-1 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[7px] border-t-[#C61A1A]"
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            aria-hidden="true"
            className="mt-1 h-2.5 rounded-sm bg-[radial-gradient(circle,#CBD5E1_1.2px,transparent_1.4px)] [background-size:12px_8px]"
          />
        </div>

        {/* preview monitor */}
        <div className="p-4 sm:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${seq}-${clip}`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: EASE }}
              className="relative grid gap-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:items-center"
            >
              <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-1.5 border-b border-slate-200 bg-white px-2.5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C61A1A]" />
                  <span className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    now playing
                  </span>
                </div>
                <div className="relative flex aspect-[16/9] items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="absolute inset-3 border border-dashed border-slate-300"
                  />
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#C61A1A] text-white shadow">
                    <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                  </span>
                  <span className="absolute bottom-2 left-3 font-mono text-[8px] font-bold text-slate-400">
                    SEQ {pad(seq + 1)} · CLIP {pad(clip + 1)}
                  </span>
                </div>
              </div>

              <div className="min-w-0">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#C61A1A]/80">
                  {group.key}
                </span>
                <h4 className="mt-1.5 text-base font-extrabold leading-snug text-slate-900">
                  {selected.title}
                </h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{selected.body}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  <span className="h-1 w-1 rounded-full bg-[#C61A1A]" />
                  cut · colour · sound · delivered
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 7. Design — specimen board: asymmetric taped tiles                  */
/* ------------------------------------------------------------------ */

export const DesignSpecimenBoard: React.FC<{
  items: readonly ShowcaseItem[];
  renderIcon?: (index: number) => React.ReactNode;
}> = ({ items, renderIcon }) => {
  const reduce = useReducedMotion();
  const wide = (i: number) => i === 0 || i === 5;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.article
            key={item.title}
            initial={reduce ? false : { opacity: 0, y: 16, rotate: i % 2 ? 1 : -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.045, 0.3), ease: EASE }}
            className={`group relative h-full rounded-xl border border-slate-200 bg-white p-5 shadow-[0_18px_40px_-36px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-[0_26px_50px_-36px_rgba(198,26,26,0.4)] ${
              i % 3 === 0 ? 'sm:-rotate-[0.4deg]' : i % 3 === 2 ? 'sm:rotate-[0.4deg]' : ''
            } ${wide(i) ? 'lg:col-span-2 lg:flex lg:items-center lg:gap-5' : ''}`}
          >
            <span
              aria-hidden="true"
              className="absolute -top-1.5 left-1/2 h-3 w-12 -translate-x-1/2 rotate-[-2deg] border border-[#E2D7BE]/80 bg-[#F3ECE0]/90"
            />

            <div className={wide(i) ? 'flex shrink-0 items-center gap-3 lg:flex-col lg:items-start' : 'flex items-center gap-3'}>
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-red-100 bg-red-50 text-[#C61A1A] transition-colors group-hover:bg-[#C61A1A] group-hover:text-white">
                {renderIcon ? renderIcon(i) : <Sparkles className="h-4.5 w-4.5" />}
              </span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                spec {pad(i + 1)}
              </span>
              {wide(i) && (
                <span
                  aria-hidden="true"
                  className="ml-auto hidden border-l border-dashed border-slate-200 pl-4 font-serif text-[11px] italic text-slate-400 lg:block lg:ml-0 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-3"
                >
                  wide format
                </span>
              )}
            </div>

            <div className={wide(i) ? 'mt-4 min-w-0 lg:mt-0 lg:flex-1' : 'min-w-0'}>
              <h3 className="mt-3.5 text-base font-extrabold leading-snug text-slate-900 lg:mt-0">
                {item.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{item.body}</p>
            </div>

            <span className="absolute bottom-2.5 right-4 font-serif text-[10.5px] italic text-slate-300">
              fig. {pad(i + 1)}
            </span>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 8. GMB — audit sheet: completeness dial + checked service rows      */
/* ------------------------------------------------------------------ */

export const GmbAuditSheet: React.FC<{ items: readonly ShowcaseItem[] }> = ({ items }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const total = items.length;

  return (
    <div ref={ref} className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
      {/* audit cover */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#FCFBF7] p-5 shadow-[0_24px_55px_-46px_rgba(15,23,42,0.55)] sm:p-6 lg:sticky lg:top-24">
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#7C5A2E_1px,transparent_1px)] [background-size:16px_16px]"
        />
        <div className="relative flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#B9AA8A]">
            profile audit
          </span>
          <span className="rounded-full border border-[#C61A1A]/35 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-[#C61A1A]">
            local
          </span>
        </div>

        <div className="relative mt-5 flex items-center gap-5">
          <div className="relative h-24 w-24 shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#E7DCC6" strokeWidth="7" />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={RED}
                strokeWidth="7"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1 1"
                initial={reduce ? false : { strokeDashoffset: 1 }}
                animate={inView ? { strokeDashoffset: 0 } : undefined}
                transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-xl font-extrabold tabular-nums text-slate-900">
                {pad(total)}
              </span>
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-slate-400">
                checks
              </span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-extrabold leading-snug text-slate-900">
              Every field a customer checks before they call.
            </p>
            <p className="mt-1.5 font-serif text-[11.5px] italic leading-relaxed text-slate-500">
              name · hours · photos · reviews · services · location
            </p>
          </div>
        </div>

        {/* small map grid */}
        <div className="relative mt-5 overflow-hidden rounded-lg border border-[#E7DCC6] bg-white p-3">
          <svg viewBox="0 0 260 96" className="h-auto w-full" aria-hidden="true">
            <g stroke="#E2E8F0" strokeWidth="1">
              {[16, 40, 64].map((y) => (
                <line key={y} x1="0" y1={y} x2="260" y2={y} />
              ))}
              {[30, 78, 126, 174, 222].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="96" />
              ))}
            </g>
            <path d="M0 58 C40 54 70 66 105 60 C150 52 200 62 260 54" fill="none" stroke="#D8C9AC" strokeWidth="3" />
            <path d="M118 0 C112 30 126 60 118 96" fill="none" stroke="#D8C9AC" strokeWidth="3" />
            <motion.g
              initial={reduce ? false : { y: -6, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : undefined}
              transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
            >
              <MapPin x={122} y={36} width={20} height={20} color={RED} fill={RED} fillOpacity={0.12} />
            </motion.g>
            <text x="145" y="48" fontSize="8" fontFamily="ui-monospace, monospace" fill="#8B7B5E">
              your business
            </text>
          </svg>
          <span className="absolute right-2 top-2 rounded-[2px] border border-[#C61A1A]/45 bg-[#FCFBF7] px-1.5 py-0.5 font-mono text-[7.5px] font-bold uppercase tracking-[0.12em] text-[#C61A1A]">
            on the map
          </span>
        </div>

        <span
          aria-hidden="true"
          className="absolute bottom-3 right-4 -rotate-6 rounded-[2px] border-2 border-[#C61A1A]/70 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[#C61A1A]/80"
        >
          owner verified
        </span>
      </div>

      {/* checklist */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 px-4 py-3 sm:px-5">
          <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-slate-500">
            checklist · everything handled
          </span>
          <span className="font-mono text-[9.5px] font-bold text-[#C61A1A]">
            {pad(total)} / {pad(total)}
          </span>
        </div>

        <div className="divide-y divide-dashed divide-slate-200 px-4 sm:px-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduce ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3), ease: EASE }}
              className="group flex items-start gap-3.5 py-4"
            >
              <motion.span
                initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.05, ease: EASE }}
                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#C61A1A]/35 bg-red-50 text-[#C61A1A]"
              >
                <Check className="h-3 w-3" strokeWidth={3.4} />
              </motion.span>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[9px] font-bold text-slate-400">{pad(i + 1)}</span>
                  <h3 className="text-[13.5px] font-extrabold leading-snug text-slate-900">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{item.body}</p>
              </div>
              <span className="ml-auto hidden shrink-0 pt-1 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#C61A1A]/60 opacity-0 transition-opacity group-hover:opacity-100 sm:block">
                done
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 9. ORM — perception ledger: ruled entries + handled stamps          */
/* ------------------------------------------------------------------ */

export const OrmLedger: React.FC<{ items: readonly ShowcaseItem[] }> = ({ items }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });

  return (
    <div
      ref={ref}
      className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#E2D7BE] bg-[#FFFDF8] shadow-[0_28px_64px_-54px_rgba(92,64,25,0.55)]"
    >
      {/* margin rule + punched holes */}
      <motion.span
        aria-hidden="true"
        initial={reduce ? false : { scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : undefined}
        transition={{ duration: 1, ease: EASE }}
        className="absolute bottom-0 left-12 top-0 hidden w-px origin-top bg-[#C61A1A]/35 sm:block"
      />
      <div aria-hidden="true" className="absolute left-4 top-16 hidden flex-col gap-24 sm:flex">
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="h-2.5 w-2.5 rounded-full border border-[#D8C9AC] bg-white" />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7DCC6] px-5 py-4 sm:pl-20">
        <div>
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#B9AA8A]">
            perception ledger
          </p>
          <p className="mt-0.5 font-serif text-[13px] italic text-slate-600">
            every signal gets an answer
          </p>
        </div>
        <span className="rotate-[-1.5deg] rounded-[2px] border border-[#C61A1A]/40 px-2.5 py-1 font-mono text-[8.5px] font-bold uppercase tracking-[0.16em] text-[#C61A1A]/80">
          {pad(items.length)} entries · handled
        </span>
      </div>

      <ol className="px-4 py-2 sm:pl-20 sm:pr-6">
        {items.map((item, i) => (
          <motion.li
            key={item.title}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.25), ease: EASE }}
            className="group relative grid gap-2 border-b border-dashed border-[#E7DCC6] py-4 last:border-0 sm:grid-cols-[76px_minmax(0,1fr)_auto] sm:gap-4"
          >
            <div className="flex items-baseline gap-2 sm:block">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#B9AA8A]">
                signal
              </span>
              <span className="ml-1 font-serif text-lg italic leading-none text-[#C61A1A] sm:ml-0 sm:mt-1 sm:block">
                {pad(i + 1)}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="text-[13.5px] font-extrabold leading-snug text-slate-900">
                {item.title}
              </h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{item.body}</p>
            </div>
            <motion.span
              aria-hidden="true"
              initial={reduce ? false : { scale: 0.7, opacity: 0, rotate: -14 }}
              whileInView={{ scale: 1, opacity: 1, rotate: -7 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.05, ease: EASE }}
              className="h-fit self-center justify-self-start rounded-[2px] border-2 border-[#C61A1A]/60 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#C61A1A]/75 sm:justify-self-end"
            >
              handled
            </motion.span>
          </motion.li>
        ))}
      </ol>

      <div className="flex items-center justify-between border-t border-[#E7DCC6] px-5 py-3 sm:pl-20">
        <span className="font-serif text-[11px] italic text-[#B9AA8A]">written down, followed up.</span>
        <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.16em] text-slate-400">
          entry {pad(items.length)} of {pad(items.length)}
        </span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 10. Content writing — manuscript spread with numbered entries        */
/* ------------------------------------------------------------------ */

export const CwManuscript: React.FC<{ items: readonly ShowcaseItem[] }> = ({ items }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const half = Math.ceil(items.length / 2);
  const pages = [items.slice(0, half), items.slice(half)];

  return (
    <div
      ref={ref}
      className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#E2D7BE] bg-[#FFFDF8] p-5 shadow-[0_28px_64px_-54px_rgba(92,64,25,0.55)] sm:p-7"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(#7C5A2E_1px,transparent_1px)] [background-size:18px_18px]"
      />

      <div className="relative flex flex-wrap items-center justify-between gap-2 border-b border-[#E7DCC6] pb-3">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#B9AA8A]">
          formats ledger · {items.length} entries
        </span>
        <span className="font-serif text-[11.5px] italic text-[#8B7B5E]">
          one voice, every format
        </span>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 top-16 hidden w-px bg-gradient-to-b from-[#D8C9AC]/0 via-[#D8C9AC]/70 to-[#D8C9AC]/0 lg:block"
      />

      <div className="relative mt-4 grid gap-x-10 gap-y-1 lg:grid-cols-2">
        {pages.map((page, pageIndex) => (
          <div key={pageIndex} className="min-w-0">
            {page.map((item, i) => {
              const index = pageIndex * half + i;
              return (
                <motion.div
                  key={item.title}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3), ease: EASE }}
                  className="group border-b border-dashed border-[#E7DCC6]/80 py-3.5 last:border-0"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="w-7 shrink-0 font-serif text-lg italic leading-none text-[#C61A1A]">
                      {pad(index + 1)}
                    </span>
                    <h3 className="text-[13.5px] font-extrabold leading-snug text-slate-900">
                      {item.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="ml-auto hidden h-px flex-1 self-center bg-[repeating-linear-gradient(90deg,#D8C9AC_0_2px,transparent_2px_6px)] opacity-0 transition-opacity group-hover:opacity-100 sm:block"
                    />
                  </div>
                  <p className="mt-1 pl-10 text-[12.5px] leading-relaxed text-slate-600">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="relative mt-3 flex items-center justify-between border-t border-[#E7DCC6] pt-3">
        <span className="font-serif text-[11px] italic text-[#B9AA8A]">drafted · edited · signed off</span>
        <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.16em] text-slate-400">
          {pad(items.length)} / {pad(items.length)}
        </span>
      </div>
    </div>
  );
};
