import React from 'react';

const SERIF = "Georgia, 'Times New Roman', serif";

const STATS = [
  { value: '4X', label: 'Avg revenue growth' },
  { value: '95%', label: 'Client satisfaction' },
  { value: '250+', label: 'US brands served' },
];

/**
 * GrowthSketch — the growth chart as an ink sketch on studio paper: hand-wobbled
 * axes, a dotted "typical agency" line, a red rise, a scribbled 4× mark and
 * stamped stats. Deliberately drawn, not rendered.
 */
export const GrowthSketch: React.FC = () => (
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
        <span className="font-serif text-[13px] italic text-slate-500">Fig. 02 · six months later</span>
        <span className="rotate-[2deg] rounded-sm border border-[#C61A1A]/40 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#C61A1A]">
          Field notes · Q3
        </span>
      </div>

      <svg
        viewBox="0 0 460 292"
        className="w-full select-none"
        role="img"
        aria-label="Hand-drawn growth sketch: a flat dotted line for typical agencies and a rising red line reaching 4X with DIGIVIBZ"
      >
        {/* paper grid */}
        {[66, 128, 190, 252, 314, 376, 438].map((x) => (
          <line key={`v${x}`} x1={x} y1="38" x2={x} y2="252" stroke="#EFE9DE" strokeWidth="1.2" strokeDasharray="1 6" />
        ))}
        {[78, 122, 166, 210].map((y) => (
          <line key={`h${y}`} x1="56" y1={y} x2="438" y2={y} stroke="#F1EBDF" strokeWidth="1.2" />
        ))}

        {/* y labels */}
        {[
          { y: 82, t: '4X' },
          { y: 126, t: '3X' },
          { y: 170, t: '2X' },
          { y: 214, t: '1X' },
        ].map((l) => (
          <text key={l.t} x="48" y={l.y} textAnchor="end" fontSize="10" fontStyle="italic" fontFamily={SERIF} fill="#A8A29E">
            {l.t}
          </text>
        ))}

        {/* hand-wobbled axes */}
        <path d="M58 252 C150 251 320 253 440 250" fill="none" stroke="#B9AA8A" strokeWidth="2" strokeLinecap="round" />
        <path d="M60 254 C61 190 59 110 60 44" fill="none" stroke="#B9AA8A" strokeWidth="2" strokeLinecap="round" />

        {/* x labels */}
        {[
          { x: 86, t: 'M1' },
          { x: 148, t: 'M2' },
          { x: 210, t: 'M3' },
          { x: 272, t: 'M4' },
          { x: 334, t: 'M5' },
          { x: 396, t: 'M6' },
        ].map((l) => (
          <text key={l.t} x={l.x} y="268" textAnchor="middle" fontSize="9.5" fontFamily={SERIF} fontStyle="italic" fill="#A8A29E">
            {l.t}
          </text>
        ))}

        {/* target line */}
        <path d="M62 78 C160 76 300 80 428 77" fill="none" stroke="#C61A1A" strokeWidth="1.3" strokeDasharray="5 6" opacity="0.45" />

        {/* typical agency line */}
        <path
          d="M66 238 C120 234 170 231 220 229 C280 226 340 223 404 219"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2.2"
          strokeDasharray="5 7"
          strokeLinecap="round"
        />
        <text x="196" y="244" fontSize="10.5" fontFamily={SERIF} fontStyle="italic" fill="#94A3B8">
          typical agency
        </text>

        {/* digital vibz rise */}
        <path
          d="M66 240 C92 236 110 229 136 224 C162 219 178 214 200 206 C228 196 246 192 268 182 C294 170 308 162 328 148 C350 132 366 112 384 92 C390 84 396 76 402 70 L402 252 L66 252 Z"
          fill="#C61A1A"
          opacity="0.06"
        />
        <path
          d="M66 240 C92 236 110 229 136 224 C162 219 178 214 200 206 C228 196 246 192 268 182 C294 170 308 162 328 148 C350 132 366 112 384 92 C390 84 396 76 402 70"
          fill="none"
          stroke="#C61A1A"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <text x="300" y="128" fontSize="12" fontFamily={SERIF} fontStyle="italic" fontWeight="700" fill="#C61A1A" transform="rotate(-24 300 128)">
          DIGIVIBZ
        </text>

        {/* endpoint + scribbled circle + 4x note */}
        <circle cx="402" cy="70" r="5.5" fill="#C61A1A" />
        <path
          d="M404 54 C428 46 442 64 430 80 C418 96 388 94 378 76 C370 62 386 48 406 50 C420 52 426 62 418 72"
          fill="none"
          stroke="#C61A1A"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.75"
        />
        <text x="428" y="44" textAnchor="middle" fontSize="24" fontFamily={SERIF} fontStyle="italic" fontWeight="700" fill="#C61A1A">
          4×
        </text>
        <path d="M420 122 C412 112 406 98 402 84" fill="none" stroke="#C61A1A" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 4" opacity="0.6" />
        <text x="416" y="140" textAnchor="middle" fontSize="9" fontFamily={SERIF} fontStyle="italic" fill="#B45353">
          avg after 6 mo.
        </text>
      </svg>

      <div className="grid grid-cols-3 gap-2 px-4 pb-5 pt-1">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`rounded-sm border border-dashed border-[#C61A1A]/35 px-2 py-2.5 text-center ${
              i === 0 ? '-rotate-1' : i === 1 ? 'rotate-[0.8deg]' : '-rotate-[0.6deg]'
            }`}
          >
            <div className={`font-serif text-xl italic leading-none ${i === 0 ? 'text-[#C61A1A]' : 'text-slate-800'}`}>
              {stat.value}
            </div>
            <div className="mt-1.5 text-[9px] font-semibold uppercase leading-tight tracking-wide text-slate-500">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>

    <span className="absolute -bottom-3 right-4 hidden rotate-[-4deg] rounded-sm border border-[#E7DCC6] bg-[#FCFBF7] px-2.5 py-1 font-serif text-[10.5px] italic text-slate-500 shadow-sm sm:block">
      measured, not promised
    </span>
  </div>
);
