'use client';

import { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import gsap from 'gsap';

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = 'blob',
  filterStdDeviation = 30,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 100,
  mobileBreakpoint = 768,
  mobileScale = 0.45
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  const scaleFactor = isMobile ? mobileScale : 1;
  const scaledSizes = useMemo(
    () => sizes.map(size => Math.max(10, size * scaleFactor)),
    [sizes, scaleFactor]
  );
  const scaledInnerSizes = useMemo(
    () => innerSizes.map(size => Math.max(6, size * scaleFactor)),
    [innerSizes, scaleFactor]
  );

  const handleMove = useCallback(
    e => {
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x,
          y: y,
          xPercent: -50,
          yPercent: -50,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    },
    [fastDuration, slowDuration, fastEase, slowEase]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
    const syncViewport = () => setIsMobile(mediaQuery.matches);

    syncViewport();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', syncViewport);
    } else {
      mediaQuery.addListener(syncViewport);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', syncViewport);
      } else {
        mediaQuery.removeListener(syncViewport);
      }
    };
  }, [mobileBreakpoint]);

  useEffect(() => {
    const interactiveSelector = 'a, button, input, textarea, select, [role="button"], .btn-accent, .nav-card-link, .hero-cta__btn';

    const shrink = () => {
      blobsRef.current.forEach(el => {
        if (!el) return;
        gsap.to(el, {
          scale: isMobile ? 0.35 : 0.45,
          duration: 0.15,
          ease: 'power2.out',
          backgroundColor: '#8BC34A',
          opacity: 0.9
        });
      });
    };

    const grow = () => {
      blobsRef.current.forEach(el => {
        if (!el) return;
        gsap.to(el, {
          scale: 1,
          duration: 0.15,
          ease: 'power2.out',
          backgroundColor: fillColor
        });
      });
    };

    const onMouseOver = e => {
      if (e.target.closest(interactiveSelector)) {
        shrink();
      }
    };

    const onMouseOut = e => {
      if (e.target.closest(interactiveSelector)) {
        grow();
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, [handleMove, fillColor, isMobile]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex }}
    >
      {useFilter && (
        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden select-none cursor-default"
        style={{ filter: useFilter ? `url(#${filterId})` : undefined }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => (blobsRef.current[i] = el)}
            className="absolute will-change-transform"
            style={{
              width: scaledSizes[i] ?? scaledSizes[scaledSizes.length - 1] ?? sizes[i],
              height: scaledSizes[i] ?? scaledSizes[scaledSizes.length - 1] ?? sizes[i],
              left: 0,
              top: 0,
              borderRadius: blobType === 'circle' ? '50%' : '0',
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: `${shadowOffsetX * scaleFactor}px ${shadowOffsetY * scaleFactor}px ${shadowBlur * scaleFactor}px 0 ${shadowColor}`
            }}
          >
            <div
              className="absolute"
              style={{
                width: scaledInnerSizes[i] ?? scaledInnerSizes[scaledInnerSizes.length - 1] ?? innerSizes[i],
                height: scaledInnerSizes[i] ?? scaledInnerSizes[scaledInnerSizes.length - 1] ?? innerSizes[i],
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
