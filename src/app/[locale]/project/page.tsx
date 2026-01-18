import type { Metadata } from "next";
import pkg from "../../../../package.json";

import { getMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/container";

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

function pickDeps(
  p: PackageJson,
  names: string[]
): Array<{
  name: string;
  version: string;
  type: "dependency" | "devDependency";
}> {
  const out: Array<{
    name: string;
    version: string;
    type: "dependency" | "devDependency";
  }> = [];
  for (const name of names) {
    const dep = p.dependencies?.[name];
    const dev = p.devDependencies?.[name];
    if (dep) {
      out.push({ name, version: dep, type: "dependency" });
    } else if (dev) {
      out.push({ name, version: dev, type: "devDependency" });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : ("en" as const);
  return getMetadata({
    locale,
    title: "Project Details",
    description:
      "Tech stack, versions, architecture notes, and links for the KlyraPay landing page project.",
    path: "/project",
  });
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const core = pickDeps(pkg, [
    "next",
    "react",
    "react-dom",
    "typescript",
    "tailwindcss",
    "three",
    "eslint",
    "husky",
  ]);

  const indexing = siteConfig.allowIndexing
    ? dict.project.indexingEnabled
    : dict.project.indexingDisabled;

  return (
    <div className="bg-white dark:bg-zinc-950">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-4xl dark:text-white">
            {dict.project.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-pretty text-zinc-600 dark:text-zinc-300">
            {dict.project.intro}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
              <p className="text-xs font-semibold tracking-wide text-zinc-900 dark:text-white">
                {dict.project.stack}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                {core.map((d) => (
                  <li
                    key={d.name}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="font-medium text-zinc-900 dark:text-white">
                      {d.name}
                    </span>
                    <span className="font-mono text-xs text-zinc-600 dark:text-zinc-300">
                      {d.version}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
              <p className="text-xs font-semibold tracking-wide text-zinc-900 dark:text-white">
                {dict.project.ops}
              </p>
              <dl className="mt-3 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-zinc-600 dark:text-zinc-300">Docker</dt>
                  <dd className="font-medium text-zinc-900 dark:text-white">
                    Enabled
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-zinc-600 dark:text-zinc-300">Indexing</dt>
                  <dd className="font-medium text-zinc-900 dark:text-white">
                    {indexing}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-zinc-600 dark:text-zinc-300">
                    Sitemap / Robots
                  </dt>
                  <dd className="font-medium text-zinc-900 dark:text-white">
                    Enabled
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-zinc-600 dark:text-zinc-300">Locale</dt>
                  <dd className="font-medium text-zinc-900 dark:text-white">
                    {locale.toUpperCase()}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-zinc-600 dark:text-zinc-300">Source</dt>
                  <dd className="font-medium text-zinc-900 dark:text-white">
                    <a
                      className="underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500 dark:decoration-white/20 dark:hover:decoration-white/40"
                      href={siteConfig.githubRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub repo
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-semibold tracking-wide text-zinc-900 dark:text-white">
              {dict.project.reuse}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
              {dict.project.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
              <li>
                The localized landing page lives at{" "}
                <span className="font-mono">{localePath(locale, "/")}</span>.
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
