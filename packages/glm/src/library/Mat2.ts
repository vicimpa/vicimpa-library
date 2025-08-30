import { equals } from "./Common";

export interface IMat2 {
  a: number; b: number;
  c: number; d: number;
}

export class Mat2 {
  a = 1; b = 0;
  c = 0; d = 1;

  [n: number]: number;

  get 0() { return this.a; } get 1() { return this.b; }
  get 2() { return this.c; } get 3() { return this.d; }

  set 0(v) { this.a = v; } set 1(v) { this.b = v; }
  set 2(v) { this.c = v; } set 3(v) { this.d = v; }

  *[Symbol.iterator]() {
    yield this.a; yield this.b;
    yield this.c; yield this.d;
  }

  toString() {
    return `Mat2(${this.a}, ${this.b}, ${this.c}, ${this.d})`;
  }

  copy(o: IMat2) {
    this.a = o.a; this.b = o.b;
    this.c = o.c; this.d = o.d;
    return this;
  }

  identity() {
    this.a = 1; this.b = 0;
    this.c = 0; this.d = 1;
    return this;
  }

  set(
    a: number, b: number,
    c: number, d: number
  ) {
    this.a = a; this.b = b;
    this.c = c; this.d = d;
    return this;
  }

  clone() {
    return new Mat2().copy(this);
  }

  transpose(o: IMat2 = this) {
    return this.set(
      o.a, o.c,
      o.b, o.d,
    );
  }

  invert(o: IMat2 = this) {
    let det = o.a * o.d - o.c * o.b;

    if (!det)
      throw new Error('Can not invert matrix');

    det = 1.0 / det;

    return this.set(
      o.d * det, -o.b * det,
      -o.c * det, o.a * det,
    );
  }

  adjoint(o: IMat2 = this) {
    return this.set(
      o.d, -o.b,
      -o.c, o.a
    );
  }

  determinant() {
    return this.a * this.d - this.c * this.b;
  }

  frob() {
    return Math.sqrt(
      this.a * this.a + this.b * this.b +
      this.c * this.c + this.d * this.d
    );
  }

  mul(o: IMat2) {
    return this.set(
      this.a * o.a + this.c * o.b,
      this.b * o.a + this.d * o.b,

      this.a * o.c + this.c * o.d,
      this.b * o.c + this.d * o.d,
    );
  }

  rotate(rad: number) {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    return this.set(
      this.a * c + this.c * s,
      this.b * c + this.d * s,

      this.a * -s + this.c * c,
      this.b * -s + this.d * c,
    );
  }

  scale(scale: number) {
    this.a *= scale; this.b *= scale;
    this.c *= scale; this.d *= scale;
    return this;
  }

  add(o: IMat2) {
    this.a += o.a; this.b += o.b;
    this.c += o.c; this.d += o.d;
    return this;
  }

  sub(o: IMat2) {
    this.a -= o.a; this.b -= o.b;
    this.c -= o.c; this.d -= o.d;
    return this;
  }

  equals(o: IMat2, extract = false) {
    if (extract)
      return (true
        && this.a === o.a && this.b === o.b
        && this.c === o.c && this.d === o.d
      );

    return (true
      && equals(this.a, o.a) && equals(this.b, o.b)
      && equals(this.c, o.c) && equals(this.d, o.d)
    );
  }
}