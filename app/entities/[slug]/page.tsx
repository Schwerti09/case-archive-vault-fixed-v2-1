import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { getEntityBySlug } from "@/lib/repo";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const entity = await getEntityBySlug((await params).slug);
  if (!entity) return {};
  return { title: (entity as any).name, description: (entity as any).summary, alternates: { canonical: `/entities/${(entity as any).canonicalSlug}` } };
}

export default async function EntityPage({ params }: { params: Promise<{ slug: string }> }) {
  const entity: any = await getEntityBySlug((await params).slug);
  if (!entity) return notFound();

  const jsonLd = { "@context": "https://schema.org", "@type": "Thing", name: entity.name, description: entity.summary };

  return (
    <main>
      <Container className="py-10">
        <JsonLd data={jsonLd} />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{entity.name}</h1>
            <div className="text-zinc-500 text-sm mt-1">{String(entity.type)}</div>
            <p className="text-zinc-300 mt-3 max-w-3xl">{entity.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">{(entity.tags ?? []).map((t: string) => <Badge key={t}>{t}</Badge>)}</div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Link href="/entities" className="no-underline rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-2 text-sm hover:bg-zinc-900">← Entities</Link>
            <Link href={`/vault/entity/${entity.canonicalSlug}`} className="no-underline rounded-2xl bg-white text-zinc-900 px-4 py-2 text-sm font-semibold hover:bg-zinc-100">Vault Deep Dive →</Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Card>
              <CardHeader>
                <div className="text-sm font-semibold">Neutraler Index-Status</div>
                <div className="text-xs text-zinc-500">Behauptungen gehören in status-getaggte Claims mit Quellen.</div>
              </CardHeader>
              <CardBody className="text-sm text-zinc-300 space-y-3">
                <p>Diese Seite bleibt bewusst neutral. Der Vault zeigt Struktur (Claims/Graph), nicht „Drama“.</p>
                <p>Für Claim-Map, Timeline-Slice und Quellen-Appendix: <Link href={`/vault/entity/${entity.canonicalSlug}`}>Vault</Link>.</p>
              </CardBody>
            </Card>
          </div>
          <div className="lg:col-span-5">
            <Card>
              <CardHeader><div className="text-sm font-semibold">Related</div></CardHeader>
              <CardBody className="text-sm text-zinc-300">Im Vault siehst du, in welchen Story Packs diese Entity auftaucht.</CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
