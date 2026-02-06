import Link from "next/link";
import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { getVaultAccess } from "@/lib/vaultAccess";
import { getTopStories } from "@/lib/repo";

export const metadata = { title: "Vault Overview" };

export default async function VaultPage() {
  const access = await getVaultAccess();
  if (!access.ok) {
    return (
      <main>
        <Container className="py-10">
          <h1 className="text-2xl font-semibold">Vault gesperrt</h1>
          <p className="text-zinc-300 mt-2">Zugriff: {access.reason}</p>
          <div className="mt-4 flex gap-3">
            <Link href="/pricing" className="no-underline rounded-2xl bg-white text-zinc-900 px-4 py-2 text-sm font-semibold hover:bg-zinc-100">Vault freischalten</Link>
            <Link href="/stories" className="no-underline rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-2 text-sm hover:bg-zinc-900">Public Index</Link>
          </div>
        </Container>
      </main>
    );
  }

  const stories = await getTopStories();

  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Vault aktiviert</h1>
        <p className="text-zinc-300 mt-2 max-w-3xl">
          Willkommen. Du hast Zugriff auf Deep Dives, Graph und Downloads. Feature-Set wird erweitert, ohne die Methodik zu verwässern.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader><div className="text-sm font-semibold">Deep Dives</div></CardHeader>
            <CardBody className="text-sm text-zinc-300 space-y-2">
              {(stories as any[]).slice(0, 5).map((s: any) => (
                <div key={s.slug}>
                  <Link href={`/vault/stories/${s.slug}`} className="no-underline">{s.title}</Link>
                </div>
              ))}
            </CardBody>
          </Card>
          <Card>
            <CardHeader><div className="text-sm font-semibold">Downloads</div></CardHeader>
            <CardBody className="text-sm text-zinc-300 space-y-2">
              <p>Story Packs (z. B. PDF/TXT). Aktuell liegt ein Sample-Paket bereit.</p>
              <Link href="/vault/downloads" className="text-sm">→ Zu den Downloads</Link>
            </CardBody>
          </Card>
        </div>
      </Container>
    </main>
  );
}
