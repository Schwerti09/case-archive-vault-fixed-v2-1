import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { getVaultAccess } from "@/lib/vaultAccess";
import { getEntityBySlug } from "@/lib/repo";
import { ConnectionGraph } from "@/components/ConnectionGraph";

export default async function VaultEntityPage({ params }: { params: Promise<{ slug: string }> }) {
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

  const entity: any = await getEntityBySlug((await params).slug);
  if (!entity) return notFound();

  return (
    <main>
      <Container className="py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{entity.name}</h1>
            <div className="text-zinc-500 text-sm mt-1">{String(entity.type)}</div>
            <p className="text-zinc-300 mt-3 max-w-3xl">{entity.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">{(entity.tags ?? []).map((t: string) => <Badge key={t}>{t}</Badge>)}</div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Link href={`/entities/${entity.canonicalSlug}`} className="no-underline rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-2 text-sm hover:bg-zinc-900">
              Public Index
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-12">
            <ConnectionGraph focusSlug={entity.canonicalSlug} />
          </div>

          <div className="lg:col-span-7">
            <Card className="mt-6">
              <CardHeader><div className="text-sm font-semibold">Claims (MVP)</div></CardHeader>
              <CardBody className="text-sm text-zinc-300">
                In v0.2.6 sind Claims im Seed nur als Methodik-Demo enthalten. In Produktion werden hier verknüpfte Claims + Statuschips sichtbar.
              </CardBody>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card className="mt-6">
              <CardHeader><div className="text-sm font-semibold">Actions</div></CardHeader>
              <CardBody className="text-sm text-zinc-300 space-y-2">
                <Link href="/vault/downloads" className="text-sm">→ Downloads</Link>
                <Link href="/vault/account" className="text-sm">→ Billing Portal</Link>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
