import React, { useRef, useEffect } from "react";
import { build } from "./graph";
import { createGraphSVGRenderer } from "./SVGRenderer";

const n = (
  id: string,
  label: string,
  first: boolean
): [string, string, number] => [id, label, first ? 3000 : 400];
const e = (a: string, b: string): [string, string, number] => [a, b, 10];

const GraphLayout = ({
  nodeSpecs,
  edgeSpecs,
  ...props
}: {
  nodeSpecs: [string, string][];
  edgeSpecs: [string, string][];
} & React.HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef(null as HTMLDivElement | null);

  useEffect(() => {
    const { current: el } = ref;
    if (!el) return;
    let g = build(
      {
        nodeSpecs: nodeSpecs.map((args, i) => n(args[0], args[1], i === 0)),
        edgeSpecs: edgeSpecs.map(args => e(...args))
      },
      50
    );
    const { append, update } = createGraphSVGRenderer(g);
    append(el);
    let raf = -1;
    const run = () => {
      raf = requestAnimationFrame(run);
      update();
    };
    run();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <div ref={ref} {...props} />;
};

export default GraphLayout;
