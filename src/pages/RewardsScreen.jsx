import { AnimatePresence, motion } from 'framer-motion';
import { Award, BarChart3, Crown, Medal, ShoppingBag, Sparkles } from 'lucide-react';
import { useState } from 'react';
import BearCoin from '../components/BearCoin';
import CalBearChibi from '../components/CalBearChibi';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import Card from '../components/ui/Card';
import Dialog from '../components/ui/Dialog';
import { useApp } from '../context/AppContext';

const GOLD = '#FDB515';
const BLUE = '#1A73E8';

const CATEGORIES = [
  { id: 'all',        label: 'All' },
  { id: 'food',       label: 'Food' },
  { id: 'merch',      label: 'Merch' },
  { id: 'seating',    label: 'Seating' },
  { id: 'experience', label: 'Experiences' },
];

/* ─── RewardCard ────────────────────────────────── */
function RewardCard({ reward, coins, onRedeem, onRedeemSuccess }) {
  const [redeemed, setRedeemed] = useState(false);
  const canAfford = coins >= reward.cost;

  const redeem = () => {
    if (!canAfford || redeemed) return;
    onRedeem(reward.cost);
    setRedeemed(true);
    onRedeemSuccess?.(reward);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card style={{ padding: 16, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: '#1A1A1A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, flexShrink: 0,
          }}>{reward.emoji}</div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{reward.name}</p>
            <p style={{ fontSize: 12, color: '#A1A1AA', marginBottom: 6 }}>{reward.description}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <BearCoin size={15} />
              <span style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>{reward.cost.toLocaleString()}</span>
            </div>
          </div>

          <motion.button
            onClick={redeem}
            whileTap={canAfford && !redeemed ? { scale: 0.95 } : {}}
            style={{
              flexShrink: 0, padding: '9px 14px', borderRadius: 12, border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 700, fontFamily: 'inherit',
              background: redeemed
                ? 'rgba(74,222,128,0.15)'
                : canAfford
                  ? 'linear-gradient(135deg, #003262, #1A73E8)'
                  : 'rgba(255,255,255,0.05)',
              color: redeemed ? '#4ADE80' : canAfford ? '#fff' : 'rgba(255,255,255,0.2)',
            }}>
            {redeemed ? '✓ Got it' : 'Redeem'}
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );
}

/* ─── LeaderboardView — Stock Portfolio Style ──── */
function LeaderboardView({ leaderboard, userId, userCoins }) {
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);
  const rankBadge = (rank) => {
    if (rank === 1) return <Crown size={18} color={GOLD} />;
    if (rank === 2) return <Medal size={18} color="#CBD5E1" />;
    if (rank === 3) return <Award size={18} color="#C98E00" />;
    return <span style={{ fontSize: 13, fontWeight: 700, color: '#52525B' }}>#{rank}</span>;
  };

  const podium = [top3[1], top3[0], top3[2]];
  const podiumH = [80, 112, 64];

  return (
    <div>
      {/* Portfolio-style big number at top */}
      <Card style={{ padding: 20, marginBottom: 20, textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#A1A1AA', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>
          Your Bear Coins
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 6 }}>
          <BearCoin size={32} />
          <AnimatedNumber
            value={userCoins}
            style={{ fontSize: 36, fontWeight: 900, color: GOLD, lineHeight: 1 }}
          />
        </div>
        <p style={{ fontSize: 13, color: '#4ADE80', fontWeight: 600 }}>
          ↑ Rank #6 · Top 15%
        </p>
      </Card>

      {/* Jackpot banner */}
      <Card variant="gold" style={{ padding: 18, marginBottom: 24, position: 'relative' }}>
        <Sparkles size={18} color={GOLD} style={{ position: 'absolute', top: 14, right: 14, opacity: 0.4 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Crown size={20} color={GOLD} />
          <span className="gold-text" style={{ fontSize: 17, fontWeight: 900 }}>
            Season Jackpot
          </span>
        </div>
        <p style={{ fontSize: 13, color: '#A1A1AA', marginBottom: 6 }}>Top of the leaderboard at season end wins:</p>
        <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginBottom: 4 }}>VIP Season Pass + Signed Jersey</p>
        <p style={{ fontSize: 12, color: '#52525B' }}>Plus exclusive sideline access for the Bowl Game</p>
      </Card>

      {/* Podium */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16, marginBottom: 24, paddingTop: 8 }}>
        {podium.map((entry, i) => {
          if (!entry) return null;
          const isMe = entry.id === userId;
          const barColor = i === 1
            ? 'linear-gradient(to bottom, rgba(253,181,21,0.3), rgba(253,181,21,0.05))'
            : i === 0
              ? 'linear-gradient(to bottom, rgba(148,163,184,0.2), rgba(148,163,184,0.03))'
              : 'linear-gradient(to bottom, rgba(201,142,0,0.2), rgba(201,142,0,0.03))';
          const avatarBg = i === 1 ? 'linear-gradient(135deg, #FDB515, #C98E00)'
            : i === 0 ? '#6B7280' : '#C98E00';
          return (
            <div key={entry.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 46, height: 46, borderRadius: '50%',
                background: avatarBg, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 6,
                outline: isMe ? '2px solid #003262' : 'none', outlineOffset: 2,
              }}>
                {entry.name.split(' ').map(n => n[0]).join('')}
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 3, maxWidth: 70, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {entry.name.split(' ')[0]}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 6 }}>
                <BearCoin size={11} />
                <span style={{ fontSize: 10, fontWeight: 700, color: GOLD }}>{(entry.coins / 1000).toFixed(1)}k</span>
              </div>
              <div style={{ width: 60, height: podiumH[i], borderRadius: '8px 8px 0 0', background: barColor, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6 }}>
                {rankBadge(entry.rank)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Rest of leaderboard */}
      {rest.map((entry, i) => {
        const isMe = entry.id === userId;
        return (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', marginBottom: 8,
              ...(isMe ? {
                background: 'rgba(0,50,98,0.12)',
                border: '1px solid rgba(0,50,98,0.25)',
              } : {}),
            }}>
              <div style={{ width: 28, display: 'flex', justifyContent: 'center' }}>{rankBadge(entry.rank)}</div>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: isMe ? '#003262' : 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800, color: '#fff',
              }}>
                {entry.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: isMe ? '#3D9AFF' : '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {entry.name} {isMe && <span style={{ fontSize: 11, color: '#3D9AFF' }}>(You)</span>}
                </p>
                <p style={{ fontSize: 11, color: '#52525B' }}>{entry.year}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <BearCoin size={13} />
                <span style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>{entry.coins.toLocaleString()}</span>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Redeem Popup — Apple Wallet Card Style ────── */
function RedeemPopup({ reward, onDismiss }) {
  return (
    <Dialog open={!!reward} onClose={onDismiss}>
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 0.5, repeat: 1 }}
        style={{ fontSize: 56, marginBottom: 12 }}
      >
        {reward?.emoji}
      </motion.div>

      <p style={{ fontSize: 13, color: '#4ADE80', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
        REDEEMED!
      </p>
      <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{reward?.name}</p>
      <p style={{ fontSize: 13, color: '#A1A1AA', marginBottom: 20 }}>
        {reward?.description}
      </p>

      {/* Simulated barcode */}
      <div style={{
        background: '#1A1A1A',
        borderRadius: 12,
        padding: '14px 16px',
        marginBottom: 16,
        border: '1px solid #333333',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 8 }}>
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} style={{
              width: Math.random() > 0.5 ? 3 : 2,
              height: 32,
              background: '#FDB515',
              opacity: 0.3 + Math.random() * 0.5,
              borderRadius: 1,
            }} />
          ))}
        </div>
        <p style={{ fontSize: 10, color: '#52525B', fontFamily: 'monospace', letterSpacing: 2 }}>
          CALPLAY-{Date.now().toString(36).toUpperCase().slice(-8)}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 12 }}>
        <CalBearChibi size={28} />
        <span style={{ fontSize: 12, color: '#52525B' }}>Cal Memorial Stadium</span>
      </div>

      <p style={{ fontSize: 11, color: '#52525B' }}>
        Valid until 11:59 PM today · Tap to dismiss
      </p>
    </Dialog>
  );
}

/* ─── RewardsScreen ─────────────────────────────── */
export default function RewardsScreen({ onBack }) {
  const { user, rewards, leaderboard, spendCoins } = useApp();
  const [tab, setTab] = useState('store');
  const [category, setCategory] = useState('all');
  const [redeemedPopup, setRedeemedPopup] = useState(null);

  const filtered = category === 'all' ? rewards : rewards.filter(r => r.category === category);

  return (
    <div className="page hide-scrollbar">
      <div className="page-inner">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <motion.button onClick={onBack} whileTap={{ scale: 0.9 }}
            style={{
              width: 44, height: 44, borderRadius: '50%',
              background: '#121212', border: '1px solid #333333',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexShrink: 0,
            }}>
            <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.7)', lineHeight: 1 }}>‹</span>
          </motion.button>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em' }}>Rewards</h1>
            <p style={{ fontSize: 13, color: '#A1A1AA', marginTop: 2 }}>Redeem your Bear Coins</p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#121212', border: '1px solid #333333',
            borderRadius: 20, padding: '7px 12px',
          }}>
            <BearCoin size={18} />
            <span style={{ fontSize: 14, fontWeight: 700, color: GOLD }}>{user.coins.toLocaleString()}</span>
          </div>
        </div>

        {/* Tab switcher */}
        <div style={{
          display: 'flex', background: '#121212', border: '1px solid #333333',
          borderRadius: 14, padding: 4, marginBottom: 20, gap: 4,
        }}>
          {[
            { id: 'store', label: 'Store', Icon: ShoppingBag },
            { id: 'leaderboard', label: 'Leaderboard', Icon: BarChart3 },
          ].map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '11px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                background: tab === id ? 'linear-gradient(135deg, #003262, #1A73E8)' : 'transparent',
                color: tab === id ? '#fff' : '#A1A1AA',
                transition: 'all 0.25s',
              }}>
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'store' ? (
            <motion.div key="store"
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}>
              {/* Category pills */}
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 16 }} className="hide-scrollbar">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setCategory(cat.id)}
                    style={{
                      padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                      fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', fontFamily: 'inherit',
                      background: category === cat.id ? 'linear-gradient(135deg, #003262, #1A73E8)' : '#121212',
                      color: category === cat.id ? '#fff' : '#A1A1AA',
                      ...(category !== cat.id ? { border: '1px solid #333333' } : {}),
                    }}>
                    {cat.label}
                  </button>
                ))}
              </div>
              {filtered.map(r => (
                <RewardCard
                  key={r.id}
                  reward={r}
                  coins={user.coins}
                  onRedeem={spendCoins}
                  onRedeemSuccess={setRedeemedPopup}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div key="leaderboard"
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <LeaderboardView leaderboard={leaderboard} userId={user.id} userCoins={user.totalCoinsEarned} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <RedeemPopup reward={redeemedPopup} onDismiss={() => setRedeemedPopup(null)} />
    </div>
  );
}
