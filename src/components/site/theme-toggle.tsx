"use client";

import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const THEME_EVENT = "klyrapay-theme-change";

function getThemeSnapshot(): Theme {
  const root = document.documentElement;
  return root.classList.contains("dark") ? "dark" : "light";
}

function subscribeTheme(callback: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === "theme") callback();
  };

  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
  try {
    localStorage.setItem("theme", theme);
  } catch {}
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeToggle({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    () => "light"
  );

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      onClick={() => {
        const t: Theme = theme === "dark" ? "light" : "dark";
        applyTheme(t);
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white/70 text-zinc-900 shadow-sm backdrop-blur transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
        size === "sm" ? "h-9 w-9" : "h-10 w-10",
        className
      )}
    >
      {theme === "dark" ? (
        <svg
          viewBox="0 0 24 24"
          className={cn(size === "sm" ? "h-4 w-4" : "h-5 w-5")}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v2" />
          <path d="M12 19v2" />
          <path d="M4.22 4.22l1.42 1.42" />
          <path d="M18.36 18.36l1.42 1.42" />
          <path d="M3 12h2" />
          <path d="M19 12h2" />
          <path d="M4.22 19.78l1.42-1.42" />
          <path d="M18.36 5.64l1.42-1.42" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className={cn(size === "sm" ? "h-4 w-4" : "h-5 w-5")}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  );
}
