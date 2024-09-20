import { Component, Context } from "react";
export declare const contextSym: unique symbol;
export declare const contextMap: Map<string, Context<any>>;
export declare const getContext: <T extends typeof Component>(target: T) => Context<InstanceType<T> | null>;
