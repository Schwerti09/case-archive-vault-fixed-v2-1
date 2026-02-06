import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";

export const metadata = { title: "Impressum", description: "Impressum." };

export default function ImpressumPage() {
  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Impressum</h1>
        <div className="mt-6">
          <Card>
            <CardHeader><div className="text-sm font-semibold">Angaben</div></CardHeader>
            <CardBody className="text-sm text-zinc-300 space-y-2">
              <p>Wissens-Bank, Rolf Schwertfechter, Karklandsweg 1, 26553 Dornum, rps-vertrieb@t-online.de, Steuerangaben auf Anfrage.</p>
              <p>Dieses Angebot ist ein Research-Index. Keine Rechtsberatung.</p>
            </CardBody>
          </Card>
        </div>
      </Container>
    </main>
  );
}
