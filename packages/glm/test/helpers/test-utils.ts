export const EPSILON = 0.000001;

export function toBeEqualish(actual: any, expected: any, tolerance = EPSILON): boolean {
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) return false;
    for (let i = 0; i < actual.length; i++) {
      if (!toBeEqualish(actual[i], expected[i], tolerance)) return false;
    }
    return true;
  }

  if (typeof actual === 'number' && typeof expected === 'number') {
    return Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(actual), Math.abs(expected));
  }

  return actual === expected;
}

// Расширяем expect для поддержки toBeEqualish
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeEqualish(expected: any, tolerance?: number): R;
    }
  }
}

// Для bun:test
export function expectEqualish(actual: any, expected: any, tolerance = EPSILON): void {
  if (!toBeEqualish(actual, expected, tolerance)) {
    throw new Error(`Expected ${JSON.stringify(actual)} to be equalish to ${JSON.stringify(expected)} with tolerance ${tolerance}`);
  }
}
