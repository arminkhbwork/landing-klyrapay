import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { defaultLocale, localePath, locales, type Locale } from "@/lib/i18n";

type GetMetadataInput = {
  title?: string;
  description?: string;
  locale?: Locale;
  path?: `/${string}` | "/";
};

export function getMetadata(input: GetMetadataInput = {}): Metadata {
  const title = input.title
    ? `${input.title} · ${siteConfig.name}`
    : siteConfig.name;
  const description = input.description ?? siteConfig.description;
  const locale = input.locale ?? defaultLocale;
  const path = input.path ?? "/";
  const canonical = new URL(localePath(locale, path), siteConfig.url);
  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = new URL(
      localePath(l, path),
      siteConfig.url
    ).toString();
  }

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: { canonical, languages: languageAlternates },
    robots: siteConfig.allowIndexing
      ? { index: true, follow: true }
      : {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
