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
  countTimer('27 june 2021 12:43:50');

  // меню
  const toggleMenu = () => {
    const body = document.querySelector('body'),
      menu = document.querySelector('menu');

    const handlerMenu = () => {
      if (!menu.classList.contains('active-menu')) {
        menu.classList.add('active-menu');
      } else {
        menu.classList.remove('active-menu');
      }
    };

    body.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('close-btn')) event.preventDefault();
      if (menu.classList.contains('active-menu')) {
        if (target.closest('menu')) {
          target = target.closest('a');
          if (target) handlerMenu();
        } else {
          handlerMenu();
        }
      } else {
        if (target.closest('.menu')) {
          handlerMenu();
        }
      }
    });
  };
  toggleMenu();

  //popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
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

        if (timeFraction < 1) requestAnimationFrame(popupAnimate);
      });
    };

    const closePopUp = () => {
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

    popup.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        closePopUp();
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          closePopUp();
        }
      }
    });
  };
  togglePopUp();

  // smooth scroll
  const smoothscroll = (SPEED = 0.5) => {
    const smoothlinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    const scrolled = (event) => {
      event.preventDefault();
      let start = 0;
      const pageY = window.pageYOffset,
        hash = event.target.closest('a').getAttribute('href'),
        elem = document.querySelector(hash),
        coordinateElem = elem.getBoundingClientRect().top - 10;

      const step = (time) => {
        if (!start) start = time;

        const progress = time - start;
        const r =
          coordinateElem < 0
            ? Math.max(pageY - progress / SPEED, pageY + coordinateElem)
            : Math.min(pageY + progress / SPEED, pageY + coordinateElem);
        window.scrollTo(0, r);
        if (r < pageY + coordinateElem) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    smoothlinks.forEach((elem) => elem.addEventListener('click', scrolled));
  };
  smoothscroll(0.3);

  // табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (i === index) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  // слайдер
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      portfolioDots = document.querySelector('.portfolio-dots'),
      slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlider = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(portfolioDots.childNodes, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) currentSlide = 0;
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(portfolioDots.childNodes, currentSlide, 'dot-active');
    };

    const startSlider = (time = 3000) => {
      interval = setInterval(autoPlaySlider, time);
    };
    const stopSlider = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(portfolioDots.childNodes, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        portfolioDots.childNodes.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slide.length - 1;
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(portfolioDots.childNodes, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn, .dot')) {
        stopSlider();
      }
    });
    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn, .dot')) {
        startSlider(1500);
      }
    });

    const newDot = document.createElement('li');
    newDot.className = 'dot';
    for (let i = 0; i < slide.length; i++) {
      const cloneDot = newDot.cloneNode();
      portfolioDots.append(cloneDot);
    }
    portfolioDots.childNodes[currentSlide].classList.add('dot-active');

    startSlider(1500);
  };
  slider();
});
