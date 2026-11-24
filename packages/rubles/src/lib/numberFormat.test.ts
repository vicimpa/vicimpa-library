import { describe, expect, test } from 'bun:test';

import { numberFormat } from './numberFormat';

describe('numberFormat', () => {
  test('groups integer digits', () => {
    expect(numberFormat(0)).toBe('0');
    expect(numberFormat(1000)).toBe('1 000');
    expect(numberFormat(1234567)).toBe('1 234 567');
  });

  test('supports custom separators, precision, and decimal marks', () => {
    expect(numberFormat(4123.12, '-')).toBe('4-123.12');
    expect(numberFormat(1321.123, '/', 2)).toBe('1/321.12');
    expect(numberFormat(135321.833, '_', 2, ',')).toBe('135_321,83');
    expect(numberFormat('1 234,50', ' ', 2, ',')).toBe('1 234,50');
  });

  test('truncates fractional digits without rounding or padding', () => {
    expect(numberFormat(123.4)).toBe('123.4');
    expect(numberFormat(123.456)).toBe('123.45');
    expect(numberFormat(123.999, ' ', 0)).toBe('123');
  });

  test('supports negative numbers and scientific notation', () => {
    expect(numberFormat(-1234.5)).toBe('-1 234.5');
    expect(numberFormat(-0.001)).toBe('0.00');
    expect(numberFormat(1e-7, ' ', 8)).toBe('0.0000001');
    expect(numberFormat('1.23e4')).toBe('12 300');
  });

  test('optionally rounds to the requested precision', () => {
    expect(numberFormat('1.999', ' ', 2, '.', 'round')).toBe('2.00');
    expect(numberFormat('-1.235', ' ', 2, '.', 'round')).toBe('-1.24');
    expect(numberFormat(1.005, ' ', 2, '.', 'round')).toBe('1.01');
    expect(numberFormat(1.5, ' ', 0, '.', 'round')).toBe('2');
    expect(numberFormat(-1.5, ' ', 0, '.', 'round')).toBe('-2');
  });

  test('rejects invalid precision and rounding modes', () => {
    expect(() => numberFormat(1, ' ', -1)).toThrow(RangeError);
    expect(() => numberFormat(1, ' ', 1.5)).toThrow(RangeError);
    expect(() => numberFormat(1, ' ', 2, '.', 'invalid' as 'round')).toThrow(TypeError);
  });
});
