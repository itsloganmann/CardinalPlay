import { motion } from 'framer-motion';

export default function BearCoin({ size = 24, className = '', animate = false }) {
  const Wrapper = animate ? motion.div : 'div';
  const animProps = animate ? {
    animate: { rotateY: [0, 360] },
    transition: { duration: 3, repeat: Infinity, ease: 'linear' },
  } : {};

  return (
    <Wrapper
      className={`inline-flex items-center justify-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #FDB515 0%, #C98E00 40%, #FDB515 60%, #FFD54F 80%, #FDB515 100%)',
        boxShadow: '0 2px 8px rgba(253, 181, 21, 0.4), inset 0 1px 2px rgba(255,255,255,0.3)',
        perspective: 200,
      }}
      {...animProps}
    >
      <span
        style={{
          fontSize: size * 0.5,
          fontWeight: 800,
          color: '#003262',
          textShadow: '0 1px 1px rgba(255,255,255,0.2)',
          lineHeight: 1,
        }}
      >
        B
      </span>
    </Wrapper>
  );
}
