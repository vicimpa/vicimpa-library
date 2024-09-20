import { Component } from "react";
export declare const inject: <T extends Component>(target: () => new (...args: any[]) => T) => <J extends Component>(_target: J, key: string | symbol) => void;
