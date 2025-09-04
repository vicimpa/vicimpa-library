import React, { Component, FC, ReactNode, SyntheticEvent, createElement, RefObject, RefCallback } from "react";

import { effect, Signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

type Elements = React.JSX.IntrinsicElements;

type bind = typeof bind;

type MaybeChange = {
  onChange?: (e: any) => any;
};

const bind = {
  ['bind-value'](input: Signal<string>, props: MaybeChange) {
    const { onChange } = props;
    return {
      value: input.value,
      onChange(e: SyntheticEvent<{ value: string; }>) {
        input.value = e.currentTarget.value;
        onChange?.(e);
      }
    };
  },
  ['bind-checked'](input: Signal<boolean>, props: MaybeChange) {
    const { onChange } = props;
    return {
      checked: input.value,
      onChange(e: SyntheticEvent<{ checked: boolean; }>) {
        input.value = e.currentTarget.checked;
        onChange?.(e);
      }
    };
  }
} as const;

const { assign, entries } = Object;
const _props = <T extends object>(props: T) => (
  props = assign({}, props),
  entries(props).reduce((acc, [key, signal]) => {
    if (/(key|ref|children)/.test(key))
      return acc;

    if (key in bind) {
      assign(acc, {
        [key]: undefined,
        ...(
          signal instanceof Signal ? (
            bind[key as keyof bind](signal as any, acc)
          ) : {}
        )
      });
      return acc;
    }

    assign(acc, { [key]: getValue(signal) });
    return acc;
  }, props)
);

type $Props<T extends object> = {
  $target: FC<T> | Component<T>;
};

type InputProps = React.JSX.IntrinsicElements['input'];
type ShortInput = Omit<InputProps, 'value' | 'type' | 'checked'>;

type RadioProps<T> = {
  value: T | Signal<T>;
  group: Signal<T>;
} & ShortInput;

type CheckboxProps<T> = {
  value: T | Signal<T>;
  group: Signal<T[]>;
} & ShortInput;

const getValue = <T>(value: T | Signal<T>) => {
  if (value instanceof Signal)
    return value.value;

  return value;
};

const applyRef = <T>(ref: RefObject<T | null> | RefCallback<T | null> | null | undefined, current: T | null): () => void => {
  if (!ref) return () => { };

  if (typeof ref === 'function') {
    const dispose = ref(current);

    return () => {
      if (typeof dispose === 'function')
        dispose();
      else
        ref(null);
    };
  }

  assign(ref, { current });

  return () => {
    assign(ref, { current: null });
  };
};

const $value = Symbol('value');
const $group = Symbol('group');

function updateGroup<T>(group: Signal<T[]>) {
  const out: T[] = [];

  for (const input of document.getElementsByTagName('input')) {
    if (!($value in input)) continue;
    if (!($group in input)) continue;
    if (input[$group] !== group) continue;
    if (!input.checked) continue;
    out.push(getValue(input[$value] as any));
  }
  console.log(out);

  group.value = out;
}

const RSP = {
  $<const T extends object>({ $target, ...props }: $Props<T> & RSPProps<T>): ReactNode {
    return (useSignals(), createElement($target as any, _props(props)));
  },
  radio<T>({ value, group, ref, onChange, ...props }: RadioProps<T>) {
    useSignals();

    return createElement('input', {
      ..._props(props),
      type: 'radio',
      checked: group.value === getValue(value),
      ref(current) {
        if (current) {
          Object.assign(current, {
            [$value]: value,
            [$group]: group,
          });
        }
        return applyRef(ref, current);
      },
      onChange(e) {
        group.value = getValue(value);
        onChange?.(e);
      }
    } as React.JSX.IntrinsicElements['input']);
  },
  checkbox<T>({ value, group, ref, onChange, ...props }: CheckboxProps<T>) {
    useSignals();

    return createElement('input', _props({
      ...props,
      type: 'checkbox',
      checked: undefined,
      ref(current) {
        const ctrl = new AbortController();

        if (current) {
          Object.assign(current, {
            [$value]: value,
            [$group]: group,
          });

          current.addEventListener('input', () => {
            updateGroup(group);
          }, ctrl);

          ctrl.signal.addEventListener('abort',
            effect(() => {
              current.checked = group.value.includes(getValue(value));
            })
          );
        }

        const dispose = applyRef(ref, current);

        return () => {
          dispose();
          ctrl.abort();
        };
      },
    } as React.JSX.IntrinsicElements['input']));
  },
};

type RSPProps<T extends object> = {
  [P in keyof T]: T[P] extends Signal<any> ? T[P] : T[P] | Signal<T[P]>
};

type RSPBindProps<T extends object> = {
  [B in keyof bind]?: ReturnType<bind[B]> extends T ? (
    Parameters<bind[B]>[0]
  ) : never
};

type RSP = {
  [K in keyof Elements]: FC<
    & RSPProps<Elements[K]>
    & RSPBindProps<Elements[K]>
  >
} & typeof RSP;

export const rsp = new Proxy(RSP as RSP, {
  get<K extends keyof RSP>(target: RSP, key: K) {
    return target[key] ?? (
      assign(target, {
        [key](props: RSP[K]) {
          return (useSignals(), createElement(key, _props(props)));
        }
      })[key]
    );
  }
});

export default rsp;
