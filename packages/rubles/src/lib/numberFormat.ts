import { parseNumber } from "./parseNumber";

export const numberFormat = (input: number | string, sep = ' ', precision = 2, dot = '.') => {
  let [base, dec = ''] = parseNumber(input);

  const segments: string[] = [];

  while (base.length) {
    segments.unshift(base.slice(-3));
    base = base.slice(0, -3);
  }

  return [segments.join(sep), dec.slice(0, precision)].filter(e => e).join(dot);
};