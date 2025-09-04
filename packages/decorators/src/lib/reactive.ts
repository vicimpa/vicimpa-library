import { computed, Signal, signal } from "@preact/signals-core";

import { makeWeekStore } from "@vicimpa/week-store";

const propStore = makeWeekStore(() => new Set<string | symbol>());
const signalStore = makeWeekStore(() => ({}) as Record<string | symbol, Signal<any>>);

export const reactive = <T extends object, C extends new (...args: any[]) => T>() => {
  return (target: C) => {
    const { prototype } = target;
    const _store = propStore(prototype);

    return {
      [target.name]: class extends (target as new (...args: any[]) => any) {
        constructor(...args: any[]) {
          super(...args);
          for (const key of _store) {
            const _signal = signalStore(this)[key] = signal(this[key as any]);
            Object.defineProperty(this, key, {
              get() {
                return _signal.value;
              },
              set(v) {
                _signal.value = v;
              }
            });
          }
        }
      }
    }[target.name] as C;
  };
};

export const prop = <T extends object>(
  target: T,
  key: string | symbol,
  descriptor?: PropertyDescriptor
) => {
  if (descriptor) {
    const sym = Symbol();
    const { get: getValue, set: setValue } = descriptor;

    Object.defineProperty(target, key, {
      get() {
        const signal = this[sym] ?? (
          this[sym] = computed(() => {
            return getValue.call(this);
          })
        );

        return signal.value;
      },
      set(value) {
        setValue.call(this, value);
      }
    });

    return;
  }

  propStore(target).add(key);
};

export const real = <T extends object, K extends keyof T>(target: T, key: K) => {
  const store = signalStore(target);

  if (!(key in store))
    throw new Error('Can not find real signal');

  return store[key as any] as Signal<T[K]>;
};