import { Component } from "react";
import { getContext } from "./context";

export const inject = <T extends Component>(target: () => new (...args: any[]) => T, strict = true) => {
  return <J extends Component>(_target: J, key: string | symbol) => {
    const { render: _render } = _target;
    if (!_render) return;
    _target.render = function render(this: T) {
      const ctx = getContext(target());

      if (!ctx)
        throw new Error(`No find ctx for "${target}"`);

      return (
        <ctx.Consumer>
          {(value) => {
            const last = value.at(-1), prelast = value.at(-2);
            const _value = last === this ? prelast : last;
            if (!_value && strict)
              throw new Error(`No provide ${target}CTX`);
            Object.assign(this, { [key]: _value });
            return _render.apply(this);
          }}
        </ctx.Consumer>
      );
    };
  };
};