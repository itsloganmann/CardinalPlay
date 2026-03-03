import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, MapPin, MessageCircle, TrendingUp, Trophy, Users } from 'lucide-react';
import BearCoin from '../components/BearCoin';
import FanEnergyChart from '../components/FanEnergyChart';
import WagerTicker from '../components/WagerTicker';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import { useApp } from '../context/AppContext';

const stagger = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 26 } },
};

const FEATURES = [
  { id: 'finder',  title: 'Friend Finder', icon: MapPin,        iconColor: '#3D9AFF', iconBg: 'rgba(26,115,232,0.15)' },
  { id: 'chat',    title: 'Live Chat',     icon: MessageCircle, iconColor: '#60A5FA', iconBg: 'rgba(96,165,250,0.12)' },
  { id: 'rewards', title: 'Rewards',       icon: Trophy,        iconColor: '#FDB515', iconBg: 'rgba(253,181,21,0.12)' },
  { id: 'polls',   title: 'Live Wagers',   icon: TrendingUp,    iconColor: '#4ADE80', iconBg: 'rgba(52,211,153,0.12)' },
];

export default function HomeScreen({ onNavigate }) {
  const { user, friends } = useApp();
  const onlineFriends = friends.filter(f => f.online).length;

  return (
    <div className="page hide-scrollbar">
      <motion.div className="page-inner" variants={stagger} initial="hidden" animate="show">

        {/* ── Header ── */}
        <motion.div variants={fadeUp} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24,
        }}>
          <div>
            <p style={{ fontSize: 13, color: '#A1A1AA', fontWeight: 500, marginBottom: 2 }}>Welcome back,</p>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              {user.name} <span style={{ color: '#FDB515' }}>🐻</span>
            </h1>
          </div>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', flexShrink: 0, marginLeft: 12,
            background: 'linear-gradient(135deg, #003262, #1A73E8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 900, color: '#fff',
            boxShadow: '0 0 16px rgba(0,50,98,0.5)',
          }}>
            {user.name[0]}
          </div>
        </motion.div>

        {/* ── Live Game Banner ── */}
        <motion.div variants={fadeUp}>
          <Card variant="gradient" style={{ marginBottom: 16, padding: '20px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <Badge variant="live">Live</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
                  Cal vs. Stanford
                </h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 3 }}>Q3 · 8:42 remaining</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 32, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>
                  24–17
                </p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>
                  Cal Memorial Stadium
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── Coins & Status Row ── */}
        <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          {/* Coins */}
          <Card style={{ flex: 1, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <BearCoin size={40} />
            <div>
              <p style={{ fontSize: 11, color: '#A1A1AA', fontWeight: 600, marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Bear Coins
              </p>
              <AnimatedNumber
                value={user.coins}
                style={{ fontSize: 22, fontWeight: 900, color: '#FDB515', lineHeight: 1, display: 'block' }}
              />
            </div>
          </Card>
          {/* Status */}
          <Card style={{ flex: 1, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: user.isInStadium ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {user.isInStadium
                ? <CheckCircle2 size={20} color="#4ADE80" />
                : <MapPin size={20} color="#52525B" />}
            </div>
            <div>
              <p style={{ fontSize: 11, color: '#A1A1AA', fontWeight: 600, marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Status
              </p>
              <p style={{
                fontSize: 14, fontWeight: 700, lineHeight: 1,
                color: user.isInStadium ? '#4ADE80' : '#52525B',
              }}>
                {user.isInStadium ? 'In Stadium · 5×' : 'Remote'}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* ── Fan Energy Chart (Whoop-style) ── */}
        <motion.div variants={fadeUp} style={{ marginBottom: 16 }}>
          <FanEnergyChart />
        </motion.div>

        {/* ── Wager Ticker ── */}
        <motion.div variants={fadeUp} style={{ marginBottom: 16 }}>
          <WagerTicker />
        </motion.div>

        {/* ── Friends Row ── */}
        <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
          <Card
            onClick={() => onNavigate('finder')}
            style={{
              padding: 16, display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'rgba(26,115,232,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Users size={20} color="#3D9AFF" />
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 2 }}>
                  {onlineFriends} Friends at the Game
                </p>
                <p style={{ fontSize: 12, color: '#A1A1AA' }}>Tap to find them in the stadium</p>
              </div>
            </div>
            <ChevronRight size={20} color="#52525B" />
          </Card>
        </motion.div>

        {/* ── Feature Grid ── */}
        <p style={{
          fontSize: 11, fontWeight: 700, color: '#52525B',
          letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14,
        }}>
          Features
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {FEATURES.map(({ id, title, icon: Icon, iconColor, iconBg }) => (
            <motion.div key={id} variants={fadeUp}>
              <Card
                onClick={() => onNavigate(id)}
                style={{ padding: 18, cursor: 'pointer' }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
                }}>
                  <Icon size={22} color={iconColor} />
                </div>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{title}</p>
                <p style={{ fontSize: 12, color: '#A1A1AA' }}>
                  {id === 'finder'  && `${onlineFriends} nearby`}
                  {id === 'chat'    && 'Game chat buzzing'}
                  {id === 'rewards' && 'New rewards live'}
                  {id === 'polls'   && '4 active wagers'}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </div>
  );
}
