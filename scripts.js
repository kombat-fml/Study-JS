'use strict';

let money,
  income = 'фриланс, консультации, кураторство',
  addExpenses = prompt(
    'Перечислите возможные расходы за рассчитываемый период через запятую',
    'телефон, интернет, коммуналка, кино'
  ),
  deposit = confirm('У вас есть депозит в банке'),
  mission = 50000,
  period = 2,
  expenses = [],
  expensesAmount,
  budgetDay,
  accumulatedMonth;

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

const showTypeOf = function (data) {
  console.log(data, typeof data);
};
function getExpensesMonth() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    let amount;
    expenses[i] = prompt('Введите обязательную статью расходов');
    do {
      amount = prompt('Сколько это будет стоить?');
    } while (!isNumber(amount));
    sum += +amount;
  }
  return sum;
}
function getAccumulatedMonth(money, amount) {
  return money - amount;
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
start();
expensesAmount = getExpensesMonth();
accumulatedMonth = getAccumulatedMonth(money, expensesAmount);
budgetDay = accumulatedMonth / 30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы за месяц: ', expensesAmount);
console.log('Статьи расходов: ', addExpenses.toLowerCase().split(', '));
console.log('Обязательные расходы ', expenses);
console.log(
  getTargetMonth(mission, accumulatedMonth) > 0
    ? `Цель будет достигнута за ${getTargetMonth(mission, accumulatedMonth)} месяцев (-а)`
    : 'Цель не будет достигнута'
);
console.log('Бюджет на день: ', Math.floor(budgetDay));
console.log(getStatusIncome(budgetDay));
