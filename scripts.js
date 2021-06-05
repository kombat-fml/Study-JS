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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    if (confirm('Есть ли у вас дополнительный заработок?')) {
      let itemIncome, cashIncome;
      do {
        itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Консультации').trim();
      } while (isNumber(itemIncome));
      do {
        cashIncome = prompt('Сколько на этом зарабатываете?', 5000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = +cashIncome;
    }

    let addExpenses = prompt(
      'Перечислите возможные расходы за рассчитываемый период через запятую',
      'телефон, интернет, кино'
    );
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.addExpenses.forEach(function (item, i, arr) {
      arr[i] = item.trim();
    });
    appData.deposit = confirm('У вас есть депозит в банке');
    // цикл обязательных расходов, записывется как объект
    for (let i = 0; i < 2; i++) {
      let expenses, amount;
      do {
        expenses = prompt('Введите обязательную статью расходов', 'Коммуналка').trim();
      } while (isNumber(expenses));
      do {
        amount = prompt('Сколько это будет стоить?', 3000);
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент депозита?', 10);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};

const start = function () {
  do {
    money = prompt('Ваш месячный доход?', 30000);
  } while (!isNumber(money) || money === '' || money === null);
  appData.budget = +money;
};
const returnToUpperArray = function (arr) {
  let copyArr = [];
  arr.forEach(function (item, i, array) {
    let preparedString = item[0].toUpperCase() + item.slice(1);
    copyArr.push(preparedString);
  });
  return copyArr;
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
console.log(returnToUpperArray(appData.addExpenses).join(', '));
