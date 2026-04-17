'use client';

import { useRef, useEffect, useState } from 'react';
import { techArsenal } from '../../data/techArsenal';

export default function TechArsenalCarousel() {
  const trackRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const offsetRef = useRef(0);
  const speedRef = useRef(1);
  const animationIdRef = useRef(null);
  const clonedRef = useRef(false);

  // Clone items only once on mount
  useEffect(() => {
    const track = trackRef.current;
    if (!track || clonedRef.current) return;

    const items = Array.from(track.querySelectorAll('.tech-item'));
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
    
    clonedRef.current = true;
  }, []);

  // Animation loop - separate from cloning
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !clonedRef.current) return;

    const animate = () => {
      const currentSpeed = isHovered ? 0 : speedRef.current;
      offsetRef.current += currentSpeed;
      
      const totalWidth = track.scrollWidth / 2;
      if (offsetRef.current >= totalWidth) {
        offsetRef.current = 0;
      }

      track.style.transform = `translateX(-${offsetRef.current}px)`;
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, [isHovered]);

  const allTechs = techArsenal.flatMap((category) =>
    category.items.map((tech) => ({
      ...tech,
      category: category.category,
    }))
  );

  return (
    <section className="relative px-6 py-12 overflow-hidden">
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="m-0 mb-4 [font-family:var(--font-display)] text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.03em] text-white">
            My Tech <span className="text-(--color-accent)">Arsenal</span>
          </h2>
          <p className="mx-auto max-w-[60ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
            I specialize in production-grade technologies that scale. Here&apos;s what I use to build reliable, fast, and maintainable systems.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Fade overlays */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-(--color-dark) to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-(--color-dark) to-transparent z-10" />

          {/* Scrolling Track */}
          <div
            ref={trackRef}
            className="flex gap-6 py-6"
            style={{
              width: 'fit-content',
            }}
          >
            {allTechs.map((tech, idx) => (
              <div
                key={`${tech.name}-${idx}`}
                className="tech-item shrink-0 w-80 rounded-2xl border border-(--color-border) bg-(--color-surface)/30 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-(--color-surface)/50 hover:border-(--color-accent)/40"
              >
                <div className="mb-3 inline-block rounded-lg bg-(--color-accent)/12 border border-(--color-accent)/30 px-3 py-1">
                  <span className="text-xs font-semibold text-(--color-accent) [font-family:var(--font-display)]">
                    {tech.category}
                  </span>
                </div>
                <h3 className="m-0 mb-2 text-lg font-black text-white [font-family:var(--font-display)]">
                  {tech.name}
                </h3>
                <p className="m-0 text-sm text-(--color-muted) [font-family:var(--font-body)]">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
