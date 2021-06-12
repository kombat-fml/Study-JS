'use strict';

function DomElement(selector, height, width, background, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = background;
  this.fontSize = fontSize;
}

DomElement.prototype.createElement = function () {
  let elem;
  if (this.selector[0] === '.') {
    elem = document.createElement('div');
    elem.className = this.selector.substr(1);
  } else if (this.selector[0] === '#') {
    elem = document.createElement('p');
    elem.id = this.selector.substr(1);
  }
  elem.style.height = this.height;
  elem.style.width = this.width;
  elem.style.background = this.bg;
  elem.style.fontSize = this.fontSize;

  elem.textContent = 'Какой-то текст';
  document.body.append(elem);
};

let div = new DomElement('#fdgfd', '200px', '300px', 'red', '16px');
div.createElement();
