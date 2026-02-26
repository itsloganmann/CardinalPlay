import { motion } from 'framer-motion';

/**
 * Tactile button with active:scale-95.
 * Variants: primary (Cal blue gradient), gold, secondary (glass), ghost.
 */
export default function Button({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  className = '',
  style = {},
  ...rest
}) {
  const base = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    border: 'none',
    cursor: disabled ? 'default' : 'pointer',
    fontSize: 14,
    fontWeight: 700,
    fontFamily: 'inherit',
    letterSpacing: '-0.01em',
    padding: '12px 20px',
    transition: 'opacity 0.15s',
  };

  const variants = {
    primary: {
      background: disabled
        ? 'rgba(0,50,98,0.5)'
        : 'linear-gradient(135deg, #003262, #1A73E8)',
      color: '#fff',
      boxShadow: disabled ? 'none' : '0 0 24px rgba(0,50,98,0.4)',
    },
    gold: {
      background: disabled
        ? 'rgba(253,181,21,0.3)'
        : 'linear-gradient(135deg, #FDB515, #FFD54F)',
      color: '#003262',
      boxShadow: disabled ? 'none' : '0 0 20px rgba(253,181,21,0.3)',
    },
    secondary: {
      background: 'rgba(255,255,255,0.06)',
      color: '#A1A1AA',
      border: '1px solid rgba(255,255,255,0.08)',
    },
    ghost: {
      background: 'transparent',
      color: '#A1A1AA',
    },
    danger: {
      background: disabled
        ? 'rgba(239,68,68,0.3)'
        : 'linear-gradient(135deg, #DC2626, #EF4444)',
      color: '#fff',
    },
  };

  return (
    <motion.button
      className={className}
      onClick={disabled ? undefined : onClick}
      whileTap={disabled ? {} : { scale: 0.95 }}
      style={{
        ...base,
        ...variants[variant],
        opacity: disabled ? 0.4 : 1,
        ...style,
      }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
