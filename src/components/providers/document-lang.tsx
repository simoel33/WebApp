"use client";

import { useLocale } from "next-intl";
import { useLayoutEffect } from "react";
import { localeConfig } from "@/lib/locales";

export function DocumentLang() {
  const locale = useLocale();

  useLayoutEffect(() => {
    const cfg = localeConfig[locale as keyof typeof localeConfig];
    document.documentElement.lang = cfg?.htmlLang ?? locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
