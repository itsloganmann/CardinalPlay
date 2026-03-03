import { motion } from 'framer-motion';

/**
 * Status badge — supports variants: live (pulsing green), default, gold, blue.
 */
export default function Badge({ children, variant = 'default', className = '' }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 10px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    lineHeight: 1,
  };

  const variants = {
    default: {
      background: 'rgba(255,255,255,0.08)',
      color: '#A1A1AA',
    },
    live: {
      background: 'rgba(74,222,128,0.12)',
      color: '#4ADE80',
    },
    gold: {
      background: 'rgba(253,181,21,0.12)',
      color: '#FDB515',
    },
    blue: {
      background: 'rgba(26,115,232,0.12)',
      color: '#3D9AFF',
    },
    danger: {
      background: 'rgba(239,68,68,0.12)',
      color: '#EF4444',
    },
  };

  return (
    <span className={className} style={{ ...base, ...variants[variant] }}>
      {variant === 'live' && (
        <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
          <motion.span
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: '#4ADE80',
            }}
          />
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#4ADE80',
            display: 'block',
          }} />
        </span>
      )}
      {children}
    </span>
  );
}
