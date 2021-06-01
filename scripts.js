'use strict';

const cropString = function (data) {
  let ourstring = data;
  if (typeof ourstring !== 'string') {
    return 'Получена не строка!';
  }
  ourstring = ourstring.trim();
  if (ourstring.length > 30) {
    return ourstring.substr(0, 30) + '...';
  }
  return ourstring;
};

console.log(cropString('    123343Fjngjngjgnhfdgbhfbhdfbdh123  '));
