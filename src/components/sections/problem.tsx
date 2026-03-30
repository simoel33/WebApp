"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AlertTriangle, WifiOff, Database, Network } from "lucide-react";

export function Problem() {
  const t = useTranslations("problem");

  const challenges = [
    {
      icon: WifiOff,
      title: t("challenges.0.title"),
      description: t("challenges.0.description"),
    },
    {
      icon: Database,
      title: t("challenges.1.title"),
      description: t("challenges.1.description"),
    },
    {
      icon: Network,
      title: t("challenges.2.title"),
      description: t("challenges.2.description"),
    },
    {
      icon: AlertTriangle,
      title: t("challenges.3.title"),
      description: t("challenges.3.description"),
    },
    {
      icon: Database,
      title: t("challenges.4.title"),
      description: t("challenges.4.description"),
    },
    {
      icon: Network,
      title: t("challenges.5.title"),
      description: t("challenges.5.description"),
    },
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
          <p className="mt-6 text-zinc-700 dark:text-zinc-300 max-w-4xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl border border-red-200/50 bg-red-50/50 p-6 dark:border-red-900/30 dark:bg-red-950/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/50">
                  <challenge.icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  {challenge.title}
                </h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                {challenge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}