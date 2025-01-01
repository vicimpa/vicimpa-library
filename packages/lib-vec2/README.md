# @vicimpa/lib-vec2 Documentation
Select language: **`English`** | [Russian](README_RU.md)

## Overview

The `@vicimpa/lib-vec2` library provides a comprehensive set of tools for working with 2D vectors in TypeScript. It offers a variety of methods for vector manipulation, including arithmetic operations, transformations, and conversions. The library is designed to be compatible with the `CanvasRenderingContext2D` API, allowing for seamless integration with HTML5 canvas operations without the need for tuples.

## API Reference

### Vec2 Class

The `Vec2` class represents a 2D vector with `x` and `y` components. It provides a wide range of methods for vector operations.

#### Properties

- **x**: `number` - The x-component of the vector.
- **y**: `number` - The y-component of the vector.

#### Getters

- **tuple**: `Vec2Tuple` - Returns the vector as a tuple `[x, y]`.
- **size**: `Vec2Size` - Returns the vector as a size object `{ width: x, height: y }`.
- **point**: `Vec2Point` - Returns the vector as a point object `{ x, y }`.

#### Methods

- **equal(...args: Vec2Args): boolean**: Checks if the vector is equal to another vector.
- **angle(): number**: Calculates the angle of the vector.
- **clamp(...args: Vec2Clamp): this**: Clamps the vector within the given bounds.
- **clampMin(...args: Vec2Args): this**: Clamps the vector to a minimum value.
- **clampMax(...args: Vec2Args): this**: Clamps the vector to a maximum value.
- **set(...args: Vec2Args): this**: Sets the vector to the given values.
- **plus(...args: Vec2Args): this**: Adds another vector to this vector.
- **minus(...args: Vec2Args): this**: Subtracts another vector from this vector.
- **times(...args: Vec2Args): this**: Multiplies this vector by another vector.
- **div(...args: Vec2Args): this**: Divides this vector by another vector.
- **rem(...args: Vec2Args): this**: Calculates the remainder of division of this vector by another vector.
- **pow(...args: Vec2Args): this**: Raises this vector to the power of another vector.
- **round(): this**: Rounds the components of the vector.
- **ceil(): this**: Applies the ceiling function to the components of the vector.
- **floor(): this**: Applies the floor function to the components of the vector.
- **inverse(): this**: Inverses the components of the vector.
- **lerp(to: Vec2, i: number): this**: Linearly interpolates between this vector and another vector.
- **sign(): this**: Sets the components of the vector to their sign.
- **abs(): this**: Sets the components of the vector to their absolute values.
- **dotProduct(to: Vec2): number**: Calculates the dot product with another vector.
- **projectScalar(to: Vec2): number**: Projects this vector onto another vector and returns the scalar.
- **clone(): Vec2**: Creates a clone of this vector.
- **length(): number**: Calculates the length of the vector.
- **distance(...args: Vec2Args): number**: Calculates the distance to another vector.
- **normalize(): this**: Normalizes the vector.
- **min(): number**: Returns the minimum component of the vector.
- **max(): number**: Returns the maximum component of the vector.
- **toObject(o: Vec2Point): this**: Converts the vector to an object with x and y properties.
- **toObjectSize(o: Vec2Size): this**: Converts the vector to an object with width and height properties.

#### Static Methods

- **fromAngle(angle: number, vec?: Vec2): Vec2**: Creates a vector from an angle.
- **fromPoint(point: Vec2Point, vec?: Vec2): Vec2**: Creates a vector from a point.
- **fromRandom(vec?: Vec2): Vec2**: Creates a vector with random components.
- **fromSrandom(vec?: Vec2): Vec2**: Creates a vector with signed random components.
- **fromSize(size: Vec2Size, vec?: Vec2): Vec2**: Creates a vector from a size object.
- **fromDeltaXY(page: DeltaXY, vec?: Vec2): Vec2**: Creates a vector from deltaX and deltaY.
- **fromPageXY(page: PageXY, vec?: Vec2): Vec2**: Creates a vector from pageX and pageY.
- **fromOffsetXY(offset: OffsetXY, vec?: Vec2): Vec2**: Creates a vector from offsetX and offsetY.
- **fromOffsetSize(elem: HTMLElement, vec?: Vec2): Vec2**: Creates a vector from the offset size of an HTML element.
- **fromSvgLength(x: SVGAnimatedLength, y: SVGAnimatedLength, vec?: Vec2): Vec2**: Creates a vector from SVG animated lengths.

### Methods with 'c' Prefix

Methods with the 'c' prefix operate on a clone of the vector, leaving the original vector unchanged. These methods are useful for functional programming styles where immutability is preferred.

- **cplus(...args: Vec2Args): Vec2**: Adds another vector to a clone of this vector.
- **cminus(...args: Vec2Args): Vec2**: Subtracts another vector from a clone of this vector.
- **ctimes(...args: Vec2Args): Vec2**: Multiplies a clone of this vector by another vector.
- **cdiv(...args: Vec2Args): Vec2**: Divides a clone of this vector by another vector.
- **crem(...args: Vec2Args): Vec2**: Calculates the remainder of division of a clone of this vector by another vector.
- **cpow(...args: Vec2Args): Vec2**: Raises a clone of this vector to the power of another vector.
- **cinverse(): Vec2**: Inverses the components of a clone of this vector.
- **cnormalize(): Vec2**: Normalizes a clone of this vector.
- **clerp(to: Vec2, i: number): Vec2**: Linearly interpolates between a clone of this vector and another vector.
- **csign(): Vec2**: Sets the components of a clone of this vector to their sign.
- **cabs(): Vec2**: Sets the components of a clone of this vector to their absolute values.
- **cround(): Vec2**: Rounds the components of a clone of this vector.
- **cceil(): Vec2**: Applies the ceiling function to the components of a clone of this vector.
- **cfloor(): Vec2**: Applies the floor function to the components of a clone of this vector.
- **cclamp(...args: Vec2Clamp): Vec2**: Clamps a clone of this vector within the given bounds.
- **cclampMin(...args: Vec2Args): Vec2**: Clamps a clone of this vector to a minimum value.
- **cclampMax(...args: Vec2Args): Vec2**: Clamps a clone of this vector to a maximum value.

### Vec2Map and Vec2Set

- **Vec2Map<T>**: A map-like structure where keys are `Vec2` instances.
  - **constructor(points?: Iterable<[Vec2Point | number, T]>)**: Initializes the map.
  - **size**: Returns the number of key-value pairs.
  - **has(...args: Vec2ArgsReq): boolean**: Checks if a key exists.
  - **get(...args: Vec2ArgsReq): T | undefined**: Retrieves a value by key.
  - **set(...args: [...Vec2ArgsReq, value: T]): this**: Sets a value for a key.
  - **delete(...args: Vec2ArgsReq): boolean**: Deletes a key-value pair.
  - **clear()**: Clears the map.
  - **forEach(callback: (key: Vec2, value: T, self: this) => any)**: Iterates over entries.

- **Vec2Set**: A set-like structure for `Vec2` instances.
  - **constructor(points?: Iterable<Vec2Point | number>)**: Initializes the set.
  - **size**: Returns the number of unique points.
  - **has(...args: Vec2ArgsReq): boolean**: Checks if a point exists.
  - **add(...args: Vec2ArgsReq): this**: Adds a point.
  - **delete(...args: Vec2ArgsReq): boolean**: Deletes a point.
  - **clear()**: Clears the set.
  - **forEach(callback: (key: Vec2, self: this) => any)**: Iterates over points.

### Integration with CanvasRenderingContext2D

The library provides seamless integration with the `CanvasRenderingContext2D` API by allowing the use of `Vec2` instances instead of tuples for various canvas operations. This is achieved through type definitions that extend the canvas API to accept `Vec2` objects.

#### Example

```typescript
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const start = new Vec2(50, 50);
const end = new Vec2(200, 200);

ctx.moveTo(start);
ctx.lineTo(end);
ctx.stroke();
```

In this example, `moveTo` and `lineTo` methods accept `Vec2` instances directly, simplifying the code and improving readability.

## Examples

### Basic Vector Operations

```typescript
const v1 = new Vec2(3, 4);
const v2 = new Vec2(1, 2);

const sum = v1.clone().plus(v2);
console.log(sum.toString()); // Vec2 { x: 4, y: 6 }

const distance = v1.distance(v2);
console.log(distance); // 2.8284271247461903
```

### Using 'c' Prefix Methods

```typescript
const v1 = new Vec2(5, 10);
const v2 = new Vec2(2, 3);

const result = v1.cplus(v2);
console.log(result.toString()); // Vec2 { x: 7, y: 13 }
console.log(v1.toString()); // Vec2 { x: 5, y: 10 } - original vector remains unchanged
```

### Canvas Integration

```typescript
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const position = new Vec2(100, 150);
const size = new Vec2(50, 50);

ctx.fillRect(position, size);
```

In this example, `fillRect` uses `Vec2` instances for position and size, demonstrating the library's compatibility with canvas operations.

This documentation provides a comprehensive overview of the `@vicimpa/lib-vec2` library, detailing its API and usage examples to help developers effectively utilize its capabilities in their projects.