import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  const cols = [
    {
      title: t("product"),
      links: [
        { href: "#features", label: t("links.docs") },
        { href: "#how-it-works", label: t("links.changelog") },
        { href: "#pricing", label: t("links.status") },
      ],
    },
    {
      title: t("company"),
      links: [
        { href: "#", label: t("links.about") },
        { href: "#", label: t("links.careers") },
        { href: "#", label: t("links.contact") },
      ],
    },
    {
      title: t("legal"),
      links: [
        { href: "#", label: t("links.privacy") },
        { href: "#", label: t("links.terms") },
        { href: "#", label: t("links.security") },
      ],
    },
  ];

  return (
    <footer className="border-t border-zinc-200/80 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold text-white">
                DS
              </span>
              DataSync Pro
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("tagline")}
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-zinc-600 transition hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 border-t border-zinc-200/80 pt-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          {t("copyright", { year })}
        </p>
      </div>
    </footer>
  );
}
