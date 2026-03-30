"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Cloud, Server, Shield, ArrowRight } from "lucide-react";

export function Pricing() {
  const t = useTranslations("pricing");

  const tiers = [
    {
      icon: Cloud,
      name: t("tiers.0.name"),
      price: t("tiers.0.price"),
      description: t("tiers.0.description"),
      features: t("tiers.0.features"),
      popular: true,
    },
    {
      icon: Server,
      name: t("tiers.1.name"),
      price: t("tiers.1.price"),
      description: t("tiers.1.description"),
      features: t("tiers.1.features"),
      popular: false,
    },
    {
      icon: Shield,
      name: t("tiers.2.name"),
      price: t("tiers.2.price"),
      description: t("tiers.2.description"),
      features: t("tiers.2.features"),
      popular: false,
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

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl border p-8 ${
                tier.popular
                  ? "border-blue-200 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-950/20"
                  : "border-zinc-200/80 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/40"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  tier.popular
                    ? "bg-blue-100 dark:bg-blue-900/50"
                    : "bg-zinc-100 dark:bg-zinc-800"
                }`}>
                  <tier.icon className={`h-5 w-5 ${
                    tier.popular
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    {tier.name}
                  </h3>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {tier.price}
                  </p>
                </div>
              </div>

              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                {tier.description}
              </p>

              <ul className="space-y-3 mb-8">
                {Array.isArray(tier.features) && tier.features.map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                      <div className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
                    </div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition ${
                  tier.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                Contact Sales
                <ArrowRight className="h-4 w-4" />
              </a>
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
            {t("cta")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
