import { createHash } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE = "gg_admin_session";

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

function createSessionToken(config: AdminConfig) {
  return createHash("sha256")
    .update(`${config.username}:${config.password}:${config.secret}`)
    .digest("hex");
}

export async function isAdminAuthenticated() {
  const config = getAdminConfig();

  if (!config) {
    return false;
  }

  const token = cookies().get(ADMIN_COOKIE)?.value;
  return token === createSessionToken(config);
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

  return username === config.username && password === config.password;
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
    maxAge: 60 * 60 * 12
  });
}

export async function clearAdminSession() {
  cookies().delete(ADMIN_COOKIE);
}
