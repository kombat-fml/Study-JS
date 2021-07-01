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
        coordinateElem < 0 ?
        Math.max(pageY - progress / SPEED, pageY + coordinateElem) :
        Math.min(pageY + progress / SPEED, pageY + coordinateElem);
      window.scrollTo(0, r);
      if (r < pageY + coordinateElem) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  smoothlinks.forEach((elem) => elem.addEventListener('click', scrolled));
};
export default smoothscroll;