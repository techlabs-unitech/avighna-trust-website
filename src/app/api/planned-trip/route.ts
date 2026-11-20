import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { checkSubmissionAbuse } from "@/lib/abuse-protection";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";
import { tripDarshan, tripGenders, tripGuide, tripModes, tripPlaces } from "@/lib/planned-trip";
import { isValidEmail, normalizeText, readJsonObject, validateOptionalPhone } from "@/lib/validation";

function wholeNumber(value: unknown, min: number, max: number): number | null {
  const text = normalizeText(typeof value === "number" ? String(value) : value);
  if (!/^\d+$/.test(text)) return null;
  const n = Number(text);
  return n >= min && n <= max ? n : null;
}

export async function POST(request: Request) {
  const parsed = await readJsonObject(request);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: parsed.status });
  }
  const payload = parsed.value;

  const name = normalizeText(payload.name);
  const phone = normalizeText(payload.phone);
  const email = normalizeText(payload.email);
  const gender = normalizeText(payload.gender);
  const address = normalizeText(payload.address);
  const guide = normalizeText(payload.travelGuide);
  const mode = normalizeText(payload.travelMode);
  const darshan = normalizeText(payload.darshanType);
  const age = wholeNumber(payload.age, 1, 120);
  const days = wholeNumber(payload.days, 1, 90);
  const elders = wholeNumber(payload.elders, 0, 100);
  const kids = wholeNumber(payload.kids, 0, 100);
  const places = Array.isArray(payload.places)
    ? Array.from(new Set(payload.places.filter((p): p is string => typeof p === "string" && tripPlaces.includes(p))))
    : [];

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 120) errors.name = "Name must be between 2 and 120 characters.";
  const phoneError = phone ? validateOptionalPhone(phone) : "Phone number is required.";
  if (phoneError) errors.phone = phoneError;
  if (!email || email.length > 254 || !isValidEmail(email)) errors.email = "Please provide a valid email address.";
  if (age === null) errors.age = "Please enter an age between 1 and 120.";
  if (!(tripGenders as readonly string[]).includes(gender)) errors.gender = "Please choose an option.";
  if (days === null) errors.days = "Please enter the number of days (1 to 90).";
  if (address.length < 5 || address.length > 500) errors.address = "Address must be between 5 and 500 characters.";
  if (elders === null) errors.elders = "Please enter the number of elders (0 if none).";
  if (kids === null) errors.kids = "Please enter the number of kids (0 if none).";
  if (places.length === 0) errors.places = "Choose at least one place you wish to visit.";
  if (!(tripGuide as readonly string[]).includes(guide)) errors.travelGuide = "Please choose Yes or No.";
  if (!(tripModes as readonly string[]).includes(mode)) errors.travelMode = "Please choose a mode of travel.";
  if (!(tripDarshan as readonly string[]).includes(darshan)) errors.darshanType = "Please choose a type of darshan.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const abuseResponse = await checkSubmissionAbuse(request, "planned-trip", payload);
  if (abuseResponse) return abuseResponse;

  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase is not configured. Add the connection variables before enabling planned-trip requests." },
      { status: 503 },
    );
  }

  // Reference shown to the visitor and printed on the PDF, e.g. PT-7K3M9QXD
  const reference = `PT-${randomBytes(5).toString("base64url").replace(/[-_]/g, "X").toUpperCase().slice(0, 8)}`;

  const { error } = await supabase.from("planned_trip_requests").insert({
    reference,
    payment_status: "not_started",
    full_name: name,
    phone,
    email,
    age,
    gender,
    days,
    address,
    elders_count: elders,
    kids_count: kids,
    places,
    travel_guide_needed: guide === "Yes",
    travel_mode: mode,
    darshan_type: darshan,
    status: "new",
  });

  if (error) {
    console.error("Failed to save planned trip request.");
    return NextResponse.json({ ok: false, error: "Unable to save your request right now. Please try again later." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, saved: true, reference, message: "Planned trip request submitted." }, { status: 201 });
}
