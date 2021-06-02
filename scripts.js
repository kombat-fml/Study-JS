'use strict';

const arr = ['12333', '2664364', '3332', '44332', '5454', '67373', '799320'];
let primeArr = [];

// функция нахождения чисел, начинающихся с 2 или 4
const filterArray = function (arr, callback) {
  const outputArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === '2' || arr[i][0] === '4') {
      outputArr.push(arr[i]);
    }
  }
  callback(outputArr);
};

// функция формирования массива чисел от 1 до n
const collectArray = function (n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i + 1);
  }
  return arr;
};

// функция "исключения" составных чисел из массива
const removeСompositeNumbers = function (arr, number) {
  for (let i = 1; i <= Math.floor(arr.length / number); i++) {
    arr[i * number - 1] = 1;
  }
  return arr;
};

// функция поиска простых чисел
const findPrimeNumbers = function (arr, callback) {
  const outputArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 2) {
      outputArr.push(arr[i]);
      removeСompositeNumbers(arr, i + 1);
    }
  }
  callback(outputArr);
};

filterArray(arr, function (arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
});

primeArr = collectArray(100);
findPrimeNumbers(primeArr, function (arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(`Простое число ${arr[i]}. Делители этого числа 1 и ${arr[i]}`);
  }
});
