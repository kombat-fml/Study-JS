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
export default slider;