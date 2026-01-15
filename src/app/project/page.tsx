import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { localePath, normalizeLocale } from "@/lib/i18n";

export default async function ProjectRoot() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get("NEXT_LOCALE")?.value);
  redirect(localePath(locale, "/project"));
}
