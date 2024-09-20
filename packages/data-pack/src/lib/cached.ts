const equal = <T extends any[]>(a: T, b: unknown[]): b is T => {
  if (a.length !== b.length)
    return false;

  return a.findIndex((e, i) => e !== b[i]) === -1;
};

export const cached = <F extends (...args: any[]) => any>(fn: F): F => {
  const _cache = new Map<Parameters<F>, ReturnType<F>>();

  return ((...args: Parameters<F>): ReturnType<F> => {
    for (const [_cacheArgs, result] of _cache) {
      if (equal(_cacheArgs, args))
        return result;
    }

    var result = fn(...args);
    _cache.set(args, result);
    return result;
  }) as F;
};