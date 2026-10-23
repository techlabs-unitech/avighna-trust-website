import { NextResponse } from "next/server";
import { checkSubmissionAbuse } from "@/lib/abuse-protection";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";
import { normalizeText, readJsonObject, validateEmailField } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = await readJsonObject(request);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: parsed.status });
  }
  const payload = parsed.value;
  const email = normalizeText(payload?.email);
  const source = normalizeText(payload?.source);

  const errors: Record<string, string> = {};
  const emailError = validateEmailField(email);

  if (emailError) {
    errors.email = emailError;
  }

  if (source && source.length > 120) {
    errors.source = "Source is too long.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const abuseResponse = await checkSubmissionAbuse(request, "newsletter", payload);
  if (abuseResponse) return abuseResponse;

  const supabase = createSupabaseServiceRoleClient();

  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        error: "Supabase is not configured. Set the required environment variables before enabling newsletter submissions.",
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("newsletter_subscriptions").upsert(
    {
      email,
      source: source || "website",
      is_active: true,
      consent_confirmed_at: new Date().toISOString(),
    },
    { onConflict: "email" },
  );

  if (error) {
    console.error("Failed to save newsletter subscription.");
    return NextResponse.json(
      { ok: false, error: "Unable to save your subscription right now. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, saved: true, message: "Newsletter subscription saved." }, { status: 201 });
}
