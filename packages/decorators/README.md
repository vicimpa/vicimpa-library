# @vicimpa/decorators

`@vicimpa/decorators` — это библиотека для TypeScript, которая предоставляет
декораторы для создания реактивных свойств в классах с использованием
`@preact/signals-react`. Эта библиотека позволяет легко создавать реактивные
свойства в ваших классах, обеспечивая автоматическое обновление и реактивность.

## Установка

Для установки библиотеки необходимо иметь зависимости `@vicimpa/week-store` и
`@preact/signals-react`. Вы можете установить их с помощью npm или yarn:

```bash
npm install @vicimpa/week-store @preact/signals-react
```

или

```bash
yarn add @vicimpa/week-store @preact/signals-react
```

## Использование

### Декоратор `reactive`

Декоратор `reactive` используется для создания реактивного класса. Он
гарантирует, что все свойства, помеченные декоратором `prop`, будут реактивными.

#### Пример

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

### Декоратор `prop`

Декоратор `prop` используется для пометки свойства класса как реактивного. Когда
свойство помечено декоратором `prop`, оно автоматически обновляет свое значение
и уведомляет всех слушателей при изменении.

#### Пример

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

## API

### `reactive`

Декоратор `reactive` — это функция высшего порядка, которая возвращает декоратор
класса. Он делает все свойства, помеченные декоратором `prop`, реактивными.

#### Синтаксис

```ts
reactive(): ClassDecorator
```

### `prop`

Декоратор `prop` — это декоратор свойства, который помечает свойство класса как
реактивное.

#### Синтаксис

```ts
prop(target: Object, key: string | symbol): void
```

## Примеры с использованием `effect`

Для демонстрации реактивной природы свойств, помеченных декоратором `prop`,
можно использовать функцию `effect` из `@preact/signals-react`.

#### Пример

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

// Реактивное отслеживание изменений свойства count
effect(() => {
  console.log(`Count has changed: ${component.count}`);
});

// Реактивное отслеживание изменений свойства name
effect(() => {
  console.log(`Name has changed: ${component.name}`);
});

// Изменение свойства name через 3 секунды
setTimeout(() => {
  component.name = "Jane Doe";
}, 3000);
```

#### Пример

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

// Реактивное отслеживание изменений свойства count
effect(() => {
  console.log(`Count has changed: ${component.count}`);
});

// Реактивное отслеживание изменений свойства name
effect(() => {
  console.log(`Name has changed: ${component.name}`);
});

// Ручное изменение свойств
component.count = 5;
component.name = "Jane Doe";
```

## Заключение

`@vicimpa/decorators` — это мощная библиотека, которая упрощает создание
реактивных свойств в классах TypeScript. Используя декораторы `reactive` и
`prop`, вы можете легко сделать свойства вашего класса реактивными и
автоматически обновлять их значения. Эта библиотека особенно полезна для
создания реактивных пользовательских интерфейсов и управления состоянием в
современных веб-приложениях.
