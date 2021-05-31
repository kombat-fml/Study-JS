const lang = 'ru';
const daysRu = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];
const daysEng = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const days = [
  'ru',
  [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ],
  'en',
  [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
];
const daysObj = {
  ru: [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ],
  en: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
};

// вариант через If
if (lang === 'ru') {
  console.log(daysRu);
} else {
  console.log(daysEng);
}

// варинат через switch-case
switch (lang) {
  case 'ru':
    console.log(daysRu);
    break;
  case 'en':
    console.log(daysEng);
    break;
  default:
    console.log('Неизвестное значение lang');
}

//вариант через многомерный массив
console.log(days[days.indexOf(lang) + 1]);

// вариант через объект
console.log(daysObj[lang]);

// Задание №2
const namePerson = 'Артемий';

console.log(
  namePerson === 'Артем'
    ? 'директор'
    : namePerson === 'Максим'
    ? 'преподаватель'
    : 'студент'
);
