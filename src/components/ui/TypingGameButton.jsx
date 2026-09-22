'use client';

import { useState } from 'react';

export default function TypingGameButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://typing-tower-defense.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Play Typing Tower Defense"
      title="Play Typing Tower Defense"
      className="typing-game-btn"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Rotating dashed border ring */}
      <svg
        className="typing-game-btn__ring"
        viewBox="0 0 72 72"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="36"
          cy="36"
          r="34"
          stroke="url(#game-ring-gradient)"
          strokeWidth="2"
          strokeDasharray="8 6"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="game-ring-gradient" x1="0" y1="0" x2="72" y2="72">
            <stop offset="0%" stopColor="#BDFA5C" />
            <stop offset="50%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#FF6BF5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Second counter-rotating ring */}
      <svg
        className="typing-game-btn__ring typing-game-btn__ring--reverse"
        viewBox="0 0 72 72"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="36"
          cy="36"
          r="30"
          stroke="url(#game-ring-gradient-2)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          strokeLinecap="round"
          opacity="0.5"
        />
        <defs>
          <linearGradient id="game-ring-gradient-2" x1="72" y1="0" x2="0" y2="72">
            <stop offset="0%" stopColor="#FF6BF5" />
            <stop offset="50%" stopColor="#BDFA5C" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Inner circle background */}
      <span className="typing-game-btn__inner">
        {/* Keyboard / Gaming icon */}
        <svg
          className="typing-game-btn__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Keyboard base */}
          <rect x="2" y="4" width="20" height="14" rx="2.5" />
          {/* Keys row 1 */}
          <line x1="6" y1="8" x2="6.01" y2="8" strokeWidth="2.5" />
          <line x1="10" y1="8" x2="10.01" y2="8" strokeWidth="2.5" />
          <line x1="14" y1="8" x2="14.01" y2="8" strokeWidth="2.5" />
          <line x1="18" y1="8" x2="18.01" y2="8" strokeWidth="2.5" />
          {/* Keys row 2 */}
          <line x1="8" y1="12" x2="8.01" y2="12" strokeWidth="2.5" />
          <line x1="16" y1="12" x2="16.01" y2="12" strokeWidth="2.5" />
          {/* Spacebar */}
          <line x1="8" y1="15" x2="16" y2="15" strokeWidth="2" />
          {/* Tower / gaming element - small turret on top */}
          <path d="M12 4 L12 1.5" strokeWidth="2" />
          <path d="M10 1.5 L14 1.5" strokeWidth="2" />
        </svg>
      </span>

      {/* Tooltip label */}
      <span className="typing-game-btn__label">
        Play Game ⌨️
      </span>
    </a>
  );
}
