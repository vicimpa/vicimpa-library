import { computed, ReadonlySignal, Signal, signal, untracked } from "@preact/signals-core";

import { makeWeekStore } from "@vicimpa/week-store";

const propStore = makeWeekStore(() => new Set<string | symbol>());
const signalStore = makeWeekStore(() => ({}) as Record<string | symbol, Signal<any>>);

export const reactive = <T extends object, C extends new (...args: any[]) => T>() => {
  return (target: C): any => {
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

const myComputed = <T>(fn: () => T, setValue?: (v: T) => any) => {
  const signal = computed(fn);

  if (!setValue)
    return signal;

  return Object.setPrototypeOf({
    get value() {
      return signal.value;
    },
    set value(value) {
      setValue(value);
    }
  }, signal);
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
          this[sym] = signalStore(this)[key] = myComputed(
            () => getValue.call(this),
            setValue ? (value) => {
              setValue.call(this, value);
            } : undefined
          )
        );

        return signal.value;
      },
      ...(
        setValue ? (
          {
            set(value) {
              setValue.call(this, value);
            }
          }
        ) : {}
      )
    });

    return target as any;
  }

  propStore(target).add(key);
};

type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;

type IsReadonlyProp<T, K extends keyof T> =
  IfEquals<Pick<T, K>, Readonly<Pick<T, K>>, true, false>;

type RealSignal<T extends object, K extends keyof T> =
  IsReadonlyProp<T, K> extends true ? ReadonlySignal<T[K]> : Signal<T[K]>;

export const real = <T extends object, K extends keyof T>(
  target: T,
  key: K
): RealSignal<T, K> => {
  untracked(() => target[key]);
  const store = signalStore(target);
  if (!(key in store)) throw new Error('Can not find real signal');
  return store[key as any] as RealSignal<T, K>;
};
