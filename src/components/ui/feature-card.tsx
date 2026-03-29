"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
  index,
}: FeatureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition hover:border-violet-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-violet-900/60",
      )}
    >
      <div className="mb-4 inline-flex rounded-xl bg-violet-50 p-3 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </motion.article>
  );
}
