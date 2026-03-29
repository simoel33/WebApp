import { cookies } from "next/headers";
import { ADMIN_CONFIG } from "@/config/admin";

export async function getAdminSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionEmail = cookieStore.get("admin-session")?.value;
  return sessionEmail || null;
}

export async function getAdminFromSession(): Promise<{ email: string } | null> {
  const sessionEmail = await getAdminSession();
  if (!sessionEmail) return null;

  // Verify the session email matches the configured admin email
  if (sessionEmail === ADMIN_CONFIG.email) {
    return { email: sessionEmail };
  }

  return null;
}

export async function requireAdminAuth() {
  const admin = await getAdminFromSession();
  if (!admin) {
    throw new Error("Unauthorized");
  }
  return admin;
}
