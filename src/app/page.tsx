import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/** Fallback when `/` is not handled by middleware (ensures no 404 on root). */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
