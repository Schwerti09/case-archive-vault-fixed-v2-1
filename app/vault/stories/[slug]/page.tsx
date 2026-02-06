import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { getVaultAccess } from "@/lib/vaultAccess";
import { getStoryBySlug } from "@/lib/repo";

export default async function VaultStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const access = await getVaultAccess();
  if (!access.ok) {
    return (
      <main>
        <Container className="py-10">
          <h1 className="text-2xl font-semibold">Vault gesperrt</h1>
          <p className="text-zinc-300 mt-2">Zugriff: {access.reason}</p>
          <div className="mt-4"><Link href="/pricing">→ Vault freischalten</Link></div>
        </Container>
      </main>
    );
  }

  const story: any = await getStoryBySlug((await params).slug);
  if (!story) return notFound();

  return (
    <main>
      <Container className="py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{story.title}</h1>
            <p className="text-zinc-300 mt-2 max-w-3xl">{story.teaser}</p>
            <div className="mt-3 flex flex-wrap gap-2">{(story.tags ?? []).map((t: string) => <Badge key={t}>{t}</Badge>)}</div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Link href={`/stories/${story.slug}`} className="no-underline rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-2 text-sm hover:bg-zinc-900">
              Public Preview
            </Link>
            <Link href="/vault/downloads" className="no-underline rounded-2xl bg-white text-zinc-900 px-4 py-2 text-sm font-semibold hover:bg-zinc-100">
              Downloads →
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-6">
            <Card>
              <CardHeader><div className="text-sm font-semibold">Vault Deep Dive</div></CardHeader>
              <CardBody className="prose prose-invert max-w-none">
                {String(story.bodyVault).split("\n").map((p: string, i: number) => <p key={i}>{p}</p>)}
              </CardBody>
            </Card>

            <Card>
              <CardHeader><div className="text-sm font-semibold">Source Checklist</div></CardHeader>
              <CardBody className="text-sm text-zinc-300 space-y-2">
                <p>• Jede Aussage braucht Quelle(n).</p>
                <p>• Erwähnung ≠ Beweis.</p>
                <p>• Status für Claims konservativ setzen.</p>
              </CardBody>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader><div className="text-sm font-semibold">Downloads</div></CardHeader>
              <CardBody className="text-sm text-zinc-300 space-y-2">
                <p>Sample Story Pack:</p>
                <a className="text-sm" href="/downloads/case-archive-vault-story-pack.txt" target="_blank" rel="noreferrer">
                  case-archive-vault-story-pack.txt
                </a>
                <p className="text-xs text-zinc-500">In Produktion würden hier PDFs/ZIPs liegen (z. B. pro Story).</p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader><div className="text-sm font-semibold">Entities</div></CardHeader>
              <CardBody className="text-sm text-zinc-300 space-y-2">
                {(story.entities ?? []).map((e: any) => (
                  <div key={e.canonicalSlug ?? e}>
                    <Link href={`/vault/entity/${e.canonicalSlug ?? e}`} className="no-underline">{e.name ?? e}</Link>
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
