'use strict';

const startBtn = document.getElementById('start'),
  cancelBtn = document.getElementById('cancel'),
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
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();

    this.getIncome();
    this.getIncomeMonth();
    this.getAddIncome();

    this.getBudget();

    this.showResult();
    this.disableCalc();
  },
  disableCalc: function () {
    const dataInputs = document.querySelector('.data').querySelectorAll('input[type="text"]');
    const btnPlus = document.querySelectorAll('.btn_plus');
    btnPlus[0].disabled = true;
    btnPlus[1].disabled = true;
    dataInputs.forEach(function (item) {
      item.disabled = true;
    });
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'Block';
  },
  removeInputs: function () {
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length > 1) {
      for (let i = incomeItems.length - 1; i > 0; i--) {
        incomeItems[i].children[0].value = '';
        incomeItems[i].children[1].value = '';
        incomeItems[i].remove();
      }
    }
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length > 1) {
      for (let i = expensesItems.length - 1; i > 0; i--) {
        expensesItems[i].children[0].value = '';
        expensesItems[i].children[1].value = '';
        expensesItems[i].remove();
      }
    }
  },
  wipeData: function () {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    console.log(this);
    console.log(incomeItems);
  },
  reset: function () {
    this.removeInputs();
    const allInputs = document.querySelectorAll('input');
    const btnPlus = document.querySelectorAll('.btn_plus');
    btnPlus[0].disabled = false;
    btnPlus[1].disabled = false;
    allInputs.forEach(function (item) {
      item.value = '';
      item.disabled = false;
    });
    expensesAdd.style.display = 'Block';
    incomeAdd.style.display = 'Block';
    periodSelect.value = '1';
    periodAmount.textContent = periodSelect.value;
    cancelBtn.style.display = 'none';
    startBtn.style.display = 'Block';
    startBtn.disabled = true;
    this.wipeData();
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
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
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  getIncomeMonth: function () {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return 'У вас средний уровень дохода';
    } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
      return 'К сожалению у вас низкий уровень дохода';
    } else {
      return 'Что то пошло не так';
    }
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент депозита?', 10);
      } while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return this.budgetMonth * periodSelect.value;
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

startBtn.addEventListener('click', () => {
  appData.start();
});
cancelBtn.addEventListener('click', () => {
  appData.reset();
});

expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);

periodSelect.value = '1';
periodAmount.textContent = periodSelect.value;
periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value;
});
