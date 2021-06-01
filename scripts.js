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
  budgetDay,
  accumulatedMonth;

const showTypeOf = function (data) {
  console.log(data, typeof data);
};
function getExpensesMonth(amount1, amount2) {
  return amount1 + amount2;
}
function getAccumulatedMonth(money, expenses) {
  return money - expenses;
}
function getTargetMonth(mission, budgetMonth) {
  return Math.ceil(mission / budgetMonth);
}
const getStatusIncome = function (budget) {
  if (budget >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (budget >= 600 && budget < 1200) {
    return 'У вас средний уровень дохода';
  } else if (budget >= 0 && budget < 600) {
    return 'К сожалению у вас низкий уровень дохода';
  } else {
    return 'Что то пошло не так';
  }
};

accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));
budgetDay = accumulatedMonth / 30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы за месяц: ', getExpensesMonth(amount1, amount2));
console.log('Статьи расходов: ', addExpenses.toLowerCase().split(', '));
console.log('Цель будет достигнута за ', getTargetMonth(mission, accumulatedMonth), ' месяцев (-а)');
console.log('Бюджет на день: ', Math.floor(budgetDay));
console.log(getStatusIncome(budgetDay));
