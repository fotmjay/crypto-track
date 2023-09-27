import { Token, Transaction } from "../../../shared/types/types";

type Rows = {
  token: Token;
  currentPrice?: number;
  marketCap?: number;
  amount?: number;
  avgBuyPrice?: number;
};

type Props = {
  dataList: any;
  namedProperties: string[];
  firstElementClick?: Function;
};

export type { Rows, Props };
