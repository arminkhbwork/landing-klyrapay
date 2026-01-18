import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return getMetadata();
  return getMetadata({ locale, path: "/" });
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-zinc-950 focus:px-4 focus:py-2 focus:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:focus:bg-white dark:focus:text-zinc-950"
      >
        Skip to main content
      </a>
      <SiteHeader locale={locale} dict={dict} />
      <main id="main-content">{children}</main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
