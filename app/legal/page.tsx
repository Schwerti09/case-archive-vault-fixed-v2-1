import Link from "next/link";
import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";

export const metadata = { title: "Legal", description: "Impressum, Datenschutz, AGB, Kontakt." };

export default function LegalHub() {
  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Legal</h1>
        <p className="text-zinc-300 mt-2 max-w-3xl">Transparenz ist Teil der Autorität. Hier findest du alle Pflichtseiten.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader><div className="text-sm font-semibold">Impressum</div></CardHeader>
            <CardBody className="text-sm text-zinc-300">
              <p>Wissens-Bank, Rolf Schwertfechter, Karklandsweg 1, 26553 Dornum, rps-vertrieb@t-online.de, Steuerangaben auf Anfrage.</p>
              <p className="mt-2"><Link href="/impressum">→ Öffnen</Link></p>
            </CardBody>
          </Card>
          <Card>
            <CardHeader><div className="text-sm font-semibold">Datenschutz</div></CardHeader>
            <CardBody className="text-sm text-zinc-300">
              <p>Minimalprinzip: Session + Abo-Status. Keine Doxxing-Daten.</p>
              <p className="mt-2"><Link href="/datenschutz">→ Öffnen</Link></p>
            </CardBody>
          </Card>
          <Card>
            <CardHeader><div className="text-sm font-semibold">AGB</div></CardHeader>
            <CardBody className="text-sm text-zinc-300">
              <p>Nutzungsbedingungen für Vault-Abo.</p>
              <p className="mt-2"><Link href="/agb">→ Öffnen</Link></p>
            </CardBody>
          </Card>
          <Card>
            <CardHeader><div className="text-sm font-semibold">Kontakt</div></CardHeader>
            <CardBody className="text-sm text-zinc-300">
              <p>Fragen, Korrekturen, Hinweise.</p>
              <p className="mt-2"><Link href="/kontakt">→ Öffnen</Link></p>
            </CardBody>
          </Card>
        </div>
      </Container>
    </main>
  );
}
