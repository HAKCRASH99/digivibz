import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { Magnetic, WordReveal } from '../components/fx/FxKit';
import { ColdCallScene } from '../components/contact/ColdCallScene';
import { BriefDesk } from '../components/contact/BriefDesk';
import { ResponseRunway } from '../components/contact/ResponseRunway';
import { DirectLines } from '../components/contact/DirectLines';
import { GrowthSketch } from '../components/contact/GrowthSketch';
import { CHOOSE_REASONS } from '../data/contactContent';

/** Desk promises shown in the strip under the hero. */
const PROMISES = [
  { value: '24–48h', label: 'First reply' },
  { value: 'US-wide', label: 'Coverage' },
  { value: '$0', label: 'Growth audit' },
  { value: 'None', label: 'Obligation' },
];

/**
 * Contact page (`/contact`) — the front desk. A hand-drawn cold-call hero,
 * a paper intake docket, taped route memos and pinned calling cards. White
 * and red only; no dark visual surfaces.
 */
export const ContactPage: React.FC = () => {
  const reduceMotion = useReducedMotion();

  /**
   * Scroll to a section WITHOUT changing the hash — a raw `#audit-form`
   * hash change would make App's router unmount this page (it only knows
   * `/contact` and home anchors).
   */
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
  };

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — headline + switchboard
      =================================================================== */}
      <section
        id="contact-hero"
        className="relative overflow-hidden bg-white pb-12 pt-6 md:pb-16 md:pt-8"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-70 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_38%,#000_70%,transparent_100%)]" />
        {!reduceMotion && (
          <div
            className="pointer-events-none absolute right-[5%] top-1/4 -z-10 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(198,26,26,0.10) 0%, transparent 70%)',
              animation: 'dz-drift 14s ease-in-out infinite',
            }}
          />
        )}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
            {/* copy */}
            <div className="space-y-5 lg:col-span-5">
              <motion.div
                {...rise(0.05)}
                className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#C61A1A] shadow-2xs"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C61A1A]" />
                Contact · Front desk
              </motion.div>

              <WordReveal
                as="h1"
                text="Contact Us — Let’s Take Your Business to New Heights"
                highlight="New Heights"
                srSuffix=" digital marketing agency"
                delay={0.12}
                className="text-3xl font-extrabold leading-[1.14] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px]"
              />

              <motion.p
                {...rise(0.24)}
                className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base"
              >
                Have a project in mind? We’d love to hear about it. Tell us your goals, and we’ll show
                you a clear, step-by-step path to growth, powered by our 5D Growth Framework that has
                helped US businesses scale and dominate their market.
              </motion.p>

              <motion.div
                {...rise(0.34)}
                className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center"
              >
                <Magnetic className="w-full sm:w-auto [&>span]:block [&>span]:w-full">
                  <a
                    href="#audit-form"
                    onClick={scrollToSection('audit-form')}
                    className="dz-btn-shine group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C61A1A] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#9E1414] hover:shadow-lg active:scale-[0.99] sm:w-auto sm:text-base"
                  >
                    <span>Get Your Personalized Growth Audit</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Magnetic>

                <a
                  href="mailto:hello@digivibz.com"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition-all hover:border-[#C61A1A] hover:text-[#C61A1A] sm:w-auto sm:text-base"
                >
                  <Mail className="h-4 w-4 text-[#C61A1A]" />
                  <span>hello@digivibz.com</span>
                </a>
              </motion.div>

              {/* proof strip */}
              <motion.div
                {...rise(0.44)}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-slate-500 sm:text-sm"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#C61A1A]" />
                  <strong className="text-slate-800">24–48h</strong>&nbsp;first reply
                </span>
                <span className="hidden h-4 w-px bg-slate-200 sm:inline" />
                <span>
                  <strong className="text-slate-800">250+</strong>&nbsp;US businesses served
                </span>
                <span className="hidden h-4 w-px bg-slate-200 sm:inline" />
                <span className="inline-flex items-center gap-1 font-medium">
                  <ShieldCheck className="h-4 w-4 text-[#C61A1A]" />
                  No scripts · no pressure
                </span>
              </motion.div>
            </div>

            {/* switchboard */}
            <div className="flex justify-center lg:col-span-7 lg:justify-end">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <ColdCallScene />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2. DESK BRIEF STRIP — the promise in four numbers
      =================================================================== */}
      <div className="border-y border-slate-200 bg-[#FCFBF7]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:gap-10 lg:px-8">
          <div className="shrink-0">
            <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C61A1A]" />
              Desk brief
            </div>
            <div className="mt-1.5 text-[10px] font-semibold text-slate-400">
              No scripts · no pressure
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
            {PROMISES.map((item, i) => (
              <Reveal
                key={item.label}
                delay={i * 0.06}
                className={`px-1 sm:px-4 ${i > 0 ? 'sm:border-l sm:border-slate-200' : ''}`}
              >
                <div className="text-2xl font-extrabold leading-none tabular-nums text-slate-900 sm:text-[28px]">
                  {item.value}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  <span className="h-1 w-1 rotate-45 bg-[#C61A1A]" />
                  {item.label}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="hidden shrink-0 -rotate-3 rounded-md border-2 border-[#C61A1A] px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C61A1A] lg:block">
            Open
          </div>
        </div>
      </div>

      {/* ==================================================================
          3. THE BRIEF — intake docket with the live form
      =================================================================== */}
      <BriefDesk />

      {/* ==================================================================
          4. RESPONSE RUNWAY — post-submission route ticket
      =================================================================== */}
      <ResponseRunway />

      {/* ==================================================================
          5. WHY THE DESK — claims ledger + growth chart
      =================================================================== */}
      <section id="why-digivibz" className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            {/* ledger */}
            <div className="space-y-5 lg:col-span-6">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C61A1A]">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Why the desk stays busy
                </div>
              </Reveal>

              <WordReveal
                text="Why US Businesses Choose Digivibz Digital Marketing Agency"
                highlight="Digital Marketing Agency"
                delay={0.06}
                className="text-2xl font-extrabold leading-snug tracking-tight text-slate-900 sm:text-3xl"
              />

              <Reveal delay={0.12}>
                <p className="text-sm font-semibold text-slate-800 sm:text-base">
                  At Digivibz, we don’t just run campaigns, we grow businesses.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Our clients choose us because we deliver:
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <ul className="mt-2">
                  {CHOOSE_REASONS.map((reason, i) => (
                    <li
                      key={reason}
                      className="flex items-start gap-3 border-b border-dashed border-slate-200 py-3 last:border-0"
                    >
                      <span className="pt-0.5 font-mono text-[9px] font-extrabold tabular-nums text-slate-300">
                        0{i + 1}
                      </span>
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-red-200 bg-red-50 text-[#C61A1A]">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm leading-relaxed text-slate-700">{reason}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.24}>
                <p className="border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-600">
                  When you work with us, you’re not taking a chance; you’re partnering with a team
                  committed to scaling your business and maximizing revenue.
                </p>
              </Reveal>
            </div>

            {/* growth sketch */}
            <Reveal direction="right" delay={0.1} className="lg:col-span-6">
              <GrowthSketch />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================================
          6. DIRECT LINES — switchboard directory
      =================================================================== */}
      <DirectLines />

      {/* ==================================================================
          7. CLOSING CTA — red band
      =================================================================== */}
      <section className="relative overflow-hidden bg-[#C61A1A] py-16 md:py-20">
        <div className="absolute left-0 top-0 h-1 w-40 bg-white/70" />
        <div className="absolute right-0 top-0 h-1 w-40 bg-white/70" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '3rem 3rem',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)',
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 -right-4 select-none text-[150px] font-extrabold leading-none tracking-tighter text-white/10 sm:text-[200px]"
        >
          DESK
        </span>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
              <Phone className="h-3.5 w-3.5" /> The line is open
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
              Contact Our Digital Marketing Agency to Take Your Business to{' '}
              <span className="underline decoration-white/50 underline-offset-4">New Heights</span>
            </h2>
          </Reveal>
          <Reveal
            delay={0.18}
            className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic>
              <a
                href="#audit-form"
                onClick={scrollToSection('audit-form')}
                className="dz-btn-shine group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-[#C61A1A] shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-lg sm:text-base"
              >
                <span>Get My Free Growth Audit</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <a
              href="tel:+18005553444"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 sm:text-base"
            >
              <Phone className="h-4 w-4" />
              <span>+1 (800) 555-DIGI</span>
            </a>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-5 text-xs text-white/70">
              24–48 hour response · Free personalized plan · Zero obligation
            </p>
          </Reveal>
        </div>

        <span className="absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-[-8deg] rounded-lg border-2 border-dashed border-white/50 px-4 py-3 text-center font-mono text-[9px] font-extrabold uppercase leading-relaxed tracking-[0.2em] text-white/80 lg:block">
          Desk open
          <br />
          Reply ≤ 48h
        </span>
      </section>
    </div>
  );
};
