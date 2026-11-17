import React, { useEffect, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'motion/react';

/* ------------------------------------------------------------------ */
/*  Site-wide atmosphere: progress bar, cursor light, film grain       */
/* ------------------------------------------------------------------ */

/** Thin branded progress bar pinned to the very top of the viewport. */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[70] origin-left pointer-events-none bg-[linear-gradient(90deg,#7f0f0f,#C61A1A_45%,#ff5a5a)] shadow-[0_1px_10px_rgba(198,26,26,0.55)]"
    />
  );
};

/** Soft red light that trails the cursor on fine-pointer devices. */
export const CursorGlow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current;
    if (!el) return;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 3;
    let x = tx;
    let y = ty;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = '1';
    };
    const tick = () => {
      x += (tx - x) * 0.11;
      y += (ty - y) * 0.11;
      el.style.transform = `translate3d(${x - 280}px, ${y - 280}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (reduce) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[560px] h-[560px] rounded-full z-[45] pointer-events-none opacity-0 transition-opacity duration-500"
      style={{
        background:
          'radial-gradient(circle, rgba(198,26,26,0.075) 0%, rgba(198,26,26,0.03) 42%, transparent 70%)',
      }}
    />
  );
};

/** Cinematic film-grain veil over the whole site (pure texture, no input). */
export const GrainOverlay: React.FC = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 z-[46] pointer-events-none opacity-[0.05] mix-blend-multiply"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>\")",
    }}
  />
);

/* ------------------------------------------------------------------ */
/*  Pointer physics                                                     */
/* ------------------------------------------------------------------ */

/** Pulls its child a few pixels toward the cursor — weightless CTAs. */
export const Magnetic: React.FC<{
  children: React.ReactNode;
  className?: string;
  strength?: number;
}> = ({ children, className, strength = 0.28 }) => {
  const wrap = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !wrap.current || !inner.current) return;
    const r = wrap.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    inner.current.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  };

  const onLeave = () => {
    if (inner.current) inner.current.style.transform = 'translate3d(0,0,0)';
  };

  return (
    <span
      ref={wrap}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block ${className ?? ''}`}
    >
      <span ref={inner} className="dz-magnetic-inner">
        {children}
      </span>
    </span>
  );
};

/**
 * 3D tilt + cursor-tracked glare. The wrapper owns the perspective math and
 * exposes `--mx/--my` so children can place their own highlights.
 */
export const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}> = ({ children, className, max = 6, glare = true }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (reduce || !el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${((0.5 - py) * max * 2).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${((px - 0.5) * max * 2).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`dz-tilt relative ${className ?? ''}`}
    >
      {children}
      {glare && <span className="dz-tilt-glare" aria-hidden="true" />}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Typography motion                                                   */
/* ------------------------------------------------------------------ */

/**
 * Line-mask word reveal — each word rises out of its own clipping box.
 * `highlight` words render in the brand red.
 */
export const WordReveal: React.FC<{
  text: string;
  className?: string;
  highlight?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  /** Screen-reader-only tail kept inside the tag (SEO suffixes). */
  srSuffix?: string;
}> = ({ text, className, highlight, delay = 0, as = 'h2', srSuffix }) => {
  const reduce = useReducedMotion();
  const hot = new Set(
    (highlight ?? '')
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w.replace(/[^a-z0-9]/g, '')),
  );
  const Tag = as as React.ElementType;
  return (
    <Tag className={className} aria-label={text}>
      {text.split(/\s+/).map((word, i) => (
        /* The observer lives on the unclipped wrapper: the masked word sits
           fully outside its clip box at rest, so observing the word itself
           would never report an intersection. */
        <motion.span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden="true"
          custom={i}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-30px' }}
        >
          <motion.span
            className={`inline-block will-change-transform ${
              hot.has(word.toLowerCase().replace(/[^a-z0-9]/g, '')) ? 'text-[#C61A1A]' : ''
            }`}
            variants={{
              hidden: { y: '112%', opacity: 0 },
              show: (ci: number) => ({
                y: '0%',
                opacity: 1,
                transition: { duration: 0.62, delay: delay + ci * 0.042, ease: [0.22, 1, 0.36, 1] },
              }),
            }}
          >
            {word}
            {'\u00A0'}
          </motion.span>
        </motion.span>
      ))}
      {srSuffix && <span className="sr-only">{srSuffix}</span>}
    </Tag>
  );
};

/** Brand-red gradient that slowly pans across the text. */
export const ShimmerText: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <span className={`dz-text-shimmer ${className ?? ''}`}>{children}</span>
);

/* ------------------------------------------------------------------ */
/*  Scroll physics                                                      */
/* ------------------------------------------------------------------ */

/** Translates children against the scroll for depth (`speed` in px). */
export const ParallaxY: React.FC<{
  children: React.ReactNode;
  className?: string;
  speed?: number;
}> = ({ children, className, speed = 48 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(raw, { stiffness: 90, damping: 24 });
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
};

/**
 * Companion cursor: an exact dot plus a trailing ring that blooms over
 * anything interactive. Fine-pointer devices only.
 */
export const CursorRing: React.FC = () => {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const ringEl = ring.current;
    const dotEl = dot.current;
    if (!ringEl || !dotEl) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dotEl.style.transform = `translate3d(${tx - 3}px, ${ty - 3}px, 0)`;
      ringEl.style.opacity = '1';
      dotEl.style.opacity = '1';
    };
    const onOver = (e: PointerEvent) => {
      const hot = (e.target as Element | null)?.closest?.(
        'a, button, [role="button"], .dz-tilt, input, textarea, select',
      );
      ringEl.classList.toggle('dz-cursor-hot', !!hot);
    };
    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      ringEl.style.transform = `translate3d(${x - 17}px, ${y - 17}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (reduce) return null;
  return (
    <>
      <div ref={ring} className="dz-cursor-ring" aria-hidden="true">
        <span className="dz-cursor-ring-inner" />
      </div>
      <div ref={dot} className="dz-cursor-dot" aria-hidden="true" />
    </>
  );
};

/**
 * Scroll-velocity skew — the page leans into fast scrolls and settles back.
 * Returns a MotionValue for `skewY`, or undefined under reduced motion.
 */
export const useVelocitySkew = (max = 0.45): MotionValue<number> | undefined => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const raw = useTransform(velocity, [-1600, 1600], [max, -max]);
  const skew = useSpring(raw, { stiffness: 140, damping: 32, mass: 0.4 });
  return reduce ? undefined : skew;
};

/* ------------------------------------------------------------------ */
/*  One mount for every global effect                                   */
/* ------------------------------------------------------------------ */

/**
 * Delegated pointer physics: any element opt-in via class only.
 *  - `.dz-btn-shine`  → magnetic pull toward the cursor
 *  - `.dz-spot`       → `--mx/--my` custom props for cursor-tracked glows
 */
const useDelegatedPointerFx = () => {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let magnet: HTMLElement | null = null;
    const resetMagnet = () => {
      if (magnet) {
        magnet.style.transform = '';
        magnet = null;
      }
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const magEl = target?.closest?.('.dz-btn-shine') as HTMLElement | null;
      if (magEl !== magnet) {
        resetMagnet();
        magnet = magEl;
      }
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        magnet.style.transform = `translate3d(${(dx * 0.14).toFixed(1)}px, ${(dy * 0.2).toFixed(1)}px, 0)`;
      }

      const spotEl = target?.closest?.('.dz-spot') as HTMLElement | null;
      if (spotEl) {
        const r = spotEl.getBoundingClientRect();
        spotEl.style.setProperty('--mx', `${e.clientX - r.left}px`);
        spotEl.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
    };

    const onLeave = () => resetMagnet();

    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      resetMagnet();
    };
  }, [reduce]);
};

/** Mount once in <App> — every page inherits the atmosphere. */
export const GlobalFx: React.FC = () => {
  useDelegatedPointerFx();
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <CursorRing />
      <GrainOverlay />
    </>
  );
};
