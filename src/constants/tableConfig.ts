export const tableConfig = Object.freeze({
  mainTableCategories: {
    large: ["Coin", "Current Price", "Market Capitalization", "24H Change", "Average Price"],
    small: ["Coin", "Price", "M.Cap.", "24H", "Avg"],
    apiRelated: ["name", "usd", "usd_market_cap", "usd_24h_change", "averagePrice"],
  },
  txDataTableCategories: {
    large: ["Date", "Action", "Amount", "Price", "Total USD"],
    small: ["Date", "Tx", "Qty", "Price", "Total"],
    apiRelated: ["txDate", "action", "amount", "price", "total"],
  },
  walletTotalCategories: {
    large: ["Coin", "Amount", "Average", "Paid", "Total USD"],
    small: ["Coin", "Qty", "Avg", "Paid", "Total"],
    apiRelated: ["name", "amount", "averagePrice", "paid", "total"],
  },
});
