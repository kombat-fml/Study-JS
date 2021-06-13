document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const span = document.getElementById('username'),
    registrationBtn = document.getElementById('registration'),
    loginBtn = document.getElementById('login'),
    logoutBtn = document.getElementById('logout'),
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

  const findUser = function (value, id) {
    let flag = false,
      index;
    if (id !== undefined) {
      if (usersData[id].password === value) {
        flag = true;
      }
    } else {
      usersData.forEach(function (item, i) {
        if (value === item.login) {
          flag = true;
          index = i;
          return true;
        }
      });
    }
    return [flag, index];
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
    let user = prompt('Введите имя и фамилию пользователя через пробел');
    if (user === null) {
      return;
    } else {
      user = user.trim();
    }
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
    }
    let login = prompt('Придумайте логин'),
      promptLogin;
    if (findUser(login)[0]) {
      do {
        promptLogin = confirm('Ошибка! Пользователь с таким логином уже существует. Хотите ввести снова?');
        if (promptLogin) {
          login = prompt('Придумайте логин');
        } else {
          return;
        }
      } while (promptLogin && findUser(login)[0]);
    }

    const pass = prompt('Придумайте пароль');
    if (pass === null) {
      return;
    }
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

  const loginUser = function (id) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    span.textContent = usersData[id].name;
  };

  const logoutUser = function () {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    span.textContent = 'Аноним';
  };

  const authUser = function () {
    const login = prompt('Введите логин');
    if (login === null) {
      return;
    }
    const loginData = findUser(login);
    if (!loginData[0]) {
      alert('Пользователь с таким логином не найден');
      return;
    }
    const pass = prompt('Введите пароль');
    if (pass === null) {
      return;
    }
    const passData = findUser(pass, loginData[1]);
    if (passData[0]) {
      loginUser(loginData[1]);
    } else {
      alert('Неверный пароль');
    }
  };

  registrationBtn.addEventListener('click', registerUser);
  loginBtn.addEventListener('click', authUser);
  logoutBtn.addEventListener('click', logoutUser);
  usersData = readFromLocalStorage();
  render();
});
