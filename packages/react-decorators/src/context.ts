import { Component, Context, createContext } from "react";

export const contextSym = Symbol('context');
export const contextMap = new Map<string, Context<any>>();
export const getContext = <T extends typeof Component>(target: T): Context<InstanceType<T> | null> => {
  var ctx: Context<any> = contextMap.get(target.name) ?? (
    contextMap.set(target.name, ctx = createContext<any>(null)),
    ctx
  );

  return ctx;
};