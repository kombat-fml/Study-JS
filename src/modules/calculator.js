const calculator = () => {
  const inputs = document.querySelectorAll('input.calc-item');
  const replaceLetter = function () {
    this.value = this.value.replace(/\D/g, '');
  };
  inputs.forEach((elem) => {
    elem.addEventListener('input', replaceLetter);
  });
};
export default calculator;