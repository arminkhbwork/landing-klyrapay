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
      <SiteHeader locale={locale} dict={dict} />
      <main>{children}</main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
