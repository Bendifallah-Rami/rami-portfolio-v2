'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';
const COOKIE_KEY = 'theme';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const isThemeValue = (value) => value === 'light' || value === 'dark';

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

const readStoredTheme = () => {
  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    return isThemeValue(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
};

const persistTheme = (theme) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Ignore storage write failures (private mode/restricted environments).
  }

  document.cookie = `${COOKIE_KEY}=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};

const applyTheme = (theme, persist = true) => {
  document.documentElement.setAttribute('data-theme', theme);
  if (persist) persistTheme(theme);
};

export default function ThemeToggle({ initialTheme = 'dark', hasStoredTheme = false }) {
  const safeInitialTheme = isThemeValue(initialTheme) ? initialTheme : 'dark';
  const [theme, setTheme] = useState(safeInitialTheme);

  useEffect(() => {
    const storedTheme = readStoredTheme();
    const followSystem = !storedTheme && !hasStoredTheme;
    const resolvedTheme = storedTheme ?? (followSystem ? getSystemTheme() : safeInitialTheme);
    const shouldPersist = Boolean(storedTheme || hasStoredTheme);

    applyTheme(resolvedTheme, shouldPersist);
    setTheme(resolvedTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemThemeChange = () => {
      if (readStoredTheme()) return;
      if (hasStoredTheme) return;

      const nextTheme = getSystemTheme();
      applyTheme(nextTheme, false);
      setTheme(nextTheme);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }

    mediaQuery.addListener(handleSystemThemeChange);
    return () => mediaQuery.removeListener(handleSystemThemeChange);
  }, [hasStoredTheme, safeInitialTheme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
    setTheme(nextTheme);
  };

  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      className="fixed right-4 bottom-4 z-140 inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface)/90 text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur-md transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-(--color-accent)/60 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-accent)"
    >
      {isLight ? <Moon className="h-5 w-5" aria-hidden="true" /> : <Sun className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
}
