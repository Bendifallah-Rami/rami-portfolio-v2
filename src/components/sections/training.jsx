'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Calendar, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import { trainingItems } from '../../data/training';

export default function Training() {
  const items = useMemo(() => trainingItems.slice(0, 3), []);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!items.length) return null;

  return (
    <section
      id="training"
      className="relative py-16 md:py-24 [font-family:var(--font-body)]"
    >
      <div className="pointer-events-none absolute top-8 -left-12 h-72 w-72 rounded-full bg-(--color-accent)/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-(--color-accent)/10 blur-[110px]" />

      <div className="container mx-auto px-6">
        <div className="mb-14 max-w-4xl">
          <h2 className="m-0 mb-6 leading-none [font-family:var(--font-display)] text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.03em] text-white">
            TRAINING <span className="text-(--color-accent)">EXPERIENCE</span>
          </h2>
          <p className="m-0 max-w-[58ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
            A curated set of training experiences that helped sharpen my product thinking,
            engineering fundamentals, and real-world delivery practices.
          </p>
        </div>

        <div
          className="flex flex-col gap-5 lg:flex-row lg:items-stretch"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {items.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const hasHovered = hoveredIndex !== null;
            const hoverClass = isHovered
              ? 'lg:flex-[1.16] lg:scale-[1.015] lg:-translate-y-0.5 lg:z-20'
              : hasHovered
                ? 'lg:flex-[0.92] lg:scale-[0.985] lg:opacity-85'
                : 'lg:flex-1';

            return (
              <article
                key={item.title}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`group relative overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface)/55 shadow-[0_10px_30px_rgba(0,0,0,0.24)] transition-[flex-grow,transform,opacity,border-color,box-shadow,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:will-change-[transform,opacity] hover:border-(--color-accent)/45 hover:bg-(--color-surface)/70 hover:shadow-[0_20px_48px_rgba(0,0,0,0.36)] ${hoverClass}`}
              >
                <div className="relative h-56 w-full overflow-hidden bg-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />

                  <span className="absolute right-4 top-4 rounded-md border border-(--color-accent)/30 bg-black/45 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-(--color-accent)">
                    Training
                  </span>
                </div>

                <div className="p-5">
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-lg border border-(--color-border) bg-(--color-dark)/45 px-3 py-1.5 text-[0.76rem] text-(--color-muted) transition-all duration-300 group-hover:border-(--color-accent)/35 group-hover:text-white/85">
                    <Calendar size={12} className="text-(--color-accent)/75" />
                    {item.period}
                  </div>

                  <h3 className="m-0 mb-3 [font-family:var(--font-display)] text-[1.35rem] font-bold leading-tight tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-(--color-accent)">
                    {item.title}
                  </h3>

                  <p className="m-0 mb-4 text-[0.95rem] leading-[1.75] text-(--color-muted) transition-colors duration-300 group-hover:text-white/80">
                    {item.description}
                  </p>

                  <div className="space-y-2">
                    {item.points.map((point) => (
                      <div key={point} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-(--color-accent) transition-transform duration-300 group-hover:scale-110" />
                        <p className="m-0 text-[0.88rem] leading-6 text-(--color-muted) transition-colors duration-300 group-hover:text-white/85">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            href="/training"
            className="inline-flex items-center gap-2 text-sm"
            style={{
              fontFamily: 'var(--font-display)',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-ink)',
            }}
          >
            Explore Training Page
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
