const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSquare = document.querySelector('.calc-square'),
    calcCount = document.querySelector('.calc-count'),
    calcDay = document.querySelector('.calc-day'),
    totalValue = document.getElementById('total');

  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1,
      timer = 0,
      requestId = 0;
    const typeValue = +calcType.value,
      squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (!!typeValue && !!squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    }

    totalValue.textContent = timer;

    const step = (time) => {
      timer += Math.floor(Math.pow(timer / 5 + 1, 1.5));
      totalValue.textContent = timer;
      if (timer < Math.floor(total) && requestId) {
        requestId = requestAnimationFrame(step);
      } else {
        totalValue.textContent = Math.floor(total);
      }
    };
    if (total) requestId = requestAnimationFrame(step);
  };

  calcBlock.addEventListener('change', (event) => {
    const target = event.target;
    if (target.matches('.calc-item')) {
      countSum();
    }
  });
};
export default calc;