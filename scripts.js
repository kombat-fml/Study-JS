'use strict';
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const startGame = function () {
  const currentNumber = Math.ceil(Math.random() * 100);
  console.log(currentNumber);
  function askUser(msg) {
    let userString = prompt(msg);
    if (userString === null) {
      return 'Игра окончена';
    } else if (userString === '' || !isNumber(userString)) {
      return askUser('Введи число!');
    } else if (+userString > currentNumber) {
      return askUser('Загаданное число меньше');
    } else if (+userString < currentNumber) {
      return askUser('Загаданное число больше');
    } else {
      return 'Поздравляю, Вы угадали!!!';
    }
  }
  alert(askUser('Угадай число от 1 до 100'));
};

startGame();
