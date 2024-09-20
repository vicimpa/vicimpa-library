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