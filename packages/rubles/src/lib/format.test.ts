import { format } from './format';

describe('format', () => {
  test('penny', () => {
    expect(format(0, '$penny')).toBe('00');
    expect(format(0.06, '$penny')).toBe('06');
    expect(format(0.12, '$penny')).toBe('12');
    expect(format(0.4, '$penny')).toBe('40');
    expect(format(123, '$penny')).toBe('00');
    expect(format(123.06, '$penny')).toBe('06');
    expect(format(123.12, '$penny')).toBe('12');
    expect(format(123.4, '$penny')).toBe('40');
  });

  test('pennyString', () => {
    expect(format(0, '$pennyString')).toBe('ноль');
    expect(format(0.06, '$pennyString')).toBe('шесть');
    expect(format(0.12, '$pennyString')).toBe('двенадцать');
    expect(format(0.4, '$pennyString')).toBe('сорок');
    expect(format(123, '$pennyString')).toBe('ноль');
    expect(format(123.06, '$pennyString')).toBe('шесть');
    expect(format(123.12, '$pennyString')).toBe('двенадцать');
    expect(format(123.4, '$pennyString')).toBe('сорок');
  });

  test('PennyString', () => {
    expect(format(0, '$PennyString')).toBe('Ноль');
    expect(format(0.06, '$PennyString')).toBe('Шесть');
    expect(format(0.12, '$PennyString')).toBe('Двенадцать');
    expect(format(0.4, '$PennyString')).toBe('Сорок');
    expect(format(123, '$PennyString')).toBe('Ноль');
    expect(format(123.06, '$PennyString')).toBe('Шесть');
    expect(format(123.12, '$PennyString')).toBe('Двенадцать');
    expect(format(123.4, '$PennyString')).toBe('Сорок');
  });

  test('pennyCurrency', () => {
    expect(format(0, '$pennyCurrency')).toBe('копеек');
    expect(format(0.01, '$pennyCurrency')).toBe('копейка');
    expect(format(0.02, '$pennyCurrency')).toBe('копейки');
    expect(format(0.06, '$pennyCurrency')).toBe('копеек');
    expect(format(0.41, '$pennyCurrency')).toBe('копейка');
    expect(format(0.99, '$pennyCurrency')).toBe('копеек');
    expect(format(123, '$pennyCurrency')).toBe('копеек');
    expect(format(123.01, '$pennyCurrency')).toBe('копейка');
    expect(format(123.02, '$pennyCurrency')).toBe('копейки');
    expect(format(123.06, '$pennyCurrency')).toBe('копеек');
    expect(format(123.41, '$pennyCurrency')).toBe('копейка');
    expect(format(123.99, '$pennyCurrency')).toBe('копеек');
  });

  test('PennyCurrency', () => {
    expect(format(0, '$PennyCurrency')).toBe('Копеек');
    expect(format(0.01, '$PennyCurrency')).toBe('Копейка');
    expect(format(0.02, '$PennyCurrency')).toBe('Копейки');
    expect(format(0.06, '$PennyCurrency')).toBe('Копеек');
    expect(format(0.41, '$PennyCurrency')).toBe('Копейка');
    expect(format(0.99, '$PennyCurrency')).toBe('Копеек');
    expect(format(123, '$PennyCurrency')).toBe('Копеек');
    expect(format(123.01, '$PennyCurrency')).toBe('Копейка');
    expect(format(123.02, '$PennyCurrency')).toBe('Копейки');
    expect(format(123.06, '$PennyCurrency')).toBe('Копеек');
    expect(format(123.41, '$PennyCurrency')).toBe('Копейка');
    expect(format(123.99, '$PennyCurrency')).toBe('Копеек');
  });
})
