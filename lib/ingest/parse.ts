import Parser from "rss-parser";
import * as cheerio from "cheerio";
import crypto from "crypto";

export type FeedItem = { title?: string; link?: string; pubDate?: string; isoDate?: string };

export async function fetchRssItems(url: string): Promise<FeedItem[]> {
  const parser = new Parser();
  const feed = await parser.parseURL(url);
  return (feed.items ?? []) as any;
}

export function hashText(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export async function fetchHtml(url: string) {
  const res = await fetch(url, { redirect: "follow" as any });
  const html = await res.text();
  return { html, status: res.status };
}

export function extractMainText(html: string) {
  const $ = cheerio.load(html);
  $("script,noscript,style,svg").remove();
  const text = $("body").text();
  return text.replace(/\s+/g, " ").trim().slice(0, 50000);
}

export function bestEffortRobotsOk(_url: string) {
  // Placeholder for strict robots.txt parsing cache.
  // Policy: never bypass restrictions.
  return true;
}
