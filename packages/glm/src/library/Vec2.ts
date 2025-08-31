import { equals, round, SimpleArrayLike } from "./Common";
import Cache from "./Cache";
import { IMat2d } from "./Mat2d";
import { IMat2 } from "./Mat2";
import { IMat3 } from "./Mat3";
import { IMat4 } from "./Mat4";
import { makeSwizzle } from "./Swizzle";

export interface IVec2 {
  x: number;
  y: number;
}

export class Vec2 extends makeSwizzle('x', 'y') {
  x = 0.0;
  y = 0.0;

  [n: number]: number;

  get 0() { return this.x; }
  get 1() { return this.y; }

  set 0(v) { this.x = v; }
  set 1(v) { this.y = v; }

  get width() { return this.x; }
  get height() { return this.y; }

  set width(v) { this.x = v; }
  set height(v) { this.y = v; }

  constructor();
  constructor(xy: number);
  constructor(x: number, y: number);
  constructor(x = 0.0, y = x) {
    super();
    this.set(x, y);
  }

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }

  copy(a: IVec2) {
    this.x = a.x;
    this.y = a.y;
    return this;
  }

  set(x: number, y?: number) {
    this.x = x;
    this.y = y ?? x;
    return this;
  }

  clone() {
    return new Vec2().copy(this);
  }

  add(o: IVec2): this {
    this.x += o.x;
    this.y += o.y;
    return this;
  }

  sub(o: IVec2): this {
    this.x -= o.x;
    this.y -= o.y;
    return this;
  }

  mul(o: IVec2): this {
    this.x *= o.x;
    this.y *= o.y;
    return this;
  }

  div(o: IVec2): this {
    this.x /= o.x;
    this.y /= o.y;
    return this;
  }

  mod(o: IVec2): this {
    this.x %= o.x;
    this.y %= o.y;
    return this;
  }

  zero() {
    this.x = 0.0;
    this.y = 0.0;
    return this;
  }

  negate() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  inverse() {
    this.x = 1.0 / this.x;
    this.y = 1.0 / this.y;
    return this;
  }

  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }

  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  round() {
    this.x = round(this.x);
    this.y = round(this.y);
    return this;
  }

  scale(v: number) {
    this.x *= v;
    this.y *= v;
    return this;
  }

  dot(o: IVec2) {
    return this.x * o.x + this.y * o.y;
  }

  cross(o: IVec2) {
    return this.x * o.y - this.y * o.x;
  }

  angle(o: IVec2) {
    return Math.atan2(
      this.x * o.y - this.y * o.x,
      this.x * o.x + this.y * o.y
    );
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }

  length() {
    return Math.sqrt(this.lengthSq());
  }

  distance(o: IVec2) {
    return Cache.vec2.copy(this).sub(o).length();
  }

  distanceSq(o: IVec2) {
    return Cache.vec2.copy(this).sub(o).lengthSq();
  }

  normalize() {
    return this.div(this.length() || 1.0);
  }

  equals(o: IVec2, extract = false) {
    if (extract)
      return this.x === o.x && this.y === o.y;

    return equals(this.x, o.x) && equals(this.y, o.y);
  }

  min(a: IVec2, b: IVec2): this {
    this.x = Math.min(a.x, b.x);
    this.y = Math.min(a.y, b.y);
    return this;
  }

  max(a: IVec2, b: IVec2): this {
    this.x = Math.max(a.x, b.x);
    this.y = Math.max(a.y, b.y);
    return this;
  }

  lerp(a: IVec2, b: IVec2, t: number): this {
    return this.copy(b).sub(a).scale(t).add(a);
  }

  rendom(scale?: number) {
    const r = Math.random() * 2.0 * Math.PI;
    this.x = Math.cos(r);
    this.y = Math.sin(r);
    return this.scale(scale ?? 1.0);
  }

  rotate(rad: number, from?: IVec2) {
    if (from !== undefined)
      this.sub(from);

    const { x, y } = this;
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);

    this.x = x * cos - y * sin;
    this.y = y * sin + x * cos;

    if (from !== undefined)
      this.add(from);
    return this;
  }

  applyMat2(mat: IMat2) {
    const x = this.x;
    const y = this.y;
    this.x = mat.a * x + mat.c * y;
    this.y = mat.b * x + mat.d * y;
    return this;
  }

  applyMat2d(mat: IMat2d) {
    const x = this.x;
    const y = this.y;
    this.x = mat.a * x + mat.c * y + mat.e;
    this.y = mat.b * x + mat.d * y + mat.f;
    return this;
  }

  applyMat3(mat: IMat3) {
    const x = this.x;
    const y = this.y;
    this.x = mat.a * x + mat.d * y;
    this.y = mat.b * x + mat.e * y;
    return this;
  }

  applyMat4(mat: IMat4) {
    const x = this.x;
    const y = this.y;
    this.x = mat.a * x + mat.e * y;
    this.y = mat.b * x + mat.f * y;
    return this;
  }

  fromArray(array: SimpleArrayLike, offset = 0) {
    this.x = array[offset];
    this.y = array[offset + 1];
    return this;
  }

  toArray(): number[];
  toArray<T extends SimpleArrayLike>(array: T): T;
  toArray<T extends SimpleArrayLike>(array: T, offset: number): T;
  toArray(array: number[] = [], offset = 0) {
    array[offset] = this.x;
    array[offset + 1] = this.y;
    return array;
  }
}

function vec2(): Vec2;
function vec2(xy: Vec2): Vec2;
function vec2(x: number, y: number): Vec2;
function vec2(xy: number): Vec2;
function vec2(x?: Vec2 | number, y?: number) {
  if (x === undefined) x = 0;
  if (x instanceof Vec2) return new Vec2(x.x, x.y);
  if (y === undefined) y = x as number;
  return new Vec2(x as number, y as number);
}

export { vec2 };
