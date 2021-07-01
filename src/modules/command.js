const command = () => {
  const commandElements = document.querySelectorAll('.command__photo');
  const changePhoto = function () {
    const commonSrc = this.getAttribute('src');
    this.setAttribute('src', this.dataset.img);
    this.dataset.img = commonSrc;
  };
  commandElements.forEach((elem) => {
    elem.addEventListener('mouseenter', changePhoto);
    elem.addEventListener('mouseleave', changePhoto);
  });
};
export default command;