import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Total vertical travel in px across the full scroll-through (±distance/2). */
  distance?: number;
}

/**
 * Scroll-linked parallax wrapper: content drifts gently upward as the page
 * scrolls past it — the premium "living" feel used on hero figures and large
 * visuals. Vertical only, so it can never cause horizontal overflow.
 * Disabled under prefers-reduced-motion.
 */
export const Parallax: React.FC<ParallaxProps> = ({ children, className, distance = 28 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} className={className} style={reduceMotion ? undefined : { y }}>
      {children}
    </motion.div>
  );
};
