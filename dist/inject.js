"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const context_1 = require("./context");
const inject = (target) => {
    return (_target, key) => {
        const { render: _render } = _target;
        _target.render = function render() {
            const ctx = (0, context_1.getContext)(target());
            if (!ctx)
                throw new Error(`No find ctx for "${target}"`);
            return ((0, jsx_runtime_1.jsx)(ctx.Consumer, { children: (value) => {
                    Object.assign(this, { [key]: value });
                    return _render.apply(this);
                } }));
        };
    };
};
exports.inject = inject;
