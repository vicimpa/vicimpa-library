import { Component } from "react";

import { getContext } from "./context";

export const provide = <T extends Component>() => {
  return (target: new (...args: any[]) => T) => {
    const ctx = getContext(target);
    const { render: _render } = target.prototype;

    if (!_render) return;

    target.prototype.render = function render() {
      return (
        <ctx.Consumer>
          {(value) => (
            <ctx.Provider value={[...value, this]}>
              {_render.call(this)}
            </ctx.Provider>
          )}
        </ctx.Consumer>
      );
    };
  };
};