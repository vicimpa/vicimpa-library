Конечно! Вот перевод на русский язык:

# @vicimpa/shared-state

`@vicimpa/shared-state` — это легковесная библиотека на TypeScript для
управления общим состоянием между различными компонентами в React-приложении.
Она предоставляет простой API для создания и управления общим состоянием,
позволяя компонентам подписываться на изменения состояния и обновляться
соответственно.

## Установка

Вы можете установить библиотеку с помощью npm или yarn:

```bash
npm install @vicimpa/shared-state
```

или

```bash
yarn add @vicimpa/shared-state
```

## Использование

### Создание общего состояния

Чтобы создать общее состояние, создайте экземпляр класса `SharedState` с
начальным значением состояния.

```ts
import { SharedState } from "@vicimpa/shared-state";

const counterState = new SharedState(0);
```

### Использование общего состояния в компонентах

Вы можете использовать метод `useState`, предоставляемый экземпляром
`SharedState`, чтобы получить доступ и обновить общее состояние в ваших
React-компонентах.

```tsx
import React from "react";
import { SharedState } from "@vicimpa/shared-state";

const counterState = new SharedState(0);

const CounterComponent: React.FC = () => {
  const [count, setCount] = counterState.useState();

  return (
    <div>
      <p>Счетчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>Увеличить</button>
    </div>
  );
};

export default CounterComponent;
```

### Прослушивание изменений состояния

Вы можете подписаться на изменения состояния с помощью метода `onChange`. Это
полезно для выполнения побочных эффектов при изменении состояния.

```ts
counterState.onChange((newState) => {
  console.log("Состояние счетчика изменилось:", newState);
});
```

### Отписка от изменений состояния

Чтобы отписаться от изменений состояния, используйте метод `offChange`.

```ts
const listener = (newState) => {
  console.log("Состояние счетчика изменилось:", newState);
};

counterState.onChange(listener);

// Позже, чтобы отписаться
counterState.offChange(listener);
```

### Программное изменение состояния

Вы можете программно изменить состояние с помощью метода `setState`.

```ts
counterState.setState(10);
```

Вы также можете использовать функцию для обновления состояния на основе текущего
состояния.

```ts
counterState.setState((prevState) => prevState + 1);
```

## API

### `SharedState<T>`

#### Конструктор

```ts
new SharedState(initialState: T)
```

Создает новый экземпляр `SharedState` с заданным начальным состоянием.

#### Свойства

- `state: T`

  Получает или устанавливает текущее состояние.

#### Методы

- `setState(dispatch: SetStateAction<T | undefined>): void`

  Устанавливает состояние. Параметр `dispatch` может быть новым значением
  состояния или функцией, которая принимает текущее состояние и возвращает новое
  состояние.

- `useState(): [T, (newState: SetStateAction<T | undefined>) => void]`

  Хук, который возвращает текущее состояние и функцию для его обновления. Этот
  хук подписывает компонент на изменения состояния.

- `onChange(listener: Listener<T>): void`

  Добавляет слушателя, который будет вызываться при каждом изменении состояния.

- `offChange(listener: Listener<T>): void`

  Удаляет ранее добавленного слушателя.

- `subscribe(listener: Listener<T>): () => void`

  Добавляет слушателя и возвращает функцию для отписки этого слушателя.

## Пример

Вот полный пример, демонстрирующий, как использовать `@vicimpa/shared-state` в
React-приложении.

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { SharedState } from "@vicimpa/shared-state";

const counterState = new SharedState(0);

const CounterComponent: React.FC = () => {
  const [count, setCount] = counterState.useState();

  return (
    <div>
      <p>Счетчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>Увеличить</button>
    </div>
  );
};

const App: React.FC = () => (
  <div>
    <h1>Пример общего состояния</h1>
    <CounterComponent />
    <CounterComponent />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
```

В этом примере оба экземпляра `CounterComponent` используют одно и то же
состояние. Увеличение счетчика в одном компоненте обновит счетчик и в другом
компоненте.
