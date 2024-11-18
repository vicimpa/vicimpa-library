import { Component, PropsWithChildren } from "react";

import { getContext } from "./context";

export const provide = <T extends Component>() => {
  return (target: new (...args: any[]) => T) => {
    const ctx = getContext(target);
    const {
      render: originalRender = (
        function (this: Component<PropsWithChildren>) {
          return this.props.children ?? null;
        }
      )
    } = target.prototype;

    target.prototype.render = function render() {
      return (
        <ctx.Provider value={this}>
          {originalRender.call(this)}
        </ctx.Provider>
      );
    };
  };
};