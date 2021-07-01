import formatNumber from './formatNumber';
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

    return {
      timeRemaining,
      days,
      hours,
      minutes,
      seconds
    };
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
export default countTimer;