import { useEffect, useRef, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import Badge from './ui/Badge';
import Card from './ui/Card';

/* Generate initial dataset — 20 points of "hype" data */
function seed(count = 20) {
  const data = [];
  let val = 60;
  for (let i = 0; i < count; i++) {
    val = Math.max(20, Math.min(100, val + (Math.random() - 0.42) * 18));
    data.push({ t: `${i}`, hype: Math.round(val) });
  }
  return data;
}

/**
 * "Fan Pulse" — Whoop-style area chart with Cal Gold gradient fill.
 * Auto-updates every 2 seconds to simulate live decibel / hype data.
 */
export default function FanEnergyChart() {
  const [data, setData] = useState(() => seed());
  const counter = useRef(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1].hype;
        const next = Math.max(20, Math.min(100, last + (Math.random() - 0.42) * 18));
        counter.current += 1;
        return [
          ...prev.slice(-24),
          { t: `${counter.current}`, hype: Math.round(next) },
        ];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const current = data[data.length - 1]?.hype ?? 0;

  return (
    <Card style={{ padding: '16px 16px 8px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <div>
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#A1A1AA',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
            marginBottom: 4,
          }}>
            Fan Energy
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#FDB515', lineHeight: 1 }}>
              {current}%
            </span>
            <span style={{ fontSize: 12, color: '#A1A1AA' }}>hype level</span>
          </div>
        </div>
        <Badge variant="live">Live</Badge>
      </div>

      <div style={{ width: '100%', height: 120 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
            <defs>
              <linearGradient id="fanGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDB515" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#FDB515" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#FDB515" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" hide />
            <YAxis domain={[0, 100]} hide />
            <Area
              type="monotone"
              dataKey="hype"
              stroke="#FDB515"
              strokeWidth={2.5}
              fill="url(#fanGradient)"
              animationDuration={600}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
