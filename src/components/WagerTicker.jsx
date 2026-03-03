import { useEffect, useRef, useState } from 'react';
import Card from './ui/Card';

const NAMES = [
  'Jordan H.', 'Karis C.', 'Mahi J.', 'Zayd P.', 'Caroline D.',
  'Sonia D.', 'Aakrisht M.', 'Sam F.', 'Andrew L.', 'Priya R.',
];

const BETS = [
  { action: 'bet 250 on', target: '"Touchdown next drive"' },
  { action: 'bet 100 on', target: '"Over 150 pass yards"' },
  { action: 'wagered 500 on', target: '"Cal wins by 10+"' },
  { action: 'bet 75 on', target: '"Under 3.5 turnovers"' },
  { action: 'bet 300 on', target: '"Next score is a FG"' },
  { action: 'wagered 200 on', target: '"Rush TD this quarter"' },
  { action: 'bet 150 on', target: '"Defense gets a sack"' },
  { action: 'wagered 400 on', target: '"Cal covers the spread"' },
];

function randomBet() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const bet = BETS[Math.floor(Math.random() * BETS.length)];
  return `🔥 ${name} ${bet.action} ${bet.target}`;
}

/**
 * Scrolling marquee ticker showing recent wagers.
 * Generates new fake bets periodically to keep it fresh.
 */
export default function WagerTicker() {
  const [items, setItems] = useState(() =>
    Array.from({ length: 6 }, () => randomBet())
  );
  const tickerRef = useRef(null);

  // Add a new bet every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => [...prev.slice(-8), randomBet()]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const tickerText = items.join('   •   ');

  return (
    <Card style={{ padding: '12px 0', overflow: 'hidden' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        paddingLeft: 16,
        marginBottom: 8,
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#FDB515', letterSpacing: 0.8, textTransform: 'uppercase' }}>
          Recent Wagers
        </span>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: '#FDB515',
          boxShadow: '0 0 6px rgba(253,181,21,0.6)',
        }} />
      </div>

      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }} ref={tickerRef}>
        <div className="animate-marquee" style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ fontSize: 13, color: '#A1A1AA', fontWeight: 500 }}>
            {tickerText}
          </span>
          <span style={{ fontSize: 13, color: '#A1A1AA', fontWeight: 500, marginLeft: 48 }}>
            {tickerText}
          </span>
        </div>
      </div>
    </Card>
  );
}
