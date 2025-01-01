Select language: **`English`** | [Russian](README_RU.md)

# Documentation for @vicimpa/lib-vec2

The `@vicimpa/lib-vec2` library provides a comprehensive set of utilities for working with 2D vectors. This library is designed to facilitate mathematical operations, transformations, and utility functions for 2D vector manipulation.

## Types

### Vec2 Types

- **Point**
  ```typescript
  type Point = {
      x: number;
      y: number;
  };
  ```

- **Tuple**
  ```typescript
  type Tuple = [x: number, y: number];
  ```

- **Size**
  ```typescript
  type Size = {
      width: number;
      height: number;
  };
  ```

- **PageXY**
  ```typescript
  type PageXY = {
      pageX: number;
      pageY: number;
  };
  ```

- **OffsetXY**
  ```typescript
  type OffsetXY = {
      offsetX: number;
      offsetY: number;
  };
  ```

- **DeltaXY**
  ```typescript
  type DeltaXY = {
      deltaX: number;
      deltaY: number;
  };
  ```

- **OffsetSize**
  ```typescript
  type OffsetSize = {
      offsetWidth: number;
      offsetHeight: number;
  };
  ```

- **InnerSize**
  ```typescript
  type InnerSize = {
      innerWidth: number;
      innerHeight: number;
  };
  ```

- **Args**
  ```typescript
  type Args = [xy: number | Point | Tuple] | Tuple;
  ```

- **ClampArgs**
  ```typescript
  type ClampArgs = [min: Args[0], max: Args[0]] | [minX: number, minY: number, maxX: number, maxY: number];
  ```

## Interfaces

### Base Methods

- **set**: Sets the vector's components.
- **equal**: Checks if two vectors are equal.
- **clone**: Clones the vector.
- **toObject**: Converts the vector to a `Point` object.
- **toObjectSize**: Converts the vector to a `Size` object.
- **toString**: Converts the vector to a string.
- **[Symbol.iterator]**: Iterates over the vector components.
- **[Symbol.toStringTag]**: Returns the string tag of the vector.

### Math Methods

- **plus**: Adds vectors.
- **minus**: Subtracts vectors.
- **times**: Multiplies vectors.
- **div**: Divides vectors.
- **rem**: Computes the remainder of vectors.
- **pow**: Raises vectors to a power.
- **abs**: Computes the absolute value of the vector.
- **sign**: Computes the sign of the vector.
- **round**: Rounds the vector components.
- **ceil**: Applies the ceiling function to the vector components.
- **floor**: Applies the floor function to the vector components.

### Utility Methods

- **angle**: Computes the angle of the vector.
- **length**: Computes the length of the vector.
- **min**: Finds the minimum component of the vector.
- **max**: Finds the maximum component of the vector.
- **distance**: Computes the distance between vectors.
- **inverse**: Inverts the vector.
- **normalize**: Normalizes the vector.

### Clamp Methods

- **clampMin**: Clamps the vector to a minimum value.
- **clampMax**: Clamps the vector to a maximum value.
- **clamp**: Clamps the vector between a minimum and maximum value.

### Copy Math Methods

- **cplus**: Adds vectors and returns a new vector.
- **cminus**: Subtracts vectors and returns a new vector.
- **ctimes**: Multiplies vectors and returns a new vector.
- **cdiv**: Divides vectors and returns a new vector.
- **crem**: Computes the remainder of vectors and returns a new vector.
- **cpow**: Raises vectors to a power and returns a new vector.
- **cabs**: Computes the absolute value of the vector and returns a new vector.
- **csign**: Computes the sign of the vector and returns a new vector.
- **cround**: Rounds the vector components and returns a new vector.
- **cceil**: Applies the ceiling function to the vector components and returns a new vector.
- **cfloor**: Applies the floor function to the vector components and returns a new vector.

### Copy Utility Methods

- **cinverse**: Inverts the vector and returns a new vector.
- **cnormalize**: Normalizes the vector and returns a new vector.

### Copy Clamp Methods

- **cclampMin**: Clamps the vector to a minimum value and returns a new vector.
- **cclampMax**: Clamps the vector to a maximum value and returns a new vector.
- **cclamp**: Clamps the vector between a minimum and maximum value and returns a new vector.

## Classes

### Vec2

The `Vec2` class provides a comprehensive set of methods for 2D vector manipulation.

#### Constructor

```typescript
constructor(...args: Vec2.Args | []);
```

#### Static Methods

- **fromAngle**: Creates a vector from an angle.
- **fromRandom**: Creates a vector with random components.
- **fromSrandom**: Creates a vector with signed random components.
- **fromSize**: Creates a vector from a `Size` object.
- **fromDeltaXY**: Creates a vector from `DeltaXY`.
- **fromPageXY**: Creates a vector from `PageXY`.
- **fromOffsetXY**: Creates a vector from `OffsetXY`.
- **fromInnerSize**: Creates a vector from `InnerSize`.
- **fromOffsetSize**: Creates a vector from `OffsetSize`.
- **fromSvgLength**: Creates a vector from SVG lengths.

### Vec2Map

A map-like structure for storing values associated with vectors.

#### Methods

- **has**: Checks if a vector is in the map.
- **get**: Retrieves a value associated with a vector.
- **set**: Associates a value with a vector.
- **delete**: Removes a vector from the map.
- **clear**: Clears the map.
- **forEach**: Iterates over the map.

### Vec2Set

A set-like structure for storing unique vectors.

#### Methods

- **has**: Checks if a vector is in the set.
- **add**: Adds a vector to the set.
- **delete**: Removes a vector from the set.
- **clear**: Clears the set.
- **forEach**: Iterates over the set.

## Examples

### Basic Vector Operations

```typescript
import { vec2 } from '@vicimpa/lib-vec2';

const v1 = vec2(1, 2);
const v2 = vec2(3, 4);

v1.plus(v2); // v1 is now (4, 6)
v1.minus(v2); // v1 is now (1, 2)
v1.times(2); // v1 is now (2, 4)
v1.div(2); // v1 is now (1, 2)
```

### Using Vec2Map

```typescript
import { Vec2Map, vec2 } from '@vicimpa/lib-vec2';

const map = new Vec2Map<number>();
map.set(vec2(1, 2), 100);
console.log(map.get(vec2(1, 2))); // Outputs: 100
```

### Using Vec2Set

```typescript
import { Vec2Set, vec2 } from '@vicimpa/lib-vec2';

const set = new Vec2Set();
set.add(vec2(1, 2));
console.log(set.has(vec2(1, 2))); // Outputs: true
```

This documentation provides an overview of the `@vicimpa/lib-vec2` library, detailing its types, interfaces, classes, and usage examples. The library is designed to simplify 2D vector operations and transformations.