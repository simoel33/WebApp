"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as {
    quote: string;
    author: string;
    role: string;
  }[];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t("subtitle")}
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.blockquote
              key={item.author}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-zinc-200/90 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <Quote className="h-8 w-8 text-violet-200 dark:text-violet-900" aria-hidden />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                “{item.quote}”
              </p>
              <footer className="mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <cite className="not-italic">
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {item.author}
                  </span>
                  <span className="mt-1 block text-xs text-zinc-500">
                    {item.role}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
