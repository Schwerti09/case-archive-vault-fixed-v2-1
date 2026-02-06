import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";

export const metadata = { title: "Kontakt", description: "Kontakt & Corrections." };

export default function KontaktPage() {
  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Kontakt</h1>
        <p className="text-zinc-300 mt-2 max-w-3xl">
          Für Korrekturen/Quellenhinweise: bitte kurz, präzise, mit Link zur Primärquelle.
        </p>

        <div className="mt-6">
          <Card>
            <CardHeader><div className="text-sm font-semibold">Kontakt</div></CardHeader>
            <CardBody className="text-sm text-zinc-300 space-y-2">
              <p>Wissens-Bank, Rolf Schwertfechter, Karklandsweg 1, 26553 Dornum, rps-vertrieb@t-online.de, Steuerangaben auf Anfrage.</p>
              <p>E-Mail: <a href="mailto:rps-vertrieb@t-online.de">rps-vertrieb@t-online.de</a></p>
            </CardBody>
          </Card>
        </div>
      </Container>
    </main>
  );
}
