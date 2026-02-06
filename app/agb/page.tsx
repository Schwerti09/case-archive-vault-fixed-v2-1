import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";

export const metadata = { title: "AGB", description: "Nutzungsbedingungen." };

export default function AGBPage() {
  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">AGB</h1>
        <div className="mt-6 grid gap-4">
          <Card>
            <CardHeader><div className="text-sm font-semibold">1. Zweck</div></CardHeader>
            <CardBody className="text-sm text-zinc-300">
              Research-Index mit Quellenverweisen. Kein Ersatz für Rechtsberatung. Keine Veröffentlichung von Privatdaten Dritter.
            </CardBody>
          </Card>
          <Card>
            <CardHeader><div className="text-sm font-semibold">2. Vault-Abo</div></CardHeader>
            <CardBody className="text-sm text-zinc-300 space-y-2">
              <p>Der Vault ist ein monatliches Abo (derzeit €4,99/Monat) über Stripe. Kündigung jederzeit im Billing Portal.</p>
              <p>Der Zugang endet bei fehlender Zahlung/Beendigung gemäß Stripe-Status.</p>
            </CardBody>
          </Card>
          <Card>
            <CardHeader><div className="text-sm font-semibold">3. Inhalte</div></CardHeader>
            <CardBody className="text-sm text-zinc-300">
              Inhalte sind kuratiert, aber nicht unfehlbar. Corrections sind willkommen und werden protokolliert.
            </CardBody>
          </Card>
        </div>
      </Container>
    </main>
  );
}
