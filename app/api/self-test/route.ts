import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const env = {
    NEXT_PUBLIC_SITE_URL: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    JWT_SECRET: Boolean(process.env.JWT_SECRET),
    DATABASE_URL: Boolean(process.env.DATABASE_URL),
    STRIPE_SECRET_KEY: Boolean(process.env.STRIPE_SECRET_KEY),
    STRIPE_WEBHOOK_SECRET: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    STRIPE_PRICE_VAULT: Boolean(process.env.STRIPE_PRICE_VAULT),
    STRIPE_SUCCESS_URL: Boolean(process.env.STRIPE_SUCCESS_URL),
    STRIPE_CANCEL_URL: Boolean(process.env.STRIPE_CANCEL_URL),
    OPS_PASSWORD: Boolean(process.env.OPS_PASSWORD),
  };

  let db = { ok: false, note: "DATABASE_URL missing" };
  if (prisma) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      db = { ok: true, note: "DB reachable" };
    } catch (e: any) {
      db = { ok: false, note: String(e?.message ?? e) };
    }
  }

  return NextResponse.json({ ok: true, env, db, ts: new Date().toISOString() });
}
