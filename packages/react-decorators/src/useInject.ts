import { Component, useContext } from "react";

import { getContext } from "./context";

function useInject<T extends typeof Component>(target: T): InstanceType<T>;
function useInject<T extends typeof Component>(target: T, strict: true): InstanceType<T>;
function useInject<T extends typeof Component>(target: T, strict: false): InstanceType<T> | undefined;
function useInject<T extends typeof Component>(target: T, strict = true) {
  const ctx = getContext(target);

  if (!ctx)
    throw new Error(`No find ctx for "${target}"`);

  const value = useContext(ctx)?.at(-1);

  if (!value && strict)
    throw new Error(`No provide ${target}CTX`);

  return value;
};

export { useInject };