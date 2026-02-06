import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: { default: "Case Archive Vault — Quellenbasierter Case Index", template: "%s | Case Archive Vault" },
  description: "Research-Index: Timeline, Sources, Documents, Entities. Vault-Abo für Deep Dives & Advanced Search.",
  openGraph: {
    type: "website",
    title: "Case Archive Vault",
    description: "Research-Index mit Evidenz-Regeln (VERIFIED/ALLEGED/DISPUTED) + Quellenchips. Vault-Abo für Deep Dives.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
