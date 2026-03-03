import { AnimatePresence, motion } from 'framer-motion';

/**
 * Apple Wallet-style dialog overlay.
 * Renders centered modal card with spring animation.
 */
export default function Dialog({ open, onClose, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 12 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%)',
              borderRadius: 28,
              padding: '32px 24px',
              textAlign: 'center',
              border: '1px solid #333333',
              boxShadow: '0 0 48px rgba(0,0,0,0.5), 0 0 120px rgba(0,50,98,0.15)',
              maxWidth: 340,
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle shimmer line at top */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '20%',
              right: '20%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(253,181,21,0.4), transparent)',
            }} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
