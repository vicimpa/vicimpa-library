import { equals } from "./Common";

export interface IMat2d {
  a: number; b: number;
  c: number; d: number;
  e: number; f: number;
}

export class Mat2d {
  a = 1; b = 0;
  c = 0; d = 1;
  e = 0; f = 0;

  [n: number]: number;

  get 0() { return this.a; } get 1() { return this.b; }
  get 2() { return this.c; } get 3() { return this.d; }
  get 4() { return this.e; } get 5() { return this.f; }

  set 0(v) { this.a = v; } set 1(v) { this.b = v; }
  set 2(v) { this.c = v; } set 3(v) { this.d = v; }
  set 4(v) { this.e = v; } set 5(v) { this.f = v; }

  *[Symbol.iterator]() {
    yield this.a; yield this.b;
    yield this.c; yield this.d;
    yield this.e; yield this.f;
  }

  toString() {
    return `Mat2d(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f})`;
  }

  copy(o: IMat2d) {
    this.a = o.a; this.b = o.b;
    this.c = o.c; this.d = o.d;
    this.e = o.e; this.f = o.f;
    return this;
  }

  identity() {
    this.a = 1; this.b = 0;
    this.c = 0; this.d = 1;
    this.e = 0; this.f = 0;
    return this;
  }

  set(
    a: number, b: number,
    c: number, d: number,
    e: number, f: number
  ) {
    this.a = a; this.b = b;
    this.c = c; this.d = d;
    this.e = e; this.f = f;
    return this;
  }

  clone() {
    return new Mat2d().copy(this);
  }

  transpose(o: IMat2d = this) {
    return this.set(
      o.a, o.c,
      o.b, o.d,
      o.e, o.f
    );
  }

  invert(o: IMat2d = this) {
    const det = o.a * o.d - o.b * o.c;
    if (!det) throw new Error("Cannot invert matrix");
    const idet = 1 / det;

    return this.set(
      o.d * idet, -o.b * idet,
      -o.c * idet, o.a * idet,
      (o.c * o.f - o.d * o.e) * idet,
      (o.b * o.e - o.a * o.f) * idet
    );
  }

  mul(o: IMat2d) {
    return this.set(
      this.a * o.a + this.c * o.b,
      this.b * o.a + this.d * o.b,
      this.a * o.c + this.c * o.d,
      this.b * o.c + this.d * o.d,
      this.a * o.e + this.c * o.f + this.e,
      this.b * o.e + this.d * o.f + this.f
    );
  }

  translate(tx: number, ty: number) {
    this.e += tx * this.a + ty * this.c;
    this.f += tx * this.b + ty * this.d;
    return this;
  }

  scale(sx: number, sy?: number) {
    sy = sy ?? sx;
    this.a *= sx; this.b *= sx;
    this.c *= sy; this.d *= sy;
    return this;
  }

  rotate(rad: number) {
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);
    const a = this.a, b = this.b, c = this.c, d = this.d;

    this.a = a * cos + c * sin;
    this.b = b * cos + d * sin;
    this.c = -a * sin + c * cos;
    this.d = -b * sin + d * cos;
    return this;
  }

  add(o: IMat2d) {
    this.a += o.a; this.b += o.b;
    this.c += o.c; this.d += o.d;
    this.e += o.e; this.f += o.f;
    return this;
  }

  sub(o: IMat2d) {
    this.a -= o.a; this.b -= o.b;
    this.c -= o.c; this.d -= o.d;
    this.e -= o.e; this.f -= o.f;
    return this;
  }

  equals(o: IMat2d, extract = false) {
    if (extract)
      return (true
        && this.a === o.a && this.b === o.b
        && this.c === o.c && this.d === o.d
        && this.e === o.e && this.f === o.f
      );

    return (true
      && equals(this.a, o.a) && equals(this.b, o.b)
      && equals(this.c, o.c) && equals(this.d, o.d)
      && equals(this.e, o.e) && equals(this.f, o.f)
    );
  }
}
