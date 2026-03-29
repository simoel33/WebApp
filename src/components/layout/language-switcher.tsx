"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { localeConfig, LOCALE_STORAGE_KEY } from "@/lib/locales";
import { routing, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  function select(next: Locale) {
    if (next === locale) {
      setOpen(false);
      return;
    }
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  const current = localeConfig[locale];

  return (
    <div className={cn("relative", className)} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-9 min-w-[9.5rem] items-center justify-between gap-2 rounded-lg border border-zinc-200/80 bg-white/80 px-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:bg-zinc-800"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="flex items-center gap-2">
          <span className="text-lg leading-none" aria-hidden>
            {current.flag}
          </span>
          <span>{current.label}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 opacity-60 transition",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-1.5 min-w-[11rem] overflow-hidden rounded-xl border border-zinc-200/90 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
        >
          {routing.locales.map((code) => {
            const cfg = localeConfig[code];
            const active = code === locale;
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => select(code)}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-start text-sm transition",
                    active
                      ? "bg-violet-50 font-medium text-violet-900 dark:bg-violet-950/50 dark:text-violet-100"
                      : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800",
                  )}
                >
                  <span className="text-lg leading-none" aria-hidden>
                    {cfg.flag}
                  </span>
                  {cfg.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
