import { equals, round } from "./Common";
import Cache from "./Cache";
import { IMat3 } from "./Mat3";
import { IMat4 } from "./Mat4";
import { IQuat } from "./Quat";
import { makeSwizzle } from "./Swizzle";

export interface IVec3 {
  x: number;
  y: number;
  z: number;
}

export class Vec3 extends makeSwizzle('x', 'y', 'z') {
  x = 0.0;
  y = 0.0;
  z = 0.0;

  [n: number]: number;

  get 0() { return this.x; }
  get 1() { return this.y; }
  get 2() { return this.z; }

  set 0(v) { this.x = v; }
  set 1(v) { this.y = v; }
  set 2(v) { this.z = v; }

  constructor();
  constructor(value: number);
  constructor(x: number, y: number, z: number);
  constructor(x = 0.0, y = x, z = x) {
    super();
    this.set(x, y, z);
  }

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
  }

  toString() {
    return `Vec3(${this.x}, ${this.y}, ${this.z})`;
  }

  copy(a: IVec3) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    return this;
  }

  set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  clone() {
    return new Vec3().copy(this);
  }

  add(o: IVec3): this {
    this.x += o.x;
    this.y += o.y;
    this.z += o.z;
    return this;
  }

  sub(o: IVec3): this {
    this.x -= o.x;
    this.y -= o.y;
    this.z -= o.z;
    return this;
  }

  mul(o: IVec3): this {
    this.x *= o.x;
    this.y *= o.y;
    this.z *= o.z;
    return this;
  }

  div(o: IVec3): this {
    this.x /= o.x;
    this.y /= o.y;
    this.z /= o.z;
    return this;
  }

  mod(o: IVec3): this {
    this.x %= o.x;
    this.y %= o.y;
    this.z %= o.z;
    return this;
  }

  zero() {
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
    return this;
  }

  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  inverse() {
    this.x = 1.0 / this.x;
    this.y = 1.0 / this.y;
    this.z = 1.0 / this.z;
    return this;
  }

  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    return this;
  }

  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  }

  round() {
    this.x = round(this.x);
    this.y = round(this.y);
    this.z = round(this.z);
    return this;
  }

  scale(v: number) {
    this.x *= v;
    this.y *= v;
    this.z *= v;
    return this;
  }

  dot(o: IVec3) {
    return this.x * o.x + this.y * o.y + this.z * o.z;
  }

  // В 3D векторное произведение — вектор. Мутирует текущий вектор.
  cross(o: IVec3) {
    const x = this.y * o.z - this.z * o.y;
    const y = this.z * o.x - this.x * o.z;
    const z = this.x * o.y - this.y * o.x;
    this.x = x; this.y = y; this.z = z;
    return this;
  }

  // Угол между векторами через atan2(|a×b|, a·b)
  angle(o: IVec3) {
    const dot = this.dot(o);
    const c = Cache.vec3.copy(this).cross(o).length();
    return Math.atan2(c, dot);
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  length() {
    return Math.sqrt(this.lengthSq());
  }

  distance(o: IVec3) {
    return Cache.vec3.copy(this).sub(o).length();
  }

  distanceSq(o: IVec3) {
    return Cache.vec3.copy(this).sub(o).lengthSq();
  }

  normalize() {
    return this.div(this.length() || 1.0);
  }

  equals(o: IVec3, extract = false) {
    if (extract)
      return this.x === o.x && this.y === o.y && this.z === o.z;

    return equals(this.x, o.x) && equals(this.y, o.y) && equals(this.z, o.z);
  }

  min(a: IVec3, b: IVec3): this {
    this.x = Math.min(a.x, b.x);
    this.y = Math.min(a.y, b.y);
    this.z = Math.min(a.z, b.z);
    return this;
  }

  max(a: IVec3, b: IVec3): this {
    this.x = Math.max(a.x, b.x);
    this.y = Math.max(a.y, b.y);
    this.z = Math.max(a.z, b.z);
    return this;
  }

  lerp(a: IVec3, b: IVec3, t: number): this {
    this.x = a.x + (b.x - a.x) * t;
    this.y = a.y + (b.y - a.y) * t;
    this.z = a.z + (b.z - a.z) * t;
    return this;
  }

  rendom(scale?: number) {
    const u = Math.random() * 2.0 - 1.0;
    const phi = Math.random() * 2.0 * Math.PI;
    const s = Math.sqrt(1.0 - u * u);
    this.x = s * Math.cos(phi);
    this.y = s * Math.sin(phi);
    this.z = u;
    return this.scale(scale ?? 1.0);
  }

  rotateX(rad: number, from?: IVec3) {
    if (from) this.sub(from);
    const { y, z } = this;
    const s = Math.sin(rad), c = Math.cos(rad);
    this.y = y * c - z * s;
    this.z = z * c + y * s;
    if (from) this.add(from);
    return this;
  }

  rotateY(rad: number, from?: IVec3) {
    if (from) this.sub(from);
    const { x, z } = this;
    const s = Math.sin(rad), c = Math.cos(rad);
    this.x = x * c + z * s;
    this.z = z * c - x * s;
    if (from) this.add(from);
    return this;
  }

  rotateZ(rad: number, from?: IVec3) {
    if (from) this.sub(from);
    const { x, y } = this;
    const s = Math.sin(rad), c = Math.cos(rad);
    this.x = x * c - y * s;
    this.y = y * c + x * s;
    if (from) this.add(from);
    return this;
  }

  rotateAround(rad: number, axis: IVec3, from?: IVec3) {
    if (from) this.sub(from);
    const s = Math.sin(rad), c = Math.cos(rad);
    const t = 1 - c;
    const { x: ax, y: ay, z: az } = axis;

    const x = this.x, y = this.y, z = this.z;
    this.x = (t * ax * ax + c) * x + (t * ax * ay - s * az) * y + (t * ax * az + s * ay) * z;
    this.y = (t * ax * ay + s * az) * x + (t * ay * ay + c) * y + (t * ay * az - s * ax) * z;
    this.z = (t * ax * az - s * ay) * x + (t * ay * az + s * ax) * y + (t * az * az + c) * z;

    if (from) this.add(from);
    return this;
  }

  applyMat3(mat: IMat3) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    this.x = mat.a * x + mat.d * y + mat.g * z;
    this.y = mat.b * x + mat.e * y + mat.h * z;
    this.z = mat.c * x + mat.f * y + mat.i * z;
    return this;
  }

  applyMat4(mat: IMat4) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    this.x = mat.a * x + mat.e * y + mat.i * z;
    this.y = mat.b * x + mat.f * y + mat.j * z;
    this.z = mat.c * x + mat.g * y + mat.k * z;
    return this;
  }

  applyQuat(quat: IQuat) {
    const x = this.x;
    const y = this.y;
    const z = this.z;

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

    return this;
  }
}
