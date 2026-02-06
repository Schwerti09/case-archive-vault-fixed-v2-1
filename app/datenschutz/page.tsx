import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";

export const metadata = { title: "Datenschutz", description: "Datenschutzerklärung (Kurz, technisch)." };

export default function DatenschutzPage() {
  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Datenschutz</h1>
        <p className="text-zinc-300 mt-2 max-w-3xl">Minimalprinzip: so wenig wie möglich, so viel wie nötig.</p>

        <div className="mt-6 grid gap-4">
          <Card>
            <CardHeader><div className="text-sm font-semibold">Verantwortlicher</div></CardHeader>
            <CardBody className="text-sm text-zinc-300"><p>Wissens-Bank, Rolf Schwertfechter, Karklandsweg 1, 26553 Dornum, rps-vertrieb@t-online.de, Steuerangaben auf Anfrage.</p></CardBody>
          </Card>

          <Card>
            <CardHeader><div className="text-sm font-semibold">Welche Daten?</div></CardHeader>
            <CardBody className="text-sm text-zinc-300 space-y-2">
              <p>• Session-Cookie (Vault-Zugang)</p>
              <p>• E-Mail (User-Konto, Zuordnung)</p>
              <p>• Stripe: Zahlungsabwicklung und Abo-Status (Customer/Subscription IDs)</p>
              <p>• Ops Audit: technische Logs (z. B. „Ingestion lief“)</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><div className="text-sm font-semibold">Keine Doxxing-Daten</div></CardHeader>
            <CardBody className="text-sm text-zinc-300">
              <p>Wir erfassen und veröffentlichen keine Privatadressen/Telefonnummern von Dritten und hosten keine ungeschwärzten Opferdaten.</p>
            </CardBody>
          </Card>
        </div>
      </Container>
    </main>
  );
}
