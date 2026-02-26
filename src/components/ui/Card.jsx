import { motion } from 'framer-motion';

/**
 * Premium surface card — #121212 bg, #333 border.
 * Variants: default, gradient (Cal blue glow), glass (frosted).
 */
export default function Card({
  children,
  variant = 'default',
  className = '',
  onClick,
  animate = true,
  style = {},
  ...rest
}) {
  const base = {
    borderRadius: 16,
    overflow: 'hidden',
  };

  const variants = {
    default: {
      background: '#121212',
      border: '1px solid #333333',
    },
    gradient: {
      background: 'linear-gradient(135deg, #003262 0%, #1A73E8 100%)',
      border: '1px solid rgba(26,115,232,0.4)',
      boxShadow: '0 0 28px rgba(0,50,98,0.35), 0 0 60px rgba(0,50,98,0.1)',
    },
    glass: {
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
    },
    gold: {
      background: 'linear-gradient(135deg, rgba(253,181,21,0.12), rgba(0,50,98,0.12))',
      border: '1px solid rgba(253,181,21,0.2)',
    },
  };

  const Comp = animate ? motion.div : 'div';
  const tapProps = animate && onClick ? { whileTap: { scale: 0.98 } } : {};

  return (
    <Comp
      className={className}
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      {...tapProps}
      {...rest}
    >
      {children}
    </Comp>
  );
}
