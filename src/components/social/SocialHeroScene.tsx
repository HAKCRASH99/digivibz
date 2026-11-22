import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

const INK = '#1F2937';
const RED = '#C61A1A';
const SERIF = "Georgia, 'Times New Roman', serif";

const HEART =
  'M12 21s-7-4.35-9.33-8.5C.8 8.9 2.7 5 6.4 5c2 0 3.6 1.1 4.6 2.7C12 6.1 13.6 5 15.6 5c3.7 0 5.6 3.9 3.73 7.5C19 16.65 12 21 12 21Z';

/**
 * SocialHeroScene — the social-media hero illustration. A phone on a studio
 * tripod films a feed, a ring light warms the shot, and taped polaroids,
 * sticky notes and floating reactions sit on the paper around it. Drawn in
 * ink + brand red like an editorial spot illustration, not a UI mockup.
 */
export const SocialHeroScene: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      {/* taped art board */}
      <div className="relative rounded-[26px] border border-[#E7DCC6] bg-[#FCFBF7] p-3 shadow-[0_34px_80px_-46px_rgba(15,23,42,0.45)] sm:p-3.5">
        <span
          aria-hidden="true"
          className="absolute -top-2.5 left-8 h-5 w-20 rotate-[-4deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90"
        />
        <span
          aria-hidden="true"
          className="absolute -top-2.5 right-10 h-5 w-16 rotate-[3deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90"
        />

        <div className="flex items-center justify-between px-1.5 pb-2.5 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:text-[9px]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C61A1A]" />
            Fig. 01 · The feed studio
          </span>
          <span>Filming · 9:41 am</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#E7DCC6] bg-[#FCFBF7]">
          <svg
            viewBox="0 0 620 540"
            className="w-full select-none"
            role="img"
            aria-label="Illustration of a phone on a studio tripod filming a social media feed, with a ring light, taped polaroid, sticky note and floating heart reactions around it"
          >
            <defs>
              <pattern id="sm-dots" width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="1.2" cy="1.2" r="1.1" fill="rgba(100,116,139,0.25)" />
              </pattern>
              <pattern id="sm-halftone" width="9" height="9" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.3" fill="rgba(255,255,255,0.16)" />
              </pattern>
            </defs>

            {/* paper + sun */}
            <rect x="0" y="0" width="620" height="540" fill="url(#sm-dots)" opacity="0.55" />
            <circle cx="440" cy="196" r="148" fill={RED} />
            <circle cx="440" cy="196" r="148" fill="url(#sm-halftone)" />

            {/* ring light */}
            <circle cx="108" cy="224" r="58" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
            <circle cx="108" cy="224" r="40" fill="none" stroke={RED} strokeWidth="3" opacity="0.8" />
            <circle cx="108" cy="224" r="40" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.9" />
            <path d="M108 282 V 436" stroke={INK} strokeWidth="5" strokeLinecap="round" />
            <path d="M108 436 L 82 470 M108 436 L 136 470 M108 436 V 470" stroke={INK} strokeWidth="5" strokeLinecap="round" />
            <circle cx="108" cy="436" r="6" fill={RED} stroke={INK} strokeWidth="3" />
            <text x="108" y="316" textAnchor="middle" fontSize="10" fontFamily={SERIF} fontStyle="italic" fill="#64748B">
              ring light
            </text>

            {/* polaroid */}
            <g transform="rotate(-6 120 180)">
              <rect x="56" y="112" width="104" height="128" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
              <rect x="66" y="122" width="84" height="82" fill="#FCFBF7" stroke="#E7DCC6" strokeWidth="2" />
              <circle cx="126" cy="152" r="15" fill={RED} />
              <path d="M66 186 C84 172 96 180 112 170 C126 162 138 170 150 162 L150 204 L66 204 Z" fill="#FFFFFF" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
              <path d="M78 214 H132" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.3" />
              <path d="M96 108 h24" stroke="#D8C9AC" strokeWidth="10" opacity="0.85" />
            </g>

            {/* phone on tripod */}
            <path d="M322 408 V 452" stroke={INK} strokeWidth="5" strokeLinecap="round" />
            <path d="M322 452 L 296 470 M322 452 L 348 470 M322 452 V 470" stroke={INK} strokeWidth="5" strokeLinecap="round" />
            <circle cx="322" cy="452" r="6" fill={RED} stroke={INK} strokeWidth="3" />

            <rect x="232" y="82" width="180" height="326" rx="26" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
            <rect x="298" y="90" width="48" height="8" rx="4" fill={INK} />
            <circle cx="358" cy="94" r="2.5" fill={INK} />
            <rect x="244" y="102" width="156" height="284" rx="12" fill="#FCFBF7" stroke={INK} strokeWidth="3" />

            {/* screen: profile row */}
            <circle cx="266" cy="126" r="10" fill={RED} />
            <path d="M262 126 a4 4 0 0 1 8 0" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <path d="M283 120 H336" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            <path d="M283 130 H318" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
            <circle cx="374" cy="126" r="2" fill={INK} opacity="0.6" />
            <circle cx="381" cy="126" r="2" fill={INK} opacity="0.6" />
            <circle cx="388" cy="126" r="2" fill={INK} opacity="0.6" />

            {/* screen: hero post */}
            <rect x="254" y="146" width="136" height="94" rx="8" fill="#FFFFFF" stroke="#E7DCC6" strokeWidth="2" />
            <circle cx="356" cy="180" r="20" fill={RED} />
            <path d="M254 220 C272 204 288 214 306 202 C324 190 340 200 390 188 L390 240 L254 240 Z" fill="#FCFBF7" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            <path d="M276 168 q7 -8 14 0" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            <path d="M296 158 q5 -6 10 0" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

            {/* screen: actions */}
            <path
              d="M262 258 c-4 -5 -10 -3 -10 2 c0 6 10 10 10 10 s10 -4 10 -10 c0 -5 -6 -7 -10 -2 Z"
              fill={RED}
            />
            <path d="M280 262 H334" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
            <path d="M280 270 H320" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.3" />

            {/* screen: reel + tile */}
            <g>
              <rect x="254" y="282" width="64" height="64" rx="8" fill={RED} stroke={INK} strokeWidth="3" />
              <path d="M278 302 L294 314 L278 326 Z" fill="#FFFFFF" />
              <path d="M266 292 q16 -10 32 0" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            </g>
            <g>
              <rect x="326" y="282" width="64" height="64" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
              <circle cx="344" cy="300" r="9" fill={RED} />
              <path d="M358 330 C352 318 360 308 372 304 C374 316 368 328 358 330 Z" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M354 332 C346 326 338 328 334 334" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* screen: caption + nav */}
            <path d="M254 358 H372" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
            <path d="M254 368 H338" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.3" />
            <circle cx="268" cy="376" r="3" fill={RED} />
            <circle cx="298" cy="376" r="3" fill={INK} opacity="0.55" />
            <circle cx="328" cy="376" r="3" fill={INK} opacity="0.55" />
            <circle cx="358" cy="376" r="3" fill={INK} opacity="0.55" />

            {/* comment bubble */}
            <path d="M442 168 L 420 188 L 456 190 Z" fill="#FFFFFF" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
            <rect x="430" y="96" width="136" height="78" rx="20" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
            <circle cx="452" cy="118" r="8" fill={RED} />
            <path d="M470 114 H540" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity="0.75" />
            <path d="M470 126 H524" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
            <path d="M444 148 H546" stroke={INK} strokeWidth="3.5" strokeLinecap="round" opacity="0.3" />
            <path d="M536 104 c-3 -4 -8 -2 -8 2 c0 4 8 8 8 8 s8 -4 8 -8 c0 -4 -5 -6 -8 -2 Z" fill={RED} />

            {/* sticky note */}
            <g transform="rotate(4 492 396)">
              <path d="M438 356 h106 l12 12 v72 h-118 Z" fill="#EFE4CD" stroke="#D8C9AC" strokeWidth="2" />
              <path d="M544 356 v12 h12 Z" fill="#FCFBF7" stroke="#D8C9AC" strokeWidth="2" />
              <circle cx="497" cy="362" r="4.5" fill={RED} />
              <text x="452" y="394" fontSize="26" fontFamily={SERIF} fontStyle="italic" fontWeight="700" fill={RED}>
                3×
              </text>
              <text x="452" y="410" fontSize="11" fontFamily={SERIF} fontStyle="italic" fill="#475569">
                revenue lift
              </text>
              <path d="M452 418 q26 6 50 0 t38 -2" fill="none" stroke={RED} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
            </g>

            {/* floating reactions */}
            {[
              { x: 414, y: 154, s: 0.9, c: '#FFFFFF', d: 0 },
              { x: 424, y: 262, s: 0.62, c: '#FFFFFF', d: 0.8 },
              { x: 400, y: 334, s: 0.5, c: RED, d: 1.6 },
            ].map((h, i) => (
              <motion.g
                key={i}
                transform={`translate(${h.x} ${h.y}) scale(${h.s})`}
                initial={reduce ? false : { opacity: 0 }}
                animate={reduce ? { opacity: 0.9 } : { opacity: [0, 0.95, 0], y: [6, -16, 6] }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 4.2, delay: h.d, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <path d={HEART} fill={h.c} />
              </motion.g>
            ))}

            {/* desk */}
            <path d="M40 470 H 580" stroke={INK} strokeWidth="5" strokeLinecap="round" />
            <path d="M92 476 H 528" stroke={INK} strokeWidth="3" opacity="0.18" strokeLinecap="round" />

            {/* coffee */}
            <rect x="520" y="440" width="34" height="30" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
            <rect x="520" y="452" width="34" height="7" fill={RED} />
            <path d="M554 448 q14 6 0 16" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />

            {/* plant */}
            <path d="M170 444 L204 444 L198 470 L176 470 Z" fill={RED} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
            <path d="M187 444 C183 430 172 424 164 412" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            <path d="M187 444 C191 426 202 420 210 408" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            <path d="M164 412 C152 410 148 396 156 390 C166 396 170 406 164 412 Z" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
            <path d="M210 408 C222 406 228 392 220 386 C210 392 204 402 210 408 Z" fill="#FFFFFF" stroke={INK} strokeWidth="3" />

            {/* handwritten notes */}
            <text x="58" y="70" fontSize="13" fontFamily={SERIF} fontStyle="italic" fill="#64748B">
              film it
            </text>
            <path d="M104 66 q18 10 12 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 4" />
            <text x="452" y="452" fontSize="12" fontFamily={SERIF} fontStyle="italic" fill={RED}>
              post → pause → convert
            </text>
          </svg>
        </div>

        <div className="flex items-center justify-between gap-2 px-1.5 pt-2.5 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-[9px]">
          <span className="italic">Every post has a job.</span>
          <span className="whitespace-nowrap text-[#C61A1A]">3× revenue lift</span>
        </div>
      </div>

      {/* stamp */}
      <span className="absolute -bottom-3 right-3 hidden rotate-[-6deg] rounded-md border-2 border-[#C61A1A] bg-[#FCFBF7] px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C61A1A] shadow-sm sm:block">
        Content with intent
      </span>

      {/* margin note */}
      <span className="absolute -left-2 top-16 hidden rotate-[-3deg] rounded-sm border border-[#E7DCC6] bg-[#FCFBF7] px-2.5 py-1.5 font-serif text-[11px] italic text-slate-500 shadow-sm md:block">
        “Stop posting into the void.”
      </span>
    </div>
  );
};
