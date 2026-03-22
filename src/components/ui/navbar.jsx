"use client";

import { useEffect, useState, useRef } from "react";

const links = [
  { id: "Home", label: "Home", href: "#Home" },
  { id: "about", label: "About", href: "#about" },
  { id: "Expertise", label: "Expertise", href: "#Expertise" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const pillRef = useRef(null);
  const navRef = useRef(null);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Move the sliding pill indicator behind hovered link
  const movePill = (e) => {
    const pill = pillRef.current;
    const nav = navRef.current;
    if (!pill || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = e.currentTarget.getBoundingClientRect();
    pill.style.opacity = "1";
    pill.style.width = `${linkRect.width + 24}px`;
    pill.style.transform = `translateX(${linkRect.left - navRect.left - 12}px)`;
  };

  const hidePill = () => {
    if (pillRef.current) pillRef.current.style.opacity = "0";
  };

  return (
    <header className={`nb ${scrolled ? "nb--scrolled" : ""}`}>

      {/* Left — name mark */}
      <a href="/" className="nb__mark" aria-label="Home">
        <span className="nb__mark-bracket">[</span>
        <span className="nb__mark-name">RB</span>
        <span className="nb__mark-bracket">]</span>
      </a>

      {/* Center — nav links with sliding pill */}
      <nav ref={navRef} className="nb__nav" aria-label="Main navigation">
        {/* sliding bg pill */}
        <span ref={pillRef} className="nb__pill" aria-hidden="true" />

        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={`nb__link ${active === label ? "nb__link--active" : ""}`}
            onClick={() => setActive(label)}
            onMouseEnter={movePill}
            onMouseLeave={hidePill}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Right — live clock + hire badge */}
      <div className="nb__right">
        <span className="nb__clock" aria-label="Current time">{time}</span>
        <a href="#contact" className="nb__hire">
          <span className="nb__hire-dot" />
          Hire me
        </a>
      </div>

      <style>{`
        /* ── Base ─────────────────────────────────── */
        .nb {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(1.5rem, 5vw, 4rem);
          height: 64px;
          transition: background 0.5s var(--ease-default),
                      border-color 0.5s var(--ease-default),
                      backdrop-filter 0.5s;
          border-bottom: 1px solid transparent;
        }
        .nb--scrolled {
          background: rgba(18, 20, 29, 0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-color: var(--color-border);
        }

        /* ── Mark ─────────────────────────────────── */
        .nb__mark {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1rem;
          letter-spacing: 0.04em;
          color: var(--color-white);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 1px;
          user-select: none;
        }
        .nb__mark-bracket {
          color: var(--color-accent);
          font-size: 1.1rem;
          line-height: 1;
          transition: transform 0.3s var(--ease-default);
        }
        .nb__mark:hover .nb__mark-bracket:first-child {
          transform: translateX(-3px);
        }
        .nb__mark:hover .nb__mark-bracket:last-child {
          transform: translateX(3px);
        }
        .nb__mark-name {
          color: var(--color-white);
          padding: 0 2px;
        }

        /* ── Nav ──────────────────────────────────── */
        .nb__nav {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0;
        }

        /* sliding pill */
        .nb__pill {
          position: absolute;
          top: 50%;
          left: 0;
          height: 32px;
          border-radius: 2px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          transform: translateY(-50%);
          opacity: 0;
          pointer-events: none;
          transition:
            transform 0.35s var(--ease-default),
            width 0.35s var(--ease-default),
            opacity 0.2s;
          /* pill sits behind links */
          z-index: 0;
        }

        .nb__link {
          position: relative;
          z-index: 1;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-muted);
          text-decoration: none;
          padding: 0.5rem 0.85rem;
          transition: color 0.25s;
          white-space: nowrap;
        }
        .nb__link:hover,
        .nb__link--active {
          color: var(--color-white);
        }
        .nb__link--active::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--color-accent);
        }

        /* ── Right ────────────────────────────────── */
        .nb__right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        /* live clock */
        .nb__clock {
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--color-muted);
          opacity: 0.55;
          font-variant-numeric: tabular-nums;
          /* hide on very small screens */
        }

        /* hire badge */
        .nb__hire {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-dark);
          background: var(--color-accent);
          padding: 0.4rem 0.9rem;
          border-radius: 2px;
          text-decoration: none;
          transition: background 0.25s, transform 0.2s;
          white-space: nowrap;
        }
        .nb__hire:hover {
          background: #D5FD74;
          color: #000;
          transform: translateY(-1px);
        }
        .nb__hire-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-dark);
          animation: pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }

        /* ── Responsive ───────────────────────────── */
        @media (max-width: 600px) {
          .nb__clock { display: none; }
          .nb__nav   { gap: 0; }
          .nb__link  { padding: 0.5rem 0.6rem; font-size: 0.72rem; }
          .nb__hire  { padding: 0.35rem 0.7rem; }
        }
      `}</style>
    </header>
  );
}