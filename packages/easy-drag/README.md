### Установка

Установите библиотеку с помощью npm:

```sh
npm install @vicimpa/easy-drag
```

### Импорт

Импортируйте необходимые функции и типы:

```ts
import {
  makeDrag,
  TDragEvent,
  TDragMove,
  TDragStart,
  TDragStop,
} from "@vicimpa/easy-drag";
import { Vec2 } from "@vicimpa/lib-vec2";
import { windowEvents } from "@vicimpa/events";
```

### Типы

- **TDragEvent**: Описывает событие перетаскивания.
- **TDragStop**: Функция, вызываемая при остановке перетаскивания.
- **TDragMove**: Функция, вызываемая при перемещении элемента. Может вернуть
  функцию `TDragStop`.
- **TDragStart**: Функция, вызываемая при начале перетаскивания. Может вернуть
  функцию `TDragMove`.

### Функция `makeDrag`

Создает обработчик для событий перетаскивания.

```ts
const dragHandler = makeDrag(
  (e, ...meta) => {
    console.log("Drag started at:", e.start);
    return (e, ...meta) => {
      console.log("Dragging at:", e.current);
      return (e, ...meta) => {
        console.log("Drag stopped at:", e.current);
      };
    };
  },
);
```

### Пример использования

```ts
document.getElementById("draggable").addEventListener("mousedown", dragHandler);
```

### Параметры функции `makeDrag`

- `dragStart: TDragStart<T>` — функция, вызываемая при начале перетаскивания.
- `btn: number` — кнопка мыши, которая инициирует перетаскивание (по умолчанию
  `0` — левая кнопка).
- `fromOffset: boolean` — использовать ли смещение элемента относительно окна
  (по умолчанию `false`).

### Заключение

Библиотека `@vicimpa/easy-drag` предоставляет простой и гибкий способ реализации
функционала перетаскивания элементов на веб-странице. Используя предоставленные
типы и функции, вы можете легко настроить обработку событий перетаскивания в
вашем приложении.
