import { removeAt } from "./utils";
import { Vec2, scale, add, sub, mag, unit, dir, dist, TVec2 } from "./Vec2";

const G = -0.05; // anti gravity

type TNodeSpec = [string, string, number];
type TEdgeSpec = [string, string, number];

export type TNode = {
  id: string;
  label: string;
  pos: TVec2;
  mass: number;
  vel: TVec2;
};

type TNodeMap = { [key: string]: TNode };

type TEdge = {
  a: string;
  b: string;
  elasticity: number;
};

export type TGraph = {
  nodes: TNodeMap;
  edges: TEdge[];
};

const Edge = ([a, b, elasticity]: [string, string, number]) => ({
  a,
  b,
  elasticity
});
const Node = (
  id: string,
  label: string,
  pos: TVec2,
  mass: number,
  vel: TVec2
) => ({
  id,
  label,
  pos,
  mass,
  vel
});
const Graph = (nodes: TNodeMap, edges: TEdge[]) => ({ nodes, edges });

const setPos = (pos: TVec2) => (n: TNode) =>
  Node(n.id, n.label, pos, n.mass, n.vel);
const setVel = (vel: TVec2) => (n: TNode) =>
  Node(n.id, n.label, n.pos, n.mass, vel);
const update = (pos: TVec2, vel: TVec2) => (n: TNode) =>
  setPos(pos)(setVel(vel)(n));

const build = (
  { nodeSpecs, edgeSpecs }: { nodeSpecs: TNodeSpec[]; edgeSpecs: TEdgeSpec[] },
  d: number
) => createPositionedGraph(d)(nodeSpecs, edgeSpecs.map(Edge));

const createPositionedGraph = (d: number) => (
  nodeSpecs: TNodeSpec[],
  edges: TEdge[]
) => {
  const side = Math.ceil(Math.sqrt(nodeSpecs.length));
  const halfSide = side / 2;
  const _nodeSpecs = nodeSpecs.slice().sort(() => Math.random() - 0.5);
  return Graph(
    _nodeSpecs.reduce(
      (acc, [id, label, mass], i) => ({
        ...acc,
        [id]: Node(
          id,
          label,
          Vec2(
            Math.floor(i / side - halfSide) * d,
            ((i % side) - halfSide) * d
          ),
          mass,
          Vec2()
        )
      }),
      {} as { [key: string]: TNode }
    ),
    edges
  );
};

const gBetween = (a: TNode, b: TNode) =>
  scale((G * a.mass * b.mass) / dist(a.pos)(b.pos) ** 2)(dir(a.pos, b.pos));

const eBetween = (a: TNode, b: TNode, elasticity: number) =>
  scale(dist(a.pos)(b.pos) / elasticity)(dir(a.pos, b.pos));

const accDueToGravity = (self: TNode, others: TNode[]) =>
  others.reduce((acc, other) => add(acc)(gBetween(self, other)), Vec2());

type TJoinedEdge = {
  a: TNode;
  b: TNode;
  elasticity: number;
};

const accDueToEdges = (edges: TJoinedEdge[]) =>
  edges.reduce(
    (acc, edge) => add(acc)(eBetween(edge.a, edge.b, edge.elasticity)),
    Vec2()
  );

const createJoinedEdges = (self: TNode, edges: TEdge[], nodes: TNodeMap) =>
  edges.reduce(
    (acc, e) => {
      if (e.a === self.id) {
        return [...acc, { elasticity: e.elasticity, a: self, b: nodes[e.b] }];
      } else if (e.b === self.id) {
        return [...acc, { elasticity: e.elasticity, a: self, b: nodes[e.a] }];
      }
      return acc;
    },
    [] as TJoinedEdge[]
  );

const updatePositions = (g: TGraph) =>
  Graph(
    Object.values(g.nodes).reduce((acc, self, i, arr) => {
      const gravAcc = accDueToGravity(self, removeAt(arr, i));
      const edgeAcc = accDueToEdges(createJoinedEdges(self, g.edges, g.nodes));
      const vel = add(gravAcc)(edgeAcc);
      const pos = add(self.pos)(vel);
      return {
        ...acc,
        [self.id]: update(pos, vel)(self)
      };
    }, {}),
    g.edges
  );
export { build, updatePositions };
