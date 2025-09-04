# React-Signals-Props (rsp)
A small layer between react and @preact/signals-react that allows you to use signals for attributes of native elements and bind some input and textarea properties to signals.

### Requirements
- [react](https://react.dev)
- [@preact/signals-react](https://preactjs.com/guide/v10/signals/)

### Install
```bash
> npm i @vicimpa/rsp
```

### Using
```tsx
// Basic usage
import { rsp } from "@vicimpa/rsp";
import { useSignal } from "@preact/signals-react";

export const App = () => {
  const disabled = useSignal(false);

  return (
    <rsp.button
      disabled={disabled}
      onClick={() => disabled.value = true}
    >
      Button
    </rsp.button>
  );
};
```

```tsx
// Binding
import { rsp } from "@vicimpa/rsp";
import { useSignal } from "@preact/signals-react";

export const App = () => {
  const text = useSignal('');
  const checkbox = useSignal(false);

  return (
    <>
      <rsp.input type="text" bind-value={text} />
      <rsp.input type="checkbox" bind-checked={checkbox} />
    </>
  );
};
```

```tsx
// Composite
import { useComputed, useSignal } from "@preact/signals-react";

import { rsp } from "@vicimpa/rsp";

export const App = () => {
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
        Text:
        <rsp.b style={style}>{text}</rsp.b>
      </p>
    </>
  );
};
```

```tsx
// Radio and Checkbox
import { useComputed, useSignal } from "@preact/signals-react";

import { rsp } from "@vicimpa/rsp";

export const App = () => {
  const choise = useSignal('A');
  const selected = useSignal<string[]>([]);
  const selectedView = useComputed(() => selected.value.join(', ') || 'Empty');

  return (
    <>
      <p>Choise: "{choise}"</p>
      <label><rsp.radio value="A" group={choise} /> A</label>
      <label><rsp.radio value="B" group={choise} /> B</label>
      <label><rsp.radio value="C" group={choise} /> C</label>

      <p>Select: "{selectedView}"</p>
      <label><rsp.checkbox value="A" group={selected} /> A</label>
      <label><rsp.checkbox value="B" group={selected} /> B</label>
      <label><rsp.checkbox value="C" group={selected} /> C</label>
    </>
  );
};
```


```tsx
// Component
import { useComputed, useSignal } from "@preact/signals-react";

import { rsp } from "@vicimpa/rsp";

const Test = ({test}) => {

  return <p>Value: "{test}"</p>
}

export const App = () => {
  const test = useSignal(0);

  return (
    <>
      <rsp.$ $target={Test} test={test} />
    </>
  );
};
```