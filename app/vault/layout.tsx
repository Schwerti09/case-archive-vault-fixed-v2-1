import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata: Metadata = { title: "Vault", description: "Vault: Deep Dives, Downloads, Graph." };

export default function VaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-950">
      <div className="border-b border-zinc-800 bg-zinc-950/60">
        <Container className="py-4 flex items-center justify-between gap-4">
          <div className="font-semibold">Vault</div>
          <nav className="flex gap-4 text-sm">
            <Link href="/vault" className="no-underline text-zinc-300 hover:text-white">Overview</Link>
            <Link href="/vault/downloads" className="no-underline text-zinc-300 hover:text-white">Downloads</Link>
            <Link href="/vault/account" className="no-underline text-zinc-300 hover:text-white">Account</Link>
          </nav>
        </Container>
      </div>
      {children}
    </div>
  );
}
