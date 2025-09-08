# @vicimpa/react-decorators

`@vicimpa/react-decorators` is a library that provides a set of decorators and hooks for enhancing React components with **dependency injection** and **context management**.
It makes it easy to inject dependencies into your components and manage context providers/consumers with minimal boilerplate.

## Installation

```bash
npm install @vicimpa/react-decorators
```

or

```bash
yarn add @vicimpa/react-decorators
```

## Usage

### `connect`

The `connect` decorator allows you to attach plugins (mixins) to a React component.
These plugins can modify the component instance or perform side effects when the component is mounted/unmounted.

#### Example

```tsx
import React, { Component } from "react";
import { connect } from "@vicimpa/react-decorators";

// Define a plugin
const loggerPlugin = (target: any) => {
  console.log("Component mounted:", target);
  return () => console.log("Component unmounted:", target);
};

// Use the plugin
@connect(loggerPlugin)
class SomeComponent extends Component {
  render() {
    return <div>Some component</div>;
  }
}
```

---

### `provide`

The `provide` decorator allows you to expose a context value from a component.
This is useful for creating provider components.

#### Example

```tsx
import React, { Component, PropsWithChildren } from "react";
import { provide } from "@vicimpa/react-decorators";

// Define a provider component
@provide()
class ProviderComponent extends Component<PropsWithChildren> {
  render() {
    return <div>{this.props.children}</div>;
  }
}

const App = () => {
  return (
    <ProviderComponent>
      {/** Components using this provider’s context */}
    </ProviderComponent>
  );
};
```

---

### `inject`

The `inject` decorator allows you to inject the context value from a provider component into a property of another component.
This enables **dependency injection** in class components.

#### Example

```tsx
import React, { Component } from "react";
import { inject, provide } from "@vicimpa/react-decorators";

// Define a provider component
@provide()
class ProviderComponent extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

// Define a consumer component
class ConsumerComponent extends Component {
  @inject(() => ProviderComponent)
  provider!: ProviderComponent;

  render() {
    console.log(this.provider);

    return (
      <div>
        <p>Using inject</p>
      </div>
    );
  }
}

const App = () => {
  return (
    <ProviderComponent>
      <ConsumerComponent />
    </ProviderComponent>
  );
};
```

---

### `useInject`

The `useInject` hook allows you to access a provider’s context inside a functional component.
This is a lightweight alternative to using class components with `inject`.

#### Example

```tsx
import React from "react";
import { useInject } from "@vicimpa/react-decorators";
import { ProviderComponent } from "./path-to-provider-component";

const ConsumerComponent = () => {
  const provider = useInject(ProviderComponent);
  console.log(provider);

  return <p>Using inject</p>;
};

const App = () => {
  return (
    <ProviderComponent>
      <ConsumerComponent />
    </ProviderComponent>
  );
};
```

---

### `strict` mode (optional)

Both `inject` and `useInject` accept an optional second argument: `strict` (default: `true`).

* If `strict: true` (default), calling them outside of the corresponding provider will throw an error.
* If `strict: false`, they will return `undefined` instead of throwing.

#### Example

```tsx
const provider = useInject(ProviderComponent, false);

if (!provider) {
  console.log("Provider is missing, but no error was thrown");
}
```

---

## Features

* 🚀 Simple decorators for React context management
* 🔌 Dependency injection for class and functional components
* 🧩 Plugin system with `connect`
* ⚡ Minimal boilerplate

---

## License

MIT © [vicimpa](https://github.com/vicimpa)