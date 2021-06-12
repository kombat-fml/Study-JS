document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  function DomElement(height, width, background, position) {
    this.height = height;
    this.width = width;
    this.bg = background;
    this.position = position;
  }

  DomElement.prototype.createElement = function () {
    let elem;
    elem = document.createElement('div');
    elem.style.height = this.height;
    elem.style.width = this.width;
    elem.style.background = this.bg;
    elem.style.fontSize = this.fontSize;
    elem.style.position = this.position;
    elem.style.left = '0';
    elem.style.top = '0';
    document.body.append(elem);
    return elem;
  };

  let div = new DomElement('100px', '100px', 'red', 'absolute');
  const divElement = div.createElement();

  document.body.addEventListener('keydown', function (event) {
    switch (true) {
      case event.code === 'ArrowRight': {
        divElement.style.left = parseInt(divElement.style.left) + 10 + 'px';
        break;
      }
      case event.code === 'ArrowLeft': {
        divElement.style.left = parseInt(divElement.style.left) - 10 + 'px';
        break;
      }
      case event.code === 'ArrowUp': {
        divElement.style.top = parseInt(divElement.style.top) - 10 + 'px';
        break;
      }
      case event.code === 'ArrowDown': {
        divElement.style.top = parseInt(divElement.style.top) + 10 + 'px';
        break;
      }
    }
  });
});
