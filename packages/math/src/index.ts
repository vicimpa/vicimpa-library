export const {
  abs,
  acos,
  acosh,
  asin,
  asinh,
  atan,
  atan2,
  atanh,
  cbrt,
  ceil,
  clz32,
  cos,
  cosh,
  E,
  exp,
  expm1,
  floor,
  fround,
  hypot,
  imul,
  log,
  log10,
  log1p,
  log2,
  LN10,
  LN2,
  LOG10E,
  LOG2E,
  max,
  min,
  pow,
  PI,
  random,
  round,
  sign,
  sin,
  sinh,
  sqrt,
  SQRT1_2,
  SQRT2,
  tan,
  tanh,
  trunc
} = Math;

export const PI2 = PI * 2;
export const PI1_2 = PI / 2;
export const PI1_3 = PI / 3;

export const rem = (v: number, a: number): number => {
  return v %= a;
};

export const rems = (v: number, a: number): number => {
  if (v < 0)
    v += Math.ceil(v / -a) * a;

  return v %= a;
};

export const clamp = (v: number, a: number, b: number) => (
  Math.min(Math.max(a, b), Math.max(Math.min(a, b), v))
);

export const lerp = (a: number, b: number, i: number) => (
  a + (b - a) * i
);

export const normalize = (a: number, min: number, max: number) => (
  (a - min) / (max - min)
);

export const rec = (v: number) => (
  v ? 1 / v : v
);

export const precision = (v: number, n = 1) => {
  n = Math.max(n | 0, 0);
  if (!n)
    return v;

  if (n === 1)
    return v | 0;

  return ((v / n) | 0) * n;
};