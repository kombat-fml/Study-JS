const toggleMenu = () => {
  const body = document.querySelector('body'),
    menu = document.querySelector('menu');

  const handlerMenu = () => {
    if (!menu.classList.contains('active-menu')) {
      menu.classList.add('active-menu');
    } else {
      menu.classList.remove('active-menu');
    }
  };

  body.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('close-btn')) event.preventDefault();
    if (menu.classList.contains('active-menu')) {
      if (target.closest('menu')) {
        target = target.closest('a');
        if (target) handlerMenu();
      } else {
        handlerMenu();
      }
    } else {
      if (target.closest('.menu')) {
        handlerMenu();
      }
    }
  });
};
export default toggleMenu;