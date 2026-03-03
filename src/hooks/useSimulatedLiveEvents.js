import { useEffect, useRef } from 'react';
import { useToast } from '../components/ui/Toast';

const EVENTS = [
  { text: '🔥 Mahi just placed a 500 coin wager!', type: 'bet' },
  { text: '💬 New message in Stadium Chat', type: 'message' },
  { text: '🏈 TOUCHDOWN! Cal scores!', type: 'score' },
  { text: '📈 Fan Energy just hit 95%!', type: 'alert' },
  { text: '🎯 Jordan bet 300 on "Cal wins by 10+"', type: 'bet' },
  { text: '💬 Karis is sharing a photo in Section Chat', type: 'message' },
  { text: '🐻 Aakrisht just earned 100 Bear Coins!', type: 'alert' },
  { text: '🔥 Big bet! Sam wagered 750 coins', type: 'bet' },
  { text: '🏟️ 3 more friends just checked in!', type: 'alert' },
  { text: '💬 Caroline posted in Global Chat', type: 'message' },
  { text: '🎉 Cal intercepts it! Crowd goes wild!', type: 'score' },
  { text: '📊 4 new wagers opened this quarter', type: 'bet' },
  { text: '🐻 Sonia climbed to #4 on leaderboard!', type: 'alert' },
  { text: '🏈 Field goal is GOOD! Cal extends lead', type: 'score' },
];

/**
 * Fires random toast notifications every 5-10 seconds.
 * Makes the app feel "live" during a VC demo.
 */
export default function useSimulatedLiveEvents() {
  const { addToast } = useToast();
  const usedIndices = useRef(new Set());

  useEffect(() => {
    function fireEvent() {
      // Pick a random event, avoid immediate repeats
      let idx;
      do {
        idx = Math.floor(Math.random() * EVENTS.length);
      } while (usedIndices.current.has(idx) && usedIndices.current.size < EVENTS.length);

      usedIndices.current.add(idx);
      if (usedIndices.current.size >= EVENTS.length) {
        usedIndices.current.clear();
      }

      const event = EVENTS[idx];
      addToast(event.text, event.type);

      // Schedule next event in 5-10 seconds
      const delay = 5000 + Math.random() * 5000;
      timeoutId = setTimeout(fireEvent, delay);
    }

    // First event after 6 seconds
    let timeoutId = setTimeout(fireEvent, 6000);
    return () => clearTimeout(timeoutId);
  }, [addToast]);
}
