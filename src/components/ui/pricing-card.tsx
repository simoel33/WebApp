"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { PricingPlan } from "./pricing-types";

type PricingCardProps = {
  plan: PricingPlan;
  yearly: boolean;
  perMonth: string;
  billedYearly: string;
  popularLabel: string;
  index: number;
};

function isNumericPrice(s: string) {
  return /^\d+$/.test(s.trim());
}

export function PricingCard({
  plan,
  yearly,
  perMonth,
  billedYearly,
  popularLabel,
  index,
}: PricingCardProps) {
  const custom = !isNumericPrice(plan.priceMonthly);
  const price =
    yearly && !custom ? plan.priceYearly : plan.priceMonthly;
  const showSecondary = yearly && !custom;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={cn(
        "relative flex flex-col rounded-2xl border p-8",
        plan.highlighted
          ? "border-violet-500/50 bg-gradient-to-b from-violet-50/90 to-white shadow-lg shadow-violet-500/10 dark:from-violet-950/40 dark:to-zinc-900 dark:shadow-violet-900/20"
          : "border-zinc-200/90 bg-white dark:border-zinc-800 dark:bg-zinc-900/40",
      )}
    >
      {plan.highlighted ? (
        <span className="absolute -top-3 start-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3 py-0.5 text-xs font-medium text-white">
          {popularLabel}
        </span>
      ) : null}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {plan.name}
        </h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {plan.description}
        </p>
        <div className="mt-6 flex items-baseline justify-center gap-1">
          {custom ? (
            <span className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {plan.priceMonthly}
            </span>
          ) : (
            <>
              <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                ${price}
              </span>
              <span className="text-sm font-medium text-zinc-500">
                {perMonth}
              </span>
            </>
          )}
        </div>
        {showSecondary ? (
          <p className="mt-1 text-xs text-zinc-500">{billedYearly}</p>
        ) : null}
      </div>
      <ul className="mt-8 flex flex-1 flex-col gap-3">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300"
          >
            <Check className="h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
            {f}
          </li>
        ))}
      </ul>
      <a
        href="#pricing"
        className={cn(
          "mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition",
          plan.highlighted
            ? "bg-violet-600 text-white hover:bg-violet-700"
            : "border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800",
        )}
      >
        {plan.cta}
      </a>
    </motion.div>
  );
}
