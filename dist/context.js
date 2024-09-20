"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContext = exports.contextMap = exports.contextSym = void 0;
const react_1 = require("react");
exports.contextSym = Symbol('context');
exports.contextMap = new Map();
const getContext = (target) => {
    var _a;
    var ctx = (_a = exports.contextMap.get(target.name)) !== null && _a !== void 0 ? _a : (exports.contextMap.set(target.name, ctx = (0, react_1.createContext)(null)),
        ctx);
    return ctx;
};
exports.getContext = getContext;
