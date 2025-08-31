import { equals, round, SimpleArrayLike } from "./Common";
import Cache from "./Cache";
import { IMat4 } from "./Mat4";
import { IQuat } from "./Quat";
import { makeSwizzle } from "./Swizzle";
import { Vec2 } from "./Vec2";
import { Vec3 } from "./Vec3";

export interface IVec4 {
  x: number;
  y: number;
  z: number;
  w: number;
}

export class Vec4 extends makeSwizzle('x', 'y', 'z', 'w') {
  x = 0.0;
  y = 0.0;
  z = 0.0;
  w = 0.0;

  [n: number]: number;

  get 0() { return this.x; }
  get 1() { return this.y; }
  get 2() { return this.z; }
  get 3() { return this.w; }

  set 0(v) { this.x = v; }
  set 1(v) { this.y = v; }
  set 2(v) { this.z = v; }
  set 3(v) { this.w = v; }

  get width() { return this.z; }
  get height() { return this.w; }

  set width(v) { this.z = v; }
  set height(v) { this.w = v; }

  constructor();
  constructor(xyzw: number);
  constructor(x: number, y: number, z: number, w: number);
  constructor(x = 0.0, y = x, z = x, w = x) {
    super();
    this.set(x, y, z, w);
  }

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
    yield this.w;
  }

  copy(a: IVec4) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = a.w;
    return this;
  }

  set(x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }

  clone() {
    return new Vec4().copy(this);
  }

  add(o: IVec4): this {
    this.x += o.x;
    this.y += o.y;
    this.z += o.z;
    this.w += o.w;
    return this;
  }

  sub(o: IVec4): this {
    this.x -= o.x;
    this.y -= o.y;
    this.z -= o.z;
    this.w -= o.w;
    return this;
  }

  mul(o: IVec4): this {
    this.x *= o.x;
    this.y *= o.y;
    this.z *= o.z;
    this.w *= o.w;
    return this;
  }

  div(o: IVec4): this {
    this.x /= o.x;
    this.y /= o.y;
    this.z /= o.z;
    this.w /= o.w;
    return this;
  }

  mod(o: IVec4): this {
    this.x %= o.x;
    this.y %= o.y;
    this.z %= o.z;
    this.w %= o.w;
    return this;
  }

  zero() {
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
    this.w = 0.0;
    return this;
  }

  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  }

  inverse() {
    this.x = 1.0 / this.x;
    this.y = 1.0 / this.y;
    this.z = 1.0 / this.z;
    this.w = 1.0 / this.w;
    return this;
  }

  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    this.w = Math.ceil(this.w);
    return this;
  }

  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    this.w = Math.floor(this.w);
    return this;
  }

  round() {
    this.x = round(this.x);
    this.y = round(this.y);
    this.z = round(this.z);
    this.w = round(this.w);
    return this;
  }

  scale(v: number) {
    this.x *= v;
    this.y *= v;
    this.z *= v;
    this.w *= v;
    return this;
  }

  dot(o: IVec4) {
    return this.x * o.x + this.y * o.y + this.z * o.z + this.w * o.w;
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }

  length() {
    return Math.sqrt(this.lengthSq());
  }

  distance(o: IVec4) {
    return Cache.vec4.copy(this).sub(o).length();
  }

  distanceSq(o: IVec4) {
    return Cache.vec4.copy(this).sub(o).lengthSq();
  }

  normalize() {
    return this.div(this.length() || 1.0);
  }

  equals(o: IVec4, extract = false) {
    if (extract)
      return this.x === o.x && this.y === o.y && this.z === o.z && this.w === o.w;

    return equals(this.x, o.x) &&
      equals(this.y, o.y) &&
      equals(this.z, o.z) &&
      equals(this.w, o.w);
  }

  min(a: IVec4, b: IVec4): this {
    this.x = Math.min(a.x, b.x);
    this.y = Math.min(a.y, b.y);
    this.z = Math.min(a.z, b.z);
    this.w = Math.min(a.w, b.w);
    return this;
  }

  max(a: IVec4, b: IVec4): this {
    this.x = Math.max(a.x, b.x);
    this.y = Math.max(a.y, b.y);
    this.z = Math.max(a.z, b.z);
    this.w = Math.max(a.w, b.w);
    return this;
  }

  lerp(a: IVec4, b: IVec4, t: number): this {
    this.x = a.x + (b.x - a.x) * t;
    this.y = a.y + (b.y - a.y) * t;
    this.z = a.z + (b.z - a.z) * t;
    this.w = a.w + (b.w - a.w) * t;
    return this;
  }

  rendom(scale?: number) {
    let x = 0, y = 0, z = 0, w = 0;
    for (let i = 0; i < 4; i++) {
      const u = Math.random() * 2 - 1;
      const v = Math.random() * 2 - 1;
      const s = u * u + v * v;
      if (s >= 1) { i--; continue; }
      const f = Math.sqrt((1 - s) / s);
      if (i === 0) { x = u * f; y = v * f; }
      else if (i === 1) { z = u * f; w = v * f; }
    }
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this.normalize().scale(scale ?? 1.0);
  }

  applyMat4(mat: IMat4) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;
    this.x = mat.a * x + mat.e * y + mat.i * z + mat.m * w;
    this.y = mat.b * x + mat.f * y + mat.j * z + mat.n * w;
    this.z = mat.c * x + mat.g * y + mat.k * z + mat.o * w;
    this.w = mat.d * x + mat.h * y + mat.l * z + mat.p * w;
    return this;
  }

  applyQuat(quat: IQuat) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;

    const qx = quat.x;
    const qy = quat.y;
    const qz = quat.z;
    const qw = quat.w;

    const ix = qw * x + qy * z - qz * y;
    const iy = qw * y + qz * x - qx * z;
    const iz = qw * z + qx * y - qy * x;
    const iw = -qx * x - qy * y - qz * z;

    this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    this.w = w;

    return this;
  }

  fromArray(array: SimpleArrayLike, offset = 0) {
    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];
    this.w = array[offset + 3];
    return this;
  }

  toArray(): number[];
  toArray<T extends SimpleArrayLike>(array: T): T;
  toArray<T extends SimpleArrayLike>(array: T, offset: number): T;
  toArray(array: number[] = [], offset = 0) {
    array[offset] = this.x;
    array[offset + 1] = this.y;
    array[offset + 2] = this.z;
    array[offset + 3] = this.w;
    return array;
  }
}

