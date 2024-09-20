import { FC, RefObject, SyntheticEvent, createElement, forwardRef } from "react";

import { Signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

type Elements = React.JSX.IntrinsicElements;

type bind = typeof bind;
const bind = {
  ['bind-value'](input: Signal<string>) {
    return {
      value: input.value,
      onChange(e: SyntheticEvent<{ value: string; }>) {
        input.value = e.currentTarget.value;
      }
    };
  },
  ['bind-checked'](input: Signal<boolean>) {
    return {
      checked: input.value,
      onChange(e: SyntheticEvent<{ checked: boolean; }>) {
        input.value = e.currentTarget.checked;
      }
    };
  }
} as const;

const rename = <T extends (...args: any[]) => any>(
  func: T,
  name: string
) => {
  return ({
    [name](...args: Parameters<T>) {
      return func(...args);
    }
  })[name] as T;
};

const { assign, entries } = Object;
const _props = <T extends object>(props: T, ref: RefObject<any>) => (
  entries(props).reduce((acc, [key, signal]) => {
    if (/(key|ref|children)/.test(key))
      return acc;

    if (key in bind) {
      assign(acc, {
        [key]: undefined,
        ...(
          signal instanceof Signal ? (
            bind[key as keyof bind](signal as any)
          ) : {}
        )
      });
      return acc;
    }

    if (signal instanceof Signal) {
      assign(acc, {
        [key]: signal.value
      });
    }

    return acc;
  }, assign({ ref }, props))
);

export type RSP = {
  [K in keyof Elements]: FC<{
    [P in keyof Elements[K]]: Elements[K][P] | Signal<Elements[K][P]>
  } & {
      [B in keyof bind]?: ReturnType<bind[B]> extends Elements[K] ? (
        Parameters<bind[B]>[0]
      ) : never
    }>
};

export const rsp = new Proxy({} as RSP, {
  get<K extends keyof RSP>(target: RSP, key: K) {
    return target[key] ?? (
      assign(target, {
        [key]: forwardRef(
          rename(
            (props: RSP[K], ref: any) => {
              useSignals();
              return createElement(key, _props(props, ref));
            }, key
          )
        )
      })[key]
    );
  }
});

export default rsp;