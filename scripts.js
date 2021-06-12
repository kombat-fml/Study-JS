document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const span = document.getElementById('username'),
    registrationBtn = document.getElementById('registration'),
    loginBtn = document.getElementById('login'),
    list = document.getElementById('list'),
    month = [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ];

  let usersData;

  const findUser = function (place, value) {
    let flag = false;
    usersData.forEach(function (item, i) {
      switch (true) {
        case place === 'user': {
          if (value === item.name + item.surname) {
            flag = true;
            return true;
          }
        }
      }
    });
  };

  const readFromLocalStorage = function () {
    let json = localStorage.getItem('UsersList');
    json = JSON.parse(json);
    return json ? json : [];
  };

  const writeToLocalStorage = function (data) {
    const json = JSON.stringify(data);
    localStorage.setItem('UsersList', json);
  };

  const formatNumber = function (n) {
    return Math.floor(n / 10) === 0 ? '0' + n : n;
  };

  const render = function () {
    list.textContent = '';
    usersData.forEach(function (item, i) {
      const li = document.createElement('li');
      li.innerHTML =
        '<span>' +
        'Имя: ' +
        item.name +
        ', фамилия: ' +
        item.surname +
        ', зарегистрирован: ' +
        item.dateOfReg +
        '</span><button class="remove-user"></button>';
      list.append(li);

      li.querySelector('.remove-user').addEventListener('click', function () {
        li.remove();
        usersData.splice(i, 1);
        render();
      });
    });
    writeToLocalStorage(usersData);
    console.log(usersData);
  };

  const registerUser = function () {
    const user = prompt('Введите имя и фамилию пользователя через пробел').trim();
    switch (true) {
      case user.match(/ /g) === null:
        if (confirm('Ошибка! В данных введено одно слово, хотите ввести снова?')) {
          registerUser();
          return;
        } else {
          return;
        }
        break;
      case user.match(/ /g).length > 1:
        if (confirm('Ошибка! В данных введено больше одного пробела, хотите ввести снова?')) {
          registerUser();
          return;
        } else {
          return;
        }
        break;
      default:
    }
    const login = prompt('Придумайте логин');
    const pass = prompt('Придумайте пароль');
    const date = new Date();
    const newUser = {
      name: user.substring(0, user.match(/ /).index),
      surname: user.substring(user.match(/ /).index + 1),
      login: login,
      password: pass,
      dateOfReg: `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} г.,
        ${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}`,
    };
    usersData.push(newUser);
    render();
  };

  registrationBtn.addEventListener('click', registerUser);
  usersData = readFromLocalStorage();
  render();
});
