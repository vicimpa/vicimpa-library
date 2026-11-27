# @vicimpa/rubles

Библиотека для форматирования денежных сумм в рублях и копейках, перевода чисел в слова и склонения денежных единиц на русском языке. Поддерживает отрицательные суммы, настраиваемое округление, ESM и CommonJS. Работает в браузере и Node.js.

## Установка

```bash
npm install @vicimpa/rubles
```

## Быстрый старт

```ts
import { format } from '@vicimpa/rubles';

format(10.12);       // "десять рублей двенадцать копеек"
format('1_234.54'); // "одна тысяча двести тридцать четыре рубля пятьдесят четыре копейки"
format(1234.5);     // "одна тысяча двести тридцать четыре рубля пятьдесят копеек"
format(-10.12);     // "минус десять рублей двенадцать копеек"
```

Для CommonJS:

```js
const { format } = require('@vicimpa/rubles');
```

## Форматирование суммы

```ts
format(
  input: number | string,
  template?: string,
  rounding?: 'truncate' | 'round',
): string
```

По умолчанию используется шаблон `$summString $summCurrency $pennyString $pennyCurrency` и режим `truncate`.

В строках можно группировать разряды пробелами, табуляцией, подчёркиваниями (`_`) и дефисами (`-`). Дробную часть можно отделять точкой или запятой. Поддерживаются ведущие `+` и `-`, а также экспоненциальная запись:

```ts
format('1 421 234.43'); // "один миллион четыреста двадцать одна тысяча двести тридцать четыре рубля сорок три копейки"
format('41-214,94');    // "сорок одна тысяча двести четырнадцать рублей девяносто четыре копейки"
format('1.23e2');       // "сто двадцать три рубля ноль копеек"
```

Один знак дробной части обозначает десятые доли рубля: `0.5` — это 50 копеек. По умолчанию дополнительные знаки после второго отбрасываются без округления. В режиме `round` выполняется округление до копейки по первой отбрасываемой цифре:

```ts
format('1.239');                    // "один рубль двадцать три копейки"
format('1.239', undefined, 'round'); // "один рубль двадцать четыре копейки"
format('1.999', undefined, 'round'); // "два рубля ноль копеек"
```

`NaN`, бесконечность, пустые и некорректные строки отклоняются с `TypeError`.

### Переменные шаблона

Примеры ниже используют `format('1_234.50', template)`.

| Переменная | Результат |
| --- | --- |
| `$input` | `1 234.50` |
| `$summ` | `1 234` |
| `$summString` | `одна тысяча двести тридцать четыре` |
| `$summCurrency` | `рубля` |
| `$penny` | `50` |
| `$pennyString` | `пятьдесят` |
| `$pennyCurrency` | `копеек` |
| `$SummString` | `Одна тысяча двести тридцать четыре` |
| `$SummCurrency` | `Рубля` |
| `$PennyString` | `Пятьдесят` |
| `$PennyCurrency` | `Копеек` |

Переменные можно сочетать с произвольным текстом:

```ts
format(1001.01, '$SummString $summCurrency, $penny $pennyCurrency');
// "Одна тысяча один рубль, 01 копейка"
```

Неизвестные переменные остаются в результате без изменений.

## Дополнительные функции

### `numberFormat`

```ts
numberFormat(
  input: number | string,
  sep?: string,
  precision?: number,
  dot?: string,
  rounding?: 'truncate' | 'round',
): string
```

Разделяет целую часть на группы по три цифры. По умолчанию разделитель групп — пробел, точность — два знака, десятичный разделитель — точка. При обрезании дробная часть не дополняется нулями.

```ts
import { numberFormat } from '@vicimpa/rubles';

numberFormat(1000);                              // "1 000"
numberFormat(4123.12, '-');                      // "4-123.12"
numberFormat(1321.123, '/', 2);                  // "1/321.12"
numberFormat(135321.833, '_', 2, ',');           // "135_321,83"
numberFormat(-1234.5);                           // "-1 234.5"
numberFormat(1.005, ' ', 2, '.', 'round');       // "1.01"
numberFormat('1.999', ' ', 2, '.', 'round');     // "2.00"
```

### `numbersInWords`

```ts
numbersInWords(input: number | string, feminine?: boolean, upper?: boolean): string
```

Переводит в слова только целую часть, сохраняя знак отрицательного числа. Аргумент `feminine` включает женские формы `одна` и `две` в последнем разряде, а `upper` делает первую букву заглавной.

```ts
import { numbersInWords } from '@vicimpa/rubles';

numbersInWords(10.12);                        // "десять"
numbersInWords('1_234.54');                   // "одна тысяча двести тридцать четыре"
numbersInWords(2, true);                      // "две"
numbersInWords(-123);                         // "минус сто двадцать три"
numbersInWords('15_213.28', false, true);     // "Пятнадцать тысяч двести тринадцать"
```

### `parseNumber`

```ts
parseNumber(input: number | string): [integer: string, fraction?: string]
```

Нормализует число, удаляет поддерживаемые разделители разрядов, раскрывает экспоненциальную запись и разделяет целую и дробную части. Знак отрицательного числа сохраняется в целой части.

```ts
parseNumber(1000);         // ["1000"]
parseNumber(0.123);        // ["0", "123"]
parseNumber('123.12');     // ["123", "12"]
parseNumber('1 520 . 34'); // ["1520", "34"]
parseNumber('-10.12');     // ["-10", "12"]
parseNumber('1e-7');       // ["0", "0000001"]
```

### `counterWord` и `joinWord`

`counterWord` выбирает форму слова по числу. Массив `WordForms` содержит корень и три окончания: для форм `5`, `1` и `2` соответственно. `joinWord` соединяет корень с окончанием по индексу `0`, `1` или `2`.

```ts
import { counterWord, joinWord, type WordForms } from '@vicimpa/rubles';

const ruble: WordForms = ['рубл', 'ей', 'ь', 'я'];

counterWord(ruble, 0);  // "рублей"
counterWord(ruble, 1);  // "рубль"
counterWord(ruble, 2);  // "рубля"
counterWord(ruble, 21); // "рубль"

joinWord(['пар', 'ней', 'ень', 'ня'] as const, 1); // "парень"
```

### `firstUpper`

Делает первую букву заглавной, а остальные — строчными:

```ts
firstUpper('агА'); // "Ага"
```

## Экспортируемые типы

Из корня пакета доступны `ParsedNumber`, `RoundingMode`, `WordForms` и `WordFormIndex`.

## Разработка

```bash
bun test
yarn typecheck
yarn build
```

## Обратная связь

Сообщения об ошибках и предложения: [GitHub Issues](https://github.com/vicimpa/vicimpa-library/issues).

## Авторы

- [PromiSe####](https://github.com/vicimpa)
- [Алексей Симоненко](https://simonenko.su)

## Лицензия

MIT, см. [license.md](./license.md).
