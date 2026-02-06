import Link from "next/link";
import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { getSourcesIndex } from "@/lib/repo";

export const metadata = { title: "Sources", description: "Quelle-Verzeichnis mit Reliability Labels." };

export default async function SourcesPage() {
  const sources = await getSourcesIndex();

  return (
    <main>
      <Container className="py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Sources</h1>
            <p className="text-zinc-300 mt-2 max-w-3xl">Reliability Scores sind konservativ und dienen der Orientierung.</p>
          </div>
          <Link href="/methodology" className="no-underline rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-2 text-sm hover:bg-zinc-900">
            Methodology →
          </Link>
        </div>

        <div className="mt-6 grid gap-4">
          {(sources as any[]).map((s: any) => (
            <Card key={s.url}>
              <CardHeader className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{s.publisher}</div>
                  <div className="text-xs text-zinc-500 break-all">{s.url}</div>
                </div>
                <Badge tone={s.reliabilityScore >= 90 ? "ok" : s.reliabilityScore >= 80 ? "neutral" : "warn"}>{s.reliabilityScore}</Badge>
              </CardHeader>
              <CardBody className="text-sm text-zinc-300">
                Type: <span className="text-zinc-100">{String(s.type ?? "SECONDARY")}</span> •{" "}
                <a href={s.url} target="_blank" rel="noreferrer">Open</a>
              </CardBody>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
