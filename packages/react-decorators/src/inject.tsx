import { Component } from "react";
import { getContext } from "./context";

export const inject = <T extends Component>(target: () => new (...args: any[]) => T, strict = true) => {
  return <J extends Component>(_target: J, key: string | symbol) => {
    const { render: _render } = _target;
    _target.render = function render(this: T) {
      const ctx = getContext(target());

      if (!ctx)
        throw new Error(`No find ctx for "${target}"`);

      return (
        <ctx.Consumer>
          {
            (value) => {
              if (!value && strict)
                throw new Error(`No provide ${target}CTX`);
              Object.assign(this, { [key]: value });
              return _render.apply(this);
            }
          }
        </ctx.Consumer>
      );
    };
  };
};