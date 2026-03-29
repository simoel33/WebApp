"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { PricingCard } from "@/components/ui/pricing-card";
import type { PricingPlan } from "@/components/ui/pricing-types";
import { cn } from "@/lib/cn";

export function Pricing() {
  const t = useTranslations("pricing");
  const [yearly, setYearly] = useState(true);
  const plans = t.raw("plans") as PricingPlan[];

  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-y border-zinc-200/80 bg-zinc-50/80 py-20 dark:border-zinc-800 dark:bg-zinc-950/50 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t("subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-10 flex justify-center">
          <div
            className="inline-flex rounded-full border border-zinc-200 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900"
            role="group"
            aria-label="Billing period"
          >
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                !yearly
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
              )}
            >
              {t("monthly")}
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                yearly
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
              )}
            >
              {t("yearly")}{" "}
              <span className="text-violet-600 dark:text-violet-400">
                ({t("save")})
              </span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              yearly={yearly}
              perMonth={t("perMonth")}
              billedYearly={t("billedYearly")}
              popularLabel={t("popular")}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
