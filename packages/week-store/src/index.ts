export const makeWeekStore = <T>(init: () => T) => {
  const stored = new WeakMap<object, T>();

  return (obj: object) => (
    stored.get(obj) ?? (
      stored.set(obj, init()),
      stored.get(obj)!
    )
  );
};

export const makeWeekProtoStore = <T>() => {
  const store = makeWeekStore(() => new Set<T>());

  return {
    store(obj: object, value: T) {
      store(obj).add(value);
    },
    collect(obj: object | null) {
      const find = new Set<T>();

      while (obj) {
        obj = Object.getPrototypeOf(obj);
        obj && store(obj).forEach(key => find.add(key));
      }

      return [...find];
    }
  };
};;

