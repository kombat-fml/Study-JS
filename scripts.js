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

class AppData {
  constructor() {
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
  }

  wipeData() {
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
  }

  start() {
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
  }

  disableCalc() {
    const dataInputs = document.querySelector('.data').querySelectorAll('input[type="text"]');
    const btnPlus = document.querySelectorAll('.btn_plus');
    btnPlus[0].disabled = true;
    btnPlus[1].disabled = true;
    dataInputs.forEach(function (item) {
      item.disabled = true;
    });
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'Block';
  }

  removeInputs() {
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
  }
  reset() {
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
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
  }
  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.children[0].value = '';
    cloneExpensesItem.children[0].addEventListener('input', AppData.replaceDigit);
    cloneExpensesItem.children[1].value = '';
    cloneExpensesItem.children[1].addEventListener('input', AppData.replaceLetter);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }
  }
  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.children[0].value = '';
    cloneIncomeItem.children[0].addEventListener('input', AppData.replaceDigit);
    cloneIncomeItem.children[1].value = '';
    cloneIncomeItem.children[1].addEventListener('input', AppData.replaceLetter);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomeAdd.style.display = 'none';
    }
  }
  getExpenses() {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value.trim();
      let cashExpenses = item.querySelector('.expenses-amount').value.trim();
      if (!isNumber(itemExpenses) && itemExpenses !== '' && isNumber(cashExpenses) && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }
  getIncome() {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value.trim();
      let cashIncome = item.querySelector('.income-amount').value.trim();
      if (!isNumber(itemIncome) && itemIncome !== '' && isNumber(cashIncome) && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    });
  }
  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.toLowerCase().split(',');
    addExpenses.forEach((item, i, arr) => {
      item = item.trim();
      if (item !== '' && !isNumber(item)) {
        this.addExpenses.push(item[0].toUpperCase() + item.slice(1));
      }
    });
  }
  getAddIncome() {
    additionalIncomeItems.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '' && !isNumber(item)) {
        this.addIncome.push(itemValue[0].toUpperCase() + itemValue.slice(1));
      }
    });
  }
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getIncomeMonth() {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }
  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return 'У вас средний уровень дохода';
    } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
      return 'К сожалению у вас низкий уровень дохода';
    } else {
      return 'Что то пошло не так';
    }
  }
  getInfoDeposit() {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент депозита?', 10);
      } while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  }
  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }
  addingEventListeners() {
    listenedInputsName.forEach((item) => {
      item.addEventListener('input', AppData.replaceDigit);
    });
    listenedInputsSum.forEach((item) => {
      item.addEventListener('input', AppData.replaceLetter);
    });
    expensesAdd.addEventListener('click', () => {
      this.addExpensesBlock();
    });
    incomeAdd.addEventListener('click', () => {
      this.addIncomeBlock();
    });

    startBtn.addEventListener('click', () => {
      this.start();
    });
    cancelBtn.addEventListener('click', () => {
      this.reset();
    });
    this.enablingStart();
    salaryAmount.addEventListener('input', () => {
      this.enablingStart();
    });

    periodSelect.value = '1';
    periodAmount.textContent = periodSelect.value;
    periodSelect.addEventListener('input', () => {
      periodAmount.textContent = periodSelect.value;
      incomePeriodValue.value = this.calcSavedMoney();
    });
  }
  enablingStart() {
    if (isNumber(salaryAmount.value) && salaryAmount.value !== '' && salaryAmount.value !== null) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
    }
  }
}

AppData.replaceDigit = function () {
  this.value = this.value.replace(/[^а-яА-ЯёЁ ,.?!]/, '');
};
AppData.replaceLetter = function () {
  this.value = this.value.replace(/\D/, '');
};

const appData = new AppData();
appData.addingEventListeners();
