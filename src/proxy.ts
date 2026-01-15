import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, normalizeLocale } from "@/lib/i18n";

const LOCALE_COOKIE = "NEXT_LOCALE";

function pickFromAcceptLanguage(header: string | null): string | undefined {
  if (!header) return undefined;
  // Very small parser: take first language tag (e.g., "de-DE,de;q=0.9,en;q=0.8").
  const first = header.split(",")[0]?.trim();
  return first?.length ? first : undefined;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next internals and static assets.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];

  // If already prefixed with a locale, persist cookie and continue.
  if (first && isLocale(first)) {
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE, first, { path: "/" });
    return res;
  }

  const fromCookie = req.cookies.get(LOCALE_COOKIE)?.value;
  const fromHeader = pickFromAcceptLanguage(req.headers.get("accept-language"));
  const locale = normalizeLocale(fromCookie ?? fromHeader ?? defaultLocale);

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.redirect(url);
  res.cookies.set(LOCALE_COOKIE, locale, { path: "/" });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
};
