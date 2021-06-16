'use strict';
window.addEventListener('DOMContentLoaded', () => {
  const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    date = new Date(),
    // date = new Date('30 december 2021 11:43:03'),
    day = date.getDay(),
    string = document.createElement('p');
  function formatNumber(n) {
    return Math.floor(n / 10) === 0 ? '0' + n : n;
  }
  function timeOfDay(hours) {
    switch (true) {
      case hours >= 6 && hours < 11:
        return 'Доброе утро';
      case hours >= 11 && hours < 16:
        return 'Добрый день';
      case hours >= 16 && hours < 21:
        return 'Добрый вечер';
      default:
        return 'Добрая ночь';
    }
  }
  function endingDay(n) {
    const m = n % 100;
    switch (true) {
      case m >= 5 && m <= 20:
        return 'дней';
      case m % 10 === 1:
        return 'день';
      case m % 10 >= 2 && m % 10 <= 4:
        return 'дня';
      default:
        return 'дней';
    }
  }
  function getTimeRemaining(date) {
    const newYear = new Date(date.getFullYear() + 1, 0, 1),
      dayRemaining = Math.floor((newYear - date) / 1000 / 60 / 60 / 24);
    return dayRemaining + ' ' + endingDay(dayRemaining);
  }
  function timeNow(date) {
    const hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
    return `
      ${formatNumber(Math.floor(hours % 13) + Math.floor(hours / 13))}:${formatNumber(minutes)}:${formatNumber(seconds)}
      ${Math.floor(hours / 13) === 0 ? 'AM' : 'PM'}`;
  }

  string.innerHTML = `${timeOfDay(date.getHours())} <br>
  Сегодня: ${week[day]} <br>
  Текущее время: ${timeNow(date)} <br>
  До Нового года осталось: ${getTimeRemaining(date)}`;
  document.body.append(string);
});
