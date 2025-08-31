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

## 🚀 Quick Start

### Installation

```bash
npm install @vicimpa/glm
# or
yarn add @vicimpa/glm
# or
pnpm add @vicimpa/glm
```

### Basic Usage

```typescript
import { Vec3, Mat4, Quat } from '@vicimpa/glm';

// Create vectors
const position = new Vec3(1, 2, 3);
const velocity = new Vec3(0.1, 0.2, 0.3);

// Vector operations
position.add(velocity);
const distance = position.length();

// GLSL-style swizzling
const xy = position.xy;           // Extract 2D position
const xyz = position.xyz;         // Extract 3D position
const reversed = position.zyx;    // Reverse component order

// Matrix transformations
const transform = new Mat4();
transform.translate(position);
transform.rotate(Quat.fromAxisAngle(Vec3.UP, Math.PI / 4));

// Quaternion rotations
const rotation = Quat.fromAxisAngle(Vec3.FORWARD, Math.PI / 2);
```

## 📚 API Reference

### Vectors

#### Vec2, Vec3, Vec4
```typescript
const vec = new Vec3(1, 2, 3);

// Basic operations
vec.add(otherVec);      // Addition
vec.sub(otherVec);      // Subtraction
vec.mul(otherVec);      // Element-wise multiplication
vec.scale(2.0);         // Scalar multiplication
vec.normalize();        // Normalize to unit length

// Advanced operations
vec.rotateX(angle);     // Rotate around X axis
vec.rotateY(angle);     // Rotate around Y axis
vec.rotateZ(angle);     // Rotate around Z axis
vec.rotateAround(angle, axis, center); // Rotate around arbitrary axis
vec.lerp(a, b, t);      // Linear interpolation
vec.min(a, b);          // Component-wise minimum
vec.max(a, b);          // Component-wise maximum
vec.random(scale);      // Generate random unit vector

// Matrix transformations (apply matrix to vector)
vec.applyMat2(mat2);    // Apply 2x2 matrix transformation
vec.applyMat2d(mat2d);  // Apply 2D transformation matrix (includes translation)
vec.applyMat3(mat3);    // Apply 3x3 matrix transformation
vec.applyMat4(mat4);    // Apply 4x4 matrix transformation

// Quaternion transformations
vec.applyQuat(quat);    // Apply quaternion rotation

// Mathematical functions
const length = vec.length();
const distance = vec.distance(otherVec);
const dot = vec.dot(otherVec);
const cross = vec.cross(otherVec); 

// Swizzling (GLSL-style component access)
vec.xy;                 // Get Vec2(x, y)
vec.xyz;                // Get Vec3(x, y, z)
vec.xyxy;               // Get Vec4(x, y, x, y)
vec.yx;                 // Get Vec2(y, x) - component reordering
vec.xxx;                // Get Vec3(x, x, x) - component repetition

// Utility methods
vec.clone();            // Create a copy
vec.copy(otherVec);     // Copy values
vec.set(1, 2, 3);      // Set values
vec.equals(otherVec);   // Compare with tolerance
```

#### Mat2, Mat3, Mat4
```typescript
const mat = new Mat4();

// Transformations
mat.identity();         // Reset to identity
mat.translate(vec);     // Apply translation
mat.rotate(quat);       // Apply rotation
mat.scale(vec);         // Apply scaling
mat.perspective(fov, aspect, near, far); // Perspective projection

// Matrix operations
mat.transpose();        // Transpose matrix
mat.invert();           // Invert matrix
mat.mul(otherMat);      // Matrix multiplication
const determinant = mat.determinant();
```

#### Quat (Quaternions)
```typescript
const quat = new Quat();

// Creation methods
Quat.fromAxisAngle(axis, angle);
Quat.fromEuler(x, y, z, order);
Quat.fromRotationMatrix(mat);

// Operations
quat.normalize();       // Normalize quaternion
quat.mul(otherQuat);    // Quaternion multiplication
quat.slerp(otherQuat, t); // Spherical interpolation
quat.invert();          // Inverse quaternion

// Conversion
const euler = quat.toEuler();
const matrix = quat.toRotationMatrix();
```

### Utility Functions

```typescript
import { toRadian, toDegree, equals } from '@vicimpa/glm';

// Angle conversions
const radians = toRadian(90);    // Convert degrees to radians
const degrees = toDegree(Math.PI); // Convert radians to degrees

// Comparison with tolerance
const isEqual = equals(a, b, 0.001); // Compare with custom tolerance
```

## 🎮 Use Cases

- **🎨 2D/3D Graphics**: WebGL, WebGPU, Canvas rendering
- **🎯 Game Development**: Physics, animations, camera systems
- **🔧 CAD Applications**: Geometric calculations, transformations
- **📊 Data Visualization**: 3D charts, scientific computing
- **🎭 Animation Systems**: Skeletal animation, keyframe interpolation

## 🎨 Swizzling

The library provides GLSL-style swizzling for intuitive component access and reordering:

```typescript
const vec = new Vec3(1, 2, 3);

// Extract components
const xy = vec.xy;           // Vec2(1, 2)
const xyz = vec.xyz;         // Vec3(1, 2, 3)
const xz = vec.xz;           // Vec2(1, 3)

// Reorder components
const yx = vec.yx;           // Vec2(2, 1)
const zyx = vec.zyx;         // Vec3(3, 2, 1)

// Repeat components
const xxx = vec.xxx;         // Vec3(1, 1, 1)
const xxyy = vec.xxyy;       // Vec4(1, 1, 2, 2)

// Create new vectors from existing components
const position = new Vec3(10, 20, 30);
const screenPos = position.xy;        // 2D screen position
const depth = position.z;             // Z-depth
const color = position.xyz;           // RGB color
```

**Supported swizzling patterns:**
- **2-component**: `xx`, `xy`, `xz`, `xw`, `yx`, `yy`, `yz`, `yw`, `zx`, `zy`, `zz`, `zw`, `wx`, `wy`, `wz`, `ww`
- **3-component**: `xxx`, `xxy`, `xxz`, `xxw`, `xyx`, `xyy`, `xyz`, `xyw`, etc.
- **4-component**: `xxxx`, `xxxy`, `xxxz`, `xxxw`, `xxyx`, `xxyy`, `xxyz`, `xxyw`, etc.

**Note**: Swizzling returns new vector instances and doesn't modify the original vector.

**Component naming**: Uses `x`, `y`, `z`, `w` components (similar to GLSL) rather than `r`, `g`, `b`, `a` or `s`, `t`, `p`, `q` for consistency with the library's API.

## 📊 Performance

The library is designed for high performance with:
- **Minimal object allocation** during operations
- **Method chaining** for efficient transformations
- **Optimized mathematical operations** for modern JavaScript engines
- **Memory-efficient** data structures

## 🔧 Development

### Building from Source

```bash
git clone https://github.com/vicimpa/vicimpa-library.git
cd packages/glm
npm install
npm run build
```

### Running Tests

```bash
npm test
```

## 📦 Bundle Sizes

- **ES Module**: ~45KB (minified + gzipped)
- **CommonJS**: ~45KB (minified + gzipped)
- **AMD**: ~45KB (minified + gzipped)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the GPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Inspired by the excellent [gl-matrix](https://github.com/toji/gl-matrix) library
- Built with modern TypeScript and Rollup for optimal developer experience

---

**Made with ❤️ for the graphics and game development community**
