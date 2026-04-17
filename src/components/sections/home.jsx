"use client";

import { useState, useEffect } from "react";
import Button from "../ui/Button";

const hero = {
  contact: {
    email: "nr_bendifallah@esi.dz",
    label: "Let's Talk",
  },
  description:
    "Hi, I'm Rami a full-stack developer focused on backend development. I build scalable APIs, databases, and functional frontends using different technologies.",
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className="relative min-h-svh flex items-center overflow-hidden px-[clamp(1.5rem,6vw,7rem)]"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Content */}
      <div
        className="relative z-10 w-full flex flex-col gap-8 md:gap-10 py-16 md:py-24"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Available label */}
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase"
          style={{
            color: "var(--color-muted)",
            fontFamily: "var(--font-body)",
            animation: "fadeSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both",
          }}
        >
          <span
            className="inline-block w-1.75 h-1.75 rounded-full"
            style={{
              backgroundColor: "var(--color-accent)",
              boxShadow: "0 0 8px var(--color-accent)",
              animation: "pulse 2.4s ease-in-out infinite",
            }}
          />
          Available for work
        </div>

        {/* Heading */}
        <h1
          className="flex flex-col m-0 leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(3rem, 9vw, 7.5rem)",
            letterSpacing: "-0.03em",
            gap: "0.05em",
          }}
        >
          <span
            style={{
              color: "var(--color-white)",
              animation: "fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both",
            }}
          >
            Web
          </span>
          <span
            style={{
              color: "var(--color-white)",
              animation: "fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both",
            }}
          >
            development
          </span>
          <span
            style={{
              color: "var(--color-accent)",
              textShadow: "0 0 80px rgba(189,250,92,0.2)",
              animation: "fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both",
            }}
          >
            &amp; API Design
          </span>
        </h1>

        {/* Description + CTA */}
        <div
          className="flex items-end flex-wrap justify-between "
          style={{ animation: "fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s both" }}
        >
          <p
            className="m-0 leading-[1.8] flex-[1_1_280px]"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem,1.4vw,1.1rem)",
              color: "var(--color-muted)",
              maxWidth: "42ch",
            }}
          >
            {hero.description}
          </p>

          <div className="flex items-center gap-5 mt-6">
            <Button
              href={`mailto:${hero.contact.email}`}
              className="text-sm"
              style={{ fontFamily: "var(--font-display)", backgroundColor: "var(--color-accent)", color: "var(--color-dark)" }}
            >
              {hero.contact.label}
              <span className="hero-arrow text-base">↗</span>
            </Button>

            <a
              href="#projects"
              className="hero-ghost relative pb-0.5 text-sm tracking-[0.02em] transition-colors duration-300"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-muted)",
              }}
            >
              See my work
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="flex justify-between items-center pt-6"
          style={{
            borderTop: "1px solid var(--color-border)",
            animation: "fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both",
          }}
        >
          <a
            href={`mailto:${hero.contact.email}`}
            className="text-[0.8rem] tracking-[0.08em] transition-colors duration-200 hero-email"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-muted)",
            }}
          >
            {hero.contact.email}
          </a>

          <div className="flex items-center gap-3">
            <span
              className="text-[0.72rem] tracking-[0.14em] uppercase opacity-60"
              style={{ color: "var(--color-muted)" }}
            >
              Scroll
            </span>
            <span
              className="relative w-px h-10.5 overflow-hidden"
              style={{ backgroundColor: "var(--color-border)" }}
            >
              <span
                className="absolute left-0 w-px h-1/2"
                style={{
                  backgroundColor: "var(--color-accent)",
                  animation: "scrollBar 1.8s ease-in-out infinite",
                }}
              />
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--color-accent); }
          50%       { opacity: 0.6; box-shadow: 0 0 18px var(--color-accent); }
        }
        @keyframes scrollBar {
          0%   { top: -50%; }
          100% { top: 150%; }
        }

        .hero-arrow {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .btn-accent:hover .hero-arrow {
          transform: translate(2px, -2px);
        }

        .hero-ghost::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          width: 0; height: 1px;
          background: var(--color-accent);
          transition: width 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .hero-ghost:hover {
          color: var(--color-white) !important;
        }
        .hero-ghost:hover::after { width: 100%; }

        .hero-email:hover { color: var(--color-accent) !important; }

        @media (max-width: 640px) {
          .hero-bottom { flex-direction: column; align-items: flex-start; gap: 1.75rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}