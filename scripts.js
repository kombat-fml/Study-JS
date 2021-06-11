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

const AppData = function () {
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
};

AppData.prototype.wipeData = function () {
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
};

AppData.prototype.start = function () {
  this.budget = +salaryAmount.value;
  expensesItems = document.querySelectorAll('.expenses-items');
  incomeItems = document.querySelectorAll('.income-items');
  this.getExpenses();
  this.getExpensesMonth();
  this.getAddExpenses();

  this.getIncome();
  this.getIncomeMonth();
  this.getAddIncome();

  this.getBudget();

  this.showResult();
  this.disableCalc();
};

AppData.prototype.disableCalc = function () {
  const dataInputs = document.querySelector('.data').querySelectorAll('input[type="text"]');
  const btnPlus = document.querySelectorAll('.btn_plus');
  btnPlus[0].disabled = true;
  btnPlus[1].disabled = true;
  dataInputs.forEach(function (item) {
    item.disabled = true;
  });
  startBtn.style.display = 'none';
  cancelBtn.style.display = 'Block';
};
AppData.prototype.removeInputs = function () {
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length > 1) {
    for (let i = incomeItems.length - 1; i > 0; i--) {
      incomeItems[i].remove();
    }
  }
  incomeItems[0].children[0].value = '';
  incomeItems[0].children[1].value = '';

  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length > 1) {
    for (let i = expensesItems.length - 1; i > 0; i--) {
      expensesItems[i].remove();
    }
  }
  expensesItems[0].children[0].value = '';
  expensesItems[0].children[1].value = '';
};
AppData.prototype.reset = function () {
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
};
AppData.prototype.showResult = function () {
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcSavedMoney();
  periodSelect.addEventListener('input', function () {
    incomePeriodValue.value = _this.calcSavedMoney();
  });
};
AppData.prototype.replaceDigit = function () {
  this.value = this.value.replace(/[^а-яА-ЯёЁ ,.?!]/, '');
};
AppData.prototype.replaceLetter = function () {
  this.value = this.value.replace(/\D/, '');
};
AppData.prototype.addExpensesBlock = function () {
  const _this = this;
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.children[0].value = '';
  cloneExpensesItem.children[0].addEventListener('input', _this.replaceDigit);
  cloneExpensesItem.children[1].value = '';
  cloneExpensesItem.children[1].addEventListener('input', _this.replaceLetter);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
  expensesItems = document.querySelectorAll('.expenses-items');

  if (expensesItems.length === 3) {
    expensesAdd.style.display = 'none';
  }
};
AppData.prototype.addIncomeBlock = function () {
  const _this = this;
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.children[0].value = '';
  cloneIncomeItem.children[0].addEventListener('input', _this.replaceDigit);
  cloneIncomeItem.children[1].value = '';
  cloneIncomeItem.children[1].addEventListener('input', _this.replaceLetter);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
  incomeItems = document.querySelectorAll('.income-items');

  if (incomeItems.length === 3) {
    incomeAdd.style.display = 'none';
  }
};
AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value.trim();
    let cashExpenses = item.querySelector('.expenses-amount').value.trim();
    if (!isNumber(itemExpenses) && itemExpenses !== '' && isNumber(cashExpenses) && cashExpenses !== '') {
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value.trim();
    let cashIncome = item.querySelector('.income-amount').value.trim();
    if (!isNumber(itemIncome) && itemIncome !== '' && isNumber(cashIncome) && cashIncome !== '') {
      _this.income[itemIncome] = +cashIncome;
    }
  });
};
AppData.prototype.getAddExpenses = function () {
  const _this = this;
  let addExpenses = additionalExpensesItem.value.toLowerCase().split(',');
  addExpenses.forEach(function (item, i, arr) {
    item = item.trim();
    if (item !== '' && !isNumber(item)) {
      _this.addExpenses.push(item[0].toUpperCase() + item.slice(1));
    }
  });
};
AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItems.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== '' && !isNumber(item)) {
      _this.addIncome.push(itemValue[0].toUpperCase() + itemValue.slice(1));
    }
  });
};
AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};
AppData.prototype.getIncomeMonth = function () {
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
    return 'У вас средний уровень дохода';
  } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
    return 'К сожалению у вас низкий уровень дохода';
  } else {
    return 'Что то пошло не так';
  }
};
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент депозита?', 10);
    } while (!isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    } while (!isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.addingEventListeners = function () {
  const _this = this;
  listenedInputsName.forEach(function (item) {
    item.addEventListener('input', _this.replaceDigit);
  });
  listenedInputsSum.forEach(function (item) {
    item.addEventListener('input', _this.replaceLetter);
  });
  expensesAdd.addEventListener('click', _this.addExpensesBlock.bind(_this));
  incomeAdd.addEventListener('click', _this.addIncomeBlock.bind(_this));

  startBtn.addEventListener('click', () => {
    _this.start();
  });
  cancelBtn.addEventListener('click', () => {
    _this.reset();
  });
  _this.enablingStart();
  salaryAmount.addEventListener('input', _this.enablingStart);

  periodSelect.value = '1';
  periodAmount.textContent = periodSelect.value;
  periodSelect.addEventListener('input', function () {
    periodAmount.textContent = periodSelect.value;
  });
};

AppData.prototype.enablingStart = function () {
  if (isNumber(salaryAmount.value) && salaryAmount.value !== '' && salaryAmount.value !== null) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = true;
  }
};

const appData = new AppData();
appData.addingEventListeners();
