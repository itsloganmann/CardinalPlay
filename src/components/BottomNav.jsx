import { motion } from 'framer-motion';
import { Home, MapPin, MessageCircle, TrendingUp, Trophy } from 'lucide-react';

const TABS = [
  { id: 'home',    label: 'Home',    Icon: Home },
  { id: 'finder',  label: 'Find',    Icon: MapPin },
  { id: 'chat',    label: 'Chat',    Icon: MessageCircle },
  { id: 'rewards', label: 'Rewards', Icon: Trophy },
  { id: 'polls',   label: 'Wagers',  Icon: TrendingUp },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(5,5,5,0.80)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: 64 }}>
        {TABS.map(({ id, label, Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                padding: '8px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {active && (
                <motion.div
                  layoutId="nav-pip"
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: 32,
                    height: 3,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #FDB515, #FFD54F)',
                    boxShadow: '0 0 8px rgba(253,181,21,0.4)',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                color={active ? '#FDB515' : 'rgba(255,255,255,0.30)'}
              />
              <span style={{
                fontSize: 10,
                fontWeight: active ? 700 : 500,
                color: active ? '#FDB515' : 'rgba(255,255,255,0.30)',
                letterSpacing: 0.2,
              }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
