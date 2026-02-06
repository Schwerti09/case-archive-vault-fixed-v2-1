export const seedData = {
  sources: [
    { url: "https://www.justice.gov/", publisher: "US Department of Justice (Index)", type: "PRIMARY", reliabilityScore: 95 },
    { url: "https://www.courtlistener.com/", publisher: "CourtListener (Dockets Index)", type: "PRIMARY", reliabilityScore: 90 },
    { url: "https://www.reuters.com/", publisher: "Reuters (Investigations/Reporting)", type: "SECONDARY", reliabilityScore: 85 },
  ],
  entities: [
    {
      name: "Jeffrey Epstein (Fallkontext)",
      type: "PERSON",
      canonicalSlug: "jeffrey-epstein",
      summary: "Index-Entität für Fallkontext. Keine Schuldzuweisungen als Fakten; Claims sind status-getaggt und quellengebunden.",
      tags: ["case","context"],
    },
    {
      name: "U.S. Federal Court Filings",
      type: "ORG",
      canonicalSlug: "us-federal-court-filings",
      summary: "Sammel-Entität für Gerichtsfilings (Dockets, Orders, Motions).",
      tags: ["primary","dockets"],
    },
    {
      name: "Palm Beach (Ort, Kontext)",
      type: "PLACE",
      canonicalSlug: "palm-beach",
      summary: "Ortsindex für zeitliche/örtliche Einordnung in Quellen.",
      tags: ["place","context"],
    },
  ],
  stories: [
    {
      title: "Wie man Akten liest ohne Gerüchte zu reproduzieren",
      slug: "how-to-read-files-without-rumors",
      teaser: "Kurzleitfaden: Primärquelle → Zitat → Kontext → Unsicherheit. Keine Social-Media-Screenshots als „Beweis“.",
      bodyPublic:
        "Diese Plattform ist ein Research-Index. Das Ziel ist Klarheit: Was steht in welcher Quelle, wann, und wie sicher ist es?\n\nPublic Preview:\n- Primärquellen sind Goldstandard.\n- Seriöse Sekundärquellen sind hilfreich, bleiben aber Sekundär.\n- Jede Aussage braucht mindestens eine Quelle.\n\nWarum das wichtig ist:\nErwähnung ≠ Beweis. Ein Name in Akten kann Kontext, Zeugenangaben oder reine Bezugnahme sein.\n\n➡️ Für den vollständigen Deep Dive: Vault.",
      bodyVault:
        "## Vault Deep Dive\n\n### 1) Evidenz-Klassen\n- VERIFIED: Primärquelle oder mehrfach bestätigte seriöse Quellen.\n- ALLEGED: Behauptung/Angabe, noch nicht als Fakt belegt.\n- DISPUTED: Widerspruch / Gegenbelege.\n\n### 2) Praktischer Ablauf\n1) Originaldokument lesen\n2) Textstelle zitieren\n3) Claim kurz formulieren\n4) Quellenchips anheften\n5) Status setzen\n\n### 3) Opferschutz\nKeine Privatdaten. Keine ungeschwärzten Opferdaten. Keine expliziten Inhalte.",
      tags: ["methodology","trust"],
      entities: ["jeffrey-epstein","us-federal-court-filings"],
      publishAt: new Date("2026-02-06T09:00:00Z"),
    },
    {
      title: "Quellen-Index: Wie Reliability Scores vergeben werden",
      slug: "reliability-scores-explained",
      teaser: "Unsere Reliability Scores sind konservativ: Primärquellen hoch, investigative Sekundärquellen mittel-hoch, Social Media praktisch nie.",
      bodyPublic:
        "Reliability Scores helfen bei schneller Orientierung. Sie ersetzen keine Lektüre, aber verhindern, dass ein Screenshot die gleiche Gewichtung bekommt wie ein Docket.\n\n➡️ Im Vault: Policy + Beispielbewertungen + Audit-Log der Änderungen.",
      bodyVault:
        "## Vault: Score Policy\n\nPrimärquellen (90–100): Offizielle Releases, Dockets.\nSekundärquellen (70–89): Reuters/AP u.ä., Langform-Investigatives mit Methodenteil.\nNiedrig (<70): Meinungsstücke ohne Belege, Social Media Reposts.\n\nAudit: Jede Score-Änderung geht ins AuditLog.",
      tags: ["sources","policy"],
      entities: ["us-federal-court-filings"],
      publishAt: new Date("2026-02-05T12:00:00Z"),
    },
  ],
  events: [
    { date: new Date("2008-06-30T00:00:00Z"), title: "Gerichts-/Verfahrensmeilenstein (Indexeintrag)", summary: "Beispiel: Ereignisse werden als Indexpunkte geführt; Details stehen in Quellenlinks/Stories.", entities: ["us-federal-court-filings"] },
    { date: new Date("2019-08-10T00:00:00Z"), title: "Ereignis im öffentlichen Diskurs (Indexeintrag)", summary: "Beispiel-Eintrag: keine grafischen Details; Fokus auf verifizierbare Quellen und Kontext.", entities: ["jeffrey-epstein"] },
    { date: new Date("2026-02-06T00:00:00Z"), title: "Vault v0.2.6 live", summary: "Launch: Free Index + Vault Deep Dives. Opferschutz und Quellenpflicht sind Kernprinzip.", entities: ["jeffrey-epstein"] },
  ],
};
