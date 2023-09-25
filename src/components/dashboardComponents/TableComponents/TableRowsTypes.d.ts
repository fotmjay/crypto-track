import { Token } from "../../../shared/types/types";

type Rows = {
  token: Token;
  currentPrice?: number;
  marketCap?: number;
  amount?: number;
  avgBuyPrice?: number;
};

type Props = {
  savedTokenList: Token[];
  namedProperties: string[];
  openModal: Function;
};

export type { Rows, Props };