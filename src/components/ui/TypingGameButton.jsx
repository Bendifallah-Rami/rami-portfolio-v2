'use client';

export default function TypingGameButton() {
  return (
    <a
      href="https://typing-tower-defense.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Play Typing Tower Defense"
      title="Play Typing Tower Defense"
      className="typing-game-btn"
    >
      {/* Outer slow dashed ring — gold */}
      <svg
        className="typing-game-btn__ring"
        viewBox="0 0 72 72"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="36" cy="36" r="34"
          stroke="url(#tgb-grad-a)"
          strokeWidth="2"
          strokeDasharray="10 5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="tgb-grad-a" x1="0" y1="0" x2="72" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#BDFA5C" />
            <stop offset="55%"  stopColor="#FFD166" />
            <stop offset="100%" stopColor="#BDFA5C" />
          </linearGradient>
        </defs>
      </svg>

      {/* Inner faster counter-rotating ring — dimmer green */}
      <svg
        className="typing-game-btn__ring typing-game-btn__ring--reverse"
        viewBox="0 0 72 72"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="36" cy="36" r="29"
          stroke="url(#tgb-grad-b)"
          strokeWidth="1.5"
          strokeDasharray="5 9"
          strokeLinecap="round"
          opacity="0.45"
        />
        <defs>
          <linearGradient id="tgb-grad-b" x1="72" y1="0" x2="0" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#FFD166" />
            <stop offset="100%" stopColor="#BDFA5C" />
          </linearGradient>
        </defs>
      </svg>

      {/* Inner disc */}
      <span className="typing-game-btn__inner">
        {/* Tower / castle icon — represents the defense tower */}
        <svg
          className="typing-game-btn__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Battlements — three merlons */}
          <rect x="4"   y="3" width="3" height="4" rx="0.5" />
          <rect x="10.5" y="3" width="3" height="4" rx="0.5" />
          <rect x="17" y="3" width="3" height="4" rx="0.5" />
          {/* Tower body */}
          <path d="M4 7 h16 v13 H4 Z" />
          {/* Gate arch */}
          <path d="M10 20 v-5 a2 2 0 0 1 4 0 v5" />
          {/* Arrow slit */}
          <line x1="12" y1="10" x2="12" y2="13" />
          <line x1="10.5" y1="11.5" x2="13.5" y2="11.5" />
        </svg>
      </span>

      {/* Tooltip */}
      <span className="typing-game-btn__label">
        Tower Defense
      </span>
    </a>
  );
}
