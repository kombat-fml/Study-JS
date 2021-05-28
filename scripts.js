let money = 30000,
  income = 'фриланс, консультации, кураторство',
  addExpenses = 'телефон, интернет, коммуналка, кино',
  deposit = true,
  mission = 50000,
  period = 2;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Цель заработать ${mission} рублей`);

const expenseElems = addExpenses.toLowerCase().split(', ');
console.log(expenseElems);

const budgetDay = money / 30;
console.log(budgetDay);
