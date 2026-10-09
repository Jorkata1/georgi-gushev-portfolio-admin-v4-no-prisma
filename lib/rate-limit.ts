import { createHash } from "crypto";
import { headers } from "next/headers";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/** Best-effort client IP behind Vercel's proxy. */
export function getRequestIp(): string {
  const requestHeaders = headers();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || requestHeaders.get("x-real-ip") || "unknown";
}

/** Never store raw IPs: the key is a salted hash scoped to the protected action. */
function toRateLimitKey(scope: string, identifier: string): string {
  const salt = process.env.ADMIN_SESSION_SECRET ?? "";
  return `${scope}:${createHash("sha256").update(`${salt}:${identifier}`).digest("hex")}`;
}

/**
 * Atomically records an attempt and reports whether it is still within the limit.
 * Backed by the `consume_rate_limit` SQL function, so it works across serverless instances.
 */
export async function consumeRateLimit(
  scope: string,
  identifier: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  const { data, error } = await createSupabaseAdminClient().rpc("consume_rate_limit", {
    p_key: toRateLimitKey(scope, identifier),
    p_limit: limit,
    p_window_seconds: windowSeconds
  });

  if (error) {
    throw new Error(`Rate limit check failed: ${error.message}`);
  }
  return data === true;
}
