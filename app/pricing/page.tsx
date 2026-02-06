import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { CheckoutButton } from "@/components/CheckoutButton";
import Link from "next/link";

export const metadata = { title: "Vault", description: "Vault Abo: €4,99/Monat. Deep Dives, Graph, Downloads." };

export default function PricingPage() {
  return (
    <main>
      <Container className="py-10">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl font-semibold">Vault Zugang</h1>
            <p className="text-zinc-300 mt-2 max-w-2xl">
              €4,99/Monat. Du bekommst Deep Dives, Entity Graph, Downloads (Story Packs) und Advanced Index-Views.
            </p>

            <Card>
              <CardHeader><div className="text-sm font-semibold">Was ist drin?</div></CardHeader>
              <CardBody className="text-sm text-zinc-300 space-y-2">
                <p>• Volltexte & Quellenmatrix pro Story</p>
                <p>• Claim-Map / Graph (MVP)</p>
                <p>• Downloads: Story Packs (z. B. als PDF/TXT)</p>
                <p>• Roadmap: Alerts, Saved Search, Changelog</p>
              </CardBody>
            </Card>

            <div className="flex flex-wrap gap-3">
              <CheckoutButton />
              <Link href="/methodology" className="no-underline rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-2 text-sm hover:bg-zinc-900">
                Methodology
              </Link>
            </div>

            <div className="text-xs text-zinc-500">
              Kündigung jederzeit über Stripe Billing Portal. Zugang wird über Subscription Status gesteuert.
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card>
              <CardHeader><div className="text-sm font-semibold">Trust Notes</div></CardHeader>
              <CardBody className="text-sm text-zinc-300 space-y-2">
                <p>• Keine Privatdaten, kein Doxxing</p>
                <p>• Keine Sensationsdetails</p>
                <p>• Evidenz-Regeln sind sichtbar (VERIFIED/ALLEGED/DISPUTED)</p>
                <p>• Fehler melden: <Link href="/kontakt">Kontakt</Link></p>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
