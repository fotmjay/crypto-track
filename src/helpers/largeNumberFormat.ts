export function largeNumberFormat(number: number) {
  if (number > 999999999) {
    return `${(number / 1000000000).toFixed(0)} B`;
  } else if (number > 999999) {
    return `${(number / 1000000).toFixed()} M`;
  } else if (number > 999) {
    return `${(number / 1000).toFixed()} K`;
  } else {
    return number;
  }
}
