import { Component, Context, createContext } from "react";

const contextSym = Symbol('context');

export const getContext = <T extends typeof Component>(target: T): Context<InstanceType<T>[]> => {
  var ctx: Context<any> = target[contextSym] ?? (
    target[contextSym] = createContext<InstanceType<T>[]>([])
  );

  return ctx;
};