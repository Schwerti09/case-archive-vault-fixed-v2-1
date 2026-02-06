"use client";

import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { buildGraph } from "@/lib/graph";

type D3Node = { slug: string; label: string; x?: number; y?: number };
type D3Link = { source: any; target: any; label: string };

export function ConnectionGraph({ focusSlug }: { focusSlug: string }) {
  const ref = useRef<SVGSVGElement | null>(null);
  const data = useMemo(() => buildGraph(focusSlug), [focusSlug]);

  useEffect(() => {
    const svgEl = ref.current;
    if (!svgEl) return;

    const svg = d3.select<SVGSVGElement, unknown>(svgEl);
    svg.selectAll("*").remove();

    const width = 900;
    const height = 420;
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const g = svg.append("g");
    svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.6, 2.2])
        .on("zoom", (event) => g.attr("transform", event.transform))
    );

    const links = data.links as unknown as D3Link[];
    const nodes = data.nodes as unknown as D3Node[];

    const link = g.append("g")
      .attr("stroke", "rgba(161,161,170,0.28)")
      .attr("stroke-width", 1)
      .selectAll("line")
      .data(links)
      .enter()
      .append("line");

    const node = g.append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g");

    node.append("circle")
      .attr("r", (d) => (d.slug === focusSlug ? 16 : 10))
      .attr("fill", (d) => (d.slug === focusSlug ? "rgba(59,130,246,0.65)" : "rgba(39,39,42,0.95)"))
      .attr("stroke", "rgba(244,244,245,0.25)")
      .attr("stroke-width", 1.25);

    node.append("text")
      .text((d) => d.label)
      .attr("x", 14)
      .attr("y", 4)
      .attr("font-size", 11)
      .attr("fill", "rgba(244,244,245,0.82)");

    const sim = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links as any).id((d: any) => d.slug).distance(140))
      .force("charge", d3.forceManyBody().strength(-380))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(28));

    sim.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => sim.stop();
  }, [data, focusSlug]);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">Entity Graph</div>
          <div className="text-xs text-zinc-500">Zoom &amp; Pan • Knoten=Entitäten • Kanten=Co-Erwähnung (MVP)</div>
        </div>
        <div className="text-xs text-zinc-400">
          Nodes: <span className="text-zinc-200">{data.nodes.length}</span> • Links:{" "}
          <span className="text-zinc-200">{data.links.length}</span>
        </div>
      </div>
      <svg ref={ref} className="mt-3 w-full h-[420px] rounded-xl border border-zinc-900 bg-zinc-950" />
      <div className="mt-3 text-xs text-zinc-500">
        Hinweis: Der Graph ist ein Visualisierungstool, kein Schuldbeweis. Jede Aussage muss an Quellen hängen.
      </div>
    </div>
  );
}
