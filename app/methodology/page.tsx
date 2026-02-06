import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { Badge } from "@/components/Badge";

export const metadata = { title: "Methodology", description: "Evidenz-Regeln, Zitierstandard und Opferschutz." };

export default function MethodologyPage() {
  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Methodology</h1>
        <p className="text-zinc-300 mt-2 max-w-3xl">
          Unser Standard ist langweilig – und genau deshalb vertrauenswürdig: Jede Aussage braucht Quellen, Claims sind status-getaggt.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="text-sm font-semibold">Evidenz-Status</div>
              <div className="text-xs text-zinc-500">Trennung von Fakt, Behauptung und Streitstand.</div>
            </CardHeader>
            <CardBody className="text-sm text-zinc-300 space-y-3">
              <div className="flex items-center gap-2"><Badge tone="ok">VERIFIED</Badge><span>Primärquelle oder mehrfach bestätigte seriöse Quellen.</span></div>
              <div className="flex items-center gap-2"><Badge tone="warn">ALLEGED</Badge><span>Behauptung/Angabe, noch nicht als Fakt belegt.</span></div>
              <div className="flex items-center gap-2"><Badge tone="bad">DISPUTED</Badge><span>Widerspruch / Gegenbelege / unklare Lage.</span></div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><div className="text-sm font-semibold">Zitierstandard</div></CardHeader>
            <CardBody className="text-sm text-zinc-300 space-y-3">
              <p>1) Quelle (URL + Publisher) • 2) Datum • 3) Zitat/Paraphrase • 4) Kontext • 5) Unsicherheit.</p>
              <p>Wir hosten keine ungeschwärzten Opferdaten. Problematische Quellen werden nicht gespiegelt.</p>
            </CardBody>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader><div className="text-sm font-semibold">No-Sensationalism Policy</div></CardHeader>
            <CardBody className="text-sm text-zinc-300 space-y-2">
              <p>• Keine sexualisierten Details.</p>
              <p>• Keine privaten Adressen/Telefonnummern/Identitäten von Opfern.</p>
              <p>• Keine Schuldzuweisung als Fakt ohne Beleg.</p>
              <p>• Korrekturen (Roadmap): Changelog mit Zeitstempel.</p>
            </CardBody>
          </Card>
        </div>
      </Container>
    </main>
  );
}
