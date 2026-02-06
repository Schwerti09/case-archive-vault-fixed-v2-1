import Link from "next/link";
import { Container } from "@/components/Container";

export function SiteFooter() {
  return (
    <div className="border-t border-zinc-800 mt-16">
      <Container className="py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div className="space-y-2">
          <div className="font-semibold">Case Archive Vault</div>
          <div className="text-zinc-400">
            Research-Index mit Evidenz-Regeln, Quellenchips und klarer Trennung von Fakten vs. Behauptungen.
          </div>
        </div>
        <div className="space-y-2">
          <div className="font-semibold">Navigation</div>
          <div className="flex flex-col gap-1">
            <Link href="/methodology" className="no-underline text-zinc-300 hover:text-white">Methodology</Link>
            <Link href="/legal" className="no-underline text-zinc-300 hover:text-white">Legal</Link>
            <Link href="/pricing" className="no-underline text-zinc-300 hover:text-white">Vault Abo</Link>
          </div>
        </div>
        <div className="space-y-2">
          <div className="font-semibold">Rechtliches</div>
          <div className="flex flex-col gap-1">
            <Link href="/impressum" className="no-underline text-zinc-300 hover:text-white">Impressum</Link>
            <Link href="/datenschutz" className="no-underline text-zinc-300 hover:text-white">Datenschutz</Link>
            <Link href="/agb" className="no-underline text-zinc-300 hover:text-white">AGB</Link>
            <Link href="/kontakt" className="no-underline text-zinc-300 hover:text-white">Kontakt</Link>
          </div>
        </div>
      </Container>
      <Container className="pb-10 text-xs text-zinc-500">
        © {new Date().getFullYear()} Case Archive Vault • Keine Rechtsberatung • Keine Doxxing-/Privatdaten.
      </Container>
    </div>
  );
}
