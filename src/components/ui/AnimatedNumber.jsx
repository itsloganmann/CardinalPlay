import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Smoothly animated number counter using Framer Motion.
 * Tweens from previous value to new value.
 */
export default function AnimatedNumber({
  value,
  duration = 0.8,
  format = 'locale',
  style = {},
  className = '',
}) {
  const motionVal = useMotionValue(0);
  const display = useTransform(motionVal, (v) => {
    const n = Math.round(v);
    if (format === 'locale') return n.toLocaleString();
    if (format === 'compact') {
      if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
      return n.toString();
    }
    return n.toString();
  });

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration,
      ease: 'easeOut',
    });
    return () => controls.stop();
  }, [value, duration, motionVal]);

  return (
    <motion.span className={className} style={style}>
      {display}
    </motion.span>
  );
}
