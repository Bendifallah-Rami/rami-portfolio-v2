"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { links } from "../../data/navitems.js";

export default function Navbar() {
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-100 flex h-20 items-center justify-between border-b border-transparent px-[clamp(1.5rem,5vw,4rem)] transition-[background,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-(--color-border) bg-(--color-nav-bg) backdrop-blur-[18px]"
          : ""
      }`}
    >

      {/* Left — name mark */}
      <Link
        href="/"
        className="group flex select-none items-center gap-px text-base font-black tracking-[0.04em] text-white no-underline"
        aria-label="Home"
      >
        <span className="text-[1.1rem] leading-none text-(--color-accent) transition-transform duration-300 ease-(--ease-default) group-hover:-translate-x-0.75">
          [
        </span>
        <span className="px-0.5 text-white">RB</span>
        <span className="text-[1.1rem] leading-none text-(--color-accent) transition-transform duration-300 ease-(--ease-default) group-hover:translate-x-0.75">
          ]
        </span>
      </Link>

      {/* Center — nav links with underline hover */}
      <nav className="relative flex items-center" aria-label="Main navigation">

        {links.map(({ id, label, href }) => (
          <a
            key={id}
            href={href}
            className={`group relative z-1 whitespace-nowrap px-[0.85rem] py-2 text-[0.8rem] font-semibold uppercase tracking-[0.08em] no-underline transition-colors duration-200 ${
              active === id
                ? "text-white"
                : "text-(--color-muted) hover:text-white"
            } max-[600px]:px-[0.6rem] max-[600px]:text-[0.72rem]`}
            onClick={() => setActive(id)}
          >
            {label}
            <span
              className={`pointer-events-none absolute left-[0.85rem] right-[0.85rem] bottom-[0.35rem] h-[1.5px] origin-left bg-(--color-accent) transition-transform duration-300 ease-(--ease-default) max-[600px]:left-[0.6rem] max-[600px]:right-[0.6rem] ${
                active === id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
              aria-hidden="true"
            />
          </a>
        ))}
      </nav>

      {/* Right — live clock + hire badge */}
      <div className="flex items-center gap-6">
        <span
          className="text-[0.7rem] font-semibold tracking-widest text-(--color-muted) opacity-55 [font-variant-numeric:tabular-nums] max-[600px]:hidden"
          style={{ fontFamily: "var(--font-display)" }}
          aria-label="Current time"
        >
          {time}
        </span>
        <a
          href="#contact"
          className="inline-flex whitespace-nowrap items-center gap-[0.45rem] rounded-xs bg-(--color-accent) px-[0.9rem] py-[0.4rem] text-[0.72rem] font-bold uppercase tracking-widest text-(--color-ink) no-underline transition-[background,transform,color] duration-200 hover:-translate-y-px hover:bg-[#D5FD74] hover:text-(--color-ink) max-[600px]:px-[0.7rem] max-[600px]:py-[0.35rem]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-ink) animate-pulse" />
          Hire me
        </a>
      </div>
    </header>
  );
}