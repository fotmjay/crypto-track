import { Transaction } from "../shared/types/types";

export default function recalculateAverage(transactionList: Transaction[]) {
  const averageAndAmounts: { amount: number; total: number } = { amount: 0, total: 0 };
  transactionList.forEach((tx: Transaction) => {
    if (tx.action === "Buy") {
      averageAndAmounts.amount += parseFloat(tx.amount);
      averageAndAmounts.total += parseFloat(tx.amount) * parseFloat(tx.price);
    } else {
      averageAndAmounts.amount -= parseFloat(tx.amount);
      averageAndAmounts.total -= parseFloat(tx.amount) * parseFloat(tx.price);
    }
  });
  if (isNaN(averageAndAmounts.amount)) {
    averageAndAmounts.amount = 0;
  }
  if (isNaN(averageAndAmounts.total)) {
    averageAndAmounts.total = 0;
  }
  return { amount: averageAndAmounts.amount.toString(), averagePrice: (averageAndAmounts.total / averageAndAmounts.amount).toString() };
}
