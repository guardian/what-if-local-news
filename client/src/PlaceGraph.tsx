import React from "react";
import { PlaceWithDocumentsAndDocumentPeople } from "./services/CouncillorService";
import GraphLayout from "./graph-layout/GraphLayout";
import Link, { push } from "./routing/Link";
import { placeRoute, documentRoute, personRoute } from "./routes";

type PlaceGraphProps = {
  place: PlaceWithDocumentsAndDocumentPeople;
};

const uniqueNodes = (nodes: [string, string][]) =>
  nodes.filter(([id], i, arr) => arr.slice(0, i).every(([id2]) => id !== id2));

const uniqueEdges = (edges: [string, string][]) =>
  edges.filter(
    ([id1, id2], i, arr) =>
      !arr.slice(0, i).some(edge => edge.includes(id1) && edge.includes(id2))
  );

const PlaceGraph = ({
  place,
  ...props
}: PlaceGraphProps & React.HTMLAttributes<HTMLDivElement>) => {
  const nodes = uniqueNodes([
    [placeRoute(place), `Place: ${place.name}`],
    ...place.documents.reduce(
      (acc, d): [string, string][] => [
        ...acc,
        [documentRoute(d), `Document: ${d.title}`],
        ...d.people.map(
          (p): [string, string] => [personRoute(p), `Person: ${p.name}`]
        )
      ],
      [] as [string, string][]
    )
  ]);
  const nodeSpecs = nodes.map(([id], i): [string, string] => [id, `${i + 1}`]);
  const edgeSpecs = uniqueEdges(
    place.documents.reduce(
      (acc, d): [string, string][] => [
        ...acc,
        [placeRoute(place), documentRoute(d)],
        ...d.people.map(
          (p): [string, string] => [documentRoute(d), personRoute(p)]
        )
      ],
      [] as [string, string][]
    )
  );
  return (
    <div
      onClick={e => {
        const { target } = e;
        if (!(target instanceof SVGElement)) return;
        const { id } = target.dataset;
        if (!id) return;
        push(id);
      }}
    >
      <GraphLayout {...props} nodeSpecs={nodeSpecs} edgeSpecs={edgeSpecs} />
      <ol style={{ padding: "1em 1em 1em 2em", margin: "0px" }}>
        {nodes.map(([id, label]) => (
          <li key={id}>
            <Link path={id}>{label}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PlaceGraph;
