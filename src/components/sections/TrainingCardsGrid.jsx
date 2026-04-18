'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPrimaryTrainingImage, getTrainingImages } from '../../data/training';

const clampIndex = (index, total) => {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
};

export default function TrainingCardsGrid({ items = [] }) {
  const [imageIndexByCard, setImageIndexByCard] = useState({});

  const setImageIndex = (cardKey, nextIndex, total) => {
    setImageIndexByCard((prev) => ({
      ...prev,
      [cardKey]: clampIndex(nextIndex, total),
    }));
  };

  if (!items.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => {
        const cardKey = `${item.title}-${index}`;
        const images = getTrainingImages(item);
        const primaryImage = getPrimaryTrainingImage(item);
        const imageCount = images.length || 1;
        const activeIndex = clampIndex(imageIndexByCard[cardKey] ?? 0, imageCount);
        const activeImage = images[activeIndex] ?? primaryImage;
        const hasManyImages = imageCount > 1;

        return (
          <article
            key={cardKey}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface)/55 transition-[border-color,transform,background-color] duration-300 hover:-translate-y-1 hover:border-(--color-accent)/45 hover:bg-(--color-surface)/65"
          >
            <div className="relative h-55 w-full bg-black">
              <Image
                src={activeImage}
                alt={`${item.title} image ${activeIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              <span className="absolute left-4 top-4 rounded-md border border-(--color-accent)/45 bg-(--color-surface)/88 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-(--color-accent) shadow-[0_4px_12px_rgba(0,0,0,0.2)] backdrop-blur-sm">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-lg border border-(--color-border)/80 bg-(--color-surface)/88 px-3 py-1.5 text-[0.76rem] text-(--color-muted) shadow-[0_4px_12px_rgba(0,0,0,0.2)] backdrop-blur-sm">
                <Calendar size={12} className="text-(--color-accent)/75" />
                {item.period}
              </span>

              {hasManyImages && (
                <>
                  <span className="absolute left-4 bottom-4 rounded-md border border-(--color-border)/80 bg-(--color-surface)/88 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white  shadow-[0_4px_12px_rgba(0,0,0,0.2)] backdrop-blur-sm">
                    {activeIndex + 1} / {imageCount}
                  </span>

                  <div className="absolute right-4 bottom-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setImageIndex(cardKey, activeIndex - 1, imageCount)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface)/92 text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-[transform,border-color,background-color,color] duration-200 hover:-translate-y-px hover:border-(--color-accent)/65 hover:bg-(--color-accent)/15 hover:text-white"
                      aria-label={`Previous image for ${item.title}`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageIndex(cardKey, activeIndex + 1, imageCount)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface)/92 text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-[transform,border-color,background-color,color] duration-200 hover:-translate-y-px hover:border-(--color-accent)/65 hover:bg-(--color-accent)/15 hover:text-white"
                      aria-label={`Next image for ${item.title}`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {hasManyImages && (
              <div className="flex gap-2 overflow-x-auto border-t border-(--color-border)/60 bg-(--color-surface)/45 p-2">
                {images.map((imageSrc, imageIndex) => (
                  <button
                    key={`${cardKey}-${imageSrc}-${imageIndex}`}
                    type="button"
                    onClick={() => setImageIndex(cardKey, imageIndex, imageCount)}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                      imageIndex === activeIndex
                        ? 'border-(--color-accent)/65'
                        : 'border-(--color-border) hover:border-(--color-accent)/40'
                    }`}
                    aria-label={`Show image ${imageIndex + 1} for ${item.title}`}
                  >
                    <Image
                      src={imageSrc}
                      alt={`${item.title} thumbnail ${imageIndex + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-1 flex-col p-5">
              <h2 className="m-0 mb-3 [font-family:var(--font-display)] text-[1.35rem] font-bold leading-tight tracking-[-0.02em] text-white">
                {item.title}
              </h2>

              <p className="m-0 text-[0.95rem] leading-[1.75] text-(--color-muted)">{item.description}</p>

              <div className="mt-4 rounded-2xl border border-(--color-border)/60 bg-(--color-surface)/40 p-4">
                <p className="m-0 mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-(--color-accent)">
                  Key Outcomes
                </p>

                <div className="space-y-2.5">
                  {item.points.map((point) => (
                    <div key={point} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)" />
                      <p className="m-0 text-[0.88rem] leading-6 text-(--color-muted)">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
