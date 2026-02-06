import { NextResponse } from "next/server";
import { setOpsSession } from "@/lib/opsAuth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const expected = process.env.OPS_PASSWORD ?? "";
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  if (!expected || password !== expected) {
    return NextResponse.redirect(new URL("/ops/login", base));
  }

  await setOpsSession();
  return NextResponse.redirect(new URL("/ops", base));
}
