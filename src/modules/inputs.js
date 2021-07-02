import maskPhone from './maskPhone';

const inputs = () => {
  const nameReplacer = function () {
    this.value = this.value.replace(/[^а-яё ]/gi, '');
  };
  const msgReplacer = function () {
    this.value = this.value.replace(/[^а-яё ,\.!\?;\d]/gi, '');
  };
  const mailReplacer = function () {
    this.value = this.value.replace(/(?![~@\-!_\.\*'])[\W\d]/gi, '');
  };
  const phoneReplacer = function () {
    this.value = this.value.replace(/(?![\(\)\+])\D/gi, '');
  };
  const trimStr = function (elem) {
    elem.value = elem.value.replace(/^[ \-]*/, '');
    elem.value = elem.value.replace(/[ \-]*$/, '');
  };

  const replaceSpaces = function (elem) {
    elem.value = elem.value.replace(/ +/g, ' ');
  };

  const replaceHyphen = function (elem) {
    elem.value = elem.value.replace(/-+/g, '-');
  };
  const uppAndLow = function (elem) {
    elem.value = elem.value.replace(/^(.{1})(.*)/, (match, val1, val2) => val1.toUpperCase() + val2.toLowerCase());
  };

  const textInputs = document.querySelectorAll('[name="user_name"]'),
    messageInputs = document.querySelector('[name="user_message"]'),
    mailInputs = document.querySelectorAll('[name="user_email"]'),
    phoneInputs = document.querySelectorAll('[name="user_phone"]');

  maskPhone('.form-phone');
  messageInputs.addEventListener('input', msgReplacer);
  messageInputs.addEventListener('blur', function () {
    trimStr(this);
    replaceSpaces(this);
    replaceHyphen(this);
    uppAndLow(this);
  });
  textInputs.forEach((elem) => {
    elem.addEventListener('input', nameReplacer);
    elem.addEventListener('blur', function () {
      trimStr(this);
      replaceSpaces(this);
      replaceHyphen(this);
      uppAndLow(this);
    });
  });
  mailInputs.forEach((elem) => {
    elem.addEventListener('input', mailReplacer);
    elem.addEventListener('blur', function () {
      trimStr(this);
      replaceHyphen(this);
    });
  });
  phoneInputs.forEach((elem) => {
    elem.addEventListener('input', phoneReplacer);
    elem.addEventListener('blur', function () {
      trimStr(this);
      replaceHyphen(this);
    });
  });
};

export default inputs;