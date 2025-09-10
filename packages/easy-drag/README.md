# @vicimpa/easy-drag

## Installation

Install the library via npm:

```sh
npm install @vicimpa/easy-drag
````

## Import

Import the required functions and types:

```ts
import {
  makeDrag,
  TDragEvent,
  TDragMove,
  TDragStart,
  TDragStop,
  Point,
} from "@vicimpa/easy-drag";
import { windowEvents } from "@vicimpa/events";
```

## Types

* **Point**: A simple structure `{ x: number; y: number }` representing a 2D point.
* **TDragEvent**: Describes a drag event.
* **TDragStop**: A function called when dragging stops.
* **TDragMove**: A function called during dragging. May return a `TDragStop` function.
* **TDragStart**: A function called when dragging starts. May return a `TDragMove` function.

## Function `makeDrag`

Creates a handler for drag events.

```ts
const dragHandler = makeDrag(
  (e, ...meta) => {
    console.log("Drag started at:", e.start);
    return (e, ...meta) => {
      console.log("Dragging at:", e.current);
      return (e, ...meta) => {
        console.log("Drag stopped at:", e.current);
      };
    };
  },
);
```

## Example Usage

```ts
document.getElementById("draggable")!.addEventListener("pointerdown", dragHandler);
```

## Parameters of `makeDrag`

* `dragStart: TDragStart<T>` — function called when dragging starts.
* `btn: number` — mouse/pointer button that initiates dragging (default `0` — left button).
* `fromOffset: boolean` — whether to use element-relative coordinates (`offsetX/Y`) instead of page coordinates (`pageX/Y`).

## Conclusion

The `@vicimpa/easy-drag` library provides a simple and flexible way to implement drag functionality on web pages. Using the provided types and functions, you can easily configure drag event handling in your application.

```
