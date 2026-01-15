export const locales = ["en", "de", "es", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

export function normalizeLocale(v: string | undefined): Locale {
  if (!v) return defaultLocale;
  const lower = v.toLowerCase();
  // Accept "en-US" style inputs.
  const base = lower.split("-")[0] ?? lower;
  return isLocale(base) ? base : defaultLocale;
}

export function localePath(locale: Locale, path: `/${string}` | "/"): string {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

export function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];
  if (first && isLocale(first)) {
    return `/${parts.slice(1).join("/")}`;
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}
