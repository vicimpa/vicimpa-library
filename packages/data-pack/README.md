# @vicimpa/data-pack

`@vicimpa/data-pack` — это мощная библиотека для сериализации и десериализации
данных в JavaScript и TypeScript. Она предоставляет простой и гибкий способ
упаковывать данные в бинарный формат и распаковывать их обратно, основываясь на
заданных схемах. Библиотека особенно полезна для оптимизации хранения и передачи
данных, экономя место за счёт эффективного кодирования повторяющихся структур.

## Основные возможности

- **Строгая типизация**: Использует TypeScript для обеспечения безопасности
  типов на этапе компиляции.
- **Гибкие схемы**: Поддерживает различные типы данных и их комбинации для
  создания сложных структур.
- **Эффективное кодирование**: Оптимизирует размер данных за счёт
  переиспользования и эффективного представления типов.
- **Лёгкая интеграция**: Прост в интеграции с существующими проектами благодаря
  простой и понятной API.

## Установка

```bash
npm install @vicimpa/data-pack
```

## Быстрый старт

### Импорт и инициализация

```ts
import { makeDataPack, t } from "@vicimpa/data-pack";

const pack = makeDataPack(
  t.obj({
    name: t.str(),
    age: t.uint(),
  }),
);
```

### Сериализация данных

```ts
const buffer = pack.write({
  name: "Sample Name",
  age: 32,
});
```

### Десериализация данных

```ts
const unpackedData = pack.read(buffer);
console.log(unpackedData); // { name: 'Sample Name', age: 32 }
```

### Проверка соответствия схеме

```ts
console.log(pack.equal({ name: "No equal", _age: 24 })); // false
console.log(pack.equal({ name: "", age: 123 })); // true
console.log(pack.equal({ name: "", age: 243 })); // true
```

## Подробная документация

### Функция `makeDataPack`

Создаёт сериализатор на основе заданной схемы.

**Синтаксис**

```ts
const pack = makeDataPack(schema);
```

**Параметры**

- `schema`: Схема данных, определяющая структуру и типы данных.

**Возвращает**

Объект `DataPack`, содержащий методы для работы с данными.

### Объект `DataPack`

```ts
type DataPack = {
  write(data: any): ArrayBuffer;
  read(buffer: ArrayBuffer): any;
  equal(data: any): boolean;
};
```

- **write(data)**: Сериализует данные согласно схеме и возвращает `ArrayBuffer`.
- **read(buffer)**: Десериализует `ArrayBuffer` обратно в исходные данные.
- **equal(data)**: Проверяет, соответствует ли объект данным схеме.

### Типы данных (`t`)

Библиотека предоставляет различные типы для определения схем:

- **t.array(schema)**: Массив элементов, соответствующих `schema`.
- **t.bool()**: Логический тип, занимающий 1 бит.
- **t.float(size?)**: Число с плавающей точкой. Поддерживает размеры 32 и 64
  бита (по умолчанию 64).
- **t.int(size?)**: Целое число. Поддерживает размеры 8, 16 и 32 бита (по
  умолчанию 32).
- **t.leb128()**: BigInt с форматом записи LEB128.
- **t.lit(value)**: Литерал. Используется для определения фиксированных значений
  в схемах.
- **t.map(value?)**: Объект произвольной формы с ключами-строками и значениями,
  соответствующими `value` или стандартным типам.
- **t.obj(objSchema)**: Объект с заданной схемой. Идеально подходит для
  известных заранее структур.
- **t.or(...schemas)**: Схема, позволяющая хранить один из нескольких типов
  данных. Порядок важен — выбирается первый подходящий тип.
- **t.str()**: Строковый тип.
- **t.tuple(...schemas)**: Массив фиксированной длины с определённой
  последовательностью типов.
- **t.uint(size?)**: Беззнаковое целое число. Поддерживает размеры 8, 16 и 32
  бита (по умолчанию 32).
- **t.varint()**: Беззнаковое целое число, закодированное по алгоритму varint.
  Используется для переменных размеров и курсоров.

### Принципы работы

`@vicimpa/data-pack` не предназначен для максимальной скорости или минимального
потребления памяти. Основная цель — значительная экономия места при хранении
большого количества однотипных данных.

При инициализации `makeDataPack` принимает схему, которая может создавать или
переиспользовать коллекции других схем. Например, `t.str()` использует общую
строку для хранения символов и коллекцию `varint()` для указателей на позиции
начала и конца строк.

**Процесс сериализации:**

1. **Проверка повторов**: При записи строки проверяется её наличие в общей
   строке. Если строка уже присутствует, записываются курсоры на её позиции.
2. **Структурирование данных**: После записи всех данных формируется очередь
   коллекций, где каждая непустая коллекция записывается с указанием её размера
   и содержимого:
   ```
   size1
   collection1
   size3
   collection2
   ...
   ```

**Процесс десериализации:**

1. **Чтение коллекций**: Исходя из схемы, сначала читаются все коллекции.
2. **Восстановление данных**: Схемы распаковывают данные в том порядке, в
   котором они были записаны.

## Примеры использования

### Пример 1: Сериализация и десериализация простого объекта

```ts
import { makeDataPack, t } from "@vicimpa/data-pack";

const userPack = makeDataPack(
  t.obj({
    username: t.str(),
    isActive: t.bool(),
    roles: t.array(t.str()),
  }),
);

const user = {
  username: "john_doe",
  isActive: true,
  roles: ["admin", "editor"],
};

const buffer = userPack.write(user);
const decodedUser = userPack.read(buffer);

console.log(decodedUser);
// Вывод: { username: 'john_doe', isActive: true, roles: ['admin', 'editor'] }
```

### Пример 2: Использование `t.or` для разных типов данных

```ts
import { makeDataPack, t } from "@vicimpa/data-pack";

const maybeNumberPack = makeDataPack(
  t.or(t.int(), t.str()),
);

const numberBuffer = maybeNumberPack.write(42);
const stringBuffer = maybeNumberPack.write("forty-two");

console.log(maybeNumberPack.read(numberBuffer)); // 42
console.log(maybeNumberPack.read(stringBuffer)); // "forty-two"
```

### Пример 3: Работа с вложенными объектами и массивами

```ts
import { makeDataPack, t } from "@vicimpa/data-pack";

const libraryPack = makeDataPack(
  t.obj({
    name: t.str(),
    books: t.array(
      t.obj({
        title: t.str(),
        author: t.str(),
        year: t.uint(16),
      }),
    ),
  }),
);

const library = {
  name: "City Library",
  books: [
    { title: "1984", author: "George Orwell", year: 1949 },
    { title: "Brave New World", author: "Aldous Huxley", year: 1932 },
  ],
};

const buffer = libraryPack.write(library);
const decodedLibrary = libraryPack.read(buffer);

console.log(decodedLibrary);
// Вывод:
// {
//   name: 'City Library',
//   books: [
//     { title: '1984', author: 'George Orwell', year: 1949 },
//     { title: 'Brave New World', author: 'Aldous Huxley', year: 1932 },
//   ],
// }
```

## Заключение

`@vicimpa/data-pack` является надёжным инструментом для эффективного хранения и
передачи данных с использованием строгих схем. Его гибкость и производительность
делают его отличным выбором для проектов, требующих оптимизации данных без
жертвования типобезопасностью и структурой.
