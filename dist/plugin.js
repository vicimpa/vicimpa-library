"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec2_1 = require("./vec2");
const methods = [
    'clearRect',
    'fillRect',
    'strokeRect',
    'arc',
    'arcTo',
    'bezierCurveTo',
    'ellipse',
    'lineTo',
    'moveTo',
    'quadraticCurveTo',
    'rect',
    'roundRect',
    'drawImage',
    'createImageData',
    'getImageData',
    'putImageData',
    'isPointInPath',
    'isPointInStroke',
    'createConicGradient',
    'createLinearGradient',
    'createRadialGradient',
    'fillText',
    'strokeText',
    'scale',
    'setTransform',
    'transform',
    'translate'
];
const mapped = (args) => {
    for (let i = 0; i < args.length; i++) {
        const element = args[i];
        if (element instanceof vec2_1.Vec2) {
            args.splice(i, 1, ...element);
            i += 1;
        }
    }
    return args;
};
const patch = (func) => (function (...args) {
    return func.apply(this, mapped(args));
});
if (typeof CanvasRenderingContext2D !== 'undefined') {
    const { prototype } = CanvasRenderingContext2D;
    for (const key of methods) {
        if (key in prototype)
            Object.assign(prototype, {
                [key]: patch(prototype[key])
            });
    }
}
if (typeof Path2D !== 'undefined') {
    const { prototype } = Path2D;
    for (const key of methods) {
        if (key in prototype) {
            Object.assign(prototype, {
                [key]: patch(prototype[key])
            });
        }
    }
}
