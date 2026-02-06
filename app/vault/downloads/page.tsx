import Link from "next/link";
import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { getVaultAccess } from "@/lib/vaultAccess";

export const metadata = { title: "Vault Downloads" };

export default async function VaultDownloads() {
  const access = await getVaultAccess();
  if (!access.ok) {
    return (
      <main>
        <Container className="py-10">
          <h1 className="text-2xl font-semibold">Downloads gesperrt</h1>
          <p className="text-zinc-300 mt-2">Zugriff: {access.reason}</p>
          <div className="mt-4"><Link href="/pricing">→ Vault freischalten</Link></div>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Downloads</h1>
        <p className="text-zinc-300 mt-2 max-w-3xl">Story Packs sind kuratierte, zitierbare Zusammenfassungen.</p>

        <div className="mt-6 grid gap-4">
          <Card>
            <CardHeader><div className="text-sm font-semibold">Sample Story Pack</div></CardHeader>
            <CardBody className="text-sm text-zinc-300 space-y-2">
              <p>Aktuell liegt ein Sample-Download bereit:</p>
              <a href="/downloads/case-archive-vault-story-pack.txt" target="_blank" rel="noreferrer">
                case-archive-vault-story-pack.txt
              </a>
            </CardBody>
          </Card>
        </div>
      </Container>
    </main>
  );
}
