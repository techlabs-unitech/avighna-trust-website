import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Access | Vedavani Pathashala",
  description:
    "Administrative sign-in guidance for the Avighna Trust Supabase setup. This environment requires configured credentials before live authentication is enabled.",
};

export default function AdminLoginPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: 760, margin: "0 auto", lineHeight: 1.7 }}>
      <h1>Administrator access</h1>
      <p>
        Live admin authentication is not active until the Supabase project is
        configured with valid environment variables and the database schema is
        applied.
      </p>
      <p>
        The production flow should use Supabase Auth, then create a user in the
        Supabase dashboard and insert the corresponding record into the
        <strong> admin_profiles</strong> table with the role set to <strong>admin</strong>.
      </p>
      <p>
        Do not hardcode credentials, grant admin roles from the browser, or rely
        on client-side route checks for authorization. All access decisions must
        be enforced on the server with Supabase Auth and database policies.
      </p>
      <p>
        Once credentials are configured, the first admin can be created securely
        from the Supabase dashboard or by a server-side setup script run with the
        service role key.
      </p>
    </main>
  );
}
