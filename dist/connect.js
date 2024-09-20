"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Connect = (props) => {
    const { plugins, target } = props;
    (0, react_1.useEffect)(() => {
        const dispose = plugins.map(plugin => plugin(target));
        return () => dispose.forEach(d => d && d());
    }, []);
    return null;
};
const connect = (...plugins) => {
    return (target) => {
        const { render: originalRender } = target.prototype;
        target.prototype.render = function render() {
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Connect, { plugins: plugins, target: this }), originalRender.call(this)] }));
        };
    };
};
exports.connect = connect;
