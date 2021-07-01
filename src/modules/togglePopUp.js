const togglePopUp = () => {
  const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popupContent = document.querySelector('.popup-content');

  let clientWidth = document.documentElement.clientWidth;
  window.addEventListener('resize', () => {
    clientWidth = document.documentElement.clientWidth;
  });

  const popupAnimate = ({
    duration,
    draw,
    timing
  }) => {
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
export default togglePopUp;