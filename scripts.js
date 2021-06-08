'use strict';

const adv = document.querySelector('.adv'),
  books = document.querySelectorAll('.book'),
  listBook2 = books[0].querySelectorAll('li'),
  listBook5 = books[5].querySelectorAll('li'),
  listBook6 = books[2].querySelectorAll('li'),
  newElem = document.createElement('li');

books[1].insertAdjacentElement('afterend', books[0]);
books[5].insertAdjacentElement('afterend', books[2]);
books[4].insertAdjacentElement('afterend', books[3]);
document.body.style.backgroundImage = 'url(/image/you-dont-know-js.jpg)';
books[4].querySelector('h2>a').textContent = 'Книга 3. this и Прототипы Объектов';
adv.remove();
listBook2[9].after(listBook2[2]);
listBook2[3].after(listBook2[8]);
listBook2[3].after(listBook2[6]);
listBook5[1].after(listBook5[9]);
listBook5[4].after(listBook5[2]);
listBook5[7].after(listBook5[5]);
newElem.textContent = 'Глава 8: За пределами ES6';
listBook6[listBook6.length - 1].before(newElem);
console.log(listBook2);
