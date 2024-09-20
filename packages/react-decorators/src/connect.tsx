import { Component, useEffect } from "react";

export type TMixin<T> = (target: T) => void | (() => void);

const Connect = <T,>(props: { plugins: TMixin<T>[], target: T; }) => {
  const { plugins, target } = props;

  useEffect(() => {
    const dispose = plugins.map(plugin => plugin(target));
    return () => dispose.forEach(d => d && d());
  }, []);

  return null;
};

export const connect = <
  I extends typeof Component,
>(...plugins: TMixin<InstanceType<I>>[]) => {
  return (target: I) => {
    const { render: originalRender } = target.prototype;

    target.prototype.render = function render(this: InstanceType<I>) {
      return (
        <>
          <Connect plugins={plugins} target={this} />
          {originalRender.call(this)}
        </>
      );
    };
  };
};