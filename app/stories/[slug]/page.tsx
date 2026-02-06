import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { getStoryBySlug } from "@/lib/repo";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const story: any = await getStoryBySlug((await params).slug);
  if (!story) return {};
  return { title: story.title, description: story.teaser, alternates: { canonical: `/stories/${story.slug}` } };
}

export default async function StoryTeaserPage({ params }: { params: Promise<{ slug: string }> }) {
  const story: any = await getStoryBySlug((await params).slug);
  if (!story) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.teaser,
    datePublished: story.publishAt ?? new Date().toISOString(),
    isAccessibleForFree: true,
  };

  return (
    <main>
      <Container className="py-10">
        <JsonLd data={jsonLd} />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{story.title}</h1>
            <p className="text-zinc-300 mt-2 max-w-3xl">{story.teaser}</p>
            <div className="mt-3 flex flex-wrap gap-2">{(story.tags ?? []).map((t: string) => <Badge key={t}>{t}</Badge>)}</div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Link href="/stories" className="no-underline rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-2 text-sm hover:bg-zinc-900">← Stories</Link>
            <Link href={`/vault/stories/${story.slug}`} className="no-underline rounded-2xl bg-white text-zinc-900 px-4 py-2 text-sm font-semibold hover:bg-zinc-100">
              Unlock Deep Dive (€4,99) →
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-6">
            <Card>
              <CardHeader><div className="text-sm font-semibold">Public Preview</div></CardHeader>
              <CardBody className="prose prose-invert max-w-none">
                {String(story.bodyPublic).split("\n").map((p: string, i: number) => <p key={i}>{p}</p>)}
              </CardBody>
            </Card>

            <Card>
              <CardHeader><div className="text-sm font-semibold">Methodology Box</div></CardHeader>
              <CardBody className="text-sm text-zinc-300 space-y-2">
                <p>• VERIFIED: Primärquelle oder mehrfach bestätigte seriöse Quellen.</p>
                <p>• ALLEGED: Behauptung/Angabe (noch nicht als Fakt verifiziert).</p>
                <p>• DISPUTED: Widerspruch / Gegenbelege.</p>
                <p className="mt-2"><Link href="/methodology">→ Vollständige Regeln</Link></p>
              </CardBody>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader><div className="text-sm font-semibold">Vault Features</div></CardHeader>
              <CardBody className="text-sm text-zinc-300 space-y-2">
                <p>• Deep Dive (voller Text + Quellenmatrix)</p>
                <p>• Claim-Map & Entity Graph</p>
                <p>• Advanced Search + Saved Filters</p>
                <p>• Downloads (Story Packs)</p>
                <p>• Alerts (Roadmap)</p>
                <div className="pt-2">
                  <Link href="/pricing" className="no-underline inline-flex rounded-2xl bg-white text-zinc-900 px-4 py-2 text-sm font-semibold hover:bg-zinc-100">
                    Vault freischalten (€4,99)
                  </Link>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader><div className="text-sm font-semibold">Related Entities</div></CardHeader>
              <CardBody className="text-sm text-zinc-300 space-y-2">
                {(story.entities ?? []).map((e: any) => (
                  <div key={e.canonicalSlug ?? e}>
                    <Link href={`/entities/${e.canonicalSlug ?? e}`} className="no-underline">{e.name ?? e}</Link>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
