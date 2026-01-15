"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { locales, type Locale, stripLocalePrefix } from "@/lib/i18n";

const labels: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  es: "ES",
  fr: "FR",
};

export function LocaleSwitcher({
  locale,
  className,
  size = "md",
}: {
  locale: Locale;
  className?: string;
  size?: "sm" | "md";
}) {
  const pathname = usePathname();
  const rest = stripLocalePrefix(pathname ?? "/");

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl border border-zinc-200 bg-white/70 p-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5",
        className,
      )}
      aria-label="Language switcher"
    >
      {locales.map((l) => {
        const href =
          l === "en"
            ? `/${l}${rest === "/" ? "" : rest}`
            : `/${l}${rest === "/" ? "" : rest}`;
        const active = l === locale;
        return (
          <Link
            key={l}
            href={href}
            className={cn(
              "rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors",
              size === "sm" ? "px-2 py-1" : "",
              active
                ? "bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-sm shadow-indigo-500/20 dark:bg-none dark:bg-white dark:text-zinc-950 dark:shadow-none"
                : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10",
            )}
          >
            {labels[l]}
          </Link>
        );
      })}
    </div>
  );
}
