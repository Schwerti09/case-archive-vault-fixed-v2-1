import Link from "next/link";
import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { getTopStories, getTimelineEvents, getSourcesIndex } from "@/lib/repo";
import { JsonLd } from "@/components/JsonLd";

export default async function HomePage() {
  const [stories, events, sources] = await Promise.all([getTopStories(), getTimelineEvents(), getSourcesIndex()]);

  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Case Archive Vault",
    url: base,
    description: "Quellenbasierter Research-Index mit Evidenz-Regeln. Vault für Deep Dives.",
    potentialAction: { "@type": "SearchAction", target: `${base}/stories?q={search_term_string}`, "query-input": "required name=search_term_string" },
  };

  return (
    <main>
      <Container className="py-10">
        <JsonLd data={jsonLd} />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <Card>
              <CardHeader>
                <div className="text-xs text-zinc-400">Autoritativer Case Index</div>
                <h1 className="text-3xl font-semibold mt-1">Case Archive Vault</h1>
                <p className="text-zinc-300 mt-2 max-w-2xl">
                  Öffentlicher Index (Timeline, Sources, Documents, Entities) + Vault-Abo für Deep Dives, Entity Graph,
                  Advanced Search, Downloads, Alerts.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge tone="ok">VERIFIED / ALLEGED / DISPUTED</Badge>
                  <Badge tone="warn">Opferschutz</Badge>
                  <Badge>Quellenchips</Badge>
                </div>
              </CardHeader>
              <CardBody className="flex flex-wrap gap-3">
                <Link href="/stories" className="no-underline rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold hover:bg-zinc-800">
                  Stories ansehen
                </Link>
                <Link href="/timeline" className="no-underline rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-2 text-sm hover:bg-zinc-900">
                  Timeline öffnen
                </Link>
                <Link href="/pricing" className="no-underline rounded-2xl bg-white text-zinc-900 px-4 py-2 text-sm font-semibold hover:bg-zinc-100">
                  Vault freischalten (€4,99)
                </Link>
                <Link href="/methodology" className="no-underline rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-2 text-sm hover:bg-zinc-900">
                  Methodology
                </Link>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-sm font-semibold">Top Updates</div>
                <div className="text-xs text-zinc-500">Teaser öffentlich — Deep Dives im Vault.</div>
              </CardHeader>
              <CardBody className="space-y-4">
                {(stories as any[]).map((s: any) => (
                  <div key={s.slug} className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">
                          <Link href={`/stories/${s.slug}`} className="no-underline">{s.title}</Link>
                        </div>
                        <div className="text-sm text-zinc-300 mt-1">{s.teaser}</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {(s.tags ?? []).slice(0, 3).map((t: string) => <Badge key={t}>{t}</Badge>)}
                        </div>
                      </div>
                      <Link href={`/vault/stories/${s.slug}`} className="no-underline text-xs rounded-full bg-white text-zinc-900 px-3 py-1 font-semibold">
                        Unlock
                      </Link>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Card>
              <CardHeader>
                <div className="text-sm font-semibold">Timeline Preview</div>
                <div className="text-xs text-zinc-500">Chronologie als Index — Details über Quellen.</div>
              </CardHeader>
              <CardBody className="space-y-3">
                {(events as any[]).slice(-6).map((e: any, idx: number) => (
                  <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-3">
                    <div className="text-xs text-zinc-500">{new Date(e.date).toISOString().slice(0, 10)}</div>
                    <div className="text-sm font-semibold">{e.title}</div>
                    <div className="text-sm text-zinc-300 mt-1">{e.summary}</div>
                  </div>
                ))}
                <Link href="/timeline" className="text-sm">→ Ganze Timeline</Link>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-sm font-semibold">Source Directory Preview</div>
                <div className="text-xs text-zinc-500">Reliability Scores sind konservativ.</div>
              </CardHeader>
              <CardBody className="space-y-2">
                {(sources as any[]).slice(0, 6).map((s: any) => (
                  <div key={s.url} className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950/40 p-3">
                    <div>
                      <div className="text-sm font-semibold">{s.publisher}</div>
                      <div className="text-xs text-zinc-500 break-all">{s.url}</div>
                    </div>
                    <Badge tone={s.reliabilityScore >= 90 ? "ok" : "neutral"}>{s.reliabilityScore}</Badge>
                  </div>
                ))}
                <Link href="/sources" className="text-sm">→ Alle Quellen</Link>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
