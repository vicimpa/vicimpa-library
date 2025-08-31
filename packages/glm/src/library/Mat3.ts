import { Base } from "./Base";
import { equals, SimpleArrayLike } from "./Common";
import { IMat2d } from "./Mat2d";
import { IMat4 } from "./Mat4";
import { IQuat } from "./Quat";
import { IVec2 } from "./Vec2";
import { IVec3 } from "./Vec3";

export interface IMat3 {
  a: number; b: number; c: number;
  d: number; e: number; f: number;
  g: number; h: number; i: number;
}

export class Mat3 extends Base {
  a = 1; b = 0; c = 0;
  d = 0; e = 1; f = 0;
  g = 0; h = 0; i = 1;

  [n: number]: number;

  get 0() { return this.a; } get 1() { return this.b; } get 2() { return this.c; }
  get 3() { return this.d; } get 4() { return this.e; } get 5() { return this.f; }
  get 6() { return this.g; } get 7() { return this.h; } get 8() { return this.i; }

  set 0(v) { this.a = v; } set 1(v) { this.b = v; } set 2(v) { this.c = v; }
  set 3(v) { this.d = v; } set 4(v) { this.e = v; } set 5(v) { this.f = v; }
  set 6(v) { this.g = v; } set 7(v) { this.h = v; } set 8(v) { this.i = v; }

  *[Symbol.iterator]() {
    yield this.a; yield this.b; yield this.c;
    yield this.d; yield this.e; yield this.f;
    yield this.g; yield this.h; yield this.i;
  }

  frob() {
    return Math.sqrt(
      this.a * this.a + this.b * this.b + this.c * this.c +
      this.d * this.d + this.e * this.e + this.f * this.f +
      this.g * this.g + this.h * this.h + this.i * this.i
    );
  }

  copy(o: IMat3) {
    this.a = o.a; this.b = o.b; this.c = o.c;
    this.d = o.d; this.e = o.e; this.f = o.f;
    this.g = o.g; this.h = o.h; this.i = o.i;
    return this;
  }

  identity() {
    this.a = 1; this.b = 0; this.c = 0;
    this.d = 0; this.e = 1; this.f = 0;
    this.g = 0; this.h = 0; this.i = 1;
    return this;
  }

  set(
    a: number, b: number, c: number,
    d: number, e: number, f: number,
    g: number, h: number, i: number,
  ) {
    this.a = a; this.b = b; this.c = c;
    this.d = d; this.e = e; this.f = f;
    this.g = g; this.h = h; this.i = i;
    return this;
  }

  clone() {
    return new Mat3().copy(this);
  }

  transpose(o: IMat3 = this) {
    return this.set(
      o.a, o.d, o.g,
      o.b, o.e, o.h,
      o.c, o.f, o.i
    );
  }

  determinant() {
    return this.a * (this.e * this.i - this.f * this.h)
      - this.d * (this.b * this.i - this.c * this.h)
      + this.g * (this.b * this.f - this.c * this.e);
  }

  invert(o: IMat3 = this) {
    const det = this.determinant();
    if (!det) throw new Error("Cannot invert matrix");
    const idet = 1 / det;

    return this.set(
      (o.e * o.i - o.f * o.h) * idet,
      (o.c * o.h - o.b * o.i) * idet,
      (o.b * o.f - o.c * o.e) * idet,

      (o.f * o.g - o.d * o.i) * idet,
      (o.a * o.i - o.c * o.g) * idet,
      (o.c * o.d - o.a * o.f) * idet,

      (o.d * o.h - o.e * o.g) * idet,
      (o.b * o.g - o.a * o.h) * idet,
      (o.a * o.e - o.b * o.d) * idet
    );
  }

  mul(o: IMat3) {
    return this.set(
      this.a * o.a + this.d * o.b + this.g * o.c,
      this.b * o.a + this.e * o.b + this.h * o.c,
      this.c * o.a + this.f * o.b + this.i * o.c,

      this.a * o.d + this.d * o.e + this.g * o.f,
      this.b * o.d + this.e * o.e + this.h * o.f,
      this.c * o.d + this.f * o.e + this.i * o.f,

      this.a * o.g + this.d * o.h + this.g * o.i,
      this.b * o.g + this.e * o.h + this.h * o.i,
      this.c * o.g + this.f * o.h + this.i * o.i
    );
  }

  add(o: IMat3) {
    this.a += o.a; this.b += o.b; this.c += o.c;
    this.d += o.d; this.e += o.e; this.f += o.f;
    this.g += o.g; this.h += o.h; this.i += o.i;
    return this;
  }

  sub(o: IMat3) {
    this.a -= o.a; this.b -= o.b; this.c -= o.c;
    this.d -= o.d; this.e -= o.e; this.f -= o.f;
    this.g -= o.g; this.h -= o.h; this.i -= o.i;
    return this;
  }

  equals(o: IMat3, extract = false) {
    if (extract)
      return (true
        && this.a === o.a && this.b === o.b && this.c === o.c
        && this.d === o.d && this.e === o.e && this.f === o.f
        && this.g === o.g && this.h === o.h && this.i === o.i
      );

    return (true
      && equals(this.a, o.a) && equals(this.b, o.b) && equals(this.c, o.c)
      && equals(this.d, o.d) && equals(this.e, o.e) && equals(this.f, o.f)
      && equals(this.g, o.g) && equals(this.h, o.h) && equals(this.i, o.i)
    );
  }

  fromScale(v: IVec3): this {
    this.a = v.x; this.b = 0; this.c = 0;
    this.d = 0; this.e = v.y; this.f = 0;
    this.g = 0; this.h = 0; this.i = v.z;
    return this;
  }

  fromMat4(mat4: IMat4): this {
    this.a = mat4.a; this.b = mat4.b; this.c = mat4.c;
    this.d = mat4.e; this.e = mat4.f; this.f = mat4.g;
    this.g = mat4.i; this.h = mat4.j; this.i = mat4.k;
    return this;
  }

  projection(width: number, height: number): this {
    this.a = 2 / width;
    this.b = 0;
    this.c = 0;
    this.d = 0;
    this.e = -2 / height;
    this.f = 0;
    this.g = -1;
    this.h = 1;
    this.i = 1;
    return this;
  }

  normalFromMat4(m: IMat4): this {
    const a00 = m.a, a01 = m.b, a02 = m.c;
    const a10 = m.e, a11 = m.f, a12 = m.g;
    const a20 = m.i, a21 = m.j, a22 = m.k;

    let det = a00 * (a11 * a22 - a12 * a21) - a01 * (a10 * a22 - a12 * a20) + a02 * (a10 * a21 - a11 * a20);

    if (!det)
      throw new Error('Can not convert matrix');
    det = 1 / det;

    this.a = (a11 * a22 - a12 * a21) * det;
    this.b = (a02 * a21 - a01 * a22) * det;
    this.c = (a01 * a12 - a02 * a11) * det;

    this.d = (a12 * a20 - a10 * a22) * det;
    this.e = (a00 * a22 - a02 * a20) * det;
    this.f = (a02 * a10 - a00 * a12) * det;

    this.g = (a10 * a21 - a11 * a20) * det;
    this.h = (a01 * a20 - a00 * a21) * det;
    this.i = (a00 * a11 - a01 * a10) * det;

    return this;
  }

  fromQuat(q: IQuat): this {
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

    this.a = 1 - yy - zz;
    this.d = yx - wz;
    this.g = zx + wy;

    this.b = yx + wz;
    this.e = 1 - xx - zz;
    this.h = zy - wx;

    this.c = zx - wy;
    this.f = zy + wx;
    this.i = 1 - xx - yy;

    return this;
  }

  fromMat2d(m: IMat2d): this {
    this.a = m.a;
    this.b = m.b;
    this.c = 0;

    this.d = m.c;
    this.e = m.d;
    this.f = 0;

    this.g = m.e;
    this.h = m.f;
    this.i = 1;

    return this;
  }

  fromScaling(v: IVec2): this {
    this.a = v.x; this.b = 0; this.c = 0;
    this.d = 0; this.e = v.y; this.f = 0;
    this.g = 0; this.h = 0; this.i = 1;
    return this;
  }

  fromRotation(rad: number): this {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    this.a = c; this.b = s; this.c = 0;
    this.d = -s; this.e = c; this.f = 0;
    this.g = 0; this.h = 0; this.i = 1;

    return this;
  }

  fromTranslation(v: IVec2): this {
    this.a = 1; this.b = 0; this.c = 0;
    this.d = 0; this.e = 1; this.f = 0;
    this.g = v.x; this.h = v.y; this.i = 1;
    return this;
  }

  scale(v: IVec2): this {
    this.a *= v.x;
    this.b *= v.x;
    this.c *= v.x;

    this.d *= v.y;
    this.e *= v.y;
    this.f *= v.y;

    return this;
  }

  rotate(rad: number): this {
    const a00 = this.a, a01 = this.b, a02 = this.c;
    const a10 = this.d, a11 = this.e, a12 = this.f;
    const a20 = this.g, a21 = this.h, a22 = this.i;

    const s = Math.sin(rad);
    const c = Math.cos(rad);

    this.a = c * a00 + s * a10;
    this.b = c * a01 + s * a11;
    this.c = c * a02 + s * a12;

    this.d = c * a10 - s * a00;
    this.e = c * a11 - s * a01;
    this.f = c * a12 - s * a02;

    this.g = a20;
    this.h = a21;
    this.i = a22;

    return this;
  }

  translate(v: IVec2): this {
    const a00 = this.a, a01 = this.b, a02 = this.c,
      a10 = this.d, a11 = this.e, a12 = this.f,
      a20 = this.g, a21 = this.h, a22 = this.i,
      x = v.x, y = v.y;

    this.a = a00;
    this.b = a01;
    this.c = a02;

    this.d = a10;
    this.e = a11;
    this.f = a12;

    this.g = x * a00 + y * a10 + a20;
    this.h = x * a01 + y * a11 + a21;
    this.i = x * a02 + y * a12 + a22;

    return this;
  }

  adjoint(source: IMat3): this {
    const a00 = source.a, a01 = source.b, a02 = source.c;
    const a10 = source.d, a11 = source.e, a12 = source.f;
    const a20 = source.g, a21 = source.h, a22 = source.i;

    this.a = a11 * a22 - a12 * a21;
    this.b = a02 * a21 - a01 * a22;
    this.c = a01 * a12 - a02 * a11;
    this.d = a12 * a20 - a10 * a22;
    this.e = a00 * a22 - a02 * a20;
    this.f = a02 * a10 - a00 * a12;
    this.g = a10 * a21 - a11 * a20;
    this.h = a01 * a20 - a00 * a21;
    this.i = a00 * a11 - a01 * a10;

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
    return array;
  }
}
