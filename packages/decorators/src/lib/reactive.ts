import { makeWeekStore } from "@vicimpa/week-store";
import { signal } from "@preact/signals-react";

const store = makeWeekStore(() => new Set<string | symbol>());

export const reactive = <T extends object, C extends new (...args: any[]) => T>() => {
  return (target: C) => {
    const { prototype } = target;
    const _store = store(prototype);

    return {
      [target.name]: class extends (target as new (...args: any[]) => any) {
        constructor(...args: any[]) {
          super(...args);
          for (const key of _store) {
            const _signal = signal(this[key as any]);
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
  key: string | symbol
) => {
  store(target).add(key);
};