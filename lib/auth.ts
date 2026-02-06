import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE = "vault_session";

function secret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET missing");
  return new TextEncoder().encode(s);
}

export type Session = { userId: string; email: string; iat: number };

export async function createSessionToken(payload: { userId: string; email: string }) {
  const now = Math.floor(Date.now() / 1000);
  return await new SignJWT({ userId: payload.userId, email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime("30d")
    .sign(secret());
}

export async function readSession(): Promise<Session | null> {
  const c = cookies().get(COOKIE)?.value;
  if (!c) return null;
  try {
    const { payload } = await jwtVerify(c, secret());
    if (typeof payload.userId !== "string" || typeof payload.email !== "string") return null;
    return { userId: payload.userId, email: payload.email, iat: Number(payload.iat ?? 0) };
  } catch {
    return null;
  }
}

export function setSessionCookie(token: string) {
  cookies().set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}
