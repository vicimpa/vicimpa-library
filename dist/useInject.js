"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInject = void 0;
const react_1 = require("react");
const context_1 = require("./context");
const useInject = (target) => {
    const value = (0, react_1.useContext)((0, context_1.getContext)(target));
    if (!value)
        throw new Error(`No provide ${target}CTX`);
    return value;
};
exports.useInject = useInject;
