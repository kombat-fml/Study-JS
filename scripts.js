'use strict';

function DomElement() {
  this.selector = '';
  this.height = '200px';
  this.width = '300px';
  this.bg = 'red';
  this.fontSize = '16px';
}

DomElement.prototype.createElement = function (element) {
  let elem;
  if (element[0] === '.') {
    elem = document.createElement('div');
    elem.className = element.substr(1);
  } else if (element[0] === '#') {
    elem = document.createElement('p');
    elem.id = element.substr(1);
  }
  elem.style.height = this.height;
  elem.style.width = this.width;
  elem.style.background = this.bg;
  elem.style.fontSize = this.fontSize;

  elem.textContent = 'Какой-то текст';
  document.body.append(elem);
};

let div = new DomElement();
div.createElement('#fdgfd');
