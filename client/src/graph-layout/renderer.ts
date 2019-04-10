import { TGraph } from "./graph.js";

const createGraphRenderer = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas not supported");

  return {
    append: (parent: HTMLElement) => {
      const r = window.devicePixelRatio;
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = w * r;
      canvas.height = h * r;
      const s = (r * Math.min(w, h)) / 1000;
      ctx.setTransform(s, 0, 0, s, 0, 0);
      ctx.translate(w / s, h / s);
      parent.appendChild(canvas);
    },
    render: (graph: TGraph) => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      ctx.lineWidth = 3;
      ctx.strokeStyle = "#333";
      graph.edges.forEach(e => {
        const a = graph.nodes[e.a].pos;
        const b = graph.nodes[e.b].pos;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });
      ctx.lineWidth = 3;
      Object.values(graph.nodes).forEach(({ id, pos: { x, y }, mass }, i) => {
        ctx.beginPath();
        ctx.arc(x, y, Math.cbrt(mass) * 2, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = i % 2 ? "#75f8fa" : "#9e5ace";
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 16px Helvetica";
        ctx.fillText(id.toUpperCase(), x, y);
      });
    }
  };
};

export { createGraphRenderer };
