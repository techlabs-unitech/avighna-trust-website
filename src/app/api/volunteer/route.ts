import { NextResponse } from "next/server";
import { checkSubmissionAbuse } from "@/lib/abuse-protection";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";
import { normalizeText, readJsonObject, validateEmailField, validateMessage } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = await readJsonObject(request);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: parsed.status });
  }
  const payload = parsed.value;

  const name = normalizeText(payload?.name);
  const email = normalizeText(payload?.email);
  const interests = normalizeText(payload?.interests);

  const errors: Record<string, string> = {};

  if (name.length < 2 || name.length > 120) {
    errors.name = "Name must be between 2 and 120 characters.";
  }

  const emailError = validateEmailField(email);
  if (emailError) {
    errors.email = emailError;
  }

  const messageError = validateMessage(interests);
  if (messageError) {
    errors.interests = messageError;
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const abuseResponse = await checkSubmissionAbuse(request, "volunteer", payload);
  if (abuseResponse) return abuseResponse;

  const supabase = createSupabaseServiceRoleClient();

  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        error: "Supabase is not configured. Add the connection variables before enabling volunteer intake.",
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("volunteer_registrations").insert({
    full_name: name,
    email,
    interests,
    status: "new",
  });

  if (error) {
    console.error("Failed to save volunteer registration.");
    return NextResponse.json(
      { ok: false, error: "Unable to save your volunteer registration right now. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, saved: true, message: "Volunteer registration submitted." }, { status: 201 });
}
