"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Target, Scale } from "lucide-react";

export function Benefits() {
  const t = useTranslations("benefits");

  const metrics = [
    {
      icon: TrendingUp,
      title: t("metrics.0.title"),
      description: t("metrics.0.description"),
    },
    {
      icon: Clock,
      title: t("metrics.1.title"),
      description: t("metrics.1.description"),
    },
    {
      icon: Target,
      title: t("metrics.2.title"),
      description: t("metrics.2.description"),
    },
    {
      icon: Scale,
      title: t("metrics.3.title"),
      description: t("metrics.3.description"),
    },
  ];

  const outcomes = [
    {
      title: t("outcomes.0.title"),
      description: t("outcomes.0.description"),
    },
    {
      title: t("outcomes.1.title"),
      description: t("outcomes.1.description"),
    },
    {
      title: t("outcomes.2.title"),
      description: t("outcomes.2.description"),
    },
    {
      title: t("outcomes.3.title"),
      description: t("outcomes.3.description"),
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
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

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl border border-zinc-200/80 bg-white/60 p-6 backdrop-blur text-center dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                  <metric.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                {metric.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Outcomes Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-8 dark:border-zinc-800 dark:bg-zinc-900/20"
            >
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                {outcome.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {outcome.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}