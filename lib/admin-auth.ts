import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE = "gg_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const TOKEN_VERSION = "v2";

type AdminConfig = {
  username: string;
  password: string;
  secret: string;
};

function getAdminConfig(): AdminConfig | null {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!username || !password || !secret) {
    return null;
  }

  return { username, password, secret };
}

/** Constant-time comparison, so response timing never leaks how much of a value matched. */
function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}

/** The password is part of the key, so changing it invalidates every existing session. */
function sign(payload: string, config: AdminConfig): string {
  return createHmac("sha256", `${config.secret}:${config.password}`).update(payload).digest("base64url");
}

/** Format: v2.<expiresAtUnixSeconds>.<signature> — unique per login and expiring server-side. */
function createSessionToken(config: AdminConfig): string {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${TOKEN_VERSION}.${expiresAt}`;
  return `${payload}.${sign(`${payload}.${config.username}`, config)}`;
}

function isValidSessionToken(token: string, config: AdminConfig): boolean {
  const [version, expiresAtRaw, signature] = token.split(".");
  if (version !== TOKEN_VERSION || !expiresAtRaw || !signature) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;

  return safeEqual(signature, sign(`${version}.${expiresAtRaw}.${config.username}`, config));
}

export async function isAdminAuthenticated() {
  const config = getAdminConfig();
  if (!config) {
    return false;
  }

  const token = cookies().get(ADMIN_COOKIE)?.value;
  return token ? isValidSessionToken(token, config) : false;
}

export async function requireAdmin() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }
}

export async function verifyAdminCredentials(username: string, password: string) {
  const config = getAdminConfig();

  if (!config) {
    throw new Error("Missing admin config");
  }

  // Evaluate both comparisons so timing doesn't reveal which field was wrong.
  const usernameMatches = safeEqual(username, config.username);
  const passwordMatches = safeEqual(password, config.password);
  return usernameMatches && passwordMatches;
}

export async function createAdminSession() {
  const config = getAdminConfig();

  if (!config) {
    throw new Error("Missing admin config");
  }

  cookies().set(ADMIN_COOKIE, createSessionToken(config), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS
  });
}

export async function clearAdminSession() {
  cookies().delete(ADMIN_COOKIE);
}
