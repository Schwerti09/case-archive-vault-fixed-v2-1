import { NextResponse } from "next/server";
import { stripeClient } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = stripeClient();
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });

  const body = await req.text();
  let event: any;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (!prisma) return NextResponse.json({ ok: true, note: "DB not configured" });

  const type = event.type;
  const obj = event.data.object;

  async function upsertFromSub(sub: any) {
    const customerId = String(sub.customer ?? "");
    const subId = String(sub.id ?? "");
    if (!customerId || !subId) return;

    const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } });
    if (!user) return;

    const periodEnd = sub.current_period_end ? new Date(sub.current_period_end * 1000) : null;
    const status = String(sub.status ?? "unknown");
    const cancelAtPeriodEnd = Boolean(sub.cancel_at_period_end ?? false);

    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: { stripeSubscriptionId: subId, status, currentPeriodEnd: periodEnd, cancelAtPeriodEnd },
      create: { userId: user.id, stripeSubscriptionId: subId, status, currentPeriodEnd: periodEnd, cancelAtPeriodEnd },
    });

    await prisma.auditLog.create({ data: { actorType: "WEBHOOK", action: "SUB_UPDATED", detail: { status, subId, customerId } } });
  }

  if (type === "customer.subscription.created" || type === "customer.subscription.updated" || type === "customer.subscription.deleted") {
    await upsertFromSub(obj);
  }

  if (type === "checkout.session.completed") {
    // if checkout session includes customer + subscription, map them
    const customerId = String(obj.customer ?? "");
    const subId = String(obj.subscription ?? "");
    const email = obj.customer_details?.email ?? obj.customer_email;
    if (customerId && email) {
      const user = await prisma.user.upsert({
        where: { email },
        update: { stripeCustomerId: customerId },
        create: { email, stripeCustomerId: customerId },
      });
      if (subId) {
        const sub = await stripe.subscriptions.retrieve(subId);
        await prisma.subscription.upsert({
          where: { userId: user.id },
          update: {
            stripeSubscriptionId: sub.id,
            status: sub.status,
            currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
            cancelAtPeriodEnd: Boolean(sub.cancel_at_period_end),
          },
          create: {
            userId: user.id,
            stripeSubscriptionId: sub.id,
            status: sub.status,
            currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
            cancelAtPeriodEnd: Boolean(sub.cancel_at_period_end),
          },
        });
      }
      await prisma.auditLog.create({ data: { actorType: "WEBHOOK", action: "CHECKOUT_COMPLETED", detail: { email, customerId, subId } } });
    }
  }

  return NextResponse.json({ received: true });
}
