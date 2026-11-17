import React from 'react';
import { useReducedMotion } from 'motion/react';

interface MetricsTickerProps {
  /** Short metric phrases, e.g. "+312% Organic Traffic". */
  items: string[];
  className?: string;
}

/**
 * Kinetic red metric band — uppercase client metrics scrolling left forever,
 * pauses on hover, edge-masked. Under prefers-reduced-motion it renders a
 * single static (wrapping) row instead of the moving track.
 */
export const MetricsTicker: React.FC<MetricsTickerProps> = ({ items, className = '' }) => {
  const reduceMotion = useReducedMotion();
  if (items.length === 0) return null;

  const label = (t: string, i: number) => (
    <span
      key={`${t}-${i}`}
      className="inline-flex items-center whitespace-nowrap text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-white"
    >
      <span className="px-4 sm:px-7">{t}</span>
      <span className="w-1.5 h-1.5 rounded-full bg-white/50" aria-hidden="true" />
    </span>
  );

  const track = (
    <div className="flex shrink-0 items-center">{items.map(label)}</div>
  );

  return (
    <div
      className={`dz-marquee relative overflow-hidden bg-[#C61A1A] py-3 ${className}`}
      aria-hidden="true"
    >
      {reduceMotion ? (
        /* Static wrapping row: never a fixed-width track (avoids overflow). */
        <div className="flex flex-wrap justify-center items-center gap-y-1 px-4">
          {items.map(label)}
        </div>
      ) : (
        <div className="dz-marquee-track flex w-max">
          {track}
          {track}
        </div>
      )}
    </div>
  );
};
