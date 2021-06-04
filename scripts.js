'use strict';

let money;

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt(
      'Перечислите возможные расходы за рассчитываемый период через запятую',
      'телефон, интернет, коммуналка, кино'
    );
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('У вас есть депозит в банке');
    // цикл обязательных расходов, записывется как объект
    for (let i = 0; i < 2; i++) {
      let expenses, amount;
      expenses = prompt('Введите обязательную статью расходов');
      do {
        amount = prompt('Сколько это будет стоить?', 2000);
      } while (!isNumber(amount));
      appData.expenses[expenses] = +amount;
    }
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return 'У вас средний уровень дохода';
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      return 'К сожалению у вас низкий уровень дохода';
    } else {
      return 'Что то пошло не так';
    }
  },
};

const start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money) || money === '' || money === null);
  appData.budget = +money;
};

start();
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Наша программа влючает в себя данные: ');
for (let key in appData) {
  console.log('Свойство: ', key, '| Значение: ', appData[key]);
}

console.log('Расходы за месяц: ', appData.expensesMonth);
console.log(
  appData.getTargetMonth() > 0
    ? `Цель будет достигнута за ${appData.getTargetMonth()} месяцев (-а)`
    : 'Цель не будет достигнута'
);
console.log(appData.getStatusIncome());
