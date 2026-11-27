import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./server";

export type AdminAccessResult =
  | {
      authorized: true;
      userId: string;
      role: string;
    }
  | {
      authorized: false;
      reason: "MISSING_CONFIG" | "UNAUTHENTICATED" | "FORBIDDEN";
    };

export async function requireAdminAccess(): Promise<AdminAccessResult> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { authorized: false, reason: "MISSING_CONFIG" };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { authorized: false, reason: "UNAUTHENTICATED" };
  }

  const { data: profile, error: profileError } = await supabase
    .from("admin_profiles")
    .select("role, is_active")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile || !profile.is_active || profile.role !== "admin") {
    return { authorized: false, reason: "FORBIDDEN" };
  }

  return {
    authorized: true,
    userId: user.id,
    role: profile.role,
  };
}

export async function requireAdminOrRedirect() {
  const result = await requireAdminAccess();

  if (!result.authorized) {
    redirect("/admin/login");
  }

  return result;
}
