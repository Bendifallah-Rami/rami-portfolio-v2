'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function WhyChooseCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const whyChooseMe = [
    {
      title: 'Performance at Scale',
      description: 'Optimized architectures and efficient database queries ensure your application stays fast, even as user load increases. I focus on reducing latency and maximizing throughput without compromising reliability.',
      highlight: '40% faster to market'
    },
    {
      title: 'Enterprise-Grade Security',
      description: 'Comprehensive security implementations including authentication, authorization, data encryption, and compliance standards. Every layer is designed with security best practices to protect your business and users.',
      highlight: 'Production-ready systems'
    },
    {
      title: 'Clean, Maintainable Code',
      description: 'Well-structured codebase with comprehensive documentation and clear architecture. Your team can understand, modify, and extend the code with confidence without requiring constant external support.',
      highlight: 'Full technical handoff'
    },
    {
      title: 'Reliability & Resilience',
      description: 'Systems built to handle real-world edge cases, traffic spikes, and failures gracefully. Includes monitoring, logging, and recovery mechanisms to ensure 99.9% uptime and seamless user experience.',
      highlight: 'Battle-tested patterns'
    },
    {
      title: 'Transparent Communication',
      description: 'Clear milestones, regular updates, and honest assessments throughout the project. No surprises—you&apos;ll understand the technical decisions, timeline, and budget at every stage.',
      highlight: 'Collaborative partnership'
    },
    {
      title: 'Post-Launch Support',
      description: 'Comprehensive knowledge transfer and ongoing support after launch. I document systems thoroughly and provide training to ensure your team can maintain and evolve the product independently.',
      highlight: 'Empowering your team'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % whyChooseMe.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [whyChooseMe.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + whyChooseMe.length) % whyChooseMe.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % whyChooseMe.length);
  };

  return (
    <section className="relative px-6 py-12">
      <div className="pointer-events-none absolute top-0 -right-40 h-96 w-96 rounded-full bg-(--color-accent)/6 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="m-0 mb-4 [font-family:var(--font-display)] text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.03em] text-white">
            Why Clients <span className="text-(--color-accent)">Choose Me</span>
          </h2>
          <p className="mx-auto max-w-[60ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
            Real, measurable value delivered on every project
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="mx-auto max-w-3xl">
            {/* Slide Display */}
            <div className="mb-8 overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface)/40 p-12 backdrop-blur-sm">
              <div className="min-h-85 flex flex-col justify-center">
                <div
                  key={currentSlide}
                  className="animate-fade-in"
                >
                  <div className="mb-4 inline-block rounded-full bg-(--color-accent)/12 border border-(--color-accent)/30 px-4 py-1.5">
                    <span className="text-xs font-semibold text-(--color-accent) [font-family:var(--font-display)]">
                      {whyChooseMe[currentSlide].highlight}
                    </span>
                  </div>
                  
                  <h3 className="m-0 mb-6 [font-family:var(--font-display)] text-4xl font-black tracking-[-0.02em] text-white">
                    {whyChooseMe[currentSlide].title}
                  </h3>
                  
                  <p className="m-0 text-[1.05rem] leading-[1.8] text-(--color-muted) [font-family:var(--font-body)]">
                    {whyChooseMe[currentSlide].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between gap-6">
              <button
                onClick={handlePrev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface)/40 text-(--color-accent) transition-all duration-300 hover:bg-(--color-surface)/70 hover:border-(--color-accent)/60"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {whyChooseMe.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? 'w-8 bg-(--color-accent)'
                        : 'w-2.5 bg-(--color-border) hover:bg-(--color-accent)/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface)/40 text-(--color-accent) transition-all duration-300 hover:bg-(--color-surface)/70 hover:border-(--color-accent)/60"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Slide Counter */}
            <div className="mt-8 text-center text-sm text-(--color-muted) [font-family:var(--font-display)]">
              <span className="font-semibold text-(--color-accent)">{currentSlide + 1}</span> / {whyChooseMe.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
