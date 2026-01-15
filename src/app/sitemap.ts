import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { localePath, locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Root (will redirect to a locale; keep low priority)
  entries.push({
    url: siteConfig.url,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.2,
  });

  for (const l of locales) {
    entries.push({
      url: new URL(localePath(l, "/"), siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    });
    entries.push({
      url: new URL(localePath(l, "/project"), siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
