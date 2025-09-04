# @vicimpa/rsp – React-Signals-Props 🚀

A **lightweight layer between React and [@preact/signals-react](https://preactjs.com/guide/v10/signals/)**.
It lets you **use signals directly as props for native elements** and **bind input/textarea state** without boilerplate.

🔗 Feels like JSX has built-in signal support.

---

## ✨ Why?

Working with `signals` in React usually means juggling `.value` everywhere and manually wiring up `onChange` or `useState`.

With `@vicimpa/rsp`:

* Pass a **signal directly into props**, no `.value`.
* `<input>` and `<textarea>` support **bind props** (`bind-value`, `bind-checked`).
* **Radio/checkbox groups** just work.
* Wrap your own components, and their props can also be signals.

👉 **Less code, less boilerplate, more reactivity.**

---

## 📦 Installation

```bash
npm i @vicimpa/rsp
```

---

## ⚡ Examples

### 1. Basic usage

```tsx
import { rsp } from "@vicimpa/rsp";
import { useSignal } from "@preact/signals-react";

export const App = () => {
  const disabled = useSignal(false);

  return (
    <rsp.button
      disabled={disabled}
      onClick={() => disabled.value = true}
    >
      Click me
    </rsp.button>
  );
};
```

👉 `disabled` is a `Signal<boolean>`, passed directly as a prop.

---

### 2. Binding inputs

```tsx
const text = useSignal('');
const checkbox = useSignal(false);

return (
  <>
    <rsp.input type="text" bind-value={text} />
    <rsp.input type="checkbox" bind-checked={checkbox} />
  </>
);
```

👉 `bind-value` and `bind-checked` keep signals and DOM fields in sync automatically.

---

### 3. Reactive styles and computed props

```tsx
const text = useSignal('Some text');
const color = useSignal('#333');
const font = useSignal('14');

const style = useComputed(() => ({
  color: color.value,
  fontSize: font.value + 'px',
}));

return (
  <>
    <rsp.input bind-value={text} />
    <rsp.input bind-value={color} />
    <rsp.input type="range" bind-value={font} />

    <p>
      Text: <rsp.b style={style}>{text}</rsp.b>
    </p>
  </>
);
```

---

### 4. Radio and checkbox groups

```tsx
const choice = useSignal('A');
const selected = useSignal<string[]>([]);

return (
  <>
    <p>Choice: {choice}</p>
    <label><rsp.radio value="A" group={choice}/> A</label>
    <label><rsp.radio value="B" group={choice}/> B</label>
    <label><rsp.radio value="C" group={choice}/> C</label>

    <p>Selected: {selected}</p>
    <label><rsp.checkbox value="A" group={selected}/> A</label>
    <label><rsp.checkbox value="B" group={selected}/> B</label>
    <label><rsp.checkbox value="C" group={selected}/> C</label>
  </>
);
```

👉 Groups are handled out of the box via `Signal`.

---

### 5. Signals in custom components

```tsx
const Test = ({ test }) => <p>Value: {test}</p>;

const App = () => {
  const test = useSignal(0);

  return (
    <rsp.$ $target={Test} test={test} />
  );
};
```

👉 Custom components wrapped with `<rsp.$>` also accept signals as props.

---

## 🔀 Before vs After

### Without `@vicimpa/rsp`

```tsx
const text = useSignal("");

return (
  <input
    value={text.value}
    onChange={e => text.value = e.currentTarget.value}
  />
);
```

### With `@vicimpa/rsp`

```tsx
const text = useSignal("");

return <rsp.input bind-value={text} />;
```

---

## 🎯 Features

* 🟢 **Use signals as props** — no `.value`
* 🟢 **Bind props** for `<input>` and `<textarea>`
* 🟢 **Radio/checkbox groups** supported natively
* 🟢 **Computed props/styles** in JSX
* 🟢 **Works with custom components**

---

## 🚀 Why is it awesome?

`@vicimpa/rsp` turns React + Signals into a **declarative, reactive style**:
no `useEffect`, no repetitive `onChange`, no constant `.value`.
Just write JSX as if signals were part of React itself.

---

## 📖 Requirements

* [React](https://react.dev)
* [@preact/signals-react](https://preactjs.com/guide/v10/signals/)