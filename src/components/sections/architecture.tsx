"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Server, Database, Cloud, Network } from "lucide-react";

export function Architecture() {
  const t = useTranslations("architecture");

  const sections = [
    {
      icon: Server,
      title: t("sections.0.title"),
      description: t("sections.0.description"),
      diagramNote: t("sections.0.diagramNote"),
    },
    {
      icon: Database,
      title: t("sections.1.title"),
      description: t("sections.1.description"),
      diagramNote: t("sections.1.diagramNote"),
    },
    {
      icon: Cloud,
      title: t("sections.2.title"),
      description: t("sections.2.description"),
      diagramNote: t("sections.2.diagramNote"),
    },
    {
      icon: Network,
      title: t("sections.3.title"),
      description: t("sections.3.description"),
      diagramNote: t("sections.3.diagramNote"),
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

        <div className="grid gap-8 md:grid-cols-2">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl border border-zinc-200/80 bg-white/60 p-8 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                  <section.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {section.title}
                </h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                {section.description}
              </p>
              <div className="rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 p-8 text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
                  {section.diagramNote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-zinc-600 dark:text-zinc-400">
            {t("diagramPlaceholder")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}