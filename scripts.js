'use strict';

let money = +prompt('Ваш месячный доход?', 30000),
  income = 'фриланс, консультации, кураторство',
  addExpenses = prompt(
    'Перечислите возможные расходы за рассчитываемый период через запятую',
    'телефон, интернет, коммуналка, кино'
  ),
  deposit = confirm('У вас есть депозит в банке'),
  mission = 50000,
  period = 2,
  expenses1 = prompt('Введите обязательную статью расходов', 'транспорт'),
  amount1 = +prompt('Во сколько это обойдется', 1000),
  expenses2 = prompt('Введите обязательную статью расходов', 'доставка'),
  amount2 = +prompt('Во сколько это обойдется', 2000),
  budgetMonth = money - amount1 - amount2,
  expenseElems = addExpenses.toLowerCase().split(', '),
  budgetDay = budgetMonth / 30;

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay < 600) {
  console.log('К сожалению у вас низкий уровень дохода');
} else {
  console.log('Что то пошло не так');
}

console.log('typeof money:', typeof money);
console.log('typeof income:', typeof income);
console.log('typeof deposit:', typeof deposit);
console.log('addExpenses.length:', addExpenses.length);
console.log('Период равен ' + period + ' месяцев(-а)');
console.log(`Цель заработать ${mission} рублей`);
console.log('Статьи расходов: ', expenseElems);
console.log('Бюджет на день: ', Math.floor(budgetDay));
console.log('Бюджет на месяц: ', budgetMonth);
console.log('Цель будет достигнута за ', Math.ceil(mission / budgetMonth), ' месяцев (-а)');
