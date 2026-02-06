import Link from "next/link";
import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { getVaultAccess } from "@/lib/vaultAccess";

export const metadata = { title: "Account" };

export default async function VaultAccount() {
  const access = await getVaultAccess();
  if (!access.ok) {
    return (
      <main>
        <Container className="py-10">
          <h1 className="text-2xl font-semibold">Account gesperrt</h1>
          <p className="text-zinc-300 mt-2">Zugriff: {access.reason}</p>
          <div className="mt-4"><Link href="/pricing">→ Vault freischalten</Link></div>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Account</h1>
        <p className="text-zinc-300 mt-2 max-w-3xl">Abo verwalten, kündigen oder Zahlungsdaten aktualisieren.</p>

        <div className="mt-6">
          <Card>
            <CardHeader><div className="text-sm font-semibold">Billing Portal</div></CardHeader>
            <CardBody className="text-sm text-zinc-300 space-y-3">
              <p>Stripe Billing Portal öffnet sich in neuem Tab.</p>
              <a
                className="no-underline inline-flex rounded-2xl bg-white text-zinc-900 px-4 py-2 text-sm font-semibold hover:bg-zinc-100"
                href="/api/stripe/portal"
              >
                Open Billing Portal →
              </a>
              <p className="text-xs text-zinc-500">Portal-Session ist kurzlebig; notfalls Seite neu laden.</p>
            </CardBody>
          </Card>
        </div>
      </Container>
    </main>
  );
}
