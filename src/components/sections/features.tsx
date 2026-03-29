"use client";

import { useTranslations } from "next-intl";
import {
  Cloud,
  Database,
  GitBranch,
  Radio,
  Shield,
  Zap,
} from "lucide-react";
import { FeatureCard } from "@/components/ui/feature-card";

const icons = [Database, Radio, Zap, Shield, GitBranch, Cloud];

export function Features() {
  const t = useTranslations("features");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t("subtitle")}
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={icons[i] ?? Database}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
