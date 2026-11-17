import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';
import { Reveal } from './Reveal';

export const Testimonials: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((step: number) => {
    setDirection(step);
    setStartIndex((curr) => (curr + step + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const visibleTestimonials = [
    TESTIMONIALS[startIndex % TESTIMONIALS.length],
    TESTIMONIALS[(startIndex + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(startIndex + 2) % TESTIMONIALS.length],
    TESTIMONIALS[(startIndex + 3) % TESTIMONIALS.length],
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Growth Stories From Businesses Like Yours - Powered by a{' '}
              <span className="text-[#C61A1A]">B2B Digital Marketing Agency</span>
            </h2>
          </Reveal>
        </div>

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
              initial={{ opacity: 0, x: direction * 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -48 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              {visibleTestimonials.map((t, idx) => (
                <div
                  key={t.id}
                  className={`${idx > 0 ? 'hidden md:flex' : 'flex'} flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6`}
                >
                  <div>
                    <div className="flex items-center gap-1 mb-4 text-[#C61A1A]">
                      {[...Array(t.rating)].map((_, starI) => (
                        <motion.span
                          key={starI}
                          initial={{ opacity: 0, scale: 0.4 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.12 + starI * 0.06, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </motion.span>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      “{t.quote}”
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-800 shrink-0">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-none">
                        {t.author}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Controls + dots */}
        <div className="mt-6 flex items-center justify-center gap-4 sm:mt-8">
          <button
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-xs transition-all hover:scale-105 hover:bg-[#27272A] active:scale-95 cursor-pointer sm:h-9 sm:w-9"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="min-w-[64px] text-center font-mono text-[12px] font-bold tabular-nums text-slate-500 sm:hidden">
            <span className="text-[#C61A1A]">{String(startIndex + 1).padStart(2, '0')}</span>
            <span className="mx-0.5 text-slate-300">/</span>
            {String(TESTIMONIALS.length).padStart(2, '0')}
          </span>

          <div className="hidden items-center gap-2 sm:flex">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  setDirection(i > startIndex ? 1 : -1);
                  setStartIndex(i);
                }}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === startIndex ? 'w-6 bg-[#C61A1A]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-xs transition-all hover:scale-105 hover:bg-[#27272A] active:scale-95 cursor-pointer sm:h-9 sm:w-9"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <Reveal delay={0.1} className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-500 italic max-w-xl mx-auto">
            Every result you just read was built on the same revenue system. Here's every piece of it, and what it does for your business.
          </p>
        </Reveal>

      </div>
    </section>
  );
};
