# GLM - Math Library

A modern TypeScript math library providing vector, matrix, and quaternion operations.

## Features

- **Vectors**: Vec2, Vec3, Vec4 with comprehensive operations
- **Matrices**: Mat2, Mat2d, Mat3, Mat4 for transformations
- **Quaternions**: Quat for 3D rotations
- **TypeScript**: Full type safety and IntelliSense support
- **Modern**: ES modules, optimized for modern JavaScript engines

## Installation

```bash
# Using npm
npm install glm

# Using yarn
yarn add glm

# Using bun
bun add glm
```

## Usage

```typescript
import { Vec3, Mat4, Quat } from 'glm';

// Create vectors
const position = new Vec3(1, 2, 3);
const direction = new Vec3(0, 1, 0);

// Create matrices
const transform = new Mat4();
transform.translate(position);

// Create quaternions
const rotation = new Quat();
rotation.rotateY(Math.PI / 2);

// Apply transformations
direction.applyQuat(rotation);
position.applyMat4(transform);
```

## Development

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- TypeScript 5+

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd glm

# Install dependencies
bun install
```

### Build

```bash
# Build everything (types + bundle)
bun run build:all

# Build only the bundle
bun run build

# Build only type declarations
bun run build:types

# Development build (without minification)
bun run build:dev

# Clean build artifacts
bun run clean
```

### Testing

```bash
# Run tests
bun test

# Run tests in watch mode
bun test --watch
```

## Build Output

The build process generates:

- `dist/index.js` - Minified ES module bundle
- `dist/index.d.ts` - TypeScript declarations
- `dist/index.d.ts.map` - Declaration source maps
- `dist/index.js.map` - Source maps

## API Reference

### Vectors

#### Vec2
- `new Vec2(x?, y?)` - Create a 2D vector
- `add(v)`, `sub(v)`, `mul(v)`, `div(v)` - Arithmetic operations
- `dot(v)`, `length()`, `normalize()` - Vector operations
- `lerp(a, b, t)` - Linear interpolation

#### Vec3
- `new Vec3(x?, y?, z?)` - Create a 3D vector
- `cross(v)` - Cross product
- `applyQuat(q)` - Apply quaternion rotation
- `rotateX/Y/Z(rad, from?)` - Axis rotations
- `rotateAround(rad, axis, from?)` - Rotation around axis

#### Vec4
- `new Vec4(x?, y?, z?, w?)` - Create a 4D vector
- `applyQuat(q)` - Apply quaternion rotation
- `applyMat4(m)` - Apply 4x4 matrix transformation

### Matrices

#### Mat4
- `new Mat4()` - Create identity matrix
- `translate(v)`, `scale(v)`, `rotate(rad, axis)` - Transformations
- `perspective(fov, aspect, near, far)` - Perspective projection
- `ortho(left, right, bottom, top, near, far)` - Orthographic projection

### Quaternions

#### Quat
- `new Quat(x?, y?, z?, w?)` - Create quaternion
- `rotateX/Y/Z(rad)` - Axis rotations
- `slerp(a, b, t)` - Spherical linear interpolation
- `fromEuler(x, y, z, order?)` - From Euler angles

## License

MIT License
