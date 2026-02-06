import { NextResponse } from "next/server";
import { stripeClient } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST() {
  const stripe = stripeClient();
  const price = process.env.STRIPE_PRICE_VAULT;
  if (!price) return NextResponse.json({ error: "STRIPE_PRICE_VAULT missing" }, { status: 500 });

  const successUrl = process.env.STRIPE_SUCCESS_URL ?? (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com") + "/success?session_id={CHECKOUT_SESSION_ID}";
  const cancelUrl = process.env.STRIPE_CANCEL_URL ?? (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com") + "/pricing";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: successUrl,
    cancel_url: cancelUrl,
    automatic_tax: { enabled: true },
    tax_id_collection: { enabled: true },
  });

  return NextResponse.json({ url: session.url });
}
