import { Base } from "./Base";
import Cache from "./Cache";
import { equals, SimpleArrayLike } from "./Common";
import { IQuat, Quat } from "./Quat";
import { IVec3, Vec3 } from "./Vec3";

export interface IMat4 {
  a: number; b: number; c: number; d: number;
  e: number; f: number; g: number; h: number;
  i: number; j: number; k: number; l: number;
  m: number; n: number; o: number; p: number;
}

export type FieldOfView = {
  upDegrees: number;
  downDegrees: number;
  leftDegrees: number;
  rightDegrees: number;
};

export class Mat4 extends Base {
  a = 1; b = 0; c = 0; d = 0;
  e = 0; f = 1; g = 0; h = 0;
  i = 0; j = 0; k = 1; l = 0;
  m = 0; n = 0; o = 0; p = 1;

  [n: number]: number;

  get 0() { return this.a; } get 1() { return this.b; } get 2() { return this.c; } get 3() { return this.d; }
  get 4() { return this.e; } get 5() { return this.f; } get 6() { return this.g; } get 7() { return this.h; }
  get 8() { return this.i; } get 9() { return this.j; } get 10() { return this.k; } get 11() { return this.l; }
  get 12() { return this.m; } get 13() { return this.n; } get 14() { return this.o; } get 15() { return this.p; }

  set 0(v: number) { this.a = v; } set 1(v: number) { this.b = v; } set 2(v: number) { this.c = v; } set 3(v: number) { this.d = v; }
  set 4(v: number) { this.e = v; } set 5(v: number) { this.f = v; } set 6(v: number) { this.g = v; } set 7(v: number) { this.h = v; }
  set 8(v: number) { this.i = v; } set 9(v: number) { this.j = v; } set 10(v: number) { this.k = v; } set 11(v: number) { this.l = v; }
  set 12(v: number) { this.m = v; } set 13(v: number) { this.n = v; } set 14(v: number) { this.o = v; } set 15(v: number) { this.p = v; }

  *[Symbol.iterator]() {
    yield this.a; yield this.b; yield this.c; yield this.d;
    yield this.e; yield this.f; yield this.g; yield this.h;
    yield this.i; yield this.j; yield this.k; yield this.l;
    yield this.m; yield this.n; yield this.o; yield this.p;
  }

  frob() {
    return Math.sqrt(
      this.a * this.a + this.b * this.b + this.c * this.c + this.d * this.d +
      this.e * this.e + this.f * this.f + this.g * this.g + this.h * this.h +
      this.i * this.i + this.j * this.j + this.k * this.k + this.l * this.l +
      this.m * this.m + this.n * this.n + this.o * this.o + this.p * this.p
    );
  }

  copy(o: IMat4) {
    this.a = o.a; this.b = o.b; this.c = o.c; this.d = o.d;
    this.e = o.e; this.f = o.f; this.g = o.g; this.h = o.h;
    this.i = o.i; this.j = o.j; this.k = o.k; this.l = o.l;
    this.m = o.m; this.n = o.n; this.o = o.o; this.p = o.p;
    return this;
  }

  identity() {
    this.a = 1; this.b = 0; this.c = 0; this.d = 0;
    this.e = 0; this.f = 1; this.g = 0; this.h = 0;
    this.i = 0; this.j = 0; this.k = 1; this.l = 0;
    this.m = 0; this.n = 0; this.o = 0; this.p = 1;
    return this;
  }

  set(
    a: number, b: number, c: number, d: number,
    e: number, f: number, g: number, h: number,
    i: number, j: number, k: number, l: number,
    m: number, n: number, o: number, p: number
  ) {
    this.a = a; this.b = b; this.c = c; this.d = d;
    this.e = e; this.f = f; this.g = g; this.h = h;
    this.i = i; this.j = j; this.k = k; this.l = l;
    this.m = m; this.n = n; this.o = o; this.p = p;
    return this;
  }

  clone() { return new Mat4().copy(this); }

  transpose(o: IMat4 = this) {
    return this.set(
      o.a, o.e, o.i, o.m,
      o.b, o.f, o.j, o.n,
      o.c, o.g, o.k, o.o,
      o.d, o.h, o.l, o.p
    );
  }

  mul(o: IMat4) {
    const a = this.a, b = this.b, c = this.c, d = this.d;
    const e = this.e, f = this.f, g = this.g, h = this.h;
    const i = this.i, j = this.j, k = this.k, l = this.l;
    const m = this.m, n = this.n, o0 = this.o, p = this.p;

    return this.set(
      a * o.a + e * o.b + i * o.c + m * o.d,
      b * o.a + f * o.b + j * o.c + n * o.d,
      c * o.a + g * o.b + k * o.c + o0 * o.d,
      d * o.a + h * o.b + l * o.c + p * o.d,

      a * o.e + e * o.f + i * o.g + m * o.h,
      b * o.e + f * o.f + j * o.g + n * o.h,
      c * o.e + g * o.f + k * o.g + o0 * o.h,
      d * o.e + h * o.f + l * o.g + p * o.h,

      a * o.i + e * o.j + i * o.k + m * o.l,
      b * o.i + f * o.j + j * o.k + n * o.l,
      c * o.i + g * o.j + k * o.k + o0 * o.l,
      d * o.i + h * o.j + l * o.k + p * o.l,

      a * o.m + e * o.n + i * o.o + m * o.p,
      b * o.m + f * o.n + j * o.o + n * o.p,
      c * o.m + g * o.n + k * o.o + o0 * o.p,
      d * o.m + h * o.n + l * o.o + p * o.p,
    );
  }

  add(o: IMat4) {
    this.a += o.a; this.b += o.b; this.c += o.c; this.d += o.d;
    this.e += o.e; this.f += o.f; this.g += o.g; this.h += o.h;
    this.i += o.i; this.j += o.j; this.k += o.k; this.l += o.l;
    this.m += o.m; this.n += o.n; this.o += o.o; this.p += o.p;
    return this;
  }

  sub(o: IMat4) {
    this.a -= o.a; this.b -= o.b; this.c -= o.c; this.d -= o.d;
    this.e -= o.e; this.f -= o.f; this.g -= o.g; this.h -= o.h;
    this.i -= o.i; this.j -= o.j; this.k -= o.k; this.l -= o.l;
    this.m -= o.m; this.n -= o.n; this.o -= o.o; this.p -= o.p;
    return this;
  }

  determinant(): number {
    const a11 = this.f * (this.k * this.p - this.l * this.o) - this.g * (this.j * this.p - this.l * this.n) + this.h * (this.j * this.o - this.k * this.n);
    const a12 = this.e * (this.k * this.p - this.l * this.o) - this.g * (this.i * this.p - this.l * this.m) + this.h * (this.i * this.o - this.k * this.m);
    const a13 = this.e * (this.j * this.p - this.l * this.n) - this.f * (this.i * this.p - this.l * this.m) + this.h * (this.i * this.n - this.j * this.m);
    const a14 = this.e * (this.j * this.o - this.k * this.n) - this.f * (this.i * this.o - this.k * this.m) + this.g * (this.i * this.n - this.j * this.m);

    return this.a * a11 - this.b * a12 + this.c * a13 - this.d * a14;
  }

  equals(o: IMat4, extract = false) {
    if (extract)
      return (true
        && this.a === o.a && this.b === o.b && this.c === o.c && this.d === o.d
        && this.e === o.e && this.f === o.f && this.g === o.g && this.h === o.h
        && this.i === o.i && this.j === o.j && this.k === o.k && this.l === o.l
        && this.m === o.m && this.n === o.n && this.o === o.o && this.p === o.p
      );

    return (true
      && equals(this.a, o.a) && equals(this.b, o.b) && equals(this.c, o.c) && equals(this.d, o.d)
      && equals(this.e, o.e) && equals(this.f, o.f) && equals(this.g, o.g) && equals(this.h, o.h)
      && equals(this.i, o.i) && equals(this.j, o.j) && equals(this.k, o.k) && equals(this.l, o.l)
      && equals(this.m, o.m) && equals(this.n, o.n) && equals(this.o, o.o) && equals(this.p, o.p)
    );
  }

  targetTo(eye: IVec3, target: IVec3, up: IVec3) {
    let eyex = eye.x, eyey = eye.y, eyez = eye.z;
    let upx = up.x, upy = up.y, upz = up.z;

    let z0 = eyex - target.x;
    let z1 = eyey - target.y;
    let z2 = eyez - target.z;

    let len = z0 * z0 + z1 * z1 + z2 * z2;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      z0 *= len; z1 *= len; z2 *= len;
    }

    let x0 = upy * z2 - upz * z1;
    let x1 = upz * z0 - upx * z2;
    let x2 = upx * z1 - upy * z0;

    len = x0 * x0 + x1 * x1 + x2 * x2;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      x0 *= len; x1 *= len; x2 *= len;
    }

    let y0 = z1 * x2 - z2 * x1;
    let y1 = z2 * x0 - z0 * x2;
    let y2 = z0 * x1 - z1 * x0;

    this.a = x0; this.b = x1; this.c = x2; this.d = 0;
    this.e = y0; this.f = y1; this.g = y2; this.h = 0;
    this.i = z0; this.j = z1; this.k = z2; this.l = 0;
    this.m = eyex; this.n = eyey; this.o = eyez; this.p = 1;

    return this;
  }

  lookAt(eye: IVec3, center: IVec3, up: IVec3) {
    let eyex = eye.x, eyey = eye.y, eyez = eye.z;
    let upx = up.x, upy = up.y, upz = up.z;
    let centerx = center.x, centery = center.y, centerz = center.z;

    if (
      Math.abs(eyex - centerx) < 1e-6 &&
      Math.abs(eyey - centery) < 1e-6 &&
      Math.abs(eyez - centerz) < 1e-6
    ) {
      return this.identity();
    }

    let z0 = eyex - centerx;
    let z1 = eyey - centery;
    let z2 = eyez - centerz;
    let len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len; z1 *= len; z2 *= len;

    let x0 = upy * z2 - upz * z1;
    let x1 = upz * z0 - upx * z2;
    let x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (len) {
      len = 1 / len;
      x0 *= len; x1 *= len; x2 *= len;
    } else {
      x0 = x1 = x2 = 0;
    }

    let y0 = z1 * x2 - z2 * x1;
    let y1 = z2 * x0 - z0 * x2;
    let y2 = z0 * x1 - z1 * x0;
    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (len) {
      len = 1 / len;
      y0 *= len; y1 *= len; y2 *= len;
    } else {
      y0 = y1 = y2 = 0;
    }

    this.a = x0; this.b = y0; this.c = z0; this.d = 0;
    this.e = x1; this.f = y1; this.g = z1; this.h = 0;
    this.i = x2; this.j = y2; this.k = z2; this.l = 0;
    this.m = -(x0 * eyex + x1 * eyey + x2 * eyez);
    this.n = -(y0 * eyex + y1 * eyey + y2 * eyez);
    this.o = -(z0 * eyex + z1 * eyey + z2 * eyez);
    this.p = 1;

    return this;
  }

  orthoZO(left: number, right: number, bottom: number, top: number, near: number, far: number) {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);

    this.a = -2 * lr; this.b = 0; this.c = 0; this.d = 0;
    this.e = 0; this.f = -2 * bt; this.g = 0; this.h = 0;
    this.i = 0; this.j = 0; this.k = nf; this.l = 0;
    this.m = (left + right) * lr;
    this.n = (top + bottom) * bt;
    this.o = near * nf;
    this.p = 1;

    return this;
  }

  orthoNO(left: number, right: number, bottom: number, top: number, near: number, far: number) {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);

    this.a = -2 * lr; this.b = 0; this.c = 0; this.d = 0;
    this.e = 0; this.f = -2 * bt; this.g = 0; this.h = 0;
    this.i = 0; this.j = 0; this.k = 2 * nf; this.l = 0;
    this.m = (left + right) * lr;
    this.n = (top + bottom) * bt;
    this.o = (far + near) * nf;
    this.p = 1;

    return this;
  }

  perspectiveFromFieldOfView(fov: FieldOfView, near: number, far: number) {
    const upTan = Math.tan((fov.upDegrees * Math.PI) / 180.0);
    const downTan = Math.tan((fov.downDegrees * Math.PI) / 180.0);
    const leftTan = Math.tan((fov.leftDegrees * Math.PI) / 180.0);
    const rightTan = Math.tan((fov.rightDegrees * Math.PI) / 180.0);

    const xScale = 2.0 / (leftTan + rightTan);
    const yScale = 2.0 / (upTan + downTan);

    this.a = xScale; this.b = 0; this.c = 0; this.d = 0;
    this.e = 0; this.f = yScale; this.g = 0; this.h = 0;
    this.i = -((leftTan - rightTan) * xScale * 0.5);
    this.j = (upTan - downTan) * yScale * 0.5;
    this.k = far / (near - far);
    this.l = -1;
    this.m = 0;
    this.n = 0;
    this.o = (far * near) / (near - far);
    this.p = 0;

    return this;
  }

  perspectiveZO(fovy: number, aspect: number, near: number, far?: number) {
    const f = 1.0 / Math.tan(fovy / 2);

    this.a = f / aspect; this.b = 0; this.c = 0; this.d = 0;
    this.e = 0; this.f = f; this.g = 0; this.h = 0;
    this.i = 0; this.j = 0;               // this.k, this.o позже
    this.l = -1;
    this.m = 0; this.n = 0;              // this.o позже
    this.p = 0;

    if (far != null && far !== Infinity) {
      const nf = 1 / (near - far);
      this.k = far * nf;
      this.o = far * near * nf;
    } else {
      this.k = -1;
      this.o = -near;
    }

    return this;
  }


  perspectiveNO(fovy: number, aspect: number, near: number, far?: number) {
    const f = 1.0 / Math.tan(fovy / 2);

    this.a = f / aspect; this.b = 0; this.c = 0; this.d = 0;
    this.e = 0; this.f = f; this.g = 0; this.h = 0;
    this.i = 0; this.j = 0;              // this.k позже
    this.l = -1;
    this.m = 0; this.n = 0;              // this.o позже
    this.p = 0;

    if (far != null && far !== Infinity) {
      const nf = 1 / (near - far);
      this.k = (far + near) * nf;
      this.o = 2 * far * near * nf;
    } else {
      this.k = -1;
      this.o = -2 * near;
    }

    return this;
  }

  frustum(left: number, right: number, bottom: number, top: number, near: number, far: number) {
    const rl = 1 / (right - left);
    const tb = 1 / (top - bottom);
    const nf = 1 / (near - far);

    this.a = near * 2 * rl; this.b = 0; this.c = 0; this.d = 0;
    this.e = 0; this.f = near * 2 * tb; this.g = 0; this.h = 0;
    this.i = (right + left) * rl;
    this.j = (top + bottom) * tb;
    this.k = (far + near) * nf;
    this.l = -1;
    this.m = 0;
    this.n = 0;
    this.o = far * near * 2 * nf;
    this.p = 0;

    return this;
  }

  fromQuat(q: IQuat) {
    const x = q.x, y = q.y, z = q.z, w = q.w;
    const x2 = x + x, y2 = y + y, z2 = z + z;

    const xx = x * x2;
    const yx = y * x2;
    const yy = y * y2;
    const zx = z * x2;
    const zy = z * y2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;

    this.a = 1 - yy - zz; this.b = yx + wz; this.c = zx - wy; this.d = 0;
    this.e = yx - wz; this.f = 1 - xx - zz; this.g = zy + wx; this.h = 0;
    this.i = zx + wy; this.j = zy - wx; this.k = 1 - xx - yy; this.l = 0;
    this.m = 0; this.n = 0; this.o = 0; this.p = 1;

    return this;
  }

  fromRotationTranslationScaleOrigin(q: IQuat, v: IVec3, s: IVec3, o: IVec3) {
    const x = q.x, y = q.y, z = q.z, w = q.w;
    const x2 = x + x, y2 = y + y, z2 = z + z;

    const xx = x * x2, xy = x * y2, xz = x * z2;
    const yy = y * y2, yz = y * z2, zz = z * z2;
    const wx = w * x2, wy = w * y2, wz = w * z2;

    const sx = s.x, sy = s.y, sz = s.z;
    const ox = o.x, oy = o.y, oz = o.z;

    const out0 = (1 - (yy + zz)) * sx;
    const out1 = (xy + wz) * sx;
    const out2 = (xz - wy) * sx;

    const out4 = (xy - wz) * sy;
    const out5 = (1 - (xx + zz)) * sy;
    const out6 = (yz + wx) * sy;

    const out8 = (xz + wy) * sz;
    const out9 = (yz - wx) * sz;
    const out10 = (1 - (xx + yy)) * sz;

    this.a = out0; this.b = out1; this.c = out2; this.d = 0;
    this.e = out4; this.f = out5; this.g = out6; this.h = 0;
    this.i = out8; this.j = out9; this.k = out10; this.l = 0;

    this.m = v.x + ox - (out0 * ox + out4 * oy + out8 * oz);
    this.n = v.y + oy - (out1 * ox + out5 * oy + out9 * oz);
    this.o = v.z + oz - (out2 * ox + out6 * oy + out10 * oz);
    this.p = 1;

    return this;
  }

  fromRotationTranslationScale(q: Quat, v: Vec3, s: Vec3) {
    const x = q.x, y = q.y, z = q.z, w = q.w;
    const x2 = x + x, y2 = y + y, z2 = z + z;

    const xx = x * x2, xy = x * y2, xz = x * z2;
    const yy = y * y2, yz = y * z2, zz = z * z2;
    const wx = w * x2, wy = w * y2, wz = w * z2;

    const sx = s.x, sy = s.y, sz = s.z;

    this.a = (1 - (yy + zz)) * sx;
    this.b = (xy + wz) * sx;
    this.c = (xz - wy) * sx;
    this.d = 0;

    this.e = (xy - wz) * sy;
    this.f = (1 - (xx + zz)) * sy;
    this.g = (yz + wx) * sy;
    this.h = 0;

    this.i = (xz + wy) * sz;
    this.j = (yz - wx) * sz;
    this.k = (1 - (xx + yy)) * sz;
    this.l = 0;

    this.m = v.x;
    this.n = v.y;
    this.o = v.z;
    this.p = 1;

    return this;
  }

  getTranslation(out = new Vec3()): Vec3 {
    return out.set(this.m, this.n, this.o);
  }

  getScaling(out = new Vec3()): Vec3 {
    return out.set(
      Math.sqrt(this.a * this.a + this.e * this.e + this.i * this.i),
      Math.sqrt(this.b * this.b + this.f * this.f + this.j * this.j),
      Math.sqrt(this.c * this.c + this.g * this.g + this.k * this.k)
    );
  }

  getRotation(out = new Quat()): Quat {
    const scaling = this.getScaling(Cache.vec3);
    const is1 = 1 / scaling.x;
    const is2 = 1 / scaling.y;
    const is3 = 1 / scaling.z;

    const sm11 = this.a * is1;
    const sm12 = this.b * is2;
    const sm13 = this.c * is3;
    const sm21 = this.e * is1;
    const sm22 = this.f * is2;
    const sm23 = this.g * is2;
    const sm31 = this.i * is1;
    const sm32 = this.j * is2;
    const sm33 = this.k * is3;

    let trace = sm11 + sm22 + sm33;
    let S: number;
    let qx = 0, qy = 0, qz = 0, qw = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      qw = 0.25 * S;
      qx = (sm23 - sm32) / S;
      qy = (sm31 - sm13) / S;
      qz = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
      qw = (sm23 - sm32) / S;
      qx = 0.25 * S;
      qy = (sm12 + sm21) / S;
      qz = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
      qw = (sm31 - sm13) / S;
      qx = (sm12 + sm21) / S;
      qy = 0.25 * S;
      qz = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
      qw = (sm12 - sm21) / S;
      qx = (sm31 + sm13) / S;
      qy = (sm23 + sm32) / S;
      qz = 0.25 * S;
    }

    return out.set(qx, qy, qz, qw);
  }

  fromRotationTranslation(q: IQuat, v: IVec3) {
    const x = q.x, y = q.y, z = q.z, w = q.w;
    const x2 = x + x, y2 = y + y, z2 = z + z;

    const xx = x * x2, xy = x * y2, xz = x * z2;
    const yy = y * y2, yz = y * z2, zz = z * z2;
    const wx = w * x2, wy = w * y2, wz = w * z2;

    this.a = 1 - (yy + zz);
    this.b = xy + wz;
    this.c = xz - wy;
    this.d = 0;

    this.e = xy - wz;
    this.f = 1 - (xx + zz);
    this.g = yz + wx;
    this.h = 0;

    this.i = xz + wy;
    this.j = yz - wx;
    this.k = 1 - (xx + yy);
    this.l = 0;

    this.m = v.x;
    this.n = v.y;
    this.o = v.z;
    this.p = 1;

    return this;
  }

  rotate(rad: number, axis: IVec3) {
    let x = axis.x, y = axis.y, z = axis.z;
    let len = Math.sqrt(x * x + y * y + z * z);

    if (len < 1e-6) return this;

    len = 1 / len;
    x *= len; y *= len; z *= len;

    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const t = 1 - c;

    const b00 = x * x * t + c;
    const b01 = y * x * t + z * s;
    const b02 = z * x * t - y * s;

    const b10 = x * y * t - z * s;
    const b11 = y * y * t + c;
    const b12 = z * y * t + x * s;

    const b20 = x * z * t + y * s;
    const b21 = y * z * t - x * s;
    const b22 = z * z * t + c;

    const a00 = this.a, a01 = this.b, a02 = this.c, a03 = this.d;
    const a10 = this.e, a11 = this.f, a12 = this.g, a13 = this.h;
    const a20 = this.i, a21 = this.j, a22 = this.k, a23 = this.l;

    this.a = a00 * b00 + a10 * b01 + a20 * b02;
    this.b = a01 * b00 + a11 * b01 + a21 * b02;
    this.c = a02 * b00 + a12 * b01 + a22 * b02;
    this.d = a03 * b00 + a13 * b01 + a23 * b02;

    this.e = a00 * b10 + a10 * b11 + a20 * b12;
    this.f = a01 * b10 + a11 * b11 + a21 * b12;
    this.g = a02 * b10 + a12 * b11 + a22 * b12;
    this.h = a03 * b10 + a13 * b11 + a23 * b12;

    this.i = a00 * b20 + a10 * b21 + a20 * b22;
    this.j = a01 * b20 + a11 * b21 + a21 * b22;
    this.k = a02 * b20 + a12 * b21 + a22 * b22;
    this.l = a03 * b20 + a13 * b21 + a23 * b22;

    return this;
  }

  rotateX(rad: number) {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    const a10 = this.e, a11 = this.f, a12 = this.g, a13 = this.h;
    const a20 = this.i, a21 = this.j, a22 = this.k, a23 = this.l;

    this.e = a10 * c + a20 * s;
    this.f = a11 * c + a21 * s;
    this.g = a12 * c + a22 * s;
    this.h = a13 * c + a23 * s;

    this.i = a20 * c - a10 * s;
    this.j = a21 * c - a11 * s;
    this.k = a22 * c - a12 * s;
    this.l = a23 * c - a13 * s;

    return this;
  }

  rotateY(rad: number) {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    const a00 = this.a, a01 = this.b, a02 = this.c, a03 = this.d;
    const a20 = this.i, a21 = this.j, a22 = this.k, a23 = this.l;

    this.a = a00 * c - a20 * s;
    this.b = a01 * c - a21 * s;
    this.c = a02 * c - a22 * s;
    this.d = a03 * c - a23 * s;

    this.i = a00 * s + a20 * c;
    this.j = a01 * s + a21 * c;
    this.k = a02 * s + a22 * c;
    this.l = a03 * s + a23 * c;

    return this;
  }

  rotateZ(rad: number) {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    const a00 = this.a, a01 = this.b, a02 = this.c, a03 = this.d;
    const a10 = this.e, a11 = this.f, a12 = this.g, a13 = this.h;

    this.a = a00 * c + a10 * s;
    this.b = a01 * c + a11 * s;
    this.c = a02 * c + a12 * s;
    this.d = a03 * c + a13 * s;

    this.e = a10 * c - a00 * s;
    this.f = a11 * c - a01 * s;
    this.g = a12 * c - a02 * s;
    this.h = a13 * c - a03 * s;

    return this;
  }

  fromRotationX(rad: number) {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    this.a = 1; this.b = 0; this.c = 0; this.d = 0;
    this.e = 0; this.f = c; this.g = s; this.h = 0;
    this.i = 0; this.j = -s; this.k = c; this.l = 0;
    this.m = 0; this.n = 0; this.o = 0; this.p = 1;

    return this;
  }

  fromRotationY(rad: number) {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    this.a = c; this.b = 0; this.c = -s; this.d = 0;
    this.e = 0; this.f = 1; this.g = 0; this.h = 0;
    this.i = s; this.j = 0; this.k = c; this.l = 0;
    this.m = 0; this.n = 0; this.o = 0; this.p = 1;

    return this;
  }

  fromRotationZ(rad: number) {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    this.a = c; this.b = s; this.c = 0; this.d = 0;
    this.e = -s; this.f = c; this.g = 0; this.h = 0;
    this.i = 0; this.j = 0; this.k = 1; this.l = 0;
    this.m = 0; this.n = 0; this.o = 0; this.p = 1;

    return this;
  }

  fromRotation(rad: number, axis: IVec3) {
    let x = axis.x, y = axis.y, z = axis.z;
    let len = Math.sqrt(x * x + y * y + z * z);
    if (len < 1e-6) return this;

    len = 1 / len;
    x *= len; y *= len; z *= len;

    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const t = 1 - c;

    this.a = x * x * t + c;
    this.b = y * x * t + z * s;
    this.c = z * x * t - y * s;
    this.d = 0;

    this.e = x * y * t - z * s;
    this.f = y * y * t + c;
    this.g = z * y * t + x * s;
    this.h = 0;

    this.i = x * z * t + y * s;
    this.j = y * z * t - x * s;
    this.k = z * z * t + c;
    this.l = 0;

    this.m = 0;
    this.n = 0;
    this.o = 0;
    this.p = 1;

    return this;
  }

  translate(v: IVec3) {
    const x = v.x, y = v.y, z = v.z;

    const a00 = this.a, a01 = this.b, a02 = this.c, a03 = this.d;
    const a10 = this.e, a11 = this.f, a12 = this.g, a13 = this.h;
    const a20 = this.i, a21 = this.j, a22 = this.k, a23 = this.l;

    this.m = a00 * x + a10 * y + a20 * z + this.m;
    this.n = a01 * x + a11 * y + a21 * z + this.n;
    this.o = a02 * x + a12 * y + a22 * z + this.o;
    this.p = a03 * x + a13 * y + a23 * z + this.p;

    return this;
  }

  scale(v: IVec3) {
    const x = v.x, y = v.y, z = v.z;

    this.a *= x; this.b *= x; this.c *= x; this.d *= x;
    this.e *= y; this.f *= y; this.g *= y; this.h *= y;
    this.i *= z; this.j *= z; this.k *= z; this.l *= z;

    return this;
  }

  adjoint() {
    const a00 = this.a, a01 = this.b, a02 = this.c, a03 = this.d;
    const a10 = this.e, a11 = this.f, a12 = this.g, a13 = this.h;
    const a20 = this.i, a21 = this.j, a22 = this.k, a23 = this.l;
    const a30 = this.m, a31 = this.n, a32 = this.o, a33 = this.p;

    const b00 = a00 * a11 - a01 * a10;
    const b01 = a00 * a12 - a02 * a10;
    const b02 = a00 * a13 - a03 * a10;
    const b03 = a01 * a12 - a02 * a11;
    const b04 = a01 * a13 - a03 * a11;
    const b05 = a02 * a13 - a03 * a12;
    const b06 = a20 * a31 - a21 * a30;
    const b07 = a20 * a32 - a22 * a30;
    const b08 = a20 * a33 - a23 * a30;
    const b09 = a21 * a32 - a22 * a31;
    const b10 = a21 * a33 - a23 * a31;
    const b11 = a22 * a33 - a23 * a32;

    this.a = a11 * b11 - a12 * b10 + a13 * b09;
    this.b = a02 * b10 - a01 * b11 - a03 * b09;
    this.c = a31 * b05 - a32 * b04 + a33 * b03;
    this.d = a22 * b04 - a21 * b05 - a23 * b03;

    this.e = a12 * b08 - a10 * b11 - a13 * b07;
    this.f = a00 * b11 - a02 * b08 + a03 * b07;
    this.g = a32 * b02 - a30 * b05 - a33 * b01;
    this.h = a20 * b05 - a22 * b02 + a23 * b01;

    this.i = a10 * b10 - a11 * b08 + a13 * b06;
    this.j = a01 * b08 - a00 * b10 - a03 * b06;
    this.k = a30 * b04 - a31 * b02 + a33 * b00;
    this.l = a21 * b02 - a20 * b04 - a23 * b00;

    this.m = a11 * b07 - a10 * b09 - a12 * b06;
    this.n = a00 * b09 - a01 * b07 + a02 * b06;
    this.o = a31 * b01 - a30 * b03 - a32 * b00;
    this.p = a20 * b03 - a21 * b01 + a22 * b00;

    return this;
  }

  invert() {
    const a00 = this.a, a01 = this.b, a02 = this.c, a03 = this.d;
    const a10 = this.e, a11 = this.f, a12 = this.g, a13 = this.h;
    const a20 = this.i, a21 = this.j, a22 = this.k, a23 = this.l;
    const a30 = this.m, a31 = this.n, a32 = this.o, a33 = this.p;

    const b00 = a00 * a11 - a01 * a10;
    const b01 = a00 * a12 - a02 * a10;
    const b02 = a00 * a13 - a03 * a10;
    const b03 = a01 * a12 - a02 * a11;
    const b04 = a01 * a13 - a03 * a11;
    const b05 = a02 * a13 - a03 * a12;
    const b06 = a20 * a31 - a21 * a30;
    const b07 = a20 * a32 - a22 * a30;
    const b08 = a20 * a33 - a23 * a30;
    const b09 = a21 * a32 - a22 * a31;
    const b10 = a21 * a33 - a23 * a31;
    const b11 = a22 * a33 - a23 * a32;

    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det)
      throw new Error('Can not invert matrix');

    det = 1 / det;

    this.a = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    this.b = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    this.c = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    this.d = (a22 * b04 - a21 * b05 - a23 * b03) * det;

    this.e = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    this.f = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    this.g = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    this.h = (a20 * b05 - a22 * b02 + a23 * b01) * det;

    this.i = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    this.j = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    this.k = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    this.l = (a21 * b02 - a20 * b04 - a23 * b00) * det;

    this.m = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    this.n = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    this.o = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    this.p = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return this;
  }

  fromTranslation(v: IVec3) {
    this.identity();
    this.m = v.x;
    this.n = v.y;
    this.o = v.z;
    return this;
  }

  fromScale(v: Vec3) {
    this.identity();
    this.a = v.x;
    this.f = v.y;
    this.k = v.z;
    return this;
  }

  fromArray(array: SimpleArrayLike, offset = 0) {
    this.a = array[offset];
    this.b = array[offset + 1];
    this.c = array[offset + 2];
    this.d = array[offset + 3];
    this.e = array[offset + 4];
    this.f = array[offset + 5];
    this.g = array[offset + 6];
    this.h = array[offset + 7];
    this.i = array[offset + 8];
    this.j = array[offset + 9];
    this.k = array[offset + 10];
    this.l = array[offset + 11];
    this.m = array[offset + 12];
    this.n = array[offset + 13];
    this.o = array[offset + 14];
    this.p = array[offset + 15];
    return this;
  }

  toArray(): number[];
  toArray<T extends SimpleArrayLike>(array: T): T;
  toArray<T extends SimpleArrayLike>(array: T, offset: number): T;
  toArray(array: number[] = [], offset = 0) {
    array[offset] = this.a;
    array[offset + 1] = this.b;
    array[offset + 2] = this.c;
    array[offset + 3] = this.d;
    array[offset + 4] = this.e;
    array[offset + 5] = this.f;
    array[offset + 6] = this.g;
    array[offset + 7] = this.h;
    array[offset + 8] = this.i;
    array[offset + 9] = this.j;
    array[offset + 10] = this.k;
    array[offset + 11] = this.l;
    array[offset + 12] = this.m;
    array[offset + 13] = this.n;
    array[offset + 14] = this.o;
    array[offset + 15] = this.p;
    return array;
  }
}
