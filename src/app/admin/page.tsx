import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { requireAdminOrRedirect } from "@/lib/supabase/admin";

export const instant = false;

export const metadata: Metadata = {
  title: "Admin Dashboard | Vedavani Pathashala",
  description:
    "Protected administrative dashboard shell for the Avighna Trust website. Requires a verified Supabase Auth administrator session.",
};

export default async function AdminPage() {
  await connection();
  const result = await requireAdminOrRedirect();

  if (!result.authorized) {
    redirect("/admin/login");
  }

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto", lineHeight: 1.7 }}>
      <h1>Administrator dashboard</h1>
      <p>
        This page is protected and only available to authenticated users with an
        active admin role in Supabase Auth and the matching admin profile.
      </p>
      <p>
        The current environment is still awaiting valid Supabase credentials and
        database configuration. Once connected, this shell can be extended to
        show counts for enquiries, admissions, volunteers, events, donations and
        newsletter signups.
      </p>
      <ul>
        <li>Session user id: {result.userId}</li>
        <li>Role: {result.role}</li>
      </ul>
    </main>
  );
}
