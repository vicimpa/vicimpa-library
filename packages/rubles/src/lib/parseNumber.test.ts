import { describe, expect, test } from 'bun:test';

import { parseNumber } from './parseNumber';

describe('parseNumber', () => {
  test('splits integer and fractional parts', () => {
    expect(parseNumber(1000)).toEqual(['1000']);
    expect(parseNumber(0.123)).toEqual(['0', '123']);
    expect(parseNumber('123.12')).toEqual(['123', '12']);
    expect(parseNumber('123,12')).toEqual(['123', '12']);
  });

  test('removes supported digit separators', () => {
    expect(parseNumber('1 520 . 34')).toEqual(['1520', '34']);
    expect(parseNumber('1_432_123')).toEqual(['1432123']);
    expect(parseNumber('41-214.94')).toEqual(['41214', '94']);
    expect(parseNumber('1\t234,50')).toEqual(['1234', '50']);
    expect(parseNumber('1--000')).toEqual(['1000']);
  });

  test('preserves a leading sign and normalizes decimal forms', () => {
    expect(parseNumber('-10.12')).toEqual(['-10', '12']);
    expect(parseNumber('+10.12')).toEqual(['10', '12']);
    expect(parseNumber('.5')).toEqual(['0', '5']);
    expect(parseNumber('1.')).toEqual(['1', '']);
    expect(parseNumber('001.20')).toEqual(['1', '20']);
  });

  test('expands scientific notation into decimal digits', () => {
    expect(parseNumber('1e-7')).toEqual(['0', '0000001']);
    expect(parseNumber('1e21')).toEqual(['1000000000000000000000']);
    expect(parseNumber('1.23e2')).toEqual(['123']);
    expect(parseNumber('1.23e1')).toEqual(['12', '3']);
    expect(parseNumber('-1.23e-2')).toEqual(['-0', '0123']);
  });

  test('rejects malformed and non-finite inputs', () => {
    const invalidInputs = [Number.NaN, Number.POSITIVE_INFINITY, '', ' ', '.', 'abc', '1.2.3', '1e', '--1'];

    for (const input of invalidInputs) {
      expect(() => parseNumber(input)).toThrow(TypeError);
    }

    expect(() => parseNumber('1e10001')).toThrow(RangeError);
  });
});
