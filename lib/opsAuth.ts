import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE = "ops_session";

function secret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET missing");
  return new TextEncoder().encode(s);
}

export async function setOpsSession() {
  const now = Math.floor(Date.now() / 1000);
  const token = await new SignJWT({ ops: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime("7d")
    .sign(secret());
  cookies().set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: true, path: "/ops", maxAge: 60*60*24*7 });
}

export async function isOpsAuthed() {
  const c = cookies().get(COOKIE)?.value;
  if (!c) return false;
  try {
    const { payload } = await jwtVerify(c, secret());
    return Boolean(payload.ops);
  } catch {
    return false;
  }
}
