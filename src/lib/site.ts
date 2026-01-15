function env(name: string): string | undefined {
  const v = process.env[name];
  return typeof v === "string" && v.trim().length > 0 ? v : undefined;
}

function envBool(name: string, defaultValue: boolean): boolean {
  const v = env(name);
  if (!v) return defaultValue;
  return ["1", "true", "yes", "on"].includes(v.toLowerCase());
}

function normalizeUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "KlyraPay",
  tagline: "Glass-smooth payments for modern fintech teams.",
  description:
    "KlyraPay is a frontend-only landing page template for a next-gen payment + banking platform—realistic visuals, SEO-first architecture, dark/light theming, and multi-language support.",
  url: normalizeUrl(env("NEXT_PUBLIC_SITE_URL")) ?? "http://localhost:3000",
  allowIndexing: envBool("NEXT_PUBLIC_ALLOW_INDEXING", true),
  githubRepoUrl:
    env("NEXT_PUBLIC_GITHUB_REPO_URL") ??
    "https://github.com/your-handle/landing-03-klyrapay",
} as const;
