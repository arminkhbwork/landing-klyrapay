import type { Metadata } from "next";
import Link from "next/link";

import { getMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { HeroThreeCanvas } from "@/components/three/hero-canvas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : ("en" as const);
  return getMetadata({
    locale,
    title: siteConfig.tagline,
    description: siteConfig.description,
    path: "/",
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const primaryHref = localePath(locale, "/#cta");
  const projectHref = localePath(locale, "/project");

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200/70 bg-[radial-gradient(1200px_circle_at_25%_20%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(900px_circle_at_85%_15%,rgba(168,85,247,0.22),transparent_52%),linear-gradient(135deg,rgba(255,255,255,1)_0%,rgba(250,250,255,1)_40%,rgba(245,243,255,1)_100%)] dark:border-white/10 dark:bg-[radial-gradient(1200px_circle_at_25%_20%,rgba(99,102,241,0.22),transparent_55%),radial-gradient(900px_circle_at_85%_15%,rgba(168,85,247,0.18),transparent_52%),linear-gradient(135deg,rgba(9,9,11,1)_0%,rgba(9,9,11,1)_40%,rgba(10,8,24,1)_100%)]">
        <div className="absolute inset-0 bg-noise opacity-40" />
        <div className="pointer-events-none absolute -left-48 top-[-160px] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-48 top-[-220px] h-[620px] w-[620px] rounded-full bg-gradient-to-br from-sky-500/15 via-indigo-500/15 to-violet-500/15 blur-3xl" />

        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left: content */}
            <div className="space-y-8">
              <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-indigo-200">
                <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
                {dict.hero.badge}
              </p>

              <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white sm:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-fuchsia-300">
                  {dict.hero.titleA}
                </span>
                <br />
                <span className="text-zinc-900 dark:text-white">
                  {dict.hero.titleB}
                </span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-xl">
                {dict.hero.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <LinkButton href={primaryHref} size="md">
                  {dict.cta.primary}
                </LinkButton>
                <LinkButton href={projectHref} variant="ghost" size="md">
                  {dict.cta.secondary}
                </LinkButton>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-600 dark:text-zinc-300">
                <div className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    99.99% uptime
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    (demo metric)
                  </span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    &lt;120ms
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    p95 routing
                  </span>
                </div>
              </div>
            </div>

            {/* Right: glass cards + Three.js scene */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -z-10">
                <HeroThreeCanvas className="opacity-90 dark:opacity-95" />
              </div>

              <div className="relative mx-auto max-w-lg">
                {/* Main card */}
                <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/55 p-6 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-violet-500/15 sm:p-7">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-500/25 to-fuchsia-500/20 blur-2xl" />
                  <div className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-gradient-to-br from-sky-500/20 to-violet-500/15 blur-2xl" />

                  <div className="relative space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-semibold tracking-wide text-zinc-700 dark:text-zinc-300">
                          {dict.hero.stat1k}
                        </p>
                        <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                          $5,750.20
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 shadow-sm dark:bg-white/10">
                          <span className="h-5 w-5 rounded-full bg-red-500/80" />
                        </span>
                        <span className="inline-flex h-10 w-10 -translate-x-4 items-center justify-center rounded-2xl bg-white/70 shadow-sm dark:bg-white/10">
                          <span className="h-5 w-5 rounded-full bg-amber-400/80" />
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-white/40 bg-white/50 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
                        <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          {dict.hero.stat2k}
                        </p>
                        <p className="mt-2 text-lg font-bold text-zinc-900 dark:text-white">
                          2.3s
                        </p>
                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                          cross-rail demo
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/40 bg-white/50 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
                        <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          Risk score
                        </p>
                        <p className="mt-2 text-lg font-bold text-zinc-900 dark:text-white">
                          Low
                        </p>
                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                          policy-driven
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-white/40 bg-white/50 px-4 py-3 text-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                      <span className="font-mono text-xs text-zinc-600 dark:text-zinc-300">
                        5282 3456 7890 1289
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating mini card */}
                <div className="absolute -bottom-10 right-0 w-[240px] rotate-[6deg]">
                  <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/55 p-5 shadow-2xl shadow-violet-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-violet-500/25 to-fuchsia-500/20 blur-2xl" />
                    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Credit card
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/50 dark:bg-white/40" />
                        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/30 dark:bg-white/25" />
                        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/20 dark:bg-white/20" />
                        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/20 dark:bg-white/20" />
                      </div>
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        09/28
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-zinc-900 dark:text-white">
                        1289
                      </span>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/70 shadow-sm dark:bg-white/10">
                        <span className="h-4 w-4 rounded-full bg-indigo-500/70" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section
        id="features"
        className="bg-white py-20 dark:bg-zinc-950 sm:py-24"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
              {dict.sections.features.eyebrow}
            </p>
            <h2 className="mt-4 text-balance text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              {dict.sections.features.title}
            </h2>
            <p className="mt-6 text-lg leading-7 text-zinc-600 dark:text-zinc-300">
              {dict.sections.features.subtitle}
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2">
            {dict.sections.features.cards.map((c) => (
              <div
                key={c.title}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white p-7 shadow-sm transition-all hover:shadow-md dark:border-white/10 dark:bg-white/5"
              >
                <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 blur-3xl transition-opacity group-hover:opacity-80 dark:from-indigo-500/12 dark:to-fuchsia-500/12" />
                <p className="text-lg font-bold text-zinc-900 dark:text-white">
                  {c.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Rails */}
      <section
        id="rails"
        className="bg-zinc-50 py-20 dark:bg-zinc-950 sm:py-24"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
              {dict.sections.rails.eyebrow}
            </p>
            <h2 className="mt-4 text-balance text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              {dict.sections.rails.title}
            </h2>
            <p className="mt-6 text-lg leading-7 text-zinc-600 dark:text-zinc-300">
              {dict.sections.rails.subtitle}
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/65 shadow-xl shadow-indigo-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <div className="pointer-events-none absolute inset-0 bg-noise opacity-35 dark:opacity-25" />
              <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-indigo-500/18 via-violet-500/14 to-fuchsia-500/14 blur-3xl" />
              <div className="pointer-events-none absolute -right-40 -bottom-44 h-[560px] w-[560px] rounded-full bg-gradient-to-br from-sky-500/14 via-indigo-500/14 to-violet-500/14 blur-3xl" />

              <div className="relative grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-5">
                {dict.sections.rails.items.map((c, idx) => (
                  <div
                    key={c.k}
                    className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/8 sm:p-7"
                  >
                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/16 to-fuchsia-500/14 blur-2xl opacity-0 transition-opacity group-hover:opacity-100 dark:from-indigo-500/18 dark:to-fuchsia-500/16" />

                    <div className="relative flex items-start gap-4">
                      <div className="relative mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-extrabold text-white shadow-sm shadow-indigo-500/20">
                        {idx + 1}
                      </div>

                      <div className="min-w-0">
                        <p className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">
                          {c.k}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                          {c.v}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Case study */}
      <section
        id="case-study"
        className="bg-white py-20 dark:bg-zinc-950 sm:py-24"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
              {dict.sections.proof.eyebrow}
            </p>
            <h2 className="mt-4 text-balance text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              {dict.sections.proof.title}
            </h2>
            <p className="mt-6 text-lg leading-7 text-zinc-600 dark:text-zinc-300">
              {dict.sections.proof.subtitle}
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-indigo-950 via-violet-950 to-fuchsia-950/25 p-10 shadow-2xl shadow-indigo-500/10 dark:border-white/10">
              <div className="pointer-events-none absolute inset-0 bg-noise opacity-30" />
              <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-500/25 to-fuchsia-500/20 blur-3xl" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200">
                  Coruma Finance (demo)
                </p>
                <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Case study card
                </h3>
                <p className="mt-4 max-w-lg text-base leading-7 text-zinc-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat.
                </p>
                <div className="mt-8">
                  <LinkButton
                    href={localePath(locale, "/#")}
                    variant="secondary"
                    size="md"
                    className="border-white/20 bg-white/10 text-white hover:bg-white/15"
                  >
                    {dict.sections.proof.button}
                  </LinkButton>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {dict.sections.proof.bullets.map((b) => (
                <div
                  key={b}
                  className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-6 text-sm font-semibold text-zinc-900 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
                >
                  {b}
                </div>
              ))}
              <div className="rounded-2xl border border-indigo-200/60 bg-gradient-to-br from-indigo-50 to-fuchsia-50 p-6 text-sm text-zinc-700 dark:border-white/10 dark:from-indigo-950/25 dark:to-fuchsia-950/15 dark:text-zinc-200">
                <p className="font-semibold text-zinc-900 dark:text-white">
                  Replaceable assets
                </p>
                <p className="mt-2 leading-6">
                  Any icons/illustrations can be swapped later. If you want,
                  I’ll add custom SVG placeholders per section in{" "}
                  <span className="font-mono">/public</span>.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Security */}
      <section
        id="security"
        className="bg-zinc-50 py-20 dark:bg-zinc-950 sm:py-24"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
              {dict.sections.security.eyebrow}
            </p>
            <h2 className="mt-4 text-balance text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              {dict.sections.security.title}
            </h2>
            <p className="mt-6 text-lg leading-7 text-zinc-600 dark:text-zinc-300">
              {dict.sections.security.subtitle}
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3">
            {dict.sections.security.points.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-zinc-200/70 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-base font-bold text-zinc-900 dark:text-white">
                  {p.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-20 dark:bg-zinc-950 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
              {dict.sections.faq.eyebrow}
            </p>
            <h2 className="mt-4 text-balance text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              {dict.sections.faq.title}
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-6 sm:grid-cols-2">
              {dict.sections.faq.items.map((f) => (
                <div
                  key={f.q}
                  className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-base font-bold text-zinc-900 dark:text-white">
                    {f.q}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section
        id="cta"
        className="border-t border-zinc-200/70 bg-[radial-gradient(900px_circle_at_20%_30%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(900px_circle_at_85%_70%,rgba(168,85,247,0.18),transparent_55%),linear-gradient(135deg,rgba(255,255,255,1)_0%,rgba(250,250,255,1)_45%,rgba(245,243,255,1)_100%)] py-20 dark:border-white/10 dark:bg-[radial-gradient(900px_circle_at_20%_30%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(900px_circle_at_85%_70%,rgba(168,85,247,0.18),transparent_55%),linear-gradient(135deg,rgba(9,9,11,1)_0%,rgba(9,9,11,1)_45%,rgba(10,8,24,1)_100%)] sm:py-24"
      >
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl border border-indigo-200/60 bg-white/70 p-12 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-16">
              <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-500/25 to-fuchsia-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-gradient-to-br from-sky-500/20 to-violet-500/20 blur-3xl" />
              <div className="relative">
                <h2 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
                  {dict.sections.finalCta.title}
                </h2>
                <p className="mt-6 text-lg leading-7 text-zinc-600 dark:text-zinc-300">
                  {dict.sections.finalCta.subtitle}
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <LinkButton href={projectHref} size="md">
                    {dict.sections.finalCta.primary}
                  </LinkButton>
                  <LinkButton
                    href={siteConfig.githubRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="md"
                  >
                    {dict.cta.github}
                  </LinkButton>
                  <Link
                    href={localePath(locale, "/project")}
                    className="text-sm font-semibold text-indigo-700 underline decoration-indigo-300 underline-offset-4 hover:decoration-indigo-500 dark:text-indigo-300 dark:decoration-white/20 dark:hover:decoration-white/40"
                  >
                    {dict.nav.project}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
