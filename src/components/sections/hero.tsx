"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.25),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/80 px-3 py-1 text-xs font-medium text-violet-800 dark:border-violet-900/60 dark:bg-violet-950/50 dark:text-violet-200"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          {t("badge")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-8 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl sm:leading-[1.1] dark:text-white"
        >
          {t("title")}{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
            {t("highlight")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/80 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            {t("secondaryCta")}
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="mt-16 grid gap-6 sm:grid-cols-3"
        >
          {(["latency", "uptime", "deploy"] as const).map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-zinc-200/80 bg-white/60 p-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <dt className="text-2xl font-semibold tabular-nums text-zinc-900 dark:text-white">
                {t(`stats.${key}.value`)}
              </dt>
              <dd className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {t(`stats.${key}.label`)}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
