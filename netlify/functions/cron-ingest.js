export default async (req) => {
  // Netlify Scheduled Function: call the Ops ingest endpoint using a bearer secret
  // Configure NETLIFY_INGEST_SECRET and set a header check in /api/ops/ingest if you want.
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (!site) return { statusCode: 500, body: "NEXT_PUBLIC_SITE_URL missing" };

  const url = `${site.replace(/\/$/, "")}/api/ops/ingest`;
  const res = await fetch(url, { method: "POST" });
  const text = await res.text();
  return { statusCode: res.status, body: text };
};
