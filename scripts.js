'use strict';
const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  date = new Date();
let htmlString;
week.forEach(function (item, i) {
  htmlString = item;
  if (i === date.getDay() - 1) {
    htmlString = '<b>' + htmlString + '</b>';
  }
  if (i === 5 || i === 6) {
    htmlString = '<i>' + htmlString + '</i>';
  }
  document.body.insertAdjacentHTML('beforeend', `<p>${htmlString}</p>`);
});
