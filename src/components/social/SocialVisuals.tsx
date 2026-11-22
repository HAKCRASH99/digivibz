import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Code2,
  Compass,
  Crosshair,
  Facebook,
  Instagram,
  LineChart,
  Linkedin,
  Palette,
  PenTool,
  Repeat,
  Rocket,
  Search,
  Target,
} from 'lucide-react';
import { SMM_FRAMEWORK, SMM_OUTCOMES, SMM_PLATFORMS, SMM_SYSTEM } from '../../data/socialMediaContent';
import type { SmmPlatformId } from '../../data/socialMediaContent';

const SERIF = "Georgia, 'Times New Roman', serif";
const RED = '#C61A1A';

/* ==========================================================================
   Platform brand glyphs — lucide has no TikTok, and X replaced the bird.
   ========================================================================== */

const XLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.899 15.644Z"
    />
  </svg>
);

const TikTokLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
  </svg>
);

export const PlatformGlyph: React.FC<{ id: SmmPlatformId; className?: string }> = ({
  id,
  className = 'w-4 h-4',
}) => {
  switch (id) {
    case 'facebook':
      return <Facebook className={className} strokeWidth={2} />;
    case 'instagram':
      return <Instagram className={className} strokeWidth={2} />;
    case 'linkedin':
      return <Linkedin className={className} strokeWidth={2} />;
    case 'twitter':
      return <XLogo className={className} />;
    case 'tiktok':
      return <TikTokLogo className={className} />;
  }
};

/* ==========================================================================
   1. EFFORT-GAP SKETCH — activity climbs, revenue stays flat. Drawn on
   taped paper with wobbly axes and handwritten annotations.
   ========================================================================== */

export const EffortGapSketch: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <div className="relative rounded-[22px] border border-[#E7DCC6] bg-[#FCFBF7] shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)]">
        <span
          aria-hidden="true"
          className="absolute -top-1.5 left-10 h-5 w-24 rotate-[-4deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90"
        />
        <span
          aria-hidden="true"
          className="absolute -top-1.5 right-8 h-5 w-20 rotate-[3deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 px-5 pb-1 pt-5">
          <span className="font-serif text-[13px] italic text-slate-500">Fig. 02 · the effort gap</span>
          <span className="rotate-[2deg] rounded-sm border border-[#C61A1A]/40 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#C61A1A]">
            Diagnosis
          </span>
        </div>

        <svg
          viewBox="0 0 460 300"
          className="w-full select-none"
          role="img"
          aria-label="Hand-drawn chart: marketing activity keeps climbing while business results stay flat, ending in zero new customers"
        >
          {/* paper grid */}
          {[60, 128, 196, 264, 332, 400].map((x) => (
            <line key={`v${x}`} x1={x} y1="46" x2={x} y2="252" stroke="#EFE9DE" strokeWidth="1.2" strokeDasharray="1 6" />
          ))}
          {[70, 116, 162, 208].map((y) => (
            <line key={`h${y}`} x1="52" y1={y} x2="438" y2={y} stroke="#F1EBDF" strokeWidth="1.2" />
          ))}

          {/* hand-wobbled axes */}
          <path d="M52 252 C150 251 320 253 440 250" fill="none" stroke="#B9AA8A" strokeWidth="2" strokeLinecap="round" />
          <path d="M56 254 C57 190 55 108 56 42" fill="none" stroke="#B9AA8A" strokeWidth="2" strokeLinecap="round" />

          <text x="52" y="274" fontSize="9" fontFamily={SERIF} fontStyle="italic" fill="#A8A29E">
            then
          </text>
          <text x="438" y="274" textAnchor="end" fontSize="9" fontFamily={SERIF} fontStyle="italic" fill="#A8A29E">
            now
          </text>

          {/* flat results line */}
          <path
            d="M60 240 C130 238 220 243 300 240 C352 238 402 241 428 239"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2.4"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
          <text x="236" y="230" fontSize="11" fontFamily={SERIF} fontStyle="italic" fill="#94A3B8">
            leads &amp; revenue
          </text>
          <path
            d="M424 228 C442 220 452 236 438 248 C424 260 398 250 408 234 C414 224 430 222 438 232"
            fill="none"
            stroke={RED}
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.8"
          />
          <text x="356" y="216" fontSize="10.5" fontFamily={SERIF} fontStyle="italic" fill={RED}>
            0 new customers
          </text>

          {/* climbing activity line */}
          <motion.path
            d="M60 240 C90 236 104 230 128 224 C150 218 164 214 186 204 C210 192 224 184 248 162 C270 142 286 130 310 108 C332 88 350 72 376 60 C392 53 404 50 416 46"
            fill="none"
            stroke={RED}
            strokeWidth="5.5"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
          />
          {[
            [128, 224],
            [186, 204],
            [248, 162],
            [310, 108],
            [376, 60],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 4 ? 6 : 4} fill={i === 4 ? RED : '#FFFFFF'} stroke={RED} strokeWidth="2.5" />
          ))}
          <text x="296" y="150" fontSize="11" fontFamily={SERIF} fontStyle="italic" fill={RED} transform="rotate(-22 296 150)">
            posts, ads, activity
          </text>

          {/* tally marks = effort */}
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${96 + i * 10} 250 l-3 -14`} stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          ))}
          <text x="92" y="290" fontSize="10" fontFamily={SERIF} fontStyle="italic" fill="#94A3B8">
            more effort
          </text>
          <path d="M196 290 H 300" stroke="#C61A1A" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 5" opacity="0.55" />
        </svg>

        <div className="grid grid-cols-2 gap-2 px-4 pb-3 pt-1 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
          <div className="-rotate-1 rounded-sm border border-dashed border-[#C61A1A]/35 px-3 py-2 text-center">
            <div className="font-serif text-lg italic leading-none text-[#C61A1A]">Activity ↑</div>
            <div className="mt-1 text-[8.5px] font-semibold uppercase tracking-wide text-slate-500">what most agencies sell</div>
          </div>
          <div className="rotate-[0.8deg] rounded-sm border border-dashed border-slate-300 px-3 py-2 text-center">
            <div className="font-serif text-lg italic leading-none text-slate-700">Revenue →</div>
            <div className="mt-1 text-[8.5px] font-semibold uppercase tracking-wide text-slate-500">what you actually need</div>
          </div>
          <div className="col-span-2 py-1 text-center font-serif text-[12px] italic text-slate-500 sm:col-span-1 sm:pl-2 sm:text-left">
            busy is not a strategy.
          </div>
        </div>
      </div>

      <span className="absolute -bottom-3 left-4 hidden rotate-[3deg] rounded-sm border border-[#E7DCC6] bg-[#FCFBF7] px-2.5 py-1 font-serif text-[10.5px] italic text-slate-500 shadow-sm sm:block">
        spotted in most accounts
      </span>
    </div>
  );
};

/* ==========================================================================
   2. PILLAR STEPPER — a field guide: index tabs on the left, an open
   paper page on the right with the pillar's micro-diagram.
   ========================================================================== */

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  strategy: <Compass className="w-5 h-5" />,
  content: <PenTool className="w-5 h-5" />,
  campaigns: <Target className="w-5 h-5" />,
  targeting: <Crosshair className="w-5 h-5" />,
  optimization: <Repeat className="w-5 h-5" />,
};

const PillarDiagram: React.FC<{ id: string }> = ({ id }) => {
  const reduce = useReducedMotion();
  const label = (x: number, text: string) => (
    <text x={x} y="62" fontSize="9" fontFamily={SERIF} fontStyle="italic" fill="#64748B" textAnchor="middle">
      {text}
    </text>
  );

  return (
    <svg viewBox="0 0 260 74" className="w-full max-w-[300px] h-auto select-none" aria-hidden="true">
      {id === 'strategy' && (
        <>
          <path d="M46 30 H 116 M 146 30 H 214" stroke="#CBD5E1" strokeWidth="1.6" strokeDasharray="5 5" />
          <circle cx="32" cy="30" r="13" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          <circle cx="130" cy="30" r="13" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          <circle cx="228" cy="30" r="13" fill="#C61A1A" />
          <path d="M223 30 l3.5 3.5 L234 26" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {label(32, 'Audience')}
          {label(130, 'Market')}
          {label(228, 'Goals')}
        </>
      )}

      {id === 'content' && (
        <>
          {[
            { x: 4, w: 74, t: 'Attention', op: 0.35 },
            { x: 93, w: 74, t: 'Interest', op: 0.65 },
            { x: 182, w: 74, t: 'Action', op: 1 },
          ].map((c) => (
            <g key={c.t}>
              <rect x={c.x} y="14" width={c.w} height="32" rx="9" fill="#C61A1A" opacity={c.op} />
              <text x={c.x + c.w / 2} y="34" fontSize="10" fontWeight="800" fill="#FFFFFF" textAnchor="middle">
                {c.t}
              </text>
            </g>
          ))}
          <path d="M80 30 H 90 M 169 30 H 179" stroke="#C61A1A" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {id === 'campaigns' && (
        <>
          {[26, 44, 62, 84].map((h, i) => (
            <rect key={i} x={30 + i * 52} y={56 - h} width="34" height={h} rx="5" fill="#C61A1A" opacity={0.3 + i * 0.23} />
          ))}
          <path d="M30 62 H 236" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
          <path d="M196 18 L 226 8" stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M217 7 L 227 7.5 L 224 17" stroke="#1F2937" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {id === 'targeting' && (
        <>
          <circle cx="130" cy="32" r="30" fill="none" stroke="#E2E8F0" strokeWidth="2" />
          <circle cx="130" cy="32" r="19" fill="none" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="130" cy="32" r="9" fill="none" stroke="#FCA5A5" strokeWidth="2" />
          <circle cx="130" cy="32" r="4.5" fill="#C61A1A" />
          <path d="M130 0 V 8 M 130 56 V 64 M 66 32 H 74 M 186 32 H 194" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
          {!reduce && (
            <circle cx="130" cy="32" r="30" fill="none" stroke="#C61A1A" strokeWidth="1.5" strokeDasharray="4 8" className="dz-orbit-ring" style={{ transformOrigin: '130px 32px' }} />
          )}
        </>
      )}

      {id === 'optimization' && (
        <>
          <g className={reduce ? undefined : 'dz-spin'} style={{ transformOrigin: '130px 32px' }}>
            <path d="M130 8 A 24 24 0 0 1 154 32" fill="none" stroke="#C61A1A" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M150 25 L 155 33 L 147 35" fill="none" stroke="#C61A1A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M130 56 A 24 24 0 0 1 106 32" fill="none" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M110 39 L 105 31 L 113 29" fill="none" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <circle cx="130" cy="32" r="6" fill="#1F2937" />
        </>
      )}
    </svg>
  );
};

export const PillarStepper: React.FC = () => {
  const reduce = useReducedMotion();
  const pillars = SMM_SYSTEM.pillars;
  const [activeId, setActiveId] = useState(pillars[0].id);
  const activeIndex = pillars.findIndex((p) => p.id === activeId);
  const active = pillars[activeIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* index tabs */}
      <div className="lg:col-span-5 relative">
        <div className="relative rounded-[18px] border border-[#E7DCC6] bg-[#FCFBF7] p-2 shadow-[0_20px_44px_-36px_rgba(15,23,42,0.45)]">
          <span
            aria-hidden="true"
            className="absolute -top-2 left-1/2 h-4 w-16 -translate-x-1/2 rotate-[-2deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90"
          />
          <span className="absolute left-[27px] top-8 bottom-8 border-l border-dashed border-[#D8C9AC]" aria-hidden="true" />
          <div className="relative space-y-1.5">
            {pillars.map((pillar, i) => {
              const isActive = pillar.id === activeId;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveId(pillar.id)}
                  aria-pressed={isActive}
                  className={`relative w-full flex items-center gap-3.5 rounded-lg border p-2.5 text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'border-[#E7DCC6] bg-white shadow-[0_14px_30px_-24px_rgba(15,23,42,0.5)]'
                      : 'border-transparent bg-transparent hover:bg-white/70'
                  }`}
                >
                  {isActive && <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-[#C61A1A]" aria-hidden="true" />}
                  <span
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-serif text-[13px] font-bold italic transition-all duration-300 ${
                      isActive
                        ? 'border-[#C61A1A] bg-[#C61A1A] text-white shadow-[0_10px_22px_-10px_rgba(198,26,26,0.7)]'
                        : 'border-[#D8C9AC] bg-[#FCFBF7] text-slate-500'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-[13px] font-bold leading-snug transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                    {pillar.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="mt-3 pl-1 font-serif text-[12px] italic text-slate-500">
          Tap a tab to read that page of the field guide.
        </p>
      </div>

      {/* open page */}
      <div className="lg:col-span-7">
        <div className="relative rounded-[18px] border border-[#E7DCC6] bg-white p-5 shadow-[0_28px_60px_-46px_rgba(15,23,42,0.5)] sm:p-7 min-h-[440px] sm:min-h-[430px]">
          <span aria-hidden="true" className="absolute -top-2 right-10 h-4 w-16 rotate-[3deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90" />
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[#C61A1A]" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-serif text-[12.5px] italic text-slate-500">
                  Field guide · page {String(activeIndex + 1).padStart(2, '0')} / {String(pillars.length).padStart(2, '0')}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C61A1A]/35 text-[#C61A1A]">
                  {PILLAR_ICONS[active.id]}
                </span>
              </div>

              <h3 className="mt-3 text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {active.title}
              </h3>

              <div className="mt-3 space-y-2.5">
                {active.paras.map((p, i) => (
                  <p key={i} className="text-sm text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {active.bullets && (
                <div className="mt-4 divide-y divide-dashed divide-[#E7DCC6] border-y border-dashed border-[#E7DCC6]">
                  {active.bullets.map((b, i) => (
                    <motion.div
                      key={b}
                      initial={reduce ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
                      className="flex items-center gap-2.5 py-2 text-sm font-medium text-slate-700"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C61A1A] text-[#C61A1A]">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      {b}
                    </motion.div>
                  ))}
                </div>
              )}

              {active.closing && (
                <div className="mt-4 space-y-2">
                  {active.closing.map((c, i) => (
                    <p key={i} className="font-serif text-[13.5px] italic leading-relaxed text-slate-700">
                      {c}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-5 rounded-xl border border-dashed border-[#D8C9AC] bg-[#FCFBF7] px-4 pb-2 pt-4">
                <div className="flex justify-center">
                  <PillarDiagram id={active.id} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   3. PLATFORM PLAYBOOKS — five manila folder tabs, one open playbook
   sheet with margins, stamps and a dashed checklist.
   ========================================================================== */

export const PlatformConsole: React.FC = () => {
  const reduce = useReducedMotion();
  const platforms = SMM_PLATFORMS.platforms;
  const [activeId, setActiveId] = useState<SmmPlatformId>(platforms[0].id);
  const activeIndex = platforms.findIndex((p) => p.id === activeId);
  const active = platforms[activeIndex];

  return (
    <div>
      {/* folder tabs */}
      <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-0 sm:mx-0 sm:justify-center sm:px-0">
        {platforms.map((p) => {
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              aria-pressed={isActive}
              className={`relative -mb-px shrink-0 inline-flex min-h-11 items-center gap-2 rounded-t-xl border px-5 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'border-[#E7DCC6] border-b-white bg-white text-slate-900'
                  : 'border-[#E7DCC6] border-b-[#E7DCC6] bg-[#F1E8D6] text-slate-500 hover:bg-[#F7F0E1] hover:text-slate-800'
              }`}
            >
              {isActive && <span className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-[#C61A1A]" aria-hidden="true" />}
              <PlatformGlyph id={p.id} className="w-4 h-4" />
              {p.tab}
            </button>
          );
        })}
      </div>

      {/* open playbook */}
      <div className="relative rounded-b-2xl rounded-tr-2xl border border-[#E7DCC6] bg-white shadow-[0_26px_60px_-42px_rgba(15,23,42,0.45)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-[#E7DCC6] px-5 py-2.5 sm:px-7">
          <span className="inline-flex items-center gap-2 font-serif text-[12px] italic text-slate-500">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#C61A1A]/40">
              <PlatformGlyph id={active.id} className="w-3 h-3 text-[#C61A1A]" />
            </span>
            Playbook {String(activeIndex + 1).padStart(2, '0')} / {String(platforms.length).padStart(2, '0')}
          </span>
          <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Platform notes
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-6 p-5 sm:p-7 lg:grid-cols-2"
          >
            {/* copy side */}
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {active.title}
              </h3>
              <div className="mt-3 space-y-2.5">
                {active.paras.map((p, i) => (
                  <p key={i} className="text-sm text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              {active.closing && (
                <p className="mt-4 border-l-2 border-[#C61A1A] bg-[#FCFBF7] px-3.5 py-2.5 font-serif text-[13px] italic leading-relaxed text-slate-700">
                  {active.closing}
                </p>
              )}
            </div>

            {/* checklist side */}
            <div className="relative rounded-xl border border-[#E7DCC6] bg-[#FCFBF7] px-4 pb-3 pt-4 sm:px-5">
              <span aria-hidden="true" className="absolute -top-2 right-8 h-4 w-14 rotate-[3deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90" />
              <span className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#C61A1A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C61A1A]" />
                {active.listLabel}
              </span>
              <div className="mt-2 divide-y divide-dashed divide-[#E2D7BE]">
                {active.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={reduce ? false : { opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-2.5 py-2.5"
                  >
                    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-[#C61A1A]/50 text-[#C61A1A]">
                      <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                    </span>
                    <span className="text-[13px] leading-snug text-slate-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ==========================================================================
   4. 5D FRAMEWORK RAIL — tabs and a paper page.
   ========================================================================== */

const FRAMEWORK_ICONS = [
  <Search key="s" className="w-4 h-4 md:w-5 md:h-5" />,
  <Palette key="p" className="w-4 h-4 md:w-5 md:h-5" />,
  <Code2 key="c" className="w-4 h-4 md:w-5 md:h-5" />,
  <Rocket key="r" className="w-4 h-4 md:w-5 md:h-5" />,
  <LineChart key="l" className="w-4 h-4 md:w-5 md:h-5" />,
];

export const FrameworkRail: React.FC = () => {
  const reduce = useReducedMotion();
  const steps = SMM_FRAMEWORK.steps;
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative">
        <span className="hidden sm:block absolute left-[10%] right-[10%] top-5 md:top-7 border-t border-dashed border-[#D8C9AC]" aria-hidden="true" />
        <motion.span
          className="hidden sm:block absolute left-[10%] top-5 md:top-7 h-0.5 bg-[#C61A1A]"
          animate={{ width: `${active * 20}%` }}
          transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-5 gap-1 sm:gap-2">
          {steps.map((step, i) => {
            const isActive = i === active;
            return (
              <button
                key={step.name}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className="group flex flex-col items-center gap-1.5 sm:gap-2.5 cursor-pointer"
              >
                <span
                  className={`relative w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#C61A1A] border-[#C61A1A] text-white shadow-[0_14px_30px_-12px_rgba(198,26,26,0.7)]'
                      : 'border-[#D8C9AC] bg-white text-slate-500 group-hover:border-[#C61A1A]/60 group-hover:text-[#C61A1A]'
                  }`}
                >
                  {FRAMEWORK_ICONS[i]}
                  {isActive && !reduce && <span className="absolute inset-0 rounded-full border-2 border-[#C61A1A] dz-pulse-ring" />}
                </span>
                <span className={`text-[11px] sm:text-sm font-extrabold transition-colors ${isActive ? 'text-[#C61A1A]' : 'text-slate-700'}`}>
                  {step.name}
                </span>
                <span className="hidden sm:block text-[10px] font-bold tabular-nums text-slate-400">
                  {String(i + 1).padStart(2, '0')} / 05
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-7 rounded-2xl border border-[#E7DCC6] bg-[#FCFBF7] p-5 sm:p-7 min-h-[190px]">
        <span aria-hidden="true" className="absolute -top-2 left-10 h-4 w-14 rotate-[-3deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90" />
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6"
          >
            <span
              className="hidden sm:block text-6xl font-extrabold leading-none text-transparent shrink-0 select-none"
              style={{ WebkitTextStroke: '2px #E7DCC6' }}
              aria-hidden="true"
            >
              {String(active + 1).padStart(2, '0')}
            </span>
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C61A1A] text-white">
                  {FRAMEWORK_ICONS[active]}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {steps[active].name}
                </h3>
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                {steps[active].desc}
              </p>
              <span className="mt-3 inline-block font-serif text-[11px] italic text-slate-400">
                stage {String(active + 1).padStart(2, '0')} of 05 · 5D growth framework
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ==========================================================================
   5. OUTCOME ROWS — taped before/after strips on the desk.
   ========================================================================== */

const ROW_TILT = ['', 'sm:rotate-[0.4deg]', 'sm:-rotate-[0.5deg]', 'sm:rotate-[0.3deg]', 'sm:-rotate-[0.4deg]'];

export const OutcomeRows: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-4">
      {SMM_OUTCOMES.rows.map((row, i) => (
        <motion.div
          key={row.to}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className={`group relative rounded-md border border-[#E7DCC6] bg-white p-4 transition-transform duration-300 hover:rotate-0 sm:p-5 ${ROW_TILT[i]}`}
        >
          <span aria-hidden="true" className="absolute -top-1.5 right-10 h-4 w-14 rotate-[3deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90" />

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 sm:gap-x-3">
            <span className="font-serif text-[13px] font-bold italic text-[#C61A1A]">
              {String(i + 1).padStart(2, '0')}
            </span>

            <span className="rounded-sm border border-[#E2D7BE] bg-[#FCFBF7] px-2.5 py-1 text-xs sm:text-[13px] font-bold text-slate-500">
              {row.from}
            </span>

            <span
              className={`inline-flex items-center transition-transform duration-300 group-hover:translate-x-1 ${reduce ? '' : 'dz-float'}`}
              style={reduce ? undefined : { animationDelay: `${i * 0.4}s`, animationDuration: '4s' }}
              aria-hidden="true"
            >
              <svg width="46" height="12" viewBox="0 0 46 12" fill="none" className="text-[#C61A1A]">
                <path d="M0 6 C12 2 24 10 36 5" stroke="currentColor" strokeWidth="1.8" strokeDasharray="5 5" strokeLinecap="round" className={reduce ? undefined : 'dz-flow'} />
                <path d="M33 1.5 L40 5.5 L33 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            <span className="rounded-sm bg-[#C61A1A] px-2.5 py-1 text-xs sm:text-[13px] font-extrabold text-white">
              {row.to}
            </span>
          </div>

          <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{row.sub}</p>
        </motion.div>
      ))}
    </div>
  );
};

/** Small shared CTA arrow used by page-level buttons. */
export const CTAArrow: React.FC = () => (
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
);
