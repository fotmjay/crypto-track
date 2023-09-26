export default function calculateAveragePriceAndTotalAmount(prevAverage: string, prevAmount: string, price: string, amount: string, action: string) {
  const previousAverage = +prevAverage;
  const previousAmount = +prevAmount;
  const txPrice = +price;
  const txAmount = action === "Buy" ? +amount : +amount * -1;
  const previousTotalDollars = previousAmount === 0 ? previousAverage : previousAverage * previousAmount;
  const newTotalAmount = previousAmount + txAmount;
  const newAverageDollars = (previousTotalDollars + txPrice * txAmount) / (newTotalAmount || 1);
  return { amount: newTotalAmount.toString(), averagePrice: newAverageDollars.toString() };
}
