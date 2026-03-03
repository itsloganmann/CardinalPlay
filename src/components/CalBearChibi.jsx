/**
 * Cal Bear mascot — friendly chibi bear (round body + cute face)
 * Replaces the Stanford Tree mascot.
 */
export default function CalBearChibi({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      style={{ display: 'block' }}
    >
      {/* Body */}
      <ellipse cx="24" cy="30" rx="14" ry="12" fill="#8B6914" />
      <ellipse cx="24" cy="28" rx="13" ry="11" fill="#A07D1C" />

      {/* Ears */}
      <circle cx="13" cy="14" r="6" fill="#8B6914" />
      <circle cx="13" cy="14" r="3.5" fill="#C98E00" />
      <circle cx="35" cy="14" r="6" fill="#8B6914" />
      <circle cx="35" cy="14" r="3.5" fill="#C98E00" />

      {/* Head */}
      <ellipse cx="24" cy="22" rx="12" ry="11" fill="#C98E00" />

      {/* Muzzle */}
      <ellipse cx="24" cy="26" rx="6" ry="4.5" fill="#FDB515" opacity="0.7" />

      {/* Eyes — big, friendly */}
      <ellipse cx="19" cy="21" rx="3" ry="3.2" fill="#FFF" />
      <ellipse cx="19" cy="21.5" rx="1.4" ry="1.6" fill="#003262" />
      <ellipse cx="19.5" cy="20.8" rx="0.5" ry="0.6" fill="#FFF" />

      <ellipse cx="29" cy="21" rx="3" ry="3.2" fill="#FFF" />
      <ellipse cx="29" cy="21.5" rx="1.4" ry="1.6" fill="#003262" />
      <ellipse cx="29.5" cy="20.8" rx="0.5" ry="0.6" fill="#FFF" />

      {/* Nose */}
      <ellipse cx="24" cy="24.5" rx="2" ry="1.3" fill="#5D3A00" />

      {/* Smile */}
      <path
        d="M20 27.5 Q24 30 28 27.5"
        stroke="#5D3A00"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Rosy cheeks */}
      <ellipse cx="14" cy="25" rx="2.5" ry="1.5" fill="#FDB515" opacity="0.4" />
      <ellipse cx="34" cy="25" rx="2.5" ry="1.5" fill="#FDB515" opacity="0.4" />

      {/* Cal "C" on forehead */}
      <text
        x="24"
        y="17"
        fill="#003262"
        fontSize="7"
        fontWeight="900"
        textAnchor="middle"
        dominantBaseline="middle"
        opacity="0.6"
      >
        C
      </text>
    </svg>
  );
}
