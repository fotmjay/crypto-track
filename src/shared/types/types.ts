type Token = {
  id: string;
  symbol: string;
  name: string;
  usd?: string;
  usd_market_cap?: string;
  usd_24h_change?: string;
  [key: string]: any;
};

type PriceObject = {
  usd: number;
  usd_market_cap: number;
  usd_24h_change: number;
};

type CoinGecko = {
  [key: string]: PriceObject;
};

export type { Token, CoinGecko, PriceObject };
