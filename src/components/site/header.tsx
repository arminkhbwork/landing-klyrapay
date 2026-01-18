"use client";

import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { MobileMenu } from "@/components/site/mobile-menu";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { LocaleSwitcher } from "@/components/site/locale-switcher";

export function SiteHeader({
  className,
  locale,
  dict,
}: {
  className?: string;
  locale: Locale;
  dict: Dictionary;
}) {
  const nav = [
    { label: dict.nav.features, href: localePath(locale, "/#features") },
    { label: dict.nav.rails, href: localePath(locale, "/#rails") },
    { label: dict.nav.proof, href: localePath(locale, "/#case-study") },
    { label: dict.nav.security, href: localePath(locale, "/#security") },
    { label: dict.nav.faq, href: localePath(locale, "/#faq") },
    // Must be last item (per your spec)
    { label: dict.nav.project, href: localePath(locale, "/project") },
  ] as const;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-zinc-200/70 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:border-white/10 dark:bg-zinc-950/60 dark:backdrop-blur",
        className
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher locale={locale} className="hidden lg:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex" size="sm" />
          <LinkButton
            href={siteConfig.githubRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            GitHub
          </LinkButton>
          <LinkButton
            href={localePath(locale, "/#cta")}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {dict.cta.primary}
          </LinkButton>
          <MobileMenu locale={locale} dict={dict} />
        </div>
      </Container>
    </header>
  );
}
