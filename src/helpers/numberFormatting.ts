const dailyChangeFormat = (number: number) => {
  if (number === null) {
    return "0";
  }
  return number.toFixed(1) + "%";
};

const smallNumberFormat = (number: number) => {
  const num = Math.abs(number);
  if (num < 0.01) {
    return number.toFixed(7);
  } else if (num < 0.1) {
    return number.toFixed(4);
  } else if (num < 100) {
    return number.toFixed(2);
  } else if (num === 0 || isNaN(number)) {
    return "N/A";
  } else {
    return Math.floor(number).toString();
  }
};

const largeNumberFormat = (number: number) => {
  if (number > 999999999) {
    return `${(number / 1000000000).toFixed(0)} B`;
  } else if (number > 999999) {
    return `${(number / 1000000).toFixed()} M`;
  } else if (number > 999) {
    return `${(number / 1000).toFixed()} K`;
  } else if (number === 0 || isNaN(number)) {
    return "N/A";
  } else {
    return number.toString();
  }
};

export { largeNumberFormat, dailyChangeFormat, smallNumberFormat };
