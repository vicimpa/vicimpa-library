# Документация по @vicimpa/proto

## Обзор

Библиотека `@vicimpa/proto` предоставляет гибкий и эффективный способ
сериализации и десериализации данных с использованием пользовательского
протокола. Она поддерживает примитивные типы, пользовательские типы и сложные
вложенные структуры. Библиотека построена вокруг библиотеки
`@vicimpa/DataBuffer`, который обрабатывает низкоуровневое чтение и запись
данных.

## Установка

Для установки библиотеки используйте npm или yarn:

```bash
npm install @vicimpa/proto
```

или

```bash
yarn add @vicimpa/proto
```

## Использование

### Импорт библиотеки

```ts
import { DataBuffer } from "@vicimpa/data-buffer";
import { makeCustomType, makeEnum, Proto } from "@vicimpa/proto";
```

### Примитивные типы

Библиотека поддерживает следующие примитивные типы:

- `boolean`
- `int8`
- `int16`
- `int32`
- `uint8`
- `uint16`
- `uint32`
- `float32`
- `float64`
- `bigint64`
- `biguint64`
- `string`

### Пользовательские типы

Вы можете создавать пользовательские типы с помощью функции `makeCustomType`.
Пользовательский тип определяется двумя функциями: одна для сериализации данных
(`from`), другая для десериализации данных (`to`).

```ts
const customType = makeCustomType(
  (db, value) => {
    // Сериализация значения в DataBuffer
  },
  (db) => {
    // Десериализация значения из DataBuffer
    return value;
  },
);
```

### Перечисления (Enums)

Перечисления можно создавать с помощью функции `makeEnum`. Эта функция принимает
стандартный объект перечисления и возвращает пользовательский тип для этого
перечисления.

```ts
enum MyEnum {
  A = 1,
  B = 2,
  C = 3,
}

const myEnumType = makeEnum(MyEnum);
```

### Класс Proto

Класс `Proto` является ядром библиотеки. Он обрабатывает сериализацию и
десериализацию сложных структур.

#### Конструктор

Конструктор принимает параметр, который определяет структуру данных.

```ts
const proto = new Proto({
  field1: "int32",
  field2: "string",
  field3: [myEnumType],
});
```

#### Методы

- `from(value: TProtoValue<T>, param?: TProtoParam, db?: DataBuffer): ArrayBuffer`
  - Сериализует заданное значение в `ArrayBuffer`.

- `to(buffer?: ArrayBuffer, param?: TProtoParam, db?: DataBuffer): TProtoValue<T>`
  - Десериализует заданный `ArrayBuffer` в исходное значение.

### Пример

```ts
import { DataBuffer, makeCustomType, makeEnum, Proto } from "@vicimpa/proto";

// Определение пользовательского типа
const customType = makeCustomType(
  (db, value) => {
    db.writeuint32(value.id);
    db.writestring(value.name);
  },
  (db) => {
    return {
      id: db.readuint32(),
      name: db.readstring(),
    };
  },
);

// Определение перечисления
enum MyEnum {
  A = 1,
  B = 2,
  C = 3,
}

const myEnumType = makeEnum(MyEnum);

// Определение структуры
const proto = new Proto({
  field1: "int32",
  field2: "string",
  field3: [myEnumType],
  field4: customType,
});

// Сериализация данных
const data = {
  field1: 42,
  field2: "Hello, world!",
  field3: [MyEnum.A, MyEnum.B],
  field4: { id: 1, name: "Custom" },
};

const buffer = proto.from(data);

// Десериализация данных
const deserializedData = proto.to(buffer);

console.log(deserializedData);
```

## Справочник API

### Типы

#### `PRIMITIVE_TYPES`

Объединенный тип, представляющий все поддерживаемые примитивные типы.

#### `TPrimitiveValue<T extends PRIMITIVE_TYPES>`

Тип, который отображает примитивный тип на соответствующий тип значения.

#### `TCustomType<T>`

Тип, представляющий пользовательский тип с методами `from` и `to`.

#### `TProtoType`

Объединенный тип, представляющий все поддерживаемые типы, включая примитивные
типы и пользовательские типы.

#### `TProtoParam`

Объединенный тип, представляющий все возможные типы параметров, включая
вложенные структуры.

#### `TProtoObject`

Тип, представляющий объект с ключами, отображенными на значения типа
`TProtoParam`.

#### `TProtoOut<T extends TCustomType<any>>`

Тип, который извлекает выходной тип пользовательского типа.

#### `TProtoValue<T extends TProtoParam>`

Тип, который отображает `TProtoParam` на соответствующий тип значения.

### Функции

#### `makeCustomType<T>(from: TCustomType<T>[typeof FROM_SYMBOL], to: TCustomType<T>[typeof TO_SYMBOL]): TCustomType<T>`

Создает пользовательский тип с заданными методами `from` и `to`.

#### `makeEnum<T extends StandardEnum<unknown>>(_type: T): TCustomType<T[keyof T]>`

Создает пользовательский тип для заданного перечисления.

### Классы

#### `Proto<T extends TProtoParam>`

Основной класс для сериализации и десериализации данных.

- `constructor(param: T)`
  - Создает новый экземпляр `Proto` с заданной структурой параметров.

- `from(value: TProtoValue<T>, param?: TProtoParam, db?: DataBuffer): ArrayBuffer`
  - Сериализует заданное значение в `ArrayBuffer`.

- `to(buffer?: ArrayBuffer, param?: TProtoParam, db?: DataBuffer): TProtoValue<T>`
  - Десериализует заданный `ArrayBuffer` в исходное значение.

## Заключение

Библиотека `@vicimpa/proto` предоставляет мощный и гибкий способ обработки
сериализации и десериализации сложных структур данных. Поддерживая примитивные
типы, пользовательские типы и перечисления, она позволяет определять и работать
с широким спектром форматов данных.
