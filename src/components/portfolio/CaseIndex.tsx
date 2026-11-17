import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, FolderOpen } from 'lucide-react';
import { CASE_STUDIES } from '../../data/content';

/**
 * CaseIndex — an editorial "case file" browser for the portfolio page.
 *
 * Desktop: a numbered index on the left, a large live preview on the right.
 * Hovering or focusing a file swaps the preview with a soft crossfade.
 * Mobile: the same records become a swipeable rail of compact case cards.
 */
export const CaseIndex: React.FC = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const study = CASE_STUDIES[active];
  const total = String(CASE_STUDIES.length).padStart(2, '0');

  return (
    <div className="mt-9 lg:mt-12">
      {/* ================================================= desktop browser */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-9">
        {/* index */}
        <div className="lg:col-span-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-400">
              <FolderOpen className="h-3.5 w-3.5 text-[#C61A1A]" />
              Case files
            </span>
            <span className="font-mono text-[10.5px] font-bold tabular-nums text-slate-400">
              {total} records
            </span>
          </div>

          <ul className="mt-1">
            {CASE_STUDIES.map((item, index) => {
              const isActive = index === active;
              return (
                <li key={item.id}>
                  <a
                    href={`/case-study/${item.id}`}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    aria-current={isActive ? 'true' : undefined}
                    className="group relative flex items-center gap-3.5 border-b border-slate-100 py-3 pl-3.5 pr-2 outline-none transition-colors focus-visible:bg-red-50/50"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="portfolio-case-rail"
                        className="absolute bottom-1.5 left-0 top-1.5 w-[3px] rounded-full bg-[#C61A1A]"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span
                      className={`w-6 shrink-0 font-mono text-[10.5px] font-bold tabular-nums transition-colors ${
                        isActive ? 'text-[#C61A1A]' : 'text-slate-300'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-[13px] font-bold transition-colors ${
                          isActive ? 'text-[#C61A1A]' : 'text-slate-800 group-hover:text-[#C61A1A]'
                        }`}
                      >
                        {item.category}
                      </span>
                      <span className="mt-0.5 block truncate text-[9.5px] font-bold uppercase tracking-[0.13em] text-slate-400">
                        {item.industry.split('/')[0].trim()}
                      </span>
                    </span>

                    <span className="w-14 shrink-0 text-right">
                      <span className="block text-[13px] font-extrabold leading-none tabular-nums text-[#C61A1A]">
                        {item.results[0]?.value}
                      </span>
                      <span className="mt-1 block truncate text-[8.5px] font-semibold uppercase tracking-wide text-slate-400">
                        {item.results[0]?.label}
                      </span>
                    </span>

                    <ArrowUpRight
                      className={`h-3.5 w-3.5 shrink-0 transition-all ${
                        isActive
                          ? 'text-[#C61A1A]'
                          : 'text-slate-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#C61A1A]'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="mt-4 flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            <span className="h-1 w-1 rounded-full bg-[#C61A1A]" />
            Hover a file to preview · click to open
          </p>
        </div>

        {/* preview */}
        <div className="lg:col-span-7">
          <div className="sticky top-24">
            <div className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_30px_70px_-38px_rgba(15,23,42,0.35)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={study.id}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative h-[300px] overflow-hidden bg-slate-900">
                    <motion.img
                      key={`${study.id}-img`}
                      src={study.image}
                      alt={study.title}
                      referrerPolicy="no-referrer"
                      initial={reduce ? false : { scale: 1.07 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080A]/90 via-[#08080A]/35 to-transparent" />

                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
                      <span className="rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-slate-900 shadow-xs">
                        File {String(active + 1).padStart(2, '0')} / {total}
                      </span>
                      <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
                        {study.industry.split('/')[0].trim()}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <span className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-red-300">
                        {study.category}
                      </span>
                      <h3 className="mt-1.5 line-clamp-2 text-[17px] font-bold leading-snug text-white sm:text-lg">
                        {study.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="line-clamp-2 text-[13px] leading-relaxed text-slate-600 sm:text-sm">
                      {study.summary}
                    </p>

                    <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                      {study.results.slice(0, 3).map((result) => (
                        <div
                          key={result.label}
                          className="rounded-xl border border-slate-100 bg-slate-50/80 px-2.5 py-2.5 text-center"
                        >
                          <div className="text-[15px] font-extrabold leading-none tabular-nums text-[#C61A1A] sm:text-base">
                            {result.value}
                          </div>
                          <div className="mt-1 text-[9px] font-semibold leading-tight text-slate-500 sm:text-[9.5px]">
                            {result.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        Measured results
                      </span>
                      <a
                        href={`/case-study/${study.id}`}
                        className="inline-flex min-h-9 items-center gap-1.5 text-[12.5px] font-bold text-[#C61A1A] transition-colors hover:text-[#9E1414] group"
                      >
                        Open full case study
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* progress hairline */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-slate-100">
                <motion.div
                  className="h-full origin-left bg-[#C61A1A]"
                  animate={{ scaleX: (active + 1) / CASE_STUDIES.length }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================== mobile rail */}
      <div className="dz-mobile-rail lg:hidden">
        {CASE_STUDIES.map((item, index) => (
          <a
            key={item.id}
            href={`/case-study/${item.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all active:scale-[0.99]"
          >
            <div className="relative h-40 overflow-hidden bg-slate-900">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A]/85 via-[#08080A]/20 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-slate-900">
                {item.category}
              </span>
              <span className="absolute right-3 top-3 font-mono text-[9.5px] font-bold tabular-nums text-white/75">
                {String(index + 1).padStart(2, '0')} / {total}
              </span>
              <span className="absolute bottom-3 left-3 right-3 line-clamp-2 text-[13px] font-bold leading-snug text-white">
                {item.title}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-3.5">
              <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-400">
                {item.industry.split('/')[0].trim()}
              </span>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {item.results.slice(0, 3).map((result) => (
                  <div key={result.label} className="min-w-0">
                    <div className="text-[13px] font-extrabold leading-none tabular-nums text-[#C61A1A]">
                      {result.value}
                    </div>
                    <div className="mt-1 truncate text-[8.5px] font-semibold leading-tight text-slate-500">
                      {result.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Open file
                </span>
                <ArrowUpRight className="h-4 w-4 text-[#C61A1A]" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
