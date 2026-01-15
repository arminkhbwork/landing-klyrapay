import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/site/logo";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="border-t border-zinc-200/70 bg-white dark:border-white/10 dark:bg-zinc-950">
      <Container className="grid gap-8 py-12 sm:grid-cols-2">
        <div className="space-y-3">
          <Logo locale={locale} />
          <p className="max-w-sm text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {siteConfig.tagline}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:justify-self-end">
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-zinc-900 dark:text-white">
              Explore
            </p>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              <li>
                <Link
                  className="hover:underline"
                  href={localePath(locale, "/#features")}
                >
                  {dict.nav.features}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline"
                  href={localePath(locale, "/#rails")}
                >
                  {dict.nav.rails}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline"
                  href={localePath(locale, "/#faq")}
                >
                  {dict.nav.faq}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-zinc-900 dark:text-white">
              Project
            </p>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              <li>
                <Link
                  className="hover:underline"
                  href={localePath(locale, "/project")}
                >
                  {dict.nav.project}
                </Link>
              </li>
              <li>
                <a
                  className="hover:underline"
                  href={siteConfig.githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dict.cta.github}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
