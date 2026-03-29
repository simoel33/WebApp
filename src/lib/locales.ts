import { type Locale } from "@/i18n/routing";

export const LOCALE_STORAGE_KEY = "datasync-locale";

export const localeConfig: Record<
  Locale,
  { flag: string; label: string; htmlLang: string }
> = {
  en: { flag: "🇺🇸", label: "English", htmlLang: "en" },
  fr: { flag: "🇫🇷", label: "Français", htmlLang: "fr" },
  ar: { flag: "🇸🇦", label: "العربية", htmlLang: "ar" },
  es: { flag: "🇪🇸", label: "Español", htmlLang: "es" },
  zh: { flag: "🇨🇳", label: "简体中文", htmlLang: "zh-CN" },
};
