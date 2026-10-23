export type ValidationErrors = Record<string, string>;

const MAX_JSON_BODY_BYTES = 16 * 1024;

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export type JsonObjectResult =
  | { ok: true; value: Record<string, unknown> }
  | { ok: false; status: 400 | 413 | 415; error: string };

export async function readJsonObject(request: Request): Promise<JsonObjectResult> {
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();

  if (contentType !== "application/json") {
    return { ok: false, status: 415, error: "Content-Type must be application/json." };
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_JSON_BODY_BYTES) {
    return { ok: false, status: 413, error: "Request body is too large." };
  }

  const reader = request.body?.getReader();
  if (!reader) {
    return { ok: false, status: 400, error: "A JSON request body is required." };
  }

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_JSON_BODY_BYTES) {
        await reader.cancel();
        return { ok: false, status: 413, error: "Request body is too large." };
      }

      chunks.push(value);
    }
  } catch {
    return { ok: false, status: 400, error: "Unable to read the request body." };
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  let payload: unknown;
  try {
    payload = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return { ok: false, status: 400, error: "Request body must contain valid JSON." };
  }

  if (!isJsonObject(payload)) {
    return { ok: false, status: 400, error: "Request body must be a JSON object." };
  }

  return { ok: true, value: payload };
}

export function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function validateRequiredField(
  value: unknown,
  fieldName: string,
  minLength = 2,
  maxLength = 200,
): string | null {
  const text = normalizeText(value);

  if (!text) {
    return `${fieldName} is required.`;
  }

  if (text.length < minLength || text.length > maxLength) {
    return `${fieldName} must be between ${minLength} and ${maxLength} characters.`;
  }

  return null;
}

export function validateEmailField(value: unknown): string | null {
  const email = normalizeText(value);

  if (!email) {
    return "Email is required.";
  }

  if (email.length > 254) {
    return "Email must be 254 characters or fewer.";
  }

  if (!isValidEmail(email)) {
    return "Please provide a valid email address.";
  }

  return null;
}

export function validateOptionalPhone(value: unknown): string | null {
  const phone = normalizeText(value);
  if (!phone) {
    return null;
  }

  if (phone.length > 32) {
    return "Phone number must be 32 characters or fewer.";
  }

  if (!isValidPhone(phone)) {
    return "Please provide a valid phone number.";
  }

  return null;
}

export function validateMessage(value: unknown): string | null {
  const text = normalizeText(value);

  if (!text) {
    return "Message is required.";
  }

  if (text.length < 10 || text.length > 4000) {
    return "Message must be between 10 and 4000 characters.";
  }

  return null;
}

export function validateNumericAmount(value: unknown): string | null {
  if (value === undefined || value === null || value === "") {
    return "Amount is required.";
  }

  const amount = Number(value);

  if (!Number.isFinite(amount) || amount <= 0) {
    return "Amount must be a positive number.";
  }

  return null;
}
