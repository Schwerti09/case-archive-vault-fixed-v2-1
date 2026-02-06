import Link from "next/link";
import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";

export const metadata = { title: "Success", description: "Checkout erfolgreich." };

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const sid = (await searchParams)?.session_id;
  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Zahlung erfolgreich</h1>
        <p className="text-zinc-300 mt-2 max-w-3xl">Wir finalisieren deinen Vault-Zugang und setzen die Session.</p>

        <div className="mt-6">
          <Card>
            <CardHeader><div className="text-sm font-semibold">Vault aktivieren</div></CardHeader>
            <CardBody className="text-sm text-zinc-300 space-y-3">
              {sid ? (
                <>
                  <p>Klicke auf „Continue“, um die Session zu setzen und direkt in den Vault zu springen.</p>
                  <Link href={`/api/auth/complete?session_id=${encodeURIComponent(sid)}`} className="no-underline inline-flex rounded-2xl bg-white text-zinc-900 px-4 py-2 text-sm font-semibold hover:bg-zinc-100">
                    Continue →
                  </Link>
                </>
              ) : (
                <>
                  <p>Session-ID fehlt. Öffne den Link aus Stripe erneut oder gehe zu:</p>
                  <Link href="/pricing" className="text-sm">Vault →</Link>
                </>
              )}
              <p className="text-xs text-zinc-500">Falls du hängen bleibst: /ops/self-test checken (Admin) oder Support kontaktieren.</p>
            </CardBody>
          </Card>
        </div>
      </Container>
    </main>
  );
}
