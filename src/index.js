'use strict';

  import countTimer from './modules/countTimer';
  import toggleMenu from './modules/toggleMenu';
  import togglePopUp from './modules/togglePopUp';
  import smoothscroll from './modules/smoothscroll';
  import tabs from './modules/tabs';
  import slider from './modules/slider';
  import command from './modules/command';
  import calculator from './modules/calculator';
  import inputs from './modules/inputs';
  import calc from './modules/calc';
  import sendForm from './modules/sendForm';

  // TImer
  countTimer('27 july 2021 12:43:50');
  // меню
  toggleMenu();
  //popup
  togglePopUp();
  // smooth scroll
  smoothscroll(0.3);
  // табы
  tabs();
  // слайдер
  slider();
  // наша команда
  command();
  // калькулятор
  calculator();
  // инпуты
  inputs();
  // расчеты в калькуляторе
  calc(100);
  // send-ajax-form
  sendForm('form1');
  sendForm('form2');
  sendForm('form3');