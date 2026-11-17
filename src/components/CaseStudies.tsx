import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { CASE_STUDIES } from '../data/content';
import { CaseStudy } from '../types';
import { Reveal } from './Reveal';

interface CaseStudiesProps {
  onOpenAudit: () => void;
  onSelectCaseStudy: (study: CaseStudy) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenAudit, onSelectCaseStudy }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((step: number) => {
    setDirection(step);
    setStartIndex((prev) => (prev + step + CASE_STUDIES.length) % CASE_STUDIES.length);
  }, []);

  // 3 at a time on desktop, wrapping circularly
  const visibleStudies = [
    CASE_STUDIES[startIndex % CASE_STUDIES.length],
    CASE_STUDIES[(startIndex + 1) % CASE_STUDIES.length],
    CASE_STUDIES[(startIndex + 2) % CASE_STUDIES.length],
  ];

  return (
    <section id="case-studies" className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              How Growth-Focused Businesses Scaled with an{' '}
              <span className="text-[#C61A1A]">Award Winning Digital Marketing Agency</span>
            </h2>
          </Reveal>
        </div>

        {/* Carousel (slides in the direction of navigation) */}
        <motion.div
          className="mt-10 overflow-hidden sm:mt-14"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          onDragEnd={(_, info) => {
            if (info.offset.x < -48) go(1);
            else if (info.offset.x > 48) go(-1);
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={startIndex}
              initial={{ opacity: 0, x: direction * 56 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -56 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {visibleStudies.map((study, idx) => (
                <div
                  key={study.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => onSelectCaseStudy(study)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectCaseStudy(study);
                    }
                  }}
                  className={`${idx > 0 ? 'hidden md:flex' : 'flex'} flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C61A1A]`}
                >
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100 sm:h-60">
                    <img
                      src={study.image}
                      alt={study.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-slate-900 backdrop-blur-sm shadow-xs">
                        {study.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2 leading-snug">
                        {study.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex items-center justify-between border-t border-slate-100 bg-white">
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-[#C61A1A] transition-colors">
                      View Full Case Study
                    </span>
                    <span className="p-1 rounded-full bg-slate-50 group-hover:bg-red-50 group-hover:translate-x-0.5 text-slate-400 group-hover:text-[#C61A1A] transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Controls + position dots */}
        <div className="mt-6 flex items-center justify-center gap-4 sm:mt-8">
          <button
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-xs transition-all hover:scale-105 hover:bg-[#27272A] active:scale-95 cursor-pointer sm:h-9 sm:w-9"
            aria-label="Previous case study"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Phones get a compact counter instead of ten 8px dots */}
          <span className="min-w-[64px] text-center font-mono text-[12px] font-bold tabular-nums text-slate-500 sm:hidden">
            <span className="text-[#C61A1A]">{String(startIndex + 1).padStart(2, '0')}</span>
            <span className="mx-0.5 text-slate-300">/</span>
            {String(CASE_STUDIES.length).padStart(2, '0')}
          </span>

          <div className="hidden items-center gap-2 sm:flex">
            {CASE_STUDIES.map((study, i) => (
              <button
                key={study.id}
                onClick={() => {
                  setDirection(i > startIndex ? 1 : -1);
                  setStartIndex(i);
                }}
                aria-label={`Go to case study ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === startIndex ? 'w-6 bg-[#C61A1A]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-xs transition-all hover:scale-105 hover:bg-[#27272A] active:scale-95 cursor-pointer sm:h-9 sm:w-9"
            aria-label="Next case study"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* CTA */}
        <div className="mt-10 space-y-4 text-center sm:mt-12">
          <Reveal>
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C61A1A] px-5 py-3.5 text-[13.5px] font-semibold leading-snug text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#9E1414] hover:shadow-lg sm:w-auto sm:rounded-lg sm:px-8 sm:text-base cursor-pointer group"
            >
              <span>Apply The 5D Growth System To My Business</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xs sm:text-sm text-slate-500 italic">
              These are the numbers. Here's what the people behind them had to say.
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
};
