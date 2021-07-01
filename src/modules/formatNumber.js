function formatNumber(n) {
  return Math.floor(n / 10) === 0 ? '0' + n : n;
}

export default formatNumber;