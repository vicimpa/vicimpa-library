Select language: **`English`** | [Russian](README_RU.md)

---

# @vicimpa/lib-vec2

`@vicimpa/lib-vec2` is a TypeScript library for working with 2D vectors. It provides various utilities and classes for performing vector operations such as addition, subtraction, normalization, and more. The library supports both mutable and immutable operations, making it suitable for functional programming. Additionally, it offers data structures like `Vec2Map` and `Vec2Set`, which use vectors as keys and elements, respectively.

### Types

- **Vec2Point**: Represents a point in 2D space with x and y coordinates.
  ```ts
  type Vec2Point = { x: number; y: number; };
  ```

- **Vec2Tuple**: Represents a tuple of x and y coordinates.
  ```ts
  type Vec2Tuple = [x: number, y: number];
  ```

- **Vec2Size**: Represents a size with width and height.
  ```ts
  type Vec2Size = { width: number, height: number; };
  ```

- **Vec2PageXY**: Represents page coordinates with pageX and pageY.
  ```ts
  type Vec2PageXY = { pageX: number, pageY: number; };
  ```

- **Vec2OffsetXY**: Represents offset coordinates with offsetX and offsetY.
  ```ts
  type Vec2OffsetXY = { offsetX: number, offsetY: number; };
  ```

- **Vec2DeltaXY**: Represents delta coordinates with deltaX and deltaY.
  ```ts
  type Vec2DeltaXY = { deltaX: number, deltaY: number; };
  ```

- **Vec2OffsetSize**: Represents offset size with offsetWidth and offsetHeight.
  ```ts
  type Vec2OffsetSize = { offsetWidth: number, offsetHeight: number; };
  ```

- **Vec2InnerSize**: Represents inner size with innerWidth and innerHeight.
  ```ts
  type Vec2InnerSize = { innerWidth: number, innerHeight: number; };
  ```

- **Vec2Args**: Represents arguments for vector operations, which can be a single number, a Vec2Point, or two numbers.
  ```ts
  type Vec2Args = [xy: number] | [xy: Vec2Point] | [x: number, y: number];
  ```

- **Vec2Clamp**: Represents clamping arguments, which can be two or four numbers.
  ```ts
  type Vec2Clamp = [min: Vec2Args[0], max: Vec2Args[0]] | [minX: number, minY: number, maxX: number, maxY: number];
  ```

### Functions

- **vec2**: Factory function to create a Vec2 instance.
  ```ts
  function vec2(): Vec2;
  function vec2(xy: number | Vec2Point): Vec2;
  function vec2(x: number, y: number): Vec2;
  ```

### Classes

#### Vec2

Represents a 2D vector with various utility methods.

- **Properties**:
  - `x`: X-coordinate.
  - `y`: Y-coordinate.

- **Getters**:
  - `point`: Returns the vector as a Vec2Point.
  - `tuple`: Returns the vector as a Vec2Tuple.
  - `size`: Returns the vector as a Vec2Size.

- **Methods**:
  - `equal(xy: number | Vec2Point): boolean`: Checks if the vector is equal to another vector or point.
  - `set(xy: number | Vec2Point): this`: Sets the vector's coordinates.
  - `toObject(o: Vec2Point): this`: Copies the vector's coordinates to a Vec2Point.
  - `toObjectSize(o: Vec2Size): this`: Copies the vector's coordinates to a Vec2Size.
  - `toTuple(o: Vec2Tuple): this`: Copies the vector's coordinates to a Vec2Tuple.
  - `clone(): Vec2`: Returns a new instance with the same coordinates.
  - `min(): number`: Returns the minimum of the x and y coordinates.
  - `max(): number`: Returns the maximum of the x and y coordinates.
  - `angle(): number`: Returns the angle of the vector in radians.
  - `length(): number`: Returns the length of the vector.
  - `distance(xy: number | Vec2Point): number`: Calculates the distance to another vector or point.
  - `dot(xy: number | Vec2Point): number`: Calculates the dot product with another vector or point.
  - `scalar(xy: number | Vec2Point): number`: Calculates the scalar projection on another vector or point.
  - `plus(xy: number | Vec2Point): this`: Adds another vector or point.
  - `minus(xy: number | Vec2Point): this`: Subtracts another vector or point.
  - `times(xy: number | Vec2Point): this`: Multiplies by another vector or point.
  - `div(xy: number | Vec2Point): this`: Divides by another vector or point.
  - `rem(xy: number | Vec2Point): this`: Calculates the remainder with another vector or point.
  - `pow(xy: number | Vec2Point): this`: Raises to the power of another vector or point.
  - `abs(): this`: Applies the absolute value to both coordinates.
  - `sign(): this`: Applies the sign function to both coordinates.
  - `round(): this`: Rounds both coordinates.
  - `ceil(): this`: Applies the ceiling function to both coordinates.
  - `floor(): this`: Applies the floor function to both coordinates.
  - `normalize(): this`: Normalizes the vector.
  - `inverse(): this`: Swaps the x and y coordinates.
  - `clampMin(xy: number | Vec2Point): this`: Clamps the vector to a minimum.
  - `clampMax(xy: number | Vec2Point): this`: Clamps the vector to a maximum.
  - `clamp(...args: Vec2Clamp): this`: Clamps the vector between two or four values.

- **Methods with c prefix**:
  - `cplus(xy: number | Vec2Point): Vec2`: Returns a new vector that is the result of adding another vector or point to the current vector.
  - `cminus(xy: number | Vec2Point): Vec2`: Returns a new vector that is the result of subtracting another vector or point from the current vector.
  - `ctimes(xy: number | Vec2Point): Vec2`: Returns a new vector that is the result of multiplying the current vector by another vector or point.
  - `cdiv(xy: number | Vec2Point): Vec2`: Returns a new vector that is the result of dividing the current vector by another vector or point.
  - `crem(xy: number | Vec2Point): Vec2`: Returns a new vector that is the result of calculating the remainder of the current vector with another vector or point.
  - `cpow(xy: number | Vec2Point): Vec2`: Returns a new vector that is the result of raising the current vector to the power of another vector or point.
  - `cabs(): Vec2`: Returns a new vector with the absolute values of the current vector's coordinates.
  - `csign(): Vec2`: Returns a new vector with the sign of the current vector's coordinates.
  - `cround(): Vec2`: Returns a new vector with the rounded values of the current vector's coordinates.
  - `cceil(): Vec2`: Returns a new vector with the ceiling values of the current vector's coordinates.
  - `cfloor(): Vec2`: Returns a new vector with the floor values of the current vector's coordinates.
  - `cnormalize(): Vec2`: Returns a new vector that is the normalized version of the current vector.
  - `cinverse(): Vec2`: Returns a new vector with the x and y coordinates swapped.
  - `cclampMin(xy: number | Vec2Point): Vec2`: Returns a new vector that is clamped to a minimum value defined by another vector or point.
  - `cclampMax(xy: number | Vec2Point): Vec2`: Returns a new vector that is clamped to a maximum value defined by another vector or point.
  - `cclamp(...args: Vec2Clamp): Vec2`: Returns a new vector that is clamped between two or four values.

- **Static Methods**:
  - `fromAngle(angle: number, vec = new this()): Vec2`: Creates a vector from an angle.
  - `fromRandom(vec = new this()): Vec2`: Creates a vector with random coordinates.
  - `fromSrandom(vec = new this()): Vec2`: Creates a vector with signed random coordinates.
  - `fromSize(size: Vec2Size, vec = new this()): Vec2`: Creates a vector from a size.
  - `fromDeltaXY(page: Vec2DeltaXY, vec = new this()): Vec2`: Creates a vector from delta coordinates.
  - `fromPageXY(page: Vec2PageXY, vec = new this()): Vec2`: Creates a vector from page coordinates.
  - `fromOffsetXY(offset: Vec2OffsetXY, vec = new this()): Vec2`: Creates a vector from offset coordinates.
  - `fromInnerSize(offsetSize: Vec2InnerSize, vec = new this()): Vec2`: Creates a vector from inner size.
  - `fromOffsetSize(offsetSize: Vec2OffsetSize, vec = new this()): Vec2`: Creates a vector from offset size.
  - `fromSvgLength(x: SVGAnimatedLength, y: SVGAnimatedLength, vec = new this()): Vec2`: Creates a vector from SVG lengths.

#### Vec2Map<T>

A map-like structure that uses Vec2 as keys.

- **Methods**:
  - `has(xy: number | Vec2Point): boolean`: Checks if a vector is in the map.
  - `get(xy: number | Vec2Point): T | undefined`: Retrieves a value by vector key.
  - `set(xy: number | Vec2Point, value: T): this`: Sets a value by vector key.
  - `delete(xy: number | Vec2Point): boolean`: Deletes a value by vector key.
  - `clear(): this`: Clears the map.
  - `forEach(callback: (value: T, key: Vec2) => any): void`: Iterates over the map.

#### Vec2Set

A set-like structure that uses Vec2 as elements.

- **Methods**:
  - `has(xy: number | Vec2Point): boolean`: Checks if a vector is in the set.
  - `add(xy: number | Vec2Point): this`: Adds a vector to the set.
  - `delete(xy: number | Vec2Point): boolean`: Deletes a vector from the set.
  - `clear(): this`: Clears the set.
  - `forEach(callback: (value: Vec2) => any): void`: Iterates over the set.

### CanvasRenderingContext2D Patch

The library includes a patch for `CanvasRenderingContext2D`, allowing you to use vectors directly in canvas operations. This patch extends the canvas API to accept `Vec2` types in various methods.

#### Example Usage

```ts
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const vec = new Vec2(50, 50);

// Using Vec2 with canvas methods
ctx?.moveTo(vec);
ctx?.lineTo(new Vec2(100, 100));
ctx?.stroke();
```

### Code Examples

#### Creating and Manipulating Vectors

```ts
import { vec2, Vec2 } from '@vicimpa/lib-vec2';

// Create a new vector
const v1 = vec2(3, 4);

// Clone and modify a vector
const v2 = v1.clone().plus(1, 2);

// Calculate the distance between two vectors
const distance = v1.distance(v2);

// Normalize a vector
const normalized = v1.clone().normalize();
```

#### Using Vec2Map and Vec2Set

```ts
import { Vec2, Vec2Map, Vec2Set } from '@vicimpa/lib-vec2';

// Create a Vec2Map
const map = new Vec2Map<string>();
map.set(new Vec2(1, 2), 'Point A');
console.log(map.get(new Vec2(1, 2))); // Output: 'Point A'

// Create a Vec2Set
const set = new Vec2Set();
set.add(new Vec2(3, 4));
console.log(set.has(new Vec2(3, 4))); // Output: true
```

This library provides a comprehensive set of tools for handling 2D vectors, making it suitable for various applications such as graphics, physics simulations, and more.