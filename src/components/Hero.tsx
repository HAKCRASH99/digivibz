import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { LogoIcon } from './Logo';
import { GrowthSystem5D } from './GrowthSystem5D';

interface HeroProps {
  onOpenAudit: () => void;
  onScrollToFramework: () => void;
}

const VALUE_PROPS = [
  'Generate high-intent leads consistently',
  'Turn website visitors into paying customers',
  'Scale your business with AI-powered growth systems',
];

/**
 * Trust-strip monograms — matches the Testimonials avatar style.
 * (Stock face photos were removed: they read as generic template art.)
 */
const AVATARS = [
  { initials: 'JT', red: true },
  { initials: 'MK', red: false },
  { initials: 'AR', red: false },
  { initials: 'SB', red: true },
];

/**
 * Compact social proof row. Rendered twice (once high on phones, once
 * under the wheel on desktop) so the mobile hero earns trust early.
 */
const TrustProof: React.FC = () => (
  <>
    <div className="flex -space-x-2 overflow-hidden">
      {AVATARS.map((a, i) => (
        <span
          key={i}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white text-[11px] font-extrabold transition-transform duration-300 hover:z-10 hover:scale-110 ${
            a.red ? 'bg-[#C61A1A] text-white' : 'border border-slate-200 bg-slate-100 text-slate-700'
          }`}
          aria-hidden="true"
        >
          {a.initials}
        </span>
      ))}
    </div>
    <span className="text-[12.5px] font-normal leading-snug text-slate-600 sm:text-sm">
      <span className="font-semibold text-slate-800">250+ businesses</span> already made the switch.{' '}
      <a
        href="#why-they-trust"
        className="relative text-slate-600 underline underline-offset-2 transition-colors after:absolute after:-inset-y-2 after:inset-x-0 after:content-[''] hover:text-[#C61A1A]"
      >
        Here's why they trust us.
      </a>
    </span>
  </>
);

export const Hero: React.FC<HeroProps> = ({ onOpenAudit, onScrollToFramework }) => {
  const reduceMotion = useReducedMotion();

  // Shared entrance choreography for the left column
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="home" className="relative pt-6 pb-14 md:pt-8 md:pb-16 overflow-hidden bg-white">
      {/* Perspective geometric grid floor */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_38%,#000_70%,transparent_100%)] opacity-70 -z-10 pointer-events-none"
      />
      {/* Slow drifting brand glow behind the 5D wheel */}
      {!reduceMotion && (
        <div
          className="absolute top-1/4 right-[8%] w-[420px] h-[420px] rounded-full -z-10 pointer-events-none opacity-50 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(198,26,26,0.14) 0%, transparent 70%)',
            animation: 'dz-drift 14s ease-in-out infinite',
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-6">

          {/* Left Column: Headline & Value Props */}
          <div className="space-y-5 lg:col-span-5 xl:col-span-5">

            <motion.div {...rise(0.05)} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 text-xs font-semibold text-slate-800 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#C61A1A] shrink-0" />
              <span>AI-Powered Growth System</span>
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="text-[30px] font-extrabold leading-[1.16] tracking-tight text-slate-900 text-balance sm:text-4xl md:text-5xl lg:text-[31px] xl:text-[40px]"
            >
              <span className="block">America’s AI-Powered</span>
              <span className="block mt-1">
                <span className="inline-flex items-baseline align-middle mr-1.5 -translate-y-1">
                  <LogoIcon className="w-[1em] h-[1em]" />
                </span>
                <span className="text-[#C61A1A]">igital Marketing Agency</span>
              </span>
              <span className="block mt-1">for Revenue Growth</span>
            </motion.h1>

            <div className="space-y-2.5 pt-0.5 sm:pt-1">
              {VALUE_PROPS.map((item, i) => (
                <motion.div
                  key={item}
                  {...rise(0.2 + i * 0.07)}
                  className="flex items-start gap-2.5 text-[13.5px] font-medium leading-snug text-slate-800 sm:items-center sm:gap-3 sm:text-base"
                >
                  <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#C61A1A] sm:mt-0 sm:h-5 sm:w-5" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.p {...rise(0.42)} className="max-w-xl text-[13.5px] leading-relaxed text-slate-600 sm:text-base">
              Stop guessing and start proving ROI. Digivibz,{' '}
              <span className="text-[#C61A1A] font-medium">a digital marketing agency USA</span>{' '}
              businesses trust, replaces manual guesswork with an AI-driven growth 5D framework built to turn data into predictable revenue.
            </motion.p>

            <motion.div {...rise(0.5)} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onOpenAudit}
                className="dz-btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.99] group cursor-pointer"
              >
                <span>Get My Free Growth Audit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToFramework}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base rounded-xl border border-slate-300 shadow-2xs hover:border-slate-400 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>See the 5D Framework</span>
              </button>
            </motion.div>

            {/* Trust proof — repeated high on phones so credibility lands before the wheel */}
            <motion.div {...rise(0.58)} className="flex items-start gap-3 lg:hidden">
              <TrustProof />
            </motion.div>

          </div>

          {/* Right Column: 5D System Visual + trust proof, bottom-aligned with text */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-center justify-between relative w-full pt-2 lg:pt-0">
            <GrowthSystem5D
              onOpenAudit={onOpenAudit}
              onScrollToFramework={onScrollToFramework}
            />

            <motion.div {...rise(0.58)} className="hidden items-center gap-3 pt-3 lg:flex lg:pt-0">
              <TrustProof />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
