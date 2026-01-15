import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { localePath, type Locale } from "@/lib/i18n";

export function Logo({
  className,
  locale,
}: {
  className?: string;
  locale: Locale;
}) {
  return (
    <Link
      href={localePath(locale, "/")}
      aria-label={`${siteConfig.name} home`}
      className={cn("inline-flex items-center gap-2", className)}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-semibold text-white shadow-sm">
        KP
      </span>
      <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
        {siteConfig.name}
      </span>
    </Link>
  );
}
