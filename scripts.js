'use strict';

const adv = document.querySelector('.adv'),
  books = document.querySelectorAll('.book'),
  list = books[5].querySelectorAll('li'),
  listBook6 = books[2].querySelectorAll('li'),
  newElem = document.createElement('li');

books[1].insertAdjacentElement('afterend', books[0]);
books[5].insertAdjacentElement('afterend', books[2]);
books[4].insertAdjacentElement('afterend', books[3]);
document.body.style.backgroundImage = 'url(/image/you-dont-know-js.jpg)';
books[4].querySelector('h2>a').textContent = 'Книга 3. this и Прототипы Объектов';
adv.remove();
list[1].after(list[9]);
list[4].after(list[2]);
list[7].after(list[5]);
newElem.textContent = 'Глава 8: За пределами ES6';
listBook6[listBook6.length - 1].before(newElem);
