'use strict';
const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  date = new Date();

week.forEach(function (item, i) {
  if (i !== date.getDay() - 1) {
    if (i === 5 || i === 6) {
      document.body.insertAdjacentHTML('beforeend', '<p><i>' + item + '<i></p>');
    } else {
      document.body.insertAdjacentHTML('beforeend', '<p>' + item + '</p>');
    }
  } else {
    document.body.insertAdjacentHTML('beforeend', '<p><b>' + item + '</b></p>');
  }
});
