Выберите язык: [Английский](README.md) | **`Русский`**

---

# @vicimpa/lib-vec2

`@vicimpa/lib-vec2` — это библиотека для работы с 2D-векторами в TypeScript. Она предоставляет различные утилиты и классы для выполнения операций с векторами, таких как сложение, вычитание, нормализация и многое другое. Библиотека поддерживает как изменяемые, так и неизменяемые операции, что делает её подходящей для функционального программирования. Кроме того, она предлагает структуры данных, такие как `Vec2Map` и `Vec2Set`, которые используют векторы в качестве ключей и элементов соответственно.

### Типы

- **Vec2Point**: Представляет точку в 2D-пространстве с координатами x и y.
  ```ts
  type Vec2Point = { x: number; y: number; };
  ```

- **Vec2Tuple**: Представляет кортеж координат x и y.
  ```ts
  type Vec2Tuple = [x: number, y: number];
  ```

- **Vec2Size**: Представляет размер с шириной и высотой.
  ```ts
  type Vec2Size = { width: number, height: number; };
  ```

- **Vec2PageXY**: Представляет координаты страницы с pageX и pageY.
  ```ts
  type Vec2PageXY = { pageX: number, pageY: number; };
  ```

- **Vec2OffsetXY**: Представляет смещенные координаты с offsetX и offsetY.
  ```ts
  type Vec2OffsetXY = { offsetX: number, offsetY: number; };
  ```

- **Vec2DeltaXY**: Представляет дельта-координаты с deltaX и deltaY.
  ```ts
  type Vec2DeltaXY = { deltaX: number, deltaY: number; };
  ```

- **Vec2OffsetSize**: Представляет смещенный размер с offsetWidth и offsetHeight.
  ```ts
  type Vec2OffsetSize = { offsetWidth: number, offsetHeight: number; };
  ```

- **Vec2InnerSize**: Представляет внутренний размер с innerWidth и innerHeight.
  ```ts
  type Vec2InnerSize = { innerWidth: number, innerHeight: number; };
  ```

- **Vec2Args**: Представляет аргументы для операций с векторами, которые могут быть одним числом, `Vec2Point` или двумя числами.
  ```ts
  type Vec2Args = [xy: number] | [xy: Vec2Point] | [x: number, y: number];
  ```

- **Vec2Clamp**: Представляет аргументы для ограничения, которые могут быть двумя или четырьмя числами.
  ```ts
  type Vec2Clamp = [min: Vec2Args[0], max: Vec2Args[0]] | [minX: number, minY: number, maxX: number, maxY: number];
  ```

### Функции

- **vec2**: Фабричная функция для создания экземпляра `Vec2`.
  ```ts
  function vec2(): Vec2;
  function vec2(xy: number | Vec2Point): Vec2;
  function vec2(x: number, y: number): Vec2;
  ```

### Классы

#### Vec2

Представляет 2D-вектор с различными утилитными методами.

- **Свойства**:
  - `x`: Координата X.
  - `y`: Координата Y.

- **Геттеры**:
  - `point`: Возвращает вектор как `Vec2Point`.
  - `tuple`: Возвращает вектор как `Vec2Tuple`.
  - `size`: Возвращает вектор как `Vec2Size`.

- **Методы**:
  - `equal(xy: number | Vec2Point): boolean`: Проверяет, равен ли вектор другому вектору или точке.
  - `set(xy: number | Vec2Point): this`: Устанавливает координаты вектора.
  - `toObject(o: Vec2Point): this`: Копирует координаты вектора в `Vec2Point`.
  - `toObjectSize(o: Vec2Size): this`: Копирует координаты вектора в `Vec2Size`.
  - `toTuple(o: Vec2Tuple): this`: Копирует координаты вектора в `Vec2Tuple`.
  - `clone(): Vec2`: Возвращает новый экземпляр с теми же координатами.
  - `min(): number`: Возвращает минимальное значение из координат x и y.
  - `max(): number`: Возвращает максимальное значение из координат x и y.
  - `angle(): number`: Возвращает угол вектора в радианах.
  - `length(): number`: Возвращает длину вектора.
  - `distance(xy: number | Vec2Point): number`: Вычисляет расстояние до другого вектора или точки.
  - `dot(xy: number | Vec2Point): number`: Вычисляет скалярное произведение с другим вектором или точкой.
  - `scalar(xy: number | Vec2Point): number`: Вычисляет скалярную проекцию на другой вектор или точку.
  - `plus(xy: number | Vec2Point): this`: Добавляет другой вектор или точку.
  - `minus(xy: number | Vec2Point): this`: Вычитает другой вектор или точку.
  - `times(xy: number | Vec2Point): this`: Умножает на другой вектор или точку.
  - `div(xy: number | Vec2Point): this`: Делит на другой вектор или точку.
  - `rem(xy: number | Vec2Point): this`: Вычисляет остаток с другим вектором или точкой.
  - `pow(xy: number | Vec2Point): this`: Возводит в степень другого вектора или точки.
  - `abs(): this`: Применяет абсолютное значение к обеим координатам.
  - `sign(): this`: Применяет функцию знака к обеим координатам.
  - `round(): this`: Округляет обе координаты.
  - `ceil(): this`: Применяет функцию потолка к обеим координатам.
  - `floor(): this`: Применяет функцию пола к обеим координатам.
  - `normalize(): this`: Нормализует вектор.
  - `inverse(): this`: Меняет местами координаты x и y.
  - `clampMin(xy: number | Vec2Point): this`: Ограничивает вектор минимальным значением.
  - `clampMax(xy: number | Vec2Point): this`: Ограничивает вектор максимальным значением.
  - `clamp(...args: Vec2Clamp): this`: Ограничивает вектор между двумя или четырьмя значениями.

- **Методы с префиксом c**:
  - `cplus(xy: number | Vec2Point): Vec2`: Возвращает новый вектор, являющийся результатом сложения другого вектора или точки с текущим вектором.
  - `cminus(xy: number | Vec2Point): Vec2`: Возвращает новый вектор, являющийся результатом вычитания другого вектора или точки из текущего вектора.
  - `ctimes(xy: number | Vec2Point): Vec2`: Возвращает новый вектор, являющийся результатом умножения текущего вектора на другой вектор или точку.
  - `cdiv(xy: number | Vec2Point): Vec2`: Возвращает новый вектор, являющийся результатом деления текущего вектора на другой вектор или точку.
  - `crem(xy: number | Vec2Point): Vec2`: Возвращает новый вектор, являющийся результатом вычисления остатка текущего вектора с другим вектором или точкой.
  - `cpow(xy: number | Vec2Point): Vec2`: Возвращает новый вектор, являющийся результатом возведения текущего вектора в степень другого вектора или точки.
  - `cabs(): Vec2`: Возвращает новый вектор с абсолютными значениями координат текущего вектора.
  - `csign(): Vec2`: Возвращает новый вектор со знаками координат текущего вектора.
  - `cround(): Vec2`: Возвращает новый вектор с округленными значениями координат текущего вектора.
  - `cceil(): Vec2`: Возвращает новый вектор с потолочными значениями координат текущего вектора.
  - `cfloor(): Vec2`: Возвращает новый вектор с полными значениями координат текущего вектора.
  - `cnormalize(): Vec2`: Возвращает новый вектор, являющийся нормализованной версией текущего вектора.
  - `cinverse(): Vec2`: Возвращает новый вектор с поменянными местами координатами x и y.
  - `cclampMin(xy: number | Vec2Point): Vec2`: Возвращает новый вектор, ограниченный минимальным значением, определенным другим вектором или точкой.
  - `cclampMax(xy: number | Vec2Point): Vec2`: Возвращает новый вектор, ограниченный максимальным значением, определенным другим вектором или точкой.
  - `cclamp(...args: Vec2Clamp): Vec2`: Возвращает новый вектор, ограниченный между двумя или четырьмя значениями.

- **Статические методы**:
  - `fromAngle(angle: number, vec = new this()): Vec2`: Создает вектор из угла.
  - `fromRandom(vec = new this()): Vec2`: Создает вектор с случайными координатами.
  - `fromSrandom(vec = new this()): Vec2`: Создает вектор с подписанными случайными координатами.
  - `fromSize(size: Vec2Size, vec = new this()): Vec2`: Создает вектор из размера.
  - `fromDeltaXY(page: Vec2DeltaXY, vec = new this()): Vec2`: Создает вектор из дельта-координат.
  - `fromPageXY(page: Vec2PageXY, vec = new this()): Vec2`: Создает вектор из координат страницы.
  - `fromOffsetXY(offset: Vec2OffsetXY, vec = new this()): Vec2`: Создает вектор из смещенных координат.
  - `fromInnerSize(offsetSize: Vec2InnerSize, vec = new this()): Vec2`: Создает вектор из внутреннего размера.
  - `fromOffsetSize(offsetSize: Vec2OffsetSize, vec = new this()): Vec2`: Создает вектор из смещенного размера.
  - `fromSvgLength(x: SVGAnimatedLength, y: SVGAnimatedLength, vec = new this()): Vec2`: Создает вектор из длин SVG.

#### Vec2Map<T>

Структура, похожая на карту, которая использует `Vec2` в качестве ключей.

- **Методы**:
  - `has(xy: number | Vec2Point): boolean`: Проверяет, находится ли вектор в карте.
  - `get(xy: number | Vec2Point): T | undefined`: Извлекает значение по ключу-вектору.
  - `set(xy: number | Vec2Point, value: T): this`: Устанавливает значение по ключу-вектору.
  - `delete(xy: number | Vec2Point): boolean`: Удаляет значение по ключу-вектору.
  - `clear(): this`: Очищает карту.
  - `forEach(callback: (value: T, key: Vec2) => any): void`: Итерация по карте.

#### Vec2Set

Структура, похожая на множество, которая использует `Vec2` в качестве элементов.

- **Методы**:
  - `has(xy: number | Vec2Point): boolean`: Проверяет, находится ли вектор в множестве.
  - `add(xy: number | Vec2Point): this`: Добавляет вектор в множество.
  - `delete(xy: number | Vec2Point): boolean`: Удаляет вектор из множества.
  - `clear(): this`: Очищает множество.
  - `forEach(callback: (value: Vec2) => any): void`: Итерация по множеству.

### Патч CanvasRenderingContext2D

Библиотека включает патч для `CanvasRenderingContext2D`, позволяющий использовать векторы непосредственно в операциях с canvas. Этот патч расширяет API canvas, чтобы принимать типы `Vec2` в различных методах.

#### Пример использования

```ts
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const vec = new Vec2(50, 50);

// Использование Vec2 с методами canvas
ctx?.moveTo(vec);
ctx?.lineTo(new Vec2(100, 100));
ctx?.stroke();
```

### Примеры кода

#### Создание и манипуляция векторами

```ts
import { vec2, Vec2 } from '@vicimpa/lib-vec2';

// Создание нового вектора
const v1 = vec2(3, 4);

// Клонирование и изменение вектора
const v2 = v1.clone().plus(1, 2);

// Вычисление расстояния между двумя векторами
const distance = v1.distance(v2);

// Нормализация вектора
const normalized = v1.clone().normalize();
```

#### Использование Vec2Map и Vec2Set

```ts
import { Vec2, Vec2Map, Vec2Set } from '@vicimpa/lib-vec2';

// Создание Vec2Map
const map = new Vec2Map<string>();
map.set(new Vec2(1, 2), 'Точка A');
console.log(map.get(new Vec2(1, 2))); // Вывод: 'Точка A'

// Создание Vec2Set
const set = new Vec2Set();
set.add(new Vec2(3, 4));
console.log(set.has(new Vec2(3, 4))); // Вывод: true
```

Эта библиотека предоставляет обширный набор инструментов для работы с 2D-векторами, что делает её подходящей для различных приложений, таких как графика, физические симуляции и многое другое.