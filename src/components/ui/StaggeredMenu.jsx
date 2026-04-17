'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function StaggeredMenu({
  position = 'right',
  colors = ['rgba(189,250,92,0.12)', 'rgba(26,28,39,0.9)', 'rgba(18,20,29,0.98)'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className = '',
  logoUrl = '/logo.png',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  changeMenuColorOnOpen = true,
  isFixed = false,
  accentColor = '#5227FF',
  panelWidth = 'clamp(320px, 42vw, 560px)',
  panelHeight = '100dvh',
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) {
  const [open, setOpen] = useState(false);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);
  const [mobileViewportHeight, setMobileViewportHeight] = useState(() =>
    typeof window !== 'undefined' ? (window.visualViewport?.height ?? window.innerHeight) : null
  );

  const openRef = useRef(false);

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  const lineTopRef = useRef(null);
  const lineMiddleRef = useRef(null);
  const lineBottomRef = useRef(null);
  const iconRef = useRef(null);

  const textInnerRef = useRef(null);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);

  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);

  useEffect(() => {
    if (!isFixed || typeof window === 'undefined') return undefined;

    const viewport = window.visualViewport;

    const updateViewportHeight = () => {
      const nextHeight = viewport?.height ?? window.innerHeight;
      setMobileViewportHeight((prev) => (prev === nextHeight ? prev : nextHeight));
    };

    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);
    viewport?.addEventListener('resize', updateViewportHeight);

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
      viewport?.removeEventListener('resize', updateViewportHeight);
    };
  }, [isFixed]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const topLine = lineTopRef.current;
      const middleLine = lineMiddleRef.current;
      const bottomLine = lineBottomRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !topLine || !middleLine || !bottomLine || !icon || !textInner) return;

      const preLayers = preContainer
        ? Array.from(preContainer.querySelectorAll('.sm-prelayer'))
        : [];
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });

      gsap.set(topLine, { y: -5, rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(middleLine, { y: 0, opacity: 1, scaleX: 1, transformOrigin: '50% 50%' });
      gsap.set(bottomLine, { y: 5, rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });

      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    });

    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    );
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const layerStates = layers.map((el) => ({
      el,
      start: Number(gsap.getProperty(el, 'xPercent')),
    }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: 'power4.out' },
        i * 0.07
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;

      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' },
        },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.08, from: 'start' },
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) {
        tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      }

      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => gsap.set(socialLinks, { clearProps: 'opacity' }),
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;

    const tl = buildOpenTimeline();
    if (!tl) {
      busyRef.current = false;
      return;
    }

    tl.eventCallback('onComplete', () => {
      busyRef.current = false;
    });
    tl.play(0);
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    closeTweenRef.current?.kill();

    const all = [...layers, panel];
    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        );
        if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });

        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    const topLine = lineTopRef.current;
    const middleLine = lineMiddleRef.current;
    const bottomLine = lineBottomRef.current;
    if (!icon || !topLine || !middleLine || !bottomLine) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(topLine, { y: 0, rotate: 45, duration: 0.38 }, 0)
        .to(middleLine, { opacity: 0, scaleX: 0.2, duration: 0.25 }, 0)
        .to(bottomLine, { y: 0, rotate: -45, duration: 0.38 }, 0);
      return;
    }

    spinTweenRef.current = gsap
      .timeline({ defaults: { ease: 'power3.inOut' } })
      .to(topLine, { y: -5, rotate: 0, duration: 0.32 }, 0)
      .to(middleLine, { opacity: 1, scaleX: 1, duration: 0.22 }, 0)
      .to(bottomLine, { y: 5, rotate: 0, duration: 0.32 }, 0)
      .to(icon, { rotate: 0, duration: 0.001 }, 0);
  }, []);

  const animateColor = useCallback(
    (opening) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;

      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]
  );

  useEffect(() => {
    if (!toggleBtnRef.current) return;

    if (changeMenuColorOnOpen) {
      const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
      gsap.set(toggleBtnRef.current, { color: targetColor });
      return;
    }

    gsap.set(toggleBtnRef.current, { color: menuButtonColor });
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;

    const seq = [currentLabel];
    let last = currentLabel;

    for (let i = 0; i < cycles; i += 1) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }

    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out',
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;

    openRef.current = false;
    setOpen(false);
    onMenuClose?.();

    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [animateColor, animateIcon, animateText, onMenuClose, playClose]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [animateColor, animateIcon, animateText, onMenuClose, onMenuOpen, playClose, playOpen]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return undefined;

    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [closeOnClickAway, closeMenu, open]);

  useEffect(() => {
    if (!open) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeMenu, open]);

  const panelPositionClass = position === 'left' ? 'left-0' : 'right-0';
  const preLayerPositionClass = position === 'left' ? 'left-0' : 'right-0';

  return (
    <div
      className={`sm-scope pointer-events-none z-120 ${
        isFixed ? 'fixed inset-0 w-full overflow-hidden' : 'h-full w-full'
      }`}
    >
      <div
        className={`${className ? `${className} ` : ''}staggered-menu-wrapper pointer-events-none relative h-full w-full`}
        style={{
          '--sm-accent': accentColor,
          '--sm-panel-width': panelWidth,
          '--sm-panel-height': panelHeight,
          '--sm-mobile-panel-height': mobileViewportHeight
            ? `${Math.round(mobileViewportHeight)}px`
            : '100svh',
        }}
        data-position={position}
        data-open={open || undefined}
      >
        <div
          ref={preLayersRef}
          className={`sm-prelayers pointer-events-none absolute top-0 bottom-0 ${preLayerPositionClass} z-5`}
          aria-hidden="true"
        >
          {(colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'])
            .filter((_, idx, arr) => {
              if (arr.length < 3) return true;
              const mid = Math.floor(arr.length / 2);
              return idx !== mid;
            })
            .map((color, idx) => (
              <div
                key={`${color}-${idx}`}
                className={`sm-prelayer absolute top-0 ${preLayerPositionClass} h-full w-full translate-x-0`}
                style={{ background: color }}
              />
            ))}
        </div>

        <header
          className="staggered-menu-header pointer-events-none absolute top-0 left-0 z-20 flex w-full items-center justify-between bg-transparent p-5 sm:p-[2em]"
          aria-label="Main navigation header"
        >
          <div className="sm-logo pointer-events-auto flex select-none items-center" aria-label="Logo">
            <Image
              src={logoUrl || '/logo.png'}
              alt="Logo"
              className="sm-logo-img block object-contain"
              width={110}
              height={32}
              style={{ width: 'auto', height: '32px' }}
              priority
            />
          </div>

          <button
            ref={toggleBtnRef}
            className="sm-toggle pointer-events-auto relative inline-flex cursor-pointer items-center gap-2 overflow-visible rounded-full border border-(--color-border) bg-(--color-surface)/60 px-4 py-2 text-sm font-semibold leading-none text-[#e9e9ef] shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span
              className="sm-toggle-textWrap relative inline-block h-[1em] min-w-(--sm-toggle-width,auto) w-(--sm-toggle-width,auto) overflow-hidden whitespace-nowrap"
              aria-hidden="true"
            >
              <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
                {textLines.map((line, idx) => (
                  <span className="sm-toggle-line block h-[1em] leading-none" key={`${line}-${idx}`}>
                    {line}
                  </span>
                ))}
              </span>
            </span>

            <span
              ref={iconRef}
              className="sm-icon relative inline-flex h-4 w-4 shrink-0 items-center justify-center will-change-transform"
              aria-hidden="true"
            >
              <span
                ref={lineTopRef}
                className="sm-icon-line absolute top-1/2 left-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 rounded-xs bg-current will-change-transform"
              />
              <span
                ref={lineMiddleRef}
                className="sm-icon-line absolute top-1/2 left-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 rounded-xs bg-current will-change-transform"
              />
              <span
                ref={lineBottomRef}
                className="sm-icon-line absolute top-1/2 left-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 rounded-xs bg-current will-change-transform"
              />
            </span>
          </button>
        </header>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className={`staggered-menu-panel pointer-events-auto absolute top-0 ${panelPositionClass} z-10 flex h-full flex-col overflow-hidden border-l border-(--color-border) bg-(--color-surface)/95 p-[5rem_1.7rem_1.6rem_1.7rem] backdrop-blur-md`}
          style={{ WebkitBackdropFilter: 'blur(12px)' }}
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex flex-1 flex-col gap-4">
            <ul
              className="sm-panel-list m-0 flex list-none flex-col gap-1 p-0"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items.length ? (
                items.map((item, idx) => (
                  <li
                    className="sm-panel-itemWrap relative overflow-hidden leading-none"
                    key={`${item.label}-${idx}`}
                  >
                    <a
                      className="sm-panel-item relative isolate block w-full cursor-pointer rounded-md text-[clamp(1.4rem,4.2vw,2.9rem)] [font-family:var(--font-display)] font-black leading-none tracking-[-0.03em] text-white no-underline uppercase transition-colors duration-200 ease-linear"
                      href={item.link}
                      aria-label={item.ariaLabel || `Go to ${item.label}`}
                      data-index={idx + 1}
                      onClick={closeMenu}
                    >
                      <span className="sm-panel-itemLabel relative z-10 inline-block origin-[50%_100%] will-change-transform">
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))
              ) : (
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">
                  <span className="sm-panel-item relative block w-full cursor-default text-[clamp(1.4rem,4.2vw,2.9rem)] [font-family:var(--font-display)] font-black leading-none tracking-[-0.03em] text-white uppercase">
                    <span className="sm-panel-itemLabel relative z-10 inline-block origin-[50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {displaySocials && socialItems.length > 0 && (
              <div className="sm-socials mt-auto flex flex-col gap-2 pt-6" aria-label="Social links">
                <h3 className="sm-socials-title m-0 text-sm font-semibold uppercase tracking-[0.14em] text-(--sm-accent,#ff0000)">
                  Socials
                </h3>
                <ul className="sm-socials-list m-0 flex list-none flex-row flex-wrap items-center gap-4 p-0" role="list">
                  {socialItems.map((social, idx) => {
                    const isExternal = /^https?:\/\//.test(social.link);
                    return (
                      <li key={`${social.label}-${idx}`} className="sm-socials-item">
                        <a
                          href={social.link}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className="sm-socials-link relative inline-block py-0.5 text-[1rem] font-semibold text-white/90 no-underline transition-[color,opacity] duration-300 ease-linear"
                          onClick={closeMenu}
                        >
                          {social.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
.sm-scope .staggered-menu-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.sm-scope .staggered-menu-header > * {
  pointer-events: auto;
}
.sm-scope .sm-logo {
  display: flex;
  align-items: center;
  user-select: none;
}
.sm-scope .sm-logo-img {
  display: block;
  object-fit: contain;
}
.sm-scope .sm-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 1px solid var(--color-border);
  cursor: pointer;
  color: #e9e9ef;
  font-weight: 600;
  line-height: 1;
  overflow: visible;
}
.sm-scope .sm-toggle:focus-visible {
  outline: 2px solid var(--sm-accent, #BDFA5C);
  outline-offset: 4px;
  border-radius: 9999px;
}
.sm-scope .sm-toggle-textWrap {
  position: relative;
  margin-right: 0.5em;
  display: inline-block;
  height: 1em;
  overflow: hidden;
  white-space: nowrap;
  width: var(--sm-toggle-width, auto);
  min-width: var(--sm-toggle-width, auto);
}
.sm-scope .sm-toggle-textInner {
  display: flex;
  flex-direction: column;
  line-height: 1;
}
.sm-scope .sm-toggle-line {
  display: block;
  height: 1em;
  line-height: 1;
}
.sm-scope .sm-icon {
  position: relative;
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
}
.sm-scope .sm-icon-line {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 16px;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transform: translate(-50%, -50%);
  will-change: transform;
}
.sm-scope .staggered-menu-panel {
  position: absolute;
  top: 0;
  width: var(--sm-panel-width, clamp(320px, 42vw, 560px));
  height: var(--sm-panel-height, 100dvh);
  background: linear-gradient(160deg, rgba(26, 28, 39, 0.97) 0%, rgba(18, 20, 29, 0.98) 100%);
  color: var(--color-white);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  padding: 5rem 1.7rem 1.6rem 1.7rem;
  overflow: hidden;
  border-left: 1px solid var(--color-border);
  box-shadow: -24px 0 56px rgba(0, 0, 0, 0.45);
}
.sm-scope .sm-prelayers {
  position: absolute;
  top: 0;
  width: var(--sm-panel-width, clamp(320px, 42vw, 560px));
  height: var(--sm-panel-height, 100dvh);
  pointer-events: none;
}
.sm-scope .sm-prelayer {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  transform: translateX(0);
}
.sm-scope .sm-panel-itemWrap {
  position: relative;
  overflow: hidden;
  line-height: 1;
  width: 100%;
}
.sm-scope .sm-panel-item {
  position: relative;
  isolation: isolate;
  width: 100%;
  padding: 0.05em 0.7em 0.11em 0.36em;
}
.sm-scope .sm-panel-item::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0.64rem;
  background: var(--sm-accent, #BDFA5C);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}
.sm-scope .sm-panel-item:hover {
  color: var(--color-dark);
}
.sm-scope .sm-panel-item:hover::before,
.sm-scope .sm-panel-item:focus-visible::before {
  transform: scaleX(1);
}
.sm-scope .sm-panel-item:focus-visible {
  outline: none;
  color: var(--color-dark);
}
.sm-scope .sm-panel-list[data-numbering] {
  counter-reset: smItem;
}
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item {
  padding-right: 3.6rem;
}
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
  counter-increment: smItem;
  content: counter(smItem, decimal-leading-zero);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.82rem;
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--sm-accent, #BDFA5C);
  letter-spacing: 0.08em;
  pointer-events: none;
  user-select: none;
  opacity: var(--sm-num-opacity, 0);
  z-index: 2;
}
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item:hover::after,
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item:focus-visible::after {
  color: var(--color-dark);
}
.sm-scope .sm-socials-list .sm-socials-link {
  opacity: 1;
  transition: opacity 0.3s ease;
}
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) {
  opacity: 0.35;
}
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) {
  opacity: 0.35;
}
.sm-scope .sm-socials-list .sm-socials-link:hover,
.sm-scope .sm-socials-list .sm-socials-link:focus-visible {
  opacity: 1;
  color: var(--sm-accent, #BDFA5C);
}
.sm-scope .sm-socials-link:focus-visible {
  outline: 2px solid var(--sm-accent, #BDFA5C);
  outline-offset: 3px;
}
@media (max-width: 1024px) {
  .sm-scope .staggered-menu-panel,
  .sm-scope .sm-prelayers {
    width: 100%;
    left: 0;
    right: 0;
    height: var(--sm-mobile-panel-height, 100svh);
  }

  .sm-scope .staggered-menu-panel {
    padding: 4.8rem 1.2rem calc(1.25rem + env(safe-area-inset-bottom)) 1.2rem;
  }
}
      `}</style>
    </div>
  );
}
