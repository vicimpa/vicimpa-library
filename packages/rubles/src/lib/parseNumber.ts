export type ParsedNumber = [integer: string, fraction?: string];

const numberRegExp = /^(\d+(?:[.,]\d*)?|[.,]\d+)(?:[eE]([+-]?\d+))?$/;
const MAX_EXPONENT = 10_000;

export const parseNumber = (input: string | number): ParsedNumber => {
  if (typeof input === 'number' && !Number.isFinite(input)) {
    throw new TypeError('The number must be finite');
  }

  let source = input.toString().trim();
  const negative = source.startsWith('-');

  if (negative || source.startsWith('+')) {
    source = source.slice(1);
  }

  source = source
    .replace(/[\s_]+/g, '')
    .replace(/(\d)-+(?=\d)/g, '$1');

  const match = numberRegExp.exec(source);

  if (!match) {
    throw new TypeError(`Invalid numeric input: ${String(input)}`);
  }

  const [, mantissa, exponentSource] = match;
  const exponent = exponentSource ? Number(exponentSource) : 0;

  if (!Number.isSafeInteger(exponent) || Math.abs(exponent) > MAX_EXPONENT) {
    throw new RangeError(`The exponent must be between -${MAX_EXPONENT} and ${MAX_EXPONENT}`);
  }

  const [integerPart = '', fractionPart] = mantissa.split(/[.,]/);
  const base = integerPart || '0';
  let integer = base;
  let fraction = fractionPart;

  if (exponent) {
    const digits = `${base}${fraction ?? ''}`;
    const point = base.length + exponent;

    if (point <= 0) {
      integer = '0';
      fraction = `${'0'.repeat(-point)}${digits}`;
    } else if (point >= digits.length) {
      integer = `${digits}${'0'.repeat(point - digits.length)}`;
      fraction = undefined;
    } else {
      integer = digits.slice(0, point);
      fraction = digits.slice(point);
    }
  }

  integer = integer.replace(/^0+(?=\d)/, '');

  const signedInteger = negative ? `-${integer}` : integer;

  return fraction === undefined
    ? [signedInteger]
    : [signedInteger, fraction];
};
