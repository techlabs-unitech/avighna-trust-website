import { NextResponse } from "next/server";
import { checkSubmissionAbuse } from "@/lib/abuse-protection";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";
import { normalizeText, readJsonObject, validateEmailField, validateMessage, validateOptionalPhone } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = await readJsonObject(request);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: parsed.status });
  }
  const payload = parsed.value;

  const name = normalizeText(payload?.name);
  const email = normalizeText(payload?.email);
  const phone = normalizeText(payload?.phone);
  const programmeInterest = normalizeText(payload?.programmeInterest);
  const message = normalizeText(payload?.message);

  const errors: Record<string, string> = {};

  if (name.length < 2 || name.length > 120) {
    errors.name = "Name must be between 2 and 120 characters.";
  }

  const emailError = validateEmailField(email);
  if (emailError) errors.email = emailError;

  const phoneError = validateOptionalPhone(phone);
  if (phoneError) errors.phone = phoneError;

  if (programmeInterest.length < 2 || programmeInterest.length > 200) {
    errors.programmeInterest = "Programme interest must be between 2 and 200 characters.";
  }

  const messageError = validateMessage(message);
  if (messageError) errors.message = messageError;

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const abuseResponse = await checkSubmissionAbuse(request, "admission", payload);
  if (abuseResponse) return abuseResponse;

  const supabase = createSupabaseServiceRoleClient();

  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        error: "Supabase is not configured. Add the required project credentials before enabling admissions intake.",
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("admission_enquiries").insert({
    name,
    email,
    phone: phone || null,
    programme_interest: programmeInterest,
    message,
    status: "new",
  });

  if (error) {
    console.error("Failed to save admission enquiry.");
    return NextResponse.json(
      { ok: false, error: "Unable to save your admission enquiry right now. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, saved: true, message: "Admission enquiry submitted." }, { status: 201 });
}
