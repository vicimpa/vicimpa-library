import { Component } from "react";
export declare const useInject: <T extends typeof Component>(target: T) => InstanceType<T>;
