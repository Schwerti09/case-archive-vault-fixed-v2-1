import { NextResponse } from "next/server";
import { stripeClient } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { readSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await readSession();
  if (!session) return NextResponse.redirect(new URL("/pricing", process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"));

  if (!prisma) return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user?.stripeCustomerId) return NextResponse.redirect(new URL("/pricing", process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"));

  const stripe = stripeClient();
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");
  const portal = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${base}/vault/account`,
  });

  return NextResponse.redirect(portal.url);
}
