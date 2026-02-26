import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext();

const ACCENT = {
  bet:     { bg: 'rgba(253,181,21,0.12)', border: 'rgba(253,181,21,0.25)', color: '#FDB515' },
  message: { bg: 'rgba(26,115,232,0.12)', border: 'rgba(26,115,232,0.25)', color: '#3D9AFF' },
  alert:   { bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.25)', color: '#4ADE80' },
  score:   { bg: 'rgba(253,181,21,0.15)', border: 'rgba(253,181,21,0.3)',  color: '#FFD54F' },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((text, type = 'alert', duration = 4000) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev.slice(-3), { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container — fixed at top */}
      <div style={{
        position: 'fixed',
        top: 56,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 400,
        padding: '0 16px',
        zIndex: 300,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
        <AnimatePresence>
          {toasts.map((toast) => {
            const accent = ACCENT[toast.type] || ACCENT.alert;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                onClick={() => dismiss(toast.id)}
                style={{
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  background: '#1A1A1A',
                  border: `1px solid ${accent.border}`,
                  borderRadius: 14,
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: accent.color, flexShrink: 0,
                  boxShadow: `0 0 8px ${accent.color}`,
                }} />
                <span style={{
                  fontSize: 13, fontWeight: 600, color: '#fff',
                  flex: 1, lineHeight: 1.3,
                }}>
                  {toast.text}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
