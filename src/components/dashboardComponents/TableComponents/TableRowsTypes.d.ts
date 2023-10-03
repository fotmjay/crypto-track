import { Token } from "../../../shared/types/types";

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
  draggable?: boolean;
  setDataList?: React.Dispatch<React.SetStateAction<Object[] & Token[]>>;
};

export type { Rows, Props };
