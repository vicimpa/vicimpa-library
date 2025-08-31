import { equals, EPSILON, EulerOrder, SimpleArrayLike } from "./Common";
import { IVec3, Vec3 } from "./Vec3";
import { IMat3 } from "./Mat3";
import Cache from "./Cache";

const tmp = new Vec3();
const xUnit = new Vec3(1, 0, 0);
const yUnit = new Vec3(0, 1, 0);

export interface IQuat {
  x: number;
  y: number;
  z: number;
  w: number;
}

export class Quat {
  x = 0;
  y = 0;
  z = 0;
  w = 1;

  [n: number]: number;

  get 0() { return this.x; }
  get 1() { return this.y; }
  get 2() { return this.z; }
  get 3() { return this.w; }

  set 0(v: number) { this.x = v; }
  set 1(v: number) { this.y = v; }
  set 2(v: number) { this.z = v; }
  set 3(v: number) { this.w = v; }

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
    yield this.w;
  }

  copy(o: IQuat) {
    this.x = o.x;
    this.y = o.y;
    this.z = o.z;
    this.w = o.w;
    return this;
  }

  clone() {
    return new Quat().copy(this);
  }

  identity() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 1;
    return this;
  }

  normalize() {
    const len = Math.sqrt(
      this.x * this.x +
      this.y * this.y +
      this.z * this.z +
      this.w * this.w
    ) || 1.0;

    this.x /= len;
    this.y /= len;
    this.z /= len;
    this.w /= len;
    return this;
  }

  mul(q: IQuat) {
    const ax = this.x, ay = this.y, az = this.z, aw = this.w;
    const bx = q.x, by = q.y, bz = q.z, bw = q.w;

    return this.set(
      aw * bx + ax * bw + ay * bz - az * by,
      aw * by - ax * bz + ay * bw + az * bx,
      aw * bz + ax * by - ay * bx + az * bw,
      aw * bw - ax * bx - ay * by - az * bz
    );
  }

  set(x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }

  equals(o: IQuat, extract = false) {
    if (extract)
      return Cache.vec4.copy(this).equals(o, extract);

    return Math.abs(Cache.vec4.copy(this).dot(o)) >= 1 - EPSILON;
  }

  getAxisAngle(axis: IVec3): number {
    let rad = Math.acos(this.w) * 2.0;
    let s = Math.sin(rad / 2.0);

    if (s > EPSILON) {
      axis.x = this.x / s;
      axis.y = this.y / s;
      axis.z = this.z / s;
    } else {
      axis.x = 1;
      axis.y = 0;
      axis.z = 0;
    }

    return rad;
  }

  setAxisAngle(axis: IVec3, rad: number) {
    rad = rad * 0.5;
    let s = Math.sin(rad);
    this.x = s * axis.x;
    this.y = s * axis.y;
    this.z = s * axis.z;
    this.w = Math.cos(rad);
    return this;
  }

  getAngle(o: IQuat): number {
    let dotproduct = this.x * o.x + this.y * o.y + this.z * o.z + this.w * o.w;
    return Math.acos(2 * dotproduct * dotproduct - 1);
  }

  rotateX(rad: number) {
    rad *= 0.5;

    let ax = this.x,
      ay = this.y,
      az = this.z,
      aw = this.w;
    let bx = Math.sin(rad),
      bw = Math.cos(rad);

    this.x = ax * bw + aw * bx;
    this.y = ay * bw + az * bx;
    this.z = az * bw - ay * bx;
    this.w = aw * bw - ax * bx;
    return this;
  }

  rotateY(rad: number) {
    rad *= 0.5;

    let ax = this.x,
      ay = this.y,
      az = this.z,
      aw = this.w;
    let by = Math.sin(rad),
      bw = Math.cos(rad);

    this.x = ax * bw - az * by;
    this.y = ay * bw + aw * by;
    this.z = az * bw + ax * by;
    this.w = aw * bw - ay * by;
    return this;
  }

  rotateZ(rad: number) {
    rad *= 0.5;

    let ax = this.x,
      ay = this.y,
      az = this.z,
      aw = this.w;
    let bz = Math.sin(rad),
      bw = Math.cos(rad);

    this.x = ax * bw + ay * bz;
    this.y = ay * bw - ax * bz;
    this.z = az * bw + aw * bz;
    this.w = aw * bw - az * bz;
    return this;
  }

  calculateW() {
    let x = this.x,
      y = this.y,
      z = this.z;

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return this;
  }

  exp() {
    let x = this.x,
      y = this.y,
      z = this.z,
      w = this.w;

    let r = Math.sqrt(x * x + y * y + z * z);
    let et = Math.exp(w);
    let s = r > 0 ? (et * Math.sin(r)) / r : 0;

    this.x = x * s;
    this.y = y * s;
    this.z = z * s;
    this.w = et * Math.cos(r);

    return this;
  }

  ln() {
    let x = this.x,
      y = this.y,
      z = this.z,
      w = this.w;

    let r = Math.sqrt(x * x + y * y + z * z);
    let t = r > 0 ? Math.atan2(r, w) / r : 0;

    this.x = x * t;
    this.y = y * t;
    this.z = z * t;
    this.w = 0.5 * Math.log(x * x + y * y + z * z + w * w);

    return this;
  }

  scale(b: number) {
    this.x *= b;
    this.y *= b;
    this.z *= b;
    this.w *= b;
    return this;
  }

  pow(b: number) {
    this.ln();
    this.scale(b);
    this.exp();
    return this;
  }

  slerp(a: IQuat, b: IQuat, t: number) {
    let ax = a.x,
      ay = a.y,
      az = a.z,
      aw = a.w;
    let bx = b.x,
      by = b.y,
      bz = b.z,
      bw = b.w;

    let omega, cosom, sinom, scale0, scale1;

    cosom = ax * bx + ay * by + az * bz + aw * bw;
    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }
    if (1.0 - cosom > EPSILON) {
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      scale0 = 1.0 - t;
      scale1 = t;
    }

    this.x = scale0 * ax + scale1 * bx;
    this.y = scale0 * ay + scale1 * by;
    this.z = scale0 * az + scale1 * bz;
    this.w = scale0 * aw + scale1 * bw;

    return this;
  }

  random() {
    let u1 = Math.random();
    let u2 = Math.random();
    let u3 = Math.random();

    let sqrt1MinusU1 = Math.sqrt(1 - u1);
    let sqrtU1 = Math.sqrt(u1);

    this.x = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
    this.y = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
    this.z = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
    this.w = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
    return this;
  }

  invert() {
    let a0 = this.x,
      a1 = this.y,
      a2 = this.z,
      a3 = this.w;
    let dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    let invDot = dot ? 1.0 / dot : 0;

    this.x = -a0 * invDot;
    this.y = -a1 * invDot;
    this.z = -a2 * invDot;
    this.w = a3 * invDot;
    return this;
  }

  conjugate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = this.w;
    return this;
  }

  fromMat3(m: IMat3) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    let fTrace = m.a + m.e + m.i;
    let fRoot;

    if (fTrace > 0.0) {
      // |w| > 1/2, may as well choose w > 1/2
      fRoot = Math.sqrt(fTrace + 1.0); // 2w
      this.w = 0.5 * fRoot;
      fRoot = 0.5 / fRoot; // 1/(4w)
      this.x = (m.f - m.h) * fRoot;
      this.y = (m.g - m.c) * fRoot;
      this.z = (m.b - m.d) * fRoot;
    } else {
      // |w| <= 1/2
      let i = 0;
      if (m.e > m.a) i = 1;
      if (m.i > (i === 0 ? m.a : i === 1 ? m.e : m.i)) i = 2;
      let j = (i + 1) % 3;
      let k = (i + 2) % 3;

      let mii = i === 0 ? m.a : i === 1 ? m.e : m.i;
      let mjj = j === 0 ? m.a : j === 1 ? m.e : m.i;
      let mkk = k === 0 ? m.a : k === 1 ? m.e : m.i;
      let mij = i === 0 ? (j === 1 ? m.b : m.c) : i === 1 ? (j === 0 ? m.d : m.f) : (j === 0 ? m.g : m.h);
      let mik = i === 0 ? (k === 1 ? m.b : m.c) : i === 1 ? (k === 0 ? m.d : m.f) : (k === 0 ? m.g : m.h);
      let mjk = j === 0 ? (k === 1 ? m.b : m.c) : j === 1 ? (k === 0 ? m.d : m.f) : (k === 0 ? m.g : m.h);
      let mji = j === 0 ? (i === 1 ? m.b : m.c) : j === 1 ? (i === 0 ? m.d : m.f) : (i === 0 ? m.g : m.h);
      let mki = k === 0 ? (i === 1 ? m.b : m.c) : k === 1 ? (i === 0 ? m.d : m.f) : (i === 0 ? m.g : m.h);
      let mkj = k === 0 ? (j === 1 ? m.b : m.c) : k === 1 ? (j === 0 ? m.d : m.f) : (j === 0 ? m.g : m.h);

      fRoot = Math.sqrt(mii - mjj - mkk + 1.0);
      if (i === 0) this.x = 0.5 * fRoot;
      else if (i === 1) this.y = 0.5 * fRoot;
      else this.z = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      this.w = (mjk - mkj) * fRoot;
      if (j === 0) this.x = (mji + mij) * fRoot;
      else if (j === 1) this.y = (mji + mij) * fRoot;
      else this.z = (mji + mij) * fRoot;
      if (k === 0) this.x = (mki + mik) * fRoot;
      else if (k === 1) this.y = (mki + mik) * fRoot;
      else this.z = (mki + mik) * fRoot;
    }

    return this;
  }

  fromEuler(x: number, y: number, z: number, order: EulerOrder = 'zyx') {
    let halfToRad = Math.PI / 360;
    x *= halfToRad;
    z *= halfToRad;
    y *= halfToRad;

    let sx = Math.sin(x);
    let cx = Math.cos(x);
    let sy = Math.sin(y);
    let cy = Math.cos(y);
    let sz = Math.sin(z);
    let cz = Math.cos(z);

    switch (order) {
      case "xyz":
        this.x = sx * cy * cz + cx * sy * sz;
        this.y = cx * sy * cz - sx * cy * sz;
        this.z = cx * cy * sz + sx * sy * cz;
        this.w = cx * cy * cz - sx * sy * sz;
        break;

      case "xzy":
        this.x = sx * cy * cz - cx * sy * sz;
        this.y = cx * sy * cz - sx * cy * sz;
        this.z = cx * cy * sz + sx * sy * cz;
        this.w = cx * cy * cz + sx * sy * sz;
        break;

      case "yxz":
        this.x = sx * cy * cz + cx * sy * sz;
        this.y = cx * sy * cz - sx * cy * sz;
        this.z = cx * cy * sz - sx * sy * cz;
        this.w = cx * cy * cz + sx * sy * sz;
        break;

      case "yzx":
        this.x = sx * cy * cz + cx * sy * sz;
        this.y = cx * sy * cz + sx * cy * sz;
        this.z = cx * cy * sz - sx * sy * cz;
        this.w = cx * cy * cz - sx * sy * sz;
        break;

      case "zxy":
        this.x = sx * cy * cz - cx * sy * sz;
        this.y = cx * sy * cz + sx * cy * sz;
        this.z = cx * cy * sz + sx * sy * cz;
        this.w = cx * cy * cz - sx * sy * sz;
        break;

      case "zyx":
        this.x = sx * cy * cz - cx * sy * sz;
        this.y = cx * sy * cz + sx * cy * sz;
        this.z = cx * cy * sz - sx * sy * cz;
        this.w = cx * cy * cz + sx * sy * sz;
        break;

      default:
        throw new Error('Unknown angle order ' + order);
    }

    return this;
  }

  rotationTo(a: IVec3, b: IVec3): this {

    const dot = a.x * b.x + a.y * b.y + a.z * b.z;

    if (dot < -0.999999) {
      tmp.copy(xUnit).cross(a);
      if (tmp.length() < 0.000001) tmp.copy(yUnit).cross(a);
      tmp.normalize();
      this.setAxisAngle(tmp, Math.PI);
      return this;
    } else if (dot > 0.999999) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = 1;
      return this;
    } else {
      tmp.copy(a).cross(b);
      this.x = tmp.x;
      this.y = tmp.y;
      this.z = tmp.z;
      this.w = 1 + dot;
      return this.normalize();
    }
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
