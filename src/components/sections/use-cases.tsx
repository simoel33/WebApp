"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Factory, PlugZap, TrainFront, Building2 } from "lucide-react";

const icons = [Factory, PlugZap, TrainFront, Building2];

export function UseCases() {
  const t = useTranslations("useCases");
  const cases = t.raw("cases") as { title: string; description: string }[];

  return (
    <section id="use-cases" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t("subtitle")}
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {cases.map((c, i) => {
            const Icon = icons[i] ?? Factory;
            return (
              <motion.article
                key={c.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-zinc-200/90 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {c.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
