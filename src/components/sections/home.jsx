"use client";

import { useEffect, useRef, useState } from "react";

const hero = {
  title: "Web development & API Design",
  contact: {
    email: "nr_bendifallah@esi.dz",
    label: "Let's Talk",
  },
  description:
    "Hi, I'm Rami a full-stack developer focused on backend development. I build scalable APIs, databases, and functional frontends using different technologies.",
};

export default function Hero() {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dot grid animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let mouse = { x: -999, y: -999 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const GAP = 36;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      const cols = Math.ceil(canvas.width / GAP) + 1;
      const rows = Math.ceil(canvas.height / GAP) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GAP;
          const y = r * GAP;
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / 160);
          const wave = Math.sin(t + c * 0.3 + r * 0.3) * 0.5 + 0.5;
          const alpha = 0.06 + wave * 0.04 + proximity * 0.5;
          const size = 1 + proximity * 2.5;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle =
            proximity > 0.1
              ? `rgba(189, 250, 92, ${alpha})`
              : `rgba(184, 185, 187, ${alpha})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section className="hero-section">
      {/* Dot grid canvas */}
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      {/* Accent vertical line */}
      <div className="hero-line" aria-hidden="true" />

      {/* Content */}
      <div className={`hero-content ${mounted ? "hero-content--visible" : ""}`}>

        {/* Top label */}
        <div className="hero-label">
          <span className="hero-label__dot" />
          <span>Available for work</span>
        </div>

        {/* Main heading */}
        <h1 className="hero-heading">
          <span className="hero-heading__line">Web</span>
          <span className="hero-heading__line">development</span>
          <span className="hero-heading__line hero-heading__line--accent">
            &amp; API Design
          </span>
        </h1>

        {/* Description + CTA row */}
        <div className="hero-bottom">
          <p className="hero-description">{hero.description}</p>

          <div className="hero-cta">
            <a
              href={`mailto:${hero.contact.email}`}
              className="hero-cta__btn btn-accent"
            >
              {hero.contact.label}
              <span className="hero-cta__arrow" aria-hidden="true">↗</span>
            </a>
            <a href="#projects" className="hero-cta__ghost">
              See my work
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="hero-strip">
          <a
            href={`mailto:${hero.contact.email}`}
            className="hero-strip__email"
          >
            {hero.contact.email}
          </a>

          <div className="hero-strip__scroll" aria-label="Scroll down">
            <span className="hero-strip__scroll-text">Scroll</span>
            <span className="hero-strip__scroll-bar">
              <span className="hero-strip__scroll-thumb" />
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          background-color: var(--color-dark);
          overflow: hidden;
          padding: 0 clamp(1.5rem, 6vw, 7rem);
        }
        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .hero-section:hover .hero-canvas {
          pointer-events: auto;
        }
        .hero-line {
          position: absolute;
          top: 0;
          left: clamp(1.5rem, 6vw, 7rem);
          width: 1px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            var(--color-accent) 30%,
            var(--color-accent) 70%,
            transparent 100%
          );
          opacity: 0.18;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1100px;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          padding: 6rem 0 5rem;
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.9s var(--ease-default),
            transform 0.9s var(--ease-default);
        }
        .hero-content--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-muted);
          animation: fadeSlideUp 0.7s var(--ease-default) 0.1s both;
        }
        .hero-label__dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-accent);
          box-shadow: 0 0 8px var(--color-accent);
          animation: pulse 2.4s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--color-accent); }
          50%       { opacity: 0.6; box-shadow: 0 0 18px var(--color-accent); }
        }
        .hero-heading {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(3rem, 9vw, 7.5rem);
          line-height: 1.0;
          letter-spacing: -0.03em;
          color: var(--color-white);
          display: flex;
          flex-direction: column;
          gap: 0.05em;
          margin: 0;
        }
        .hero-heading__line {
          display: block;
          animation: fadeSlideUp 0.8s var(--ease-default) both;
        }
        .hero-heading__line:nth-child(1) { animation-delay: 0.15s; }
        .hero-heading__line:nth-child(2) { animation-delay: 0.25s; }
        .hero-heading__line:nth-child(3) { animation-delay: 0.35s; }
        .hero-heading__line--accent {
          color: var(--color-accent);
          text-shadow: 0 0 80px rgba(189, 250, 92, 0.25);
        }
        .hero-bottom {
          display: flex;
          align-items: flex-end;
          gap: 3rem;
          flex-wrap: wrap;
          animation: fadeSlideUp 0.8s var(--ease-default) 0.45s both;
        }
        .hero-description {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.4vw, 1.1rem);
          color: var(--color-muted);
          line-height: 1.8;
          max-width: 42ch;
          margin: 0;
          flex: 1 1 280px;
        }
        .hero-cta {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-shrink: 0;
        }
        .hero-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.75rem 1.6rem;
          border-radius: 3px;
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .hero-cta__arrow {
          font-size: 1rem;
          transition: transform 0.3s var(--ease-default);
        }
        .hero-cta__btn:hover .hero-cta__arrow {
          transform: translate(2px, -2px);
        }
        .hero-cta__ghost {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--color-muted);
          letter-spacing: 0.02em;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.25s;
        }
        .hero-cta__ghost::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          width: 0; height: 1px;
          background: var(--color-accent);
          transition: width 0.35s var(--ease-default);
        }
        .hero-cta__ghost:hover { color: var(--color-white); }
        .hero-cta__ghost:hover::after { width: 100%; }
        .hero-strip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-border);
          animation: fadeSlideUp 0.8s var(--ease-default) 0.55s both;
        }
        .hero-strip__email {
          font-family: var(--font-body);
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          color: var(--color-muted);
          transition: color 0.2s;
        }
        .hero-strip__email:hover { color: var(--color-accent); }
        .hero-strip__scroll {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .hero-strip__scroll-text {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-muted);
          opacity: 0.6;
        }
        .hero-strip__scroll-bar {
          position: relative;
          width: 1px;
          height: 42px;
          background: var(--color-border);
          overflow: hidden;
        }
        .hero-strip__scroll-thumb {
          position: absolute;
          top: -100%;
          left: 0;
          width: 1px;
          height: 50%;
          background: var(--color-accent);
          animation: scrollBar 1.8s ease-in-out infinite;
        }
        @keyframes scrollBar {
          0%   { top: -50%; }
          100% { top: 150%; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .hero-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.75rem;
          }
          .hero-cta {
            flex-direction: column;
            align-items: flex-start;
          }
          .hero-strip {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-label__dot,
          .hero-strip__scroll-thumb { animation: none; }
          .hero-content {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .hero-heading__line,
          .hero-label,
          .hero-bottom,
          .hero-strip { animation: none; }
        }
      `}</style>
    </section>
  );
}