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

export type EulerOrder = 'xyz' | 'xzy' | 'yxz' | 'yzx' | 'zxy' | 'zyx';
