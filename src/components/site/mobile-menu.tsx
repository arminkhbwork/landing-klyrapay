"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { ThemeToggle } from "@/components/site/theme-toggle";

export function MobileMenu({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [isOpen, setIsOpen] = useState(false);
  // Avoid hydration mismatches without setState-in-effect:
  // - server snapshot: false (no portal)
  // - client snapshot: true (portal enabled post-hydration)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const nav = [
    { label: dict.nav.features, href: localePath(locale, "/#features") },
    { label: dict.nav.rails, href: localePath(locale, "/#rails") },
    { label: dict.nav.proof, href: localePath(locale, "/#case-study") },
    { label: dict.nav.security, href: localePath(locale, "/#security") },
    { label: dict.nav.faq, href: localePath(locale, "/#faq") },
    // Must be last item (per your spec)
    { label: dict.nav.project, href: localePath(locale, "/project") },
  ] as const;

  const menuContent = (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[9998] bg-zinc-950/25 backdrop-blur-sm transition-opacity duration-300 md:hidden dark:bg-zinc-950/60",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed inset-0 z-[9999] flex flex-col gap-8 overflow-y-auto bg-white/85 p-6 pt-6 text-zinc-900 backdrop-blur-xl transition-all duration-300 md:hidden dark:bg-gradient-to-br dark:from-indigo-950 dark:via-violet-950 dark:to-fuchsia-950/25 dark:text-white",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        )}
      >
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-semibold text-white shadow-sm">
              KP
            </span>
            <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
              {siteConfig.name}
            </span>
          </div>
          <button
            type="button"
            onClick={closeMenu}
            className="relative z-[10000] flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/70 bg-white/60 shadow-sm backdrop-blur transition-all hover:border-zinc-300 hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
            aria-label="Close menu"
          >
            <svg
              className="h-5 w-5 text-zinc-900 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <LocaleSwitcher locale={locale} size="sm" />
          <ThemeToggle size="sm" />
        </div>

        <nav
          className="flex flex-1 flex-col gap-2"
          aria-label="Mobile navigation"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="group relative rounded-xl border border-zinc-200/70 bg-white/70 px-6 py-4 text-lg font-semibold text-zinc-900 shadow-sm backdrop-blur transition-all hover:border-indigo-300/70 hover:bg-white/85 hover:shadow-md hover:shadow-indigo-500/10 dark:border-white/5 dark:bg-white/5 dark:text-white dark:hover:border-violet-400/30 dark:hover:bg-gradient-to-r dark:hover:from-violet-500/10 dark:hover:to-fuchsia-500/10 dark:hover:shadow-lg dark:hover:shadow-violet-500/10"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute top-1/2 right-6 -translate-y-1/2 text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-violet-300">
                →
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 border-t border-zinc-200/70 pt-8 dark:border-white/10">
          <LinkButton
            href={siteConfig.githubRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="md"
            className="w-full justify-center"
            onClick={closeMenu}
          >
            GitHub
          </LinkButton>
          <LinkButton
            href={localePath(locale, "/#cta")}
            size="md"
            className="w-full justify-center bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 hover:from-indigo-600 hover:via-violet-600 hover:to-fuchsia-600"
            onClick={closeMenu}
          >
            {dict.cta.primary}
          </LinkButton>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-zinc-200/60 bg-white/50 shadow-sm backdrop-blur transition-all hover:border-zinc-300 hover:bg-white/70 md:hidden dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:hover:border-white/20 dark:hover:bg-white/10"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "h-0.5 w-6 origin-center rounded-full bg-zinc-900 transition-all duration-300 dark:bg-white",
            isOpen && "translate-y-2 rotate-45"
          )}
        />
        <span
          className={cn(
            "h-0.5 w-6 rounded-full bg-zinc-900 transition-all duration-300 dark:bg-white",
            isOpen && "opacity-0"
          )}
        />
        <span
          className={cn(
            "h-0.5 w-6 origin-center rounded-full bg-zinc-900 transition-all duration-300 dark:bg-white",
            isOpen && "-translate-y-2 -rotate-45"
          )}
        />
      </button>

      {mounted &&
        createPortal(
          <div data-open={isOpen ? "true" : "false"}>{menuContent}</div>,
          document.body
        )}
    </>
  );
}
