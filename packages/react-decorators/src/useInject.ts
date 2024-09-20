import { Component, useContext } from "react";

import { getContext } from "./context";

export const useInject = <T extends typeof Component>(target: T) => {
  const value = useContext(getContext(target));
  if (!value)
    throw new Error(`No provide ${target}CTX`);
  return value;
};