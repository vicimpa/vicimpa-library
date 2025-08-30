import { equals } from "./Common";

export interface IMat3 {
  a: number; b: number; c: number;
  d: number; e: number; f: number;
  g: number; h: number; i: number;
}

export class Mat3 {
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

  toString() {
    return `Mat3(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f}, ${this.g}, ${this.h}, ${this.i})`;
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
}
