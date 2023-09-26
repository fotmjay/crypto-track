export default function txFormatting(txAmount: string, price: string, action: string) {
  const date = new Date().toISOString();
  const total = (+price * +txAmount).toFixed(2);
  return { txDate: date, amount: txAmount, action: action, price: price, total: total };
}
