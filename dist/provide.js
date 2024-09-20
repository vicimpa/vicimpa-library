"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provide = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const context_1 = require("./context");
const provide = () => {
    return (target) => {
        const ctx = (0, context_1.getContext)(target);
        const { render: originalRender } = target.prototype;
        target.prototype.render = function render() {
            return ((0, jsx_runtime_1.jsx)(ctx.Provider, { value: this, children: originalRender.call(this) }));
        };
    };
};
exports.provide = provide;