function vec4(): Vec4;
function vec4(xyzw: Vec4): Vec4;
function vec4(xyz: Vec3, w: number): Vec4;
function vec4(xy: Vec2, zw: Vec2): Vec4;
function vec4(xy: Vec2, z: number, w: number): Vec4;
function vec4(x: number, y: number, zw: Vec2): Vec4;
function vec4(x: number, yzw: Vec3): Vec4;
function vec4(xyzw: number): Vec4;
function vec4(x: number, y: number, z: number, w: number): Vec4;
function vec4(
  x?: Vec4 | Vec3 | Vec2 | number,
  y?: Vec3 | Vec2 | number,
  z?: Vec2 | number,
  w?: number
) {
  if (x === undefined) x = 0;

  if (x instanceof Vec4) (w = x.w, z = x.z, y = x.y, x = x.x);
  else if (x instanceof Vec3) (w = y as number, z = x.z, y = x.y, x = x.x);
  else if (x instanceof Vec2) {
    if (y instanceof Vec2) (w = y.y, z = y.x, y = x.y, x = x.x);
    else (w = z as number, z = y as number, y = x.y, x = x.x);
  } else if (y instanceof Vec3) (w = y.z, z = y.y, y = y.x);
  else if (y instanceof Vec2) (w = y.y, z = y.x, y = y.x);
  else if (z instanceof Vec2) (w = z.y, z = z.x);

  if (y === undefined) y = x as number;
  if (z === undefined) z = x as number;
  if (w === undefined) w = x as number;

  return new Vec4(x as number, y as number, z as number, w as number);
}

export { vec4 };
