import { Component } from "react";
import { getContext } from "./context";

export const provide = <T extends Component>() => {
  return (target: new (...args: any[]) => T) => {
    const ctx = getContext(target);
    const { render: originalRender } = target.prototype;

    target.prototype.render = function render() {
      return (
        <ctx.Provider value={this}>
          {originalRender.call(this)}
        </ctx.Provider>
      );
    };
  };
};