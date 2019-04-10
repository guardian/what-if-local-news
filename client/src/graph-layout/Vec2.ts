export type TVec2 = {
  x: number;
  y: number;
};

const Vec2 = (x = 0, y = 0): TVec2 => ({ x, y });
const scale = (s: number) => (v: TVec2) => Vec2(v.x * s, v.y * s);
const add = (a: TVec2) => (b: TVec2) => Vec2(a.x + b.x, a.y + b.y);
const sub = (a: TVec2) => (b: TVec2) => Vec2(a.x - b.x, a.y - b.y);
const mag = (v: TVec2) => Math.sqrt(v.x ** 2 + v.y ** 2);
const unit = (v: TVec2) => scale(1 / mag(v))(v);
const dir = (a: TVec2, b: TVec2) => unit(sub(b)(a));
const dist = (a: TVec2) => (b: TVec2) => mag(sub(a)(b));

export { Vec2, scale, add, sub, mag, unit, dir, dist };
