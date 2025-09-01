# @vicimpa/glm

[![npm version](https://badge.fury.io/js/%40vicimpa%2Fglm.svg)](https://badge.fury.io/js/%40vicimpa%2Fglm)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](https://opensource.org/licenses/GPL-3.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

A **lightweight**, **class-based** alternative to gl-matrix providing comprehensive vector, matrix, and quaternion math utilities for 2D/3D graphics, game development, and WebGL/WebGPU applications.

## ✨ Features

- **🎯 Object-Oriented Design**: Clean, intuitive class-based API instead of functional programming
- **🚀 High Performance**: Optimized for modern JavaScript engines with minimal overhead
- **📦 Zero Dependencies**: Lightweight bundle with no external dependencies
- **🔧 TypeScript First**: Full TypeScript support with comprehensive type definitions
- **🌐 Universal Support**: Works in Node.js, browsers, and modern JavaScript environments
- **📱 Modern ES6+**: Built with modern JavaScript features and iterators
- **🎨 GLSL-Style Swizzling**: Intuitive component access and reordering like `vec.xy`, `vec.xyz`, `vec.xyxy`
- **🔄 Smart Factory Functions**: Type-safe vector creation with multiple overloads for flexible instantiation

## 🚀 Quick Start

```bash
npm install @vicimpa/glm
````

```typescript
import { Vec3, Mat4, Quat } from '@vicimpa/glm';

const position = new Vec3(1, 2, 3);
const velocity = new Vec3(0.1, 0.2, 0.3);

position.add(velocity);
const distance = position.length();

const xy = position.xy;
const reversed = position.zyx;

const transform = new Mat4();
transform.translate(position);
transform.rotate(Math.PI / 4, Vec3.UP);

const rotation = new Quat();
```

## 📚 API Reference

### Vectors

```typescript
const vec = new Vec3(1, 2, 3);

vec.add(otherVec);
vec.sub(otherVec);
vec.mul(otherVec);
vec.scale(2.0);
vec.normalize();

vec.rotateX(angle);
vec.rotateY(angle);
vec.rotateZ(angle);
vec.rotateAround(angle, axis, center);
vec.lerp(a, b, t);
vec.min(a, b);
vec.max(a, b);
vec.random(scale);

vec.applyMat2(mat2);
vec.applyMat3(mat3);
vec.applyMat4(mat4);
vec.applyQuat(quat);

vec.length();
vec.distance(otherVec);
vec.dot(otherVec);
vec.cross(otherVec);

vec.xy;   
vec.xyz;
vec.xyxy;
vec.yx;

vec.clone();
vec.copy(otherVec);
vec.set(1, 2, 3);
vec.equals(otherVec);
```

**Factory functions with overloads:**

```typescript
const v2 = vec2(1, 2);
const v3 = vec3(vec2(1, 2), 3);
const v4 = vec4(vec2(1, 2), vec2(3, 4));
```

### Matrices

```typescript
const mat = new Mat4();

mat.identity();
mat.translate(vec);
mat.rotate(rad, axis);
mat.scale(vec);
mat.transpose();
mat.invert();
mat.mul(otherMat);
mat.determinant();
```

### Quaternions

```typescript
const quat = new Quat();

quat.fromEuler(x, y, z, order);
quat.normalize();
quat.mul(otherQuat);
quat.slerp(aQuat, bQuat, t);
quat.invert();
```

### Utilities

```typescript
import { toRadian, toDegree, equals } from '@vicimpa/glm';

toRadian(90);
toDegree(Math.PI);
equals(a, b, 0.001);
```

## 🎮 Use Cases

* **Graphics**: WebGL, WebGPU, Canvas
* **Game Development**: Physics, cameras, animation
* **CAD & Visualization**: Transformations, 3D data
* **Animation**: Skeletal systems, interpolation

## 📊 Performance

* Minimal allocations
* Method chaining
* Optimized math operations
* Memory-efficient structures

## 📦 Bundle Sizes

* **ESM**: \~10KB (min+gzip)
* **CJS**: \~10KB (min+gzip)
* **AMD**: \~10KB (min+gzip)

## 📄 License

GPL-3.0 — see [LICENSE](LICENSE.md).

## 🙏 Acknowledgments

* Inspired by [gl-matrix](https://github.com/toji/gl-matrix)
* Built with modern TypeScript and Rollup

--- 

**Made with ❤️ for the graphics and game development community**