import { Component } from "react";
export type TMixin<T> = (target: T) => void | (() => void);
export declare const connect: <I extends typeof Component>(...plugins: TMixin<InstanceType<I>>[]) => (target: I) => void;
