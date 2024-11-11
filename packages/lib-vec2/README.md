# @vicimpa/lib-vec2

Библиотека `@vicimpa/lib-vec2` предоставляет обширный набор утилит для работы с
2D-векторами. Эта библиотека особенно полезна для графических приложений,
симуляций физики и любых других областей, где требуется математика 2D-векторов.

## Установка

Чтобы использовать библиотеку Vec2, вам нужно импортировать её в ваш TypeScript
проект:

```ts
import { Vec2 } from "@vicimpa/lib-vec2";
```

## Класс Vec2

Класс `Vec2` представляет 2D-вектор и предоставляет различные методы для
операций с векторами.

### Конструктор

Конструктор может принимать различные типы параметров для инициализации вектора:

```ts
const v1 = new Vec2(); // По умолчанию (0, 0)
const v2 = new Vec2(1, 2); // Из координат
const v3 = new Vec2({ x: 3, y: 4 }); // Из объекта
const v4 = new Vec2(v2); // Из другого Vec2
```

### Свойства

- `x: number` - Координата x вектора.
- `y: number` - Координата y вектора.
- `tuple: [number, number]` - Возвращает вектор в виде кортежа.
- `size: { width: number, height: number }` - Возвращает вектор в виде объекта
  размера.
- `point: { x: number, y: number }` - Возвращает вектор в виде объекта точки.

### Методы

#### Основные операции

Эти методы имеют перегрузки, которые позволяют принимать различные типы
параметров:

- `set(x: number, y: number): this`
- `set(vec: Vec2): this`
- `set(obj: { x: number, y: number }): this`

- `plus(x: number, y: number): this`
- `plus(vec: Vec2): this`
- `plus(obj: { x: number, y: number }): this`

- `minus(x: number, y: number): this`
- `minus(vec: Vec2): this`
- `minus(obj: { x: number, y: number }): this`

- `times(x: number, y: number): this`
- `times(vec: Vec2): this`
- `times(obj: { x: number, y: number }): this`

- `div(x: number, y: number): this`
- `div(vec: Vec2): this`
- `div(obj: { x: number, y: number }): this`

- `rem(x: number, y: number): this`
- `rem(vec: Vec2): this`
- `rem(obj: { x: number, y: number }): this`

#### Утилитарные методы

- `round(): this` - Округляет координаты вектора.
- `ceil(): this` - Приводит координаты вектора к ближайшему большему целому.
- `floor(): this` - Приводит координаты вектора к ближайшему меньшему целому.
- `inverse(): this` - Меняет местами координаты x и y.
- `lerp(to: Vec2, i: number): this` - Линейно интерполирует между этим вектором
  и другим.
- `sign(): this` - Устанавливает координаты вектора в их знаковое значение.
- `abs(): this` - Устанавливает координаты вектора в их абсолютные значения.
- `clone(): Vec2` - Возвращает клон вектора.
- `length(): number` - Возвращает длину вектора.
- `distance(to: Vec2): number` - Возвращает расстояние до другого вектора.
- `normalize(): this` - Нормализует вектор.
- `min(): number` - Возвращает минимальную координату.
- `max(): number` - Возвращает максимальную координату.
- `toObject(o: { x: number, y: number }): this` - Копирует координаты вектора в
  объект.
- `toRect(x: number, y: number): DOMRect` - Возвращает DOMRect от вектора до
  заданных координат.
- `dotProduct(to: Vec2): number` - Возвращает результат скалярного произведения векторов
- `projectScalar(to: Vec2): number` - Возвращает результат проецирования векторов

### Статические методы

- `fromAngle(d: number, vec = new this()): Vec2` - Создает вектор из угла.
- `fromPoint(point: { x: number, y: number }, vec = new this()): Vec2` - Создает
  вектор из точки.
- `fromSize(size: { width: number, height: number }, vec = new this()): Vec2` -
  Создает вектор из размера.
- `fromDeltaXY(delta: { deltaX: number, deltaY: number }, vec = new this()): Vec2` -
  Создает вектор из значений дельты.
- `fromPageXY(page: { pageX: number, pageY: number }, vec = new this()): Vec2` -
  Создает вектор из координат страницы.
- `fromOffsetXY(offset: { offsetX: number, offsetY: number }, vec = new this()): Vec2` -
  Создает вектор из смещенных координат.
- `fromOffsetSize(elem: HTMLElement, vec = new this()): Vec2` - Создает вектор
  из размера элемента.
- `fromSvgLength(x: SVGAnimatedLength, y: SVGAnimatedLength, vec = new this()): Vec2` -
  Создает вектор из длин SVG.

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

Библиотека также предоставляет патчи для `CanvasRenderingContext2D` и `Path2D`,
чтобы они принимали экземпляры Vec2 напрямую.

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
