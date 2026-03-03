import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CalBearChibi from '../components/CalBearChibi';

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1800);
    const t2 = setTimeout(() => setPhase(2), 3600);
    const t3 = setTimeout(() => onComplete(), 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-50"
      style={{ background: '#050505' }}>
      {/* Background radial pulses — Cal Blue + Gold */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,50,98,0.3) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(253,181,21,0.15) 0%, transparent 70%)' }}
        animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div
            key="phase0"
            className="flex flex-col items-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative w-28 h-28 mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <div className="w-full h-full rounded-3xl flex items-center justify-center cal-glow"
                style={{ background: 'linear-gradient(135deg, #003262, #1A73E8)' }}>
                <motion.span
                  className="text-5xl font-black text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  CP
                </motion.span>
              </div>
              <motion.div
                className="absolute -inset-2 rounded-3xl"
                style={{ border: '2px solid rgba(0,50,98,0.3)' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              />
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h1 className="text-4xl font-black tracking-tight text-white"
                style={{ letterSpacing: '-0.04em' }}>
                Cal <span style={{ color: '#FDB515' }}>Play</span>
              </h1>
              <motion.div
                className="h-0.5"
                style={{ background: 'linear-gradient(90deg, transparent, #003262, transparent)' }}
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <CalBearChibi size={40} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            key="phase1"
            className="flex flex-col items-center z-10 px-8 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40, filter: 'blur(8px)' }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="mb-6" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <CalBearChibi size={72} />
            </motion.div>

            <motion.h2
              className="text-2xl font-bold text-white mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Earn. Compete. Win.
            </motion.h2>
            <motion.p
              className="text-base leading-relaxed max-w-xs"
              style={{ color: '#A1A1AA' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              The ultimate gameday experience for Cal students
            </motion.p>

            <motion.div
              className="flex gap-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#003262' }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            key="phase2"
            className="flex flex-col items-center z-10"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full"
              style={{ border: '2px solid rgba(0,50,98,0.3)', borderTopColor: '#003262' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
