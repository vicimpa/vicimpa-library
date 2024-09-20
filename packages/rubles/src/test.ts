import { counterWord } from "./lib/counterWord";
import { firstUpper } from "./lib/firstUpper";
import { format } from "./lib/format";
import { joinWord } from "./lib/joinWord";
import { numberFormat } from "./lib/numberFormat";
import { numbersInWords } from "./lib/numbersInWords";
import { parseNumber } from "./lib/parseNumber";
import { testFunction } from "./lib/testFunction";


testFunction(format, [
  [[0,],],
  [[10.12,],],
  [['1_234.54',],],
  [['1 421 234.43',],],
  [['41-214.94',],],
  [[123.12, '$input'],],
  [[123.12, '$summ'],],
  [[123.12, '$summString'],],
  [[123.12, '$summCurrency'],],
  [[123.12, '$penny'],],
  [[123.12, '$pennyString'],],
  [[123.12, '$pennyCurrency'],],
  [[123.12, '$SummString'],],
  [[123.12, '$SummCurrency'],],
  [[123.12, '$PennyString'],],
  [[123.12, '$PennyCurrency'],],
]);

testFunction(numberFormat, [
  [[1000],],
  [[4123.12, '-'],],
  [[1321.123, '/', 2],],
  [[135321.833, '_', 2, ','],]
]);

testFunction(joinWord, [
  [[['пар', 'ней', 'ень', 'ня'], 0],],
  [[['пар', 'ней', 'ень', 'ня'], 1],],
  [[['пар', 'ней', 'ень', 'ня'], 2],]
]);

testFunction(counterWord, [
  [[['пар', 'ней', 'ень', 'ня'], 0],],
  [[['пар', 'ней', 'ень', 'ня'], 1],],
  [[['пар', 'ней', 'ень', 'ня'], 2],],
  [[['пар', 'ней', 'ень', 'ня'], 4],],
  [[['пар', 'ней', 'ень', 'ня'], 6],],
  [[['пар', 'ней', 'ень', 'ня'], 10],],
  [[['пар', 'ней', 'ень', 'ня'], 12],],
  [[['пар', 'ней', 'ень', 'ня'], 11],],
  [[['пар', 'ней', 'ень', 'ня'], 21],],
  [[['пар', 'ней', 'ень', 'ня'], 32],],
  [[['пар', 'ней', 'ень', 'ня'], 101],]
]);

testFunction(parseNumber, [
  [[1000],],
  [[0.123],],
  [['123.12'],],
  [['1 520 . 34'],],
  [['1_432_123'],],
]);

testFunction(numbersInWords, [
  [[0,],],
  [[0, false, true],],
  [[10.12,],],
  [['1_234.54',],],
  [['1 421 234.43',],],
  [['41-214.94',],],
  [[1],],
  [[2],],
  [[1, true],],
  [[2, true],],
  [['15213.28', false, true],],
  [['12351.23', true, true],],
]);

testFunction(firstUpper, [
  [['привет'],],
  [['мой'],],
  [['агА'],]
]);