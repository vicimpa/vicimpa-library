Обновим описание библиотеки @vicimpa/lib-vec2 с учетом нового файла `index.d.ts`.

# @vicimpa/lib-vec2

Библиотека @vicimpa/lib-vec2 предоставляет обширный набор утилит для работы с 2D-векторами. Эта библиотека особенно полезна для графических приложений, симуляций физики и любых других областей, где требуется математика 2D-векторов.

## Установка

Чтобы использовать библиотеку Vec2, вам нужно импортировать её в ваш TypeScript проект:

```ts
import { Vec2 } from "@vicimpa/lib-vec2";
```

## Класс Vec2

Класс Vec2 представляет 2D-вектор и предоставляет различные методы для операций с векторами.

### Конструктор

Конструктор может принимать различные типы параметров для инициализации вектора:

```ts
const v1 = new Vec2(); // По умолчанию (0, 0)
const v2 = new Vec2(1, 2); // Из координат
const v3 = new Vec2({ x: 3, y: 4 }); // Из объекта
const v4 = new Vec2(v2); // Из другого Vec2
```

Создать новый вектор можно и при помощи функции: vec2

```ts
import { vec2 } from "@vicimpa/lib-vec2";
const v1 = vec2(); // По умолчанию (0, 0)
const v2 = vec2(1, 2); // Из координат
const v3 = vec2({ x: 3, y: 4 }); // Из объекта
const v4 = vec2(v2); // Из другого Vec2
```

### Свойства

- **x**: number - Координата x вектора.
- **y**: number - Координата y вектора.
- **tuple**: [number, number] - Возвращает вектор в виде кортежа.
- **size**: { width: number, height: number } - Возвращает вектор в виде объекта размера.
- **point**: { x: number, y: number } - Возвращает вектор в виде объекта точки.

### Методы

#### Основные операции

Эти методы имеют перегрузки, которые позволяют принимать различные типы параметров:

- **set**(...args: Vec2Args): this
- **plus**(...args: Vec2Args): this
- **minus**(...args: Vec2Args): this
- **times**(...args: Vec2Args): this
- **div**(...args: Vec2Args): this
- **rem**(...args: Vec2Args): this
- **pow**(...args: Vec2Args): this

#### Утилитарные методы

- **round**(): this - Округляет координаты вектора.
- **ceil**(): this - Приводит координаты вектора к ближайшему большему целому.
- **floor**(): this - Приводит координаты вектора к ближайшему меньшему целому.
- **inverse**(): this - Инвертирует координаты вектора.
- **lerp**(to: Vec2, i: number): this - Линейно интерполирует между этим вектором и другим.
- **sign**(): this - Устанавливает координаты вектора в их знаковое значение.
- **abs**(): this - Устанавливает координаты вектора в их абсолютные значения.
- **clone**(): Vec2 - Возвращает клон вектора.
- **length**(): number - Возвращает длину вектора.
- **distance**(...args: Vec2Args): number - Возвращает расстояние до другого вектора.
- **normalize**(): this - Нормализует вектор.
- **min**(): number - Возвращает минимальную координату.
- **max**(): number - Возвращает максимальную координату.
- **toObject**(o: Vec2Point): this - Копирует координаты вектора в объект.
- **toObjectSize**(o: Vec2Size): this - Копирует координаты вектора в объект размера.
- **toRect**(...args: Vec2Args): DOMRect - Возвращает DOMRect от вектора до заданных координат.
- **dotProduct**(to: Vec2): number - Возвращает результат скалярного произведения векторов.
- **projectScalar**(to: Vec2): number - Возвращает результат проецирования векторов.

### Методы с префиксом c

Эти методы создают клон вектора, выполняют операцию над клоном и возвращают новый вектор. Это полезно, когда нужно сохранить исходный вектор неизменным.

- **cplus**(...args: Vec2Args): Vec2
- **cminus**(...args: Vec2Args): Vec2
- **ctimes**(...args: Vec2Args): Vec2
- **cdiv**(...args: Vec2Args): Vec2
- **crem**(...args: Vec2Args): Vec2
- **cpow**(...args: Vec2Args): Vec2
- **cinverse**(): Vec2
- **cnormalize**(): Vec2
- **clerp**(to: Vec2, i: number): Vec2
- **csign**(): Vec2
- **cabs**(): Vec2
- **cround**(): Vec2
- **cceil**(): Vec2
- **cfloor**(): Vec2
- **cclamp**(...args: Vec2Clamp): Vec2
- **cclampMin**(...args: Vec2Args): Vec2
- **cclampMax**(...args: Vec2Args): Vec2

### Статические методы

- **fromRandom**(vec?: Vec2): Vec2
- **fromSrandom**(vec?: Vec2): Vec2
- **fromAngle**(d: number, vec?: Vec2): Vec2
- **fromPoint**(point: Vec2Point, vec?: Vec2): Vec2
- **fromSize**(size: Vec2Size, vec?: Vec2): Vec2
- **fromDeltaXY**(delta: TDeltaXY, vec?: Vec2): Vec2
- **fromPageXY**(page: TPageXY, vec?: Vec2): Vec2
- **fromOffsetXY**(offset: TOffsetXY, vec?: Vec2): Vec2
- **fromOffsetSize**(elem: HTMLElement, vec?: Vec2): Vec2
- **fromSvgLength**(x: SVGAnimatedLength, y: SVGAnimatedLength, vec?: Vec2): Vec2

## Примеры

### Основное использование

```ts
import { Vec2 } from "@vicimpa/lib-vec2";

const v1 = new Vec2(1, 2);
const v2 = new Vec2(3, 4);

v1.plus(1, 1); // v1 теперь (2, 3)
v2.minus(v1); // v2 теперь (1, 1)

console.log(v1.length()); // Выводит длину v1
console.log(v2.distance(v1)); // Выводит расстояние между v2 и v1
```

### Использование с Canvas

Библиотека также предоставляет патчи для CanvasRenderingContext2D и Path2D, чтобы они принимали экземпляры Vec2 напрямую.

```ts
import { Vec2 } from "@vicimpa/lib-vec2";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const start = new Vec2(50, 50);
const end = new Vec2(200, 200);

ctx.moveTo(start);
ctx.lineTo(end);
ctx.stroke();
```

### Продвинутые операции

```ts
import { Vec2 } from "@vicimpa/lib-vec2";

const v1 = new Vec2(1, 2);
const v2 = new Vec2(3, 4);

const v3 = v1.clone().plus(v2); // v3 теперь (4, 6)
const v4 = Vec2.fromAngle(Math.PI / 4); // v4 примерно (0.707, 0.707)

console.log(v3.toString()); // Выводит "4 6"
console.log(v4.toString()); // Выводит "0.707 0.707"
```

Эта библиотека предоставляет мощные инструменты для работы с 2D-векторами, включая поддержку различных типов данных и интеграцию с Canvas API.

## Vec2Map

Класс Vec2Map предоставляет структуру данных, аналогичную стандартной карте (Map), но с использованием объектов Vec2 в качестве ключей. Это полезно, когда вам нужно сопоставить значения с 2D-векторами.

### Свойства
- **size**: number - Возвращает размер коллекции.

### Методы

- **has(...args: Vec2Args): boolean** - Проверяет, существует ли элемент с заданным ключом Vec2.
- **get(...args: Vec2Args): T** - Возвращает значение, связанное с заданным ключом Vec2.
- **set(vec: Vec2Args[0], value: T): this** - Устанавливает значение для заданного ключа Vec2.
- **delete(...args: Vec2Args): boolean** - Удаляет элемент с заданным ключом Vec2.
- **clear(): void** - Очищает все элементы в карте.
- **forEach(callback: (key: Vec2, value: T, self: this) => any): void** - Выполняет указанную функцию один раз для каждого элемента в карте.
- **[Symbol.iterator](): Generator<[key: Vec2, value: T], void, unknown>** - Возвращает итератор для перебора элементов карты.

## Vec2Set

Класс Vec2Set предоставляет структуру данных, аналогичную стандартному множеству (Set), но с использованием объектов Vec2 в качестве элементов. Это полезно для хранения уникальных 2D-векторов.

### Свойства
- **size**: number - Возвращает размер коллекции.

### Методы

- **has(...args: Vec2Args): boolean** - Проверяет, существует ли элемент Vec2 в множестве.
- **add(...args: Vec2Args): this** - Добавляет элемент Vec2 в множество.
- **delete(...args: Vec2Args): boolean** - Удаляет элемент с заданным ключом Vec2.
- **clear(): void** - Очищает все элементы в множестве.
- **forEach(callback: (key: Vec2, self: this) => any): void** - Выполняет указанную функцию один раз для каждого элемента в множестве.
- **[Symbol.iterator](): Generator<Vec2, void, unknown>** - Возвращает итератор для перебора элементов множества.

Эти классы предоставляют удобные способы работы с коллекциями 2D-векторов, обеспечивая уникальность и быстрый доступ к элементам.

### Пример использования Vec2Map

```ts
import { Vec2, Vec2Map } from "@vicimpa/lib-vec2";

// Создаем новую карту
const map = new Vec2Map<number>();

// Создаем векторы
const v1 = new Vec2(1, 2);
const v2 = new Vec2(3, 4);

// Устанавливаем значения для векторов
map.set(v1, 10);
map.set(v2, 20);

// Получаем значения по ключу
console.log(map.get(v1)); // Выводит 10
console.log(map.get(v2)); // Выводит 20

// Проверяем наличие ключа
console.log(map.has(v1)); // Выводит true

// Удаляем элемент
map.delete(v1);
console.log(map.has(v1)); // Выводит false

// Перебираем элементы карты
map.forEach((key, value) => {
  console.log(`Key: ${key.toString()}, Value: ${value}`);
});
```

### Пример использования Vec2Set

```ts
import { Vec2, Vec2Set } from "@vicimpa/lib-vec2";

// Создаем новое множество
const set = new Vec2Set();

// Создаем векторы
const v1 = new Vec2(1, 2);
const v2 = new Vec2(3, 4);

// Добавляем векторы в множество
set.add(v1);
set.add(v2);

// Проверяем наличие вектора
console.log(set.has(v1)); // Выводит true

// Перебираем элементы множества
set.forEach((key) => {
  console.log(`Key: ${key.toString()}`);
});

// Очищаем множество
set.clear();
console.log(set.has(v1)); // Выводит false
```

Эти примеры демонстрируют, как использовать Vec2Map и Vec2Set для работы с коллекциями 2D-векторов, обеспечивая уникальность и быстрый доступ к элементам.