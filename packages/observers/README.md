# @vicimpa/observers

`@vicimpa/observers` — это легковесная библиотека на TypeScript, которая
предоставляет утилиты для наблюдения за событиями пересечения и изменения
размера DOM-элементов. Эта библиотека упрощает использование
`IntersectionObserver` и `ResizeObserver`, предоставляя простые в использовании
функции с автоматической очисткой.

## Установка

Вы можете установить библиотеку с помощью npm или yarn:

```bash
npm install @vicimpa/observers
```

или

```bash
yarn add @vicimpa/observers
```

## Использование

### Наблюдатель пересечения (Intersection Observer)

Функция `intersectionObserver` позволяет наблюдать, когда целевой элемент
пересекается с областью просмотра или указанным корневым элементом.

#### Определения типов

```ts
type IntersectionListener = (entry: IntersectionObserverEntry) => void;
```

#### Определение функции

```ts
export function intersectionObserver<T extends Element>(
  target: T | null | undefined,
  listener: IntersectionListener,
): () => void;
```

#### Параметры

- `target`: DOM-элемент для наблюдения. Может быть типа `Element`, `null` или
  `undefined`.
- `listener`: Функция обратного вызова, которая будет вызываться всякий раз,
  когда целевой элемент пересекается с областью просмотра или корневым
  элементом. Функция получает объект `IntersectionObserverEntry` в качестве
  аргумента.

#### Возвращает

Функцию очистки, которая прекращает наблюдение за целевым элементом и отключает
наблюдатель.

#### Пример

```ts
import { intersectionObserver } from "@vicimpa/observers";

const targetElement = document.getElementById("myElement");

const cleanup = intersectionObserver(targetElement, (entry) => {
  if (entry.isIntersecting) {
    console.log("Элемент в поле зрения");
  } else {
    console.log("Элемент вне поля зрения");
  }
});

// Для прекращения наблюдения
cleanup();
```

### Наблюдатель изменения размера (Resize Observer)

Функция `resizeObserver` позволяет наблюдать за изменениями размера целевого
элемента.

#### Определения типов

```ts
type ResizeListener = (entry: ResizeObserverEntry) => void;
```

#### Определение функции

```ts
export function resizeObserver<T extends Element>(
  target: T | null | undefined,
  listener: ResizeListener,
): () => void;
```

#### Параметры

- `target`: DOM-элемент для наблюдения. Может быть типа `Element`, `null` или
  `undefined`.
- `listener`: Функция обратного вызова, которая будет вызываться всякий раз,
  когда размер целевого элемента изменяется. Функция получает объект
  `ResizeObserverEntry` в качестве аргумента.

#### Возвращает

Функцию очистки, которая прекращает наблюдение за целевым элементом.

#### Пример

```ts
import { resizeObserver } from "@vicimpa/observers";

const targetElement = document.getElementById("myElement");

const cleanup = resizeObserver(targetElement, (entry) => {
  console.log("Размер элемента изменился", entry.contentRect);
});

// Для прекращения наблюдения
cleanup();
```

## Справочник API

### `intersectionObserver`

```ts
function intersectionObserver<T extends Element>(
  target: T | null | undefined,
  listener: IntersectionListener,
): () => void;
```

- **target**: `T | null | undefined` - Элемент для наблюдения.
- **listener**: `(entry: IntersectionObserverEntry) => void` - Функция обратного
  вызова, которая выполняется при пересечении целевого элемента.

### `resizeObserver`

```ts
function resizeObserver<T extends Element>(
  target: T | null | undefined,
  listener: ResizeListener,
): () => void;
```

- **target**: `T | null | undefined` - Элемент для наблюдения.
- **listener**: `(entry: ResizeObserverEntry) => void` - Функция обратного
  вызова, которая выполняется при изменении размера целевого элемента.

## Вклад

Вклады приветствуются! Пожалуйста, откройте issue или отправьте pull request на
GitHub.

## Благодарности

Эта библиотека вдохновлена нативными API `IntersectionObserver` и
`ResizeObserver` и направлена на предоставление более простого интерфейса для
общих случаев использования.

---

Не стесняйтесь обращаться, если у вас есть вопросы или нужна дополнительная
помощь. Удачного кодирования!
