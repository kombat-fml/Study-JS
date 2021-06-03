'use strict';
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const startGame = function () {
  const currentNumber = Math.ceil(Math.random() * 100);
  console.log(currentNumber);
  let countAttempts = 10;

  function askUser(msg) {
    let userString = prompt(msg);
    if (countAttempts <= 1) {
      if (confirm('Попытки закончились, хотите сыграть еще?')) {
        return startGame();
      } else {
        return 'Спасибо за игру!';
      }
    } else if (userString === null) {
      return 'Игра окончена';
    } else if (userString === '' || !isNumber(userString)) {
      return askUser('Введи число!');
    } else if (+userString > currentNumber) {
      countAttempts--;
      return askUser(`Загаданное число меньше, осталось попыток ${countAttempts}`);
    } else if (+userString < currentNumber) {
      countAttempts--;
      return askUser(`Загаданное число больше, осталось попыток ${countAttempts}`);
    } else if (confirm('Поздравляю, Вы угадали!!!! Хотели бы сыграть еще?')) {
      return startGame();
    } else {
      return 'Спасибо за игру!';
    }
  }
  return askUser('Угадай число от 1 до 100');
};

alert(startGame());
