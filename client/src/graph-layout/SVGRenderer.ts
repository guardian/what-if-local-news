import { TGraph, TNode, updatePositions } from "./graph";

const nodeEl = (fill: string) => (n: TNode): SVGCircleElement => {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  el.style.fill = fill;
  el.style.stroke = "#75f8fa";
  el.style.strokeWidth = "3";
  el.style.cursor = "pointer";
  el.setAttribute("r", `${Math.cbrt(n.mass) * 2}`);
  el.setAttribute("data-id", n.id);
  return el;
};

const edgeEl = (stroke: string) => (): SVGPathElement => {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
  el.style.stroke = stroke;
  el.style.strokeWidth = "3";
  return el;
};

const textEl = (fill: string) => (n: TNode): SVGTextElement => {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "text");
  el.style.fill = fill;
  el.style.textAlign = "centyer";
  el.style.textAnchor = "middle";
  el.style.alignmentBaseline = "middle";
  el.style.fontWeight = "bold";
  el.innerHTML = n.label;
  el.style.pointerEvents = "none";
  return el;
};

const createGraphSVGRenderer = (graph: TGraph) => {
  let g = graph;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xlmns", "http://www.w3.org/2000/svg");
  svg.style.width = "100%";
  svg.style.height = "100%";
  const nodeEls = Object.values(graph.nodes).map(nodeEl("#fff"));
  const edgeEls = Object.values(graph.edges).map(edgeEl("#333"));
  const textEls = Object.values(graph.nodes).map(textEl("#333"));

  return {
    append: (parent: HTMLElement) => {
      svg.setAttribute("viewBox", `-150 -150 300 300`);
      parent.appendChild(svg);
      edgeEls.forEach(el => svg.appendChild(el));
      nodeEls.forEach(el => svg.appendChild(el));
      textEls.forEach(el => svg.appendChild(el));
    },
    update: () => {
      g = updatePositions(g);
      g.edges.forEach((e, i) => {
        const a = g.nodes[e.a].pos;
        const b = g.nodes[e.b].pos;
        const el = edgeEls[i];
        el.setAttribute("d", `M ${a.x} ${a.y} L ${b.x} ${b.y}`);
      });
      Object.values(g.nodes).forEach(({ pos: { x, y } }, i) => {
        const el = nodeEls[i];
        const text = textEls[i];
        el.setAttribute("cx", `${x}`);
        el.setAttribute("cy", `${y}`);
        text.setAttribute("x", `${x}`);
        text.setAttribute("y", `${y}`);
      });
    }
  };
};

export { createGraphSVGRenderer };
