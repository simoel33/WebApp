"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef } from "react";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALE_STORAGE_KEY } from "@/lib/locales";
import type { Locale } from "@/i18n/routing";

export function LocaleSync() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const synced = useRef(false);

  useEffect(() => {
    if (synced.current) return;
    synced.current = true;
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
      if (
        stored &&
        routing.locales.includes(stored) &&
        stored !== locale
      ) {
        router.replace(pathname, { locale: stored });
      }
    } catch {
      /* ignore private mode / SSR */
    }
  }, [locale, pathname, router]);

  return null;
}
