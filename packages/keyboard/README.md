# 🎹 @vicimpa/keyboard

> A simple and fast keyboard input library for browsers — perfect for games, interactive apps, and visual tools.

---

## 🚀 Installation

```bash
npm install @vicimpa/keyboard
# or
pnpm add @vicimpa/keyboard
# or
yarn add @vicimpa/keyboard
```

---

## 🧠 Concept

`@vicimpa/keyboard` provides low-level control over keyboard state, making it easy to handle:

* **key holding** (`keyDown`)
* **key press detection** (`keyPress`)
* **axis-style input** (`keysAxis`, `keysAxisAll`)
* **key combinations** (via arrays)
* automatic cleanup on window blur

Minimal magic, maximum control — ideal for realtime apps.

---

## ✨ Example

```ts
import { keyDown, keyPress, keysAxis } from "@vicimpa/keyboard";

// Inside your game loop
function update() {
  if (keyPress("Space")) {
    console.log("Jump!");
  }

  const moveX = keysAxis(["KeyA"], ["KeyD"]);
  const moveY = keysAxis(["KeyS"], ["KeyW"]);

  player.move(moveX, moveY);
}
```

---

## 🧩 API

### `keyDown(code: string | string[]): boolean`

Returns `true` if **at least one** of the provided keys is currently held down.

```ts
if (keyDown(["KeyW", "ArrowUp"])) moveForward();
```

---

### `keysDownAll(codes: string[]): boolean`

Returns `true` only if **all** provided keys are held down.

```ts
if (keysDownAll(["ShiftLeft", "KeyW"])) sprint();
```

---

### `keyPress(code: string | string[], options?: { every?: number; skip?: number }): boolean`

Fires **only on press**, not while holding.
Options:

* `every` — repeat interval in ms while holding
* `skip` — number of initial presses to ignore

```ts
// Single press
if (keyPress("Space")) jump();

// Repeat every 200ms
if (keyPress("ArrowLeft", { every: 200 })) moveLeft();
```

---

### `keyPressAll(codes: string[], options?)`

Same as `keyPress`, but for **key combinations**.

```ts
if (keyPressAll(["ControlLeft", "KeyS"])) saveGame();
```

---

### `keysAxis(neg: string | string[], pos?: string | string[]): number`

Returns `-1`, `0`, or `1` depending on which side of the axis is pressed.
Useful for movement or rotation.

```ts
const x = keysAxis(["KeyA"], ["KeyD"]);
const y = keysAxis(["KeyS"], ["KeyW"]);
```

---

### `keysAxisAll(neg: string[], pos?: string[]): number`

Like `keysAxis`, but requires **all keys** on each side to be pressed.

---

## 🪄 Why It’s Great

- ✅ Zero dependencies
- ✅ Works with any key codes (`KeyW`, `Space`, `ArrowLeft`)
- ✅ Supports combinations and input axes
- ✅ Fully synchronous and deterministic
- ✅ Safe blur handling (auto reset)

---

## 🧰 Compatibility

| Environment                 | Supported        |
| --------------------------- | ---------------- |
| Browser                     | ✅                |
| Node.js                     | 🚫 (no `window`) |
| Electron / NW.js            | ✅                |
| React / Vue / Phaser / PIXI | ✅                |

---

## 🪪 License

MIT © [Vicimpa](https://github.com/vicimpa)

---

## ❤️ Support

If this library helped you — ⭐️ star it on GitHub!
Issues and PRs are always welcome.
