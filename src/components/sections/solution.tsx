"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle, Zap, Shield, Eye } from "lucide-react";

export function Solution() {
  const t = useTranslations("solution");

  const keyPoints = [
    {
      icon: Zap,
      title: t("keyPoints.0.title"),
      description: t("keyPoints.0.description"),
    },
    {
      icon: CheckCircle,
      title: t("keyPoints.1.title"),
      description: t("keyPoints.1.description"),
    },
    {
      icon: Shield,
      title: t("keyPoints.2.title"),
      description: t("keyPoints.2.description"),
    },
    {
      icon: Eye,
      title: t("keyPoints.3.title"),
      description: t("keyPoints.3.description"),
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

        <div className="grid gap-8 md:grid-cols-2">
          {keyPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl border border-green-200/50 bg-green-50/50 p-8 dark:border-green-900/30 dark:bg-green-950/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/50">
                  <point.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {point.title}
                </h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}