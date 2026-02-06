import Link from "next/link";
import { Container } from "@/components/Container";
import { Badge } from "@/components/Badge";

export function SiteHeader() {
  return (
    <div className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/75 backdrop-blur">
      <Container className="py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="no-underline font-semibold tracking-tight">
            Case Archive Vault <span className="text-zinc-500">v0.2.6</span>
          </Link>
          <Badge tone="ok">Quellenpflicht</Badge>
          <Badge tone="warn">Erwähnung ≠ Beweis</Badge>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/timeline" className="no-underline text-zinc-300 hover:text-white">Timeline</Link>
          <Link href="/stories" className="no-underline text-zinc-300 hover:text-white">Stories</Link>
          <Link href="/documents" className="no-underline text-zinc-300 hover:text-white">Documents</Link>
          <Link href="/entities" className="no-underline text-zinc-300 hover:text-white">Entities</Link>
          <Link href="/sources" className="no-underline text-zinc-300 hover:text-white">Sources</Link>
          <Link href="/pricing" className="no-underline text-white font-semibold">Vault €4,99</Link>
        </nav>
      </Container>
    </div>
  );
}
