type Token = {
  id: string;
  symbol: string;
  name: string;
  usd: string;
  usd_market_cap: string;
  usd_24h_change: string;
  averagePrice: string;
  amount: string;
  transactionList: Transaction[];
  [key: string]: any;
};

type Transaction = {
  [key: string]: any;
  txDate: string;
  price: string;
  amount: string;
  action: string;
};

type PriceObject = {
  usd: number;
  usd_market_cap: number;
  usd_24h_change: number;
};

type CoinGecko = {
  [key: string]: PriceObject;
};

export type { Token, CoinGecko, PriceObject, Transaction };
