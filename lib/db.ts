import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient | null = process.env.DATABASE_URL
  ? (globalThis.__prisma ?? new PrismaClient({ log: ["error", "warn"] }))
  : null;

if (process.env.DATABASE_URL) globalThis.__prisma = prisma as PrismaClient;
