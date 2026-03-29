"use client";

import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

const navKeys = [
  { href: "#features", key: "features" as const },
  { href: "#how-it-works", key: "howItWorks" as const },
  { href: "#use-cases", key: "useCases" as const },
  { href: "#faq", key: "faq" as const },
];

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/75 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white shadow-md shadow-violet-500/25">
            DS
          </span>
          DataSync Pro
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navKeys.map(({ href, key }) => (
            <a
              key={key}
              href={href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <LanguageSwitcher className="hidden sm:block" />
          <a
            href="#contact"
            className="hidden rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 md:inline-block"
          >
            {t("getStarted")}
          </a>
          <button
            type="button"
            className="inline-flex rounded-lg border border-zinc-200 p-2 md:hidden dark:border-zinc-700"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-zinc-200/70 md:hidden dark:border-zinc-800"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navKeys.map(({ href, key }) => (
                <a
                  key={key}
                  href={href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200"
                  onClick={() => setOpen(false)}
                >
                  {t(key)}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <ThemeToggle />
                <LanguageSwitcher className="flex-1" />
              </div>
              <a
                href="#contact"
                className="mt-2 rounded-lg bg-zinc-900 py-2.5 text-center text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
                onClick={() => setOpen(false)}
              >
                {t("getStarted")}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
