import { prisma } from "@/lib/db";
import { readSession } from "@/lib/auth";

export async function getVaultAccess() {
  const session = await readSession();
  if (!session) return { ok: false as const, reason: "NO_SESSION" };
  if (!prisma) return { ok: false as const, reason: "DB_NOT_CONFIGURED" };

  const user = await prisma.user.findUnique({ where: { id: session.userId }, include: { subscription: true } });
  if (!user?.subscription) return { ok: false as const, reason: "NO_SUBSCRIPTION" };

  const status = (user.subscription.status || "").toLowerCase();
  const allowed = status === "active" || status === "trialing";
  if (!allowed) return { ok: false as const, reason: `STATUS_${status.toUpperCase()}` };

  if (user.subscription.currentPeriodEnd && user.subscription.currentPeriodEnd.getTime() < Date.now()) {
    return { ok: false as const, reason: "EXPIRED" };
  }
  return { ok: true as const, user };
}
