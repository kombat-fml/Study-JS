'use strict';
window.addEventListener('DOMContentLoaded', () => {
  let clientWidth = document.documentElement.clientWidth;

  window.addEventListener('resize', () => {
    clientWidth = document.documentElement.clientWidth;
  });

  function formatNumber(n) {
    return Math.floor(n / 10) === 0 ? '0' + n : n;
  }

  // TImer
  const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds'),
      timerDays = document.querySelector('#timer-days');

    const getTimeRemaining = () => {
      const dateStor = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStor - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor((timeRemaining / 60 / 60) % 24),
        days = Math.floor(timeRemaining / 60 / 60 / 24);

      return { timeRemaining, days, hours, minutes, seconds };
    };
    let timerId = null;
    const updateClock = () => {
      const timer = getTimeRemaining();
      if (timer.timeRemaining <= 0) {
        if (timerId) {
          clearInterval(timerId);
          timerId = null;
        }
        timer.hours = 0;
        timer.minutes = 0;
        timer.seconds = 0;
        timer.days = 0;
      }

      timerHours.textContent = formatNumber(timer.hours);
      timerMinutes.textContent = formatNumber(timer.minutes);
      timerSeconds.textContent = formatNumber(timer.seconds);
      timerDays.textContent = formatNumber(timer.days);
    };
    updateClock();
    timerId = setInterval(updateClock, 1000);
  };

  countTimer('17 june 2021 12:43:50');

  // меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('li>a');

    const handlerMenu = () => {
      if (!menu.style.transform) {
        menu.style.transform = `translateX(0)`;
      } else {
        menu.style = ``;
      }
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);

    for (const menuItem of menuItems) {
      menuItem.addEventListener('click', handlerMenu);
    }
  };

  toggleMenu();

  //popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close'),
      popupContent = document.querySelector('.popup-content');

    const popupAnimate = ({ duration, draw, timing }) => {
      const start = performance.now();

      requestAnimationFrame(function popupAnimate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) {
          timeFraction = 1;
        }

        const progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
          requestAnimationFrame(popupAnimate);
        }
      });
    };

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.classList.add('active');
        popupContent.style.top = '';
        if (clientWidth >= 768) {
          popupAnimate({
            duration: 800,
            timing(timeFraction) {
              return Math.pow(timeFraction, 3);
            },
            draw(progress) {
              popupContent.style.top = (-1 + progress) * 100 + '%';
            },
          });
        }
      });
    });

    popupClose.addEventListener('click', () => {
      if (clientWidth >= 768) {
        popupAnimate({
          duration: 800,
          timing(timeFraction) {
            return Math.pow(timeFraction, 5);
          },
          draw(progress) {
            popupContent.style.top = -1 * progress * 100 + '%';
          },
        });
        setTimeout(() => {
          popup.classList.remove('active');
        }, 800);
      } else {
        popupContent.style.top = '';
        popup.classList.remove('active');
      }
    });
  };
  togglePopUp();
});
