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

export function hash(arr: ArrayLike<number>, size = arr.length) {
  let h = 0x811c9dc5;

  for (let i = 0; i < arr.length; i++) {
    let x = arr[i];

    if (x === 0 || Number.isNaN(x)) x = 0;

    f32[0] = x;
    let b = u32[0];

    h ^= b;
    h = Math.imul(h, 0x5bd1e995) >>> 0;
    h ^= h >>> 15;
  }

  h ^= h >>> 13;
  h = Math.imul(h, 0x5bd1e995) >>> 0;
  h ^= h >>> 15;

  return h >>> 0;
}