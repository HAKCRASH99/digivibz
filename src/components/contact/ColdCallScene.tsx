import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

const INK = '#1F2937';
const RED = '#C61A1A';

/** Ring arcs drawn to the right of the receiver, from inner to outer. */
const RINGS = ['M342 222 A 34 34 0 0 1 342 274', 'M351 211 A 48 48 0 0 1 351 285', 'M360 200 A 62 62 0 0 1 360 296'];

/**
 * ColdCallScene — the contact hero illustration. A strategist leans into a
 * cold call at a paper-strewn desk: halftone sun, speech bubble, ringing
 * receiver arcs, coffee and a notebook. Drawn in ink + brand red so it reads
 * like an editorial spot illustration, not a UI panel.
 */
export const ColdCallScene: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      {/* taped art board */}
      <div className="relative rounded-[26px] border border-[#E7DCC6] bg-[#FCFBF7] p-3 shadow-[0_34px_80px_-46px_rgba(15,23,42,0.45)] sm:p-3.5">
        <span
          aria-hidden="true"
          className="absolute -top-2.5 left-7 h-5 w-20 rotate-[-4deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90"
        />
        <span
          aria-hidden="true"
          className="absolute -top-2.5 right-9 h-5 w-16 rotate-[3deg] border border-[#D8C9AC]/70 bg-[#EFE4CD]/90"
        />

        <div className="flex items-center justify-between px-1.5 pb-2.5 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:text-[9px]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C61A1A]" />
            Fig. 01 · The cold call
          </span>
          <span>Desk open · 9:41 am</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#E7DCC6] bg-[#FCFBF7]">
          <svg
            viewBox="0 0 620 540"
            className="w-full select-none"
            role="img"
            aria-label="Illustration of a strategist at a desk on a cold call, holding a red telephone receiver to their ear"
          >
            <defs>
              <pattern id="cc-dots" width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="1.2" cy="1.2" r="1.1" fill="rgba(100,116,139,0.25)" />
              </pattern>
              <pattern id="cc-halftone" width="9" height="9" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.3" fill="rgba(255,255,255,0.16)" />
              </pattern>
            </defs>

            {/* paper + sun */}
            <rect x="0" y="0" width="620" height="540" fill="url(#cc-dots)" opacity="0.55" />
            <circle cx="432" cy="208" r="150" fill={RED} />
            <circle cx="432" cy="208" r="150" fill="url(#cc-halftone)" />
            <path
              d="M96 96 q14 -18 28 0 q-14 18 -28 0 Z"
              fill={RED}
              opacity="0.85"
            />
            <path d="M556 96 l7 14 l15 3 l-11 11 l3 15 l-14 -7 l-13 7 l3 -15 l-11 -11 l15 -3 Z" fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round" opacity="0.5" />

            {/* chair */}
            <rect x="146" y="288" width="82" height="176" rx="30" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
            <path d="M186 310 C170 342 170 412 188 446" fill="none" stroke={RED} strokeWidth="4" strokeLinecap="round" opacity="0.7" />

            {/* neck + torso */}
            <path d="M252 240 L290 240 L294 296 L246 296 Z" fill="#FFFFFF" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
            <path
              d="M206 304 C212 282 232 268 258 266 L282 266 C308 270 324 286 328 306 L334 432 L192 432 L202 352 Z"
              fill={RED}
              stroke={INK}
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path d="M256 268 C268 284 286 284 298 268" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity="0.6" />

            {/* left arm + hand with pen */}
            <path d="M210 308 C188 334 188 378 210 408" fill="none" stroke={INK} strokeWidth="12" strokeLinecap="round" />
            <circle cx="214" cy="414" r="11" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
            <path d="M219 409 L238 394" stroke={RED} strokeWidth="5" strokeLinecap="round" />

            {/* right arm holding the receiver */}
            <path d="M300 302 C332 316 346 342 330 366" fill="none" stroke={INK} strokeWidth="12" strokeLinecap="round" />
            <path d="M330 366 C318 338 310 302 306 270" fill="none" stroke={INK} strokeWidth="12" strokeLinecap="round" />
            <circle cx="304" cy="260" r="11" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
            <rect x="299" y="216" width="22" height="58" rx="11" fill={RED} stroke={INK} strokeWidth="4" transform="rotate(7 310 245)" />
            <path d="M293 214 h34 a7 7 0 0 1 7 7 v6 h-41 v-6 a7 7 0 0 1 7 -7 Z" fill={RED} stroke={INK} strokeWidth="4" />
            <path d="M295 274 h36 a7 7 0 0 1 0 14 h-36 a7 7 0 0 1 0 -14 Z" fill={RED} stroke={INK} strokeWidth="4" />

            {/* head */}
            <path
              d="M234 232 C226 196 246 166 276 166 C300 166 314 184 314 202 L319 213 C321 217 318 221 312 221 L316 235 C318 241 312 245 304 243 C306 257 296 267 282 267 L268 265 L266 250 C252 244 240 240 234 232 Z"
              fill="#FFFFFF"
              stroke={INK}
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path d="M240 216 a9 9 0 0 1 14 6" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
            <path d="M290 196 q9 -5 17 -1" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            <path d="M293 210 q7 -4 12 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            <path d="M306 246 q6 4 11 -1" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            <path d="M306 231 q4 2 0 4" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.75" />

            {/* hair */}
            <path
              d="M232 230 C220 188 244 158 278 158 C303 158 319 176 317 197 C310 192 300 188 288 191 C269 172 253 182 247 198 C243 208 244 219 246 227 C240 228 236 232 232 230 Z"
              fill={INK}
            />
            <path d="M250 176 C262 164 286 160 300 172" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.25" />

            {/* ringing arcs */}
            {RINGS.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="4.5"
                strokeLinecap="round"
                initial={reduce ? false : { opacity: 0 }}
                animate={reduce ? { opacity: 0.85 } : { opacity: [0, 0.95, 0] }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 2.2, delay: i * 0.45, repeat: Infinity, ease: 'easeOut' }
                }
              />
            ))}

            {/* desk */}
            <rect x="64" y="424" width="540" height="16" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
            <rect x="120" y="440" width="14" height="84" rx="5" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
            <rect x="520" y="440" width="14" height="84" rx="5" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
            <path d="M152 458 H500" stroke={INK} strokeWidth="3" opacity="0.18" strokeLinecap="round" />
            <rect x="302" y="446" width="34" height="7" rx="3.5" fill={RED} />

            {/* plant */}
            <path d="M96 396 L140 396 L134 426 L102 426 Z" fill={RED} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
            <path d="M118 396 C114 378 98 370 88 356" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            <path d="M118 396 C122 372 138 364 148 350" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            <path d="M118 396 C118 372 118 360 121 344" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            <path d="M88 356 C74 352 70 336 78 328 C90 334 94 348 88 356 Z" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
            <path d="M148 350 C162 346 168 330 160 322 C150 328 144 342 148 350 Z" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
            <path d="M121 344 C110 340 108 324 118 318 C128 326 128 338 121 344 Z" fill="#FFFFFF" stroke={INK} strokeWidth="3" />

            {/* notepad + scribbles */}
            <g transform="rotate(-2 300 410)">
              <rect x="238" y="392" width="128" height="34" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="3.5" />
              <path d="M252 403 H330" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
              <path d="M252 412 H318" stroke={RED} strokeWidth="3" strokeLinecap="round" opacity="0.75" />
              <path d="M252 420 H306" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
            </g>

            {/* coffee */}
            <rect x="376" y="386" width="30" height="38" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
            <rect x="376" y="400" width="30" height="7" fill={RED} />
            <path d="M406 396 q15 7 0 19" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            {!reduce ? (
              <motion.path
                d="M390 374 q-4 -8 2 -14 q6 -6 0 -12"
                fill="none"
                stroke={INK}
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.45"
                animate={{ y: [0, -4, 0], opacity: [0.15, 0.5, 0.15] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            ) : (
              <path d="M390 374 q-4 -8 2 -14 q6 -6 0 -12" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.3" />
            )}

            {/* desk phone */}
            <rect x="428" y="388" width="116" height="40" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
            <rect x="436" y="360" width="90" height="26" rx="13" fill={RED} stroke={INK} strokeWidth="4" />
            <circle cx="512" cy="398" r="3.5" fill={RED} />
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={448 + col * 16}
                  cy={400 + row * 9}
                  r="2.2"
                  fill={INK}
                  opacity="0.55"
                />
              )),
            )}
            <path d="M436 414 q-16 8 -8 22 q7 10 -5 16" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />

            {/* speech bubble */}
            <path d="M392 188 L366 228 L424 196 Z" fill="#FFFFFF" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
            <rect x="352" y="62" width="214" height="128" rx="26" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
            <path d="M380 96 H528" stroke={INK} strokeWidth="5" strokeLinecap="round" opacity="0.8" />
            <path d="M380 120 H540" stroke={INK} strokeWidth="5" strokeLinecap="round" opacity="0.8" />
            <path d="M380 144 H500" stroke={INK} strokeWidth="5" strokeLinecap="round" opacity="0.8" />
            <path d="M380 168 q10 -8 20 0 t20 0 t20 0 t20 0" fill="none" stroke={RED} strokeWidth="4" strokeLinecap="round" />
            <circle cx="541" cy="91" r="5" fill={RED} />
          </svg>
        </div>

        <div className="flex items-center justify-between gap-2 px-1.5 pt-2.5 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-[9px]">
          <span className="italic">Every growth plan starts with a conversation.</span>
          <span className="whitespace-nowrap text-[#C61A1A]">24–48h reply</span>
        </div>
      </div>

      {/* stamp */}
      <span className="absolute -bottom-3 right-3 hidden rotate-[-6deg] rounded-md border-2 border-[#C61A1A] bg-[#FCFBF7] px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C61A1A] shadow-sm sm:block">
        No scripts
      </span>

      {/* margin note */}
      <span className="absolute -left-2 top-16 hidden rotate-[-3deg] rounded-sm border border-[#E7DCC6] bg-[#FCFBF7] px-2.5 py-1.5 font-serif text-[11px] italic text-slate-500 shadow-sm md:block">
        “Hi — is now a good time?”
      </span>
    </div>
  );
};
