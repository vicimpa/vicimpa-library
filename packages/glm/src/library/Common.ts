export const EPSILON = 0.000001;
const degree = Math.PI / 180;
const radian = 180 / Math.PI;

export function toRadian(a: number) {
  return a * degree;
}

export function toDegree(a: number) {
  return a * radian;
}

export function round(a: number) {
  if (a >= 0)
    return Math.round(a);

  return (a % 0.5 === 0) ? Math.floor(a) : Math.round(a);
}

export function equals(a: number, b: number, tolerance = EPSILON) {
  return Math.abs(a - b) <= tolerance * Math.max(1, Math.abs(a), Math.abs(b));
}

export function cache<T>(fn: () => T) {
  var value: T | null = null;
  return () => value ?? (value = fn());
}

export function toString(iterator: Iterable<any>) {
  let out = '', current = iterator[Symbol.iterator]();

  do {
    const now = current.next();

    if (now.done)
      return out;

    if (out)
      out += ',';

    out += now.value;
  } while (true);
}

export type EulerOrder = 'xyz' | 'xzy' | 'yxz' | 'yzx' | 'zxy' | 'zyx';
export type SimpleArrayLike = { [n: number]: number; };

const f32 = new Float32Array(1);
const u32 = new Uint32Array(f32.buffer);

function canonical(x: number, i = 0) {
  if (Object.is(x, -0)) x = 0;
  if (Number.isNaN(x)) x = NaN;
  f32[0] = x;
  return u32[i];
}

function mix(z: number) {
  z = (z + 0x9e3779b9) >>> 0;
  z ^= z >>> 16;
  z = (z * 0x85ebca6b) >>> 0;
  z ^= z >>> 13;
  z = (z * 0xc2b2ae35) >>> 0;
  z ^= z >>> 16;
  return z >>> 0;
}

const GOLDEN = 0x9e3779b9 >>> 0;
const SEED = 0x243f6a88 >>> 0;

export function hash(arr: ArrayLike<number>) {
  let h1 = SEED;

  for (let i = 0; i < arr.length; i++) {
    let a = canonical(arr[i]);
    a = (a ^ ((i * GOLDEN) >>> 0)) >>> 0;
    const m1 = mix(a);
    h1 = (h1 ^ ((m1 + GOLDEN) >>> 0)) >>> 0;
    h1 = (((h1 << 13) | (h1 >>> 19)) >>> 0); // rotate left 13
    h1 = (h1 * 0x9e3779b9) >>> 0;
  }

  h1 = (h1 ^ ((16 * GOLDEN) >>> 0)) >>> 0;

  return mix(h1);
}