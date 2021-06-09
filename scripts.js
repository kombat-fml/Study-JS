'use strict';

const startBtn = document.getElementById('start'),
  incomeAdd = document.getElementsByTagName('button')[0],
  expensesAdd = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
  salaryAmount = document.querySelector('.salary-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value');
let expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items'),
  periodAmount = document.querySelector('.period-amount'),
  listenedInputsName = document.querySelectorAll('input[placeholder="Наименование"]'),
  listenedInputsSum = document.querySelectorAll('input[placeholder="Сумма"]');

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getAddExpenses();

    appData.getIncome();
    appData.getIncomeMonth();
    appData.getAddIncome();

    appData.getBudget();

    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcSavedMoney();
    periodSelect.addEventListener('input', function () {
      incomePeriodValue.value = appData.calcSavedMoney();
    });
  },
  replaceDigit: function () {
    this.value = this.value.replace(/[^а-яА-ЯёЁ ,.?!]/, '');
  },
  replaceLetter: function () {
    this.value = this.value.replace(/\D/, '');
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.children[0].value = '';
    cloneExpensesItem.children[0].addEventListener('input', appData.replaceDigit);
    cloneExpensesItem.children[1].value = '';
    cloneExpensesItem.children[1].addEventListener('input', appData.replaceLetter);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.children[0].value = '';
    cloneIncomeItem.children[0].addEventListener('input', appData.replaceDigit);
    cloneIncomeItem.children[1].value = '';
    cloneIncomeItem.children[1].addEventListener('input', appData.replaceLetter);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomeAdd.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value.trim();
      let cashExpenses = item.querySelector('.expenses-amount').value.trim();
      if (!isNumber(itemExpenses) && itemExpenses !== '' && isNumber(cashExpenses) && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value.trim();
      let cashIncome = item.querySelector('.income-amount').value.trim();
      if (!isNumber(itemIncome) && itemIncome !== '' && isNumber(cashIncome) && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      }
    });
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.toLowerCase().split(',');
    addExpenses.forEach(function (item, i, arr) {
      item = item.trim();
      if (item !== '' && !isNumber(item)) {
        appData.addExpenses.push(item[0].toUpperCase() + item.slice(1));
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '' && !isNumber(item)) {
        appData.addIncome.push(itemValue[0].toUpperCase() + itemValue.slice(1));
      }
    });
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getIncomeMonth: function () {
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    return appData.budgetMonth * periodSelect.value;
  },
};

const returnToUpperArray = function (arr) {
  let copyArr = [];
  arr.forEach(function (item, i, array) {
    let preparedString = item[0].toUpperCase() + item.slice(1);
    copyArr.push(preparedString);
  });
  return copyArr;
};

const enablingStart = function () {
  if (isNumber(salaryAmount.value) && salaryAmount.value !== '' && salaryAmount.value !== null) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = true;
  }
};

listenedInputsName.forEach(function (item) {
  item.addEventListener('input', appData.replaceDigit);
});
listenedInputsSum.forEach(function (item) {
  item.addEventListener('input', appData.replaceLetter);
});

enablingStart();
salaryAmount.addEventListener('input', enablingStart);

startBtn.addEventListener('click', appData.start);

expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);

periodAmount.textContent = periodSelect.value;
periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value;
});
