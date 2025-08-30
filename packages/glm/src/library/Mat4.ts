import { equals } from "./Common";

export interface IMat4 {
  a: number; b: number; c: number; d: number;
  e: number; f: number; g: number; h: number;
  i: number; j: number; k: number; l: number;
  m: number; n: number; o: number; p: number;
}

export class Mat4 {
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

  toString() {
    return `Mat4(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f}, ${this.g}, ${this.h}, ${this.i}, ${this.j}, ${this.k}, ${this.l}, ${this.m}, ${this.n}, ${this.o}, ${this.p})`;
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
    // Calculate determinant using Laplace expansion
    // |A| = a*|A11| - b*|A12| + c*|A13| - d*|A14|
    // where Aij is the 3x3 submatrix obtained by deleting row i and column j

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
}
