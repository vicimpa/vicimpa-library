# @vicimpa/events

`@vicimpa/events` — это легковесная библиотека на TypeScript, предназначенная
для упрощения процесса добавления и удаления обработчиков событий для
HTML-элементов, документа и окна. Эта библиотека предоставляет три основные
функции: `elementEvents`, `documentEvents` и `windowEvents`.

## Использование

### `elementEvents`

Эта функция позволяет добавлять обработчики событий к конкретному HTML-элементу.
Она также поддерживает элементы, обернутые в объекты с свойствами `value` или
`current`, что полезно при работе с такими фреймворками, как React.

#### Определение типа

```ts
type Target<T extends HTMLElement> = T | null | undefined | { value?: T | null; } | { current?: T | null; };

export const elementEvents = <
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement
>(
  element: Target<T>,
  event: K | K[],
  listener: (event: HTMLElementEventMap[K], current: T) => void
) => { ... };
```

#### Параметры

- `element`: Целевой HTML-элемент или объект, содержащий элемент.
- `event`: Один тип события или массив типов событий.
- `listener`: Функция-обработчик события, которая будет вызвана при
  возникновении события.

#### Возвращает

Функцию, которая при вызове удаляет обработчики событий.

#### Пример

```ts
import { elementEvents } from "@vicimpa/events";

const button = document.querySelector("button");

const removeClickListener = elementEvents(button, "click", (event, current) => {
  console.log("Кнопка нажата!", event, current);
});

// Для удаления обработчика события
removeClickListener();
```

### `documentEvents`

Эта функция позволяет добавлять обработчики событий к документу.

#### Определение типа

```ts
export const documentEvents = <K extends keyof DocumentEventMap>(
  event: K | K[],
  listener: (event: DocumentEventMap[K]) => void
) => { ... };
```

#### Параметры

- `event`: Один тип события или массив типов событий.
- `listener`: Функция-обработчик события, которая будет вызвана при
  возникновении события.

#### Возвращает

Функцию, которая при вызове удаляет обработчики событий.

#### Пример

```ts
import { documentEvents } from "@vicimpa/events";

const removeKeydownListener = documentEvents("keydown", (event) => {
  console.log("Клавиша нажата!", event);
});

// Для удаления обработчика события
removeKeydownListener();
```

### `windowEvents`

Эта функция позволяет добавлять обработчики событий к окну.

#### Определение типа

```ts
export const windowEvents = <K extends keyof WindowEventMap>(
  event: K[] | K,
  listener: (event: WindowEventMap[K]) => void
) => { ... };
```

#### Параметры

- `event`: Один тип события или массив типов событий.
- `listener`: Функция-обработчик события, которая будет вызвана при
  возникновении события.

#### Возвращает

Функцию, которая при вызове удаляет обработчики событий.

#### Пример

```ts
import { windowEvents } from "@vicimpa/events";

const removeResizeListener = windowEvents("resize", (event) => {
  console.log("Окно изменило размер!", event);
});

// Для удаления обработчика события
removeResizeListener();
```

## Заключение

`@vicimpa/events` — это простая, но мощная библиотека для управления
обработчиками событий в среде TypeScript. Она абстрагирует повторяющиеся задачи
добавления и удаления обработчиков событий, делая ваш код чище и более
поддерживаемым.
