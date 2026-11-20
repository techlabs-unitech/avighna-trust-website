import "server-only";

import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { NextResponse } from "next/server";
import { normalizeText } from "./validation";

const RATE_LIMIT_WINDOW_SECONDS = 10 * 60;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_TIMEOUT_MS = 3_000;

const INCREMENT_WITH_TTL = `
local count = redis.call("INCR", KEYS[1])
if count == 1 then
  redis.call("EXPIRE", KEYS[1], ARGV[1])
end
return {count, redis.call("TTL", KEYS[1])}
`;

type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number }
  | { allowed: false; unavailable: true };

function getTrustedClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const firstAddress = forwardedFor?.split(",")[0]?.trim();

  if (!firstAddress || isIP(firstAddress) === 0) {
    return null;
  }

  return firstAddress.toLowerCase();
}

async function consumeRateLimit(
  request: Request,
  endpoint: string,
): Promise<RateLimitResult> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const hashSecret = process.env.RATE_LIMIT_HASH_SECRET;
  const clientIp = getTrustedClientIp(request);

  if (!redisUrl || !redisToken || !hashSecret || hashSecret.length < 32 || !clientIp) {
    return { allowed: false, unavailable: true };
  }

  let commandUrl: URL;
  try {
    commandUrl = new URL(redisUrl);
  } catch {
    return { allowed: false, unavailable: true };
  }

  if (commandUrl.protocol !== "https:") {
    return { allowed: false, unavailable: true };
  }

  const clientHash = createHmac("sha256", hashSecret).update(clientIp).digest("hex");
  const key = `submission-rate-limit:${endpoint}:${clientHash}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), RATE_LIMIT_TIMEOUT_MS);

  try {
    const response = await fetch(commandUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${redisToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        "EVAL",
        INCREMENT_WITH_TTL,
        "1",
        key,
        String(RATE_LIMIT_WINDOW_SECONDS),
      ]),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      return { allowed: false, unavailable: true };
    }

    const result: unknown = await response.json();
    if (
      typeof result !== "object" ||
      result === null ||
      !("result" in result) ||
      !Array.isArray(result.result)
    ) {
      return { allowed: false, unavailable: true };
    }

    const [count, ttl] = result.result;
    if (typeof count !== "number" || typeof ttl !== "number") {
      return { allowed: false, unavailable: true };
    }

    if (count > RATE_LIMIT_MAX_REQUESTS) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, ttl),
      };
    }

    return { allowed: true };
  } catch {
    return { allowed: false, unavailable: true };
  } finally {
    clearTimeout(timeout);
  }
}

export async function checkSubmissionAbuse(
  request: Request,
  endpoint: string,
  payload: Record<string, unknown>,
): Promise<NextResponse | null> {
  if (normalizeText(payload.companyWebsite)) {
    return NextResponse.json(
      { ok: true, saved: false, message: "Submission received." },
      { status: 202, headers: { "Cache-Control": "no-store" } },
    );
  }

  const rateLimit = await consumeRateLimit(request, endpoint);
  if (!rateLimit.allowed && "unavailable" in rateLimit) {
    return NextResponse.json(
      { ok: false, error: "Submission service is temporarily unavailable." },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": "60",
        },
      },
    );
  }

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  return null;
}
