# @vicimpa/decorators

`@vicimpa/decorators` is a TypeScript library that provides decorators for creating **reactive properties** in classes using `@preact/signals-react`.  
It allows you to easily build reactive properties inside your classes with automatic updates and reactivity.

## Installation

This library requires `@vicimpa/week-store` and `@preact/signals-react` as peer dependencies.  
You can install them via npm or yarn:

```bash
npm install @vicimpa/week-store @preact/signals-react
````

or

```bash
yarn add @vicimpa/week-store @preact/signals-react
```

## Usage

### `reactive` decorator

The `reactive` decorator is used to mark a class as reactive.
It ensures that all properties marked with the `prop` decorator become reactive.

#### Example

```ts
import { prop, reactive } from "@vicimpa/decorators";

@reactive()
class MyComponent {
  @prop
  public count: number = 0;

  @prop
  public name: string = "John Doe";

  constructor() {
    setInterval(() => {
      this.count++;
    }, 1000);
  }
}
```

---

### `prop` decorator

The `prop` decorator is used to mark a class property as reactive.
When a property is decorated with `prop`, it automatically updates and notifies listeners on change.

#### Example

```ts
import { prop, reactive } from "@vicimpa/decorators";

@reactive()
class MyComponent {
  @prop
  public count: number = 0;

  @prop
  public name: string = "John Doe";
}

const component = new MyComponent();
component.count = 5;
console.log(component.count); // 5
```

The `prop` decorator can also be used on getters, allowing you to define computed reactive properties based on other reactive props.

#### Example

```ts
import { prop, reactive } from "@vicimpa/decorators";

@reactive()
class MyComponent {
  @prop
  public count: number = 0;

  @prop
  public name: string = "John Doe";

  @prop
  public get hello() {
    return `${this.name} ${this.count}`;
  }
}

const component = new MyComponent();
console.log(component.hello); // John Doe 0
component.count = 5;
console.log(component.hello); // John Doe 5
```

---

## API

### `reactive`

A higher-order function that returns a class decorator.
It makes all properties decorated with `prop` reactive.

#### Syntax

```ts
reactive(): ClassDecorator
```

---

### `prop`

A property decorator that marks a class property as reactive.

#### Syntax

```ts
prop(target: Object, key: string | symbol): void
```

---

## Using with `effect`

You can use the `effect` function from `@preact/signals-react` to demonstrate the reactive nature of properties decorated with `prop`.

#### Example

```ts
import { prop, reactive } from "@vicimpa/decorators";
import { effect } from "@preact/signals-react";

@reactive()
class MyComponent {
  @prop
  public count: number = 0;

  @prop
  public name: string = "John Doe";

  constructor() {
    setInterval(() => {
      this.count++;
    }, 1000);
  }
}

const component = new MyComponent();

// Reactively track changes to `count`
effect(() => {
  console.log(`Count has changed: ${component.count}`);
});

// Reactively track changes to `name`
effect(() => {
  console.log(`Name has changed: ${component.name}`);
});

// Change name after 3 seconds
setTimeout(() => {
  component.name = "Jane Doe";
}, 3000);
```

#### Example

```ts
import { prop, reactive } from "@vicimpa/decorators";
import { effect } from "@preact/signals-react";

@reactive()
class MyComponent {
  @prop
  public count: number = 0;

  @prop
  public name: string = "John Doe";
}

const component = new MyComponent();

effect(() => {
  console.log(`Count has changed: ${component.count}`);
});

effect(() => {
  console.log(`Name has changed: ${component.name}`);
});

// Manual updates
component.count = 5;
component.name = "Jane Doe";
```

---

### Real signal

You can extract the underlying signal of a property using the `real` helper.

```ts
import { prop, reactive, real } from "@vicimpa/decorators";

@reactive()
class MyComponent {
  @prop
  public count: number = 0;

  @prop
  public name: string = "John Doe";
}

const component = new MyComponent();
const nameSignal = real(component, "name");
```

---

## Conclusion

`@vicimpa/decorators` is a powerful library that simplifies creating reactive properties in TypeScript classes.
Using the `reactive` and `prop` decorators, you can easily make your class properties reactive and automatically updated.
This library is especially useful for building **reactive UIs** and managing state in modern web applications.

---

## License

MIT © [vicimpa](https://github.com/vicimpa)

```
