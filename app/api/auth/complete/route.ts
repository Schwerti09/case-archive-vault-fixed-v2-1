import { NextResponse } from "next/server";
import { stripeClient } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { createSessionToken, setSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sid = searchParams.get("session_id");
  if (!sid) return NextResponse.redirect(new URL("/pricing", process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"));

  const stripe = stripeClient();
  const sess = await stripe.checkout.sessions.retrieve(sid, { expand: ["subscription", "customer"] });

  const email = (sess.customer_details?.email ?? sess.customer_email) as string | null;
  const customerId = typeof sess.customer === "string" ? sess.customer : (sess.customer as any)?.id;
  const subId = typeof sess.subscription === "string" ? sess.subscription : (sess.subscription as any)?.id;

  if (!email || !customerId || !subId) {
    return NextResponse.redirect(new URL("/pricing", process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"));
  }

  if (!prisma) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const user = await prisma.user.upsert({
    where: { email },
    update: { stripeCustomerId: customerId },
    create: { email, stripeCustomerId: customerId },
  });

  const sub = typeof sess.subscription === "string" ? await stripe.subscriptions.retrieve(sess.subscription) : (sess.subscription as any);
  const status = String(sub.status ?? "unknown");
  const periodEnd = sub.current_period_end ? new Date(sub.current_period_end * 1000) : null;
  const cancelAtPeriodEnd = Boolean(sub.cancel_at_period_end ?? false);

  await prisma.subscription.upsert({
    where: { userId: user.id },
    update: { stripeSubscriptionId: subId, status, currentPeriodEnd: periodEnd, cancelAtPeriodEnd },
    create: { userId: user.id, stripeSubscriptionId: subId, status, currentPeriodEnd: periodEnd, cancelAtPeriodEnd },
  });

  await prisma.auditLog.create({ data: { actorType: "SYSTEM", action: "AUTH_COMPLETE", detail: { email, customerId, subId, status } } });

  const token = await createSessionToken({ userId: user.id, email });
  setSessionCookie(token);

  const res = NextResponse.redirect(new URL("/vault", process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"));
  return res;
}
