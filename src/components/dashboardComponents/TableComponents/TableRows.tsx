import { TableRow, TableCell, TableBody } from "@mui/material";
import { capitalizeFirstLetter } from "../../../helpers/capitalizeFirstLetter";
import { largeNumberFormat } from "../../../helpers/largeNumberFormat";
import createPriceFetchString from "../../../helpers/createPriceFetchString";
import { URL } from "../../../constants/URL";
import { ENDPOINT } from "../../../constants/apiEndpoints";
import { useEffect, useState } from "react";
import { RATELIMIT } from "../../../constants/rateLimit";

function createData(token: Token, currentPrice?: number, marketCap?: number, amount?: number, avgBuyPrice?: number) {
  return { token, currentPrice, marketCap, amount, avgBuyPrice };
}

type Rows = {
  token: Token;
  currentPrice?: number;
  marketCap?: number;
  amount?: number;
  avgBuyPrice?: number;
};

type Props = {
  savedTokenList: Token[];
};

type PriceObject = {
  usd: number;
  usd_market_cap: number;
  usd_24h_change: number;
};

export default function TableRows(props: Props) {
  const [savedTokenRows, setSavedTokenRows] = useState<Rows[]>(() => baselineList());

  function baselineList() {
    const savedPriceList = localStorage.getItem("savedTokenPriceList");
    const savedList = localStorage.getItem("savedList");
    const tokenRows: Rows[] = [];
    if (savedPriceList) {
      return JSON.parse(savedPriceList);
    } else if (savedList) {
      const list: Token[] = JSON.parse(savedList);
      list.forEach((token) => tokenRows.push(createData(token)));
    }
    return tokenRows;
  }

  function savedTokensPriceFetch() {
    console.log("fetched");
    const date = new Date();
    localStorage.setItem("savedListUpdatedAt", date.toISOString());
    fetch(URL.COINGECKO + ENDPOINT.price + createPriceFetchString(props.savedTokenList))
      .then((res) => res.json())
      .then((data) => {
        const tokenRows: Rows[] = [];
        props.savedTokenList.forEach((token) => {
          tokenRows.push(createData(token, data[token.id].usd, data[token.id].usd_market_cap, 0, 0));
        });
        localStorage.setItem("savedTokenPriceList", JSON.stringify(tokenRows));
        setSavedTokenRows(tokenRows);
      })
      .catch((err) => console.error(err));
  }

  function priceUpdate() {
    const lastUpdated = localStorage.getItem("savedListUpdatedAt") || undefined;
    // If last request was less than X seconds, do not fetch.
    if (lastUpdated === undefined || Date.now() - Date.parse(lastUpdated) > RATELIMIT.tokenPrices) {
      savedTokensPriceFetch();
    } else {
      console.log("not fetched");
    }
  }

  useEffect(() => {
    priceUpdate();
  });

  return (
    <TableBody>
      {savedTokenRows.map((row) => (
        <TableRow key={row.token.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell>{capitalizeFirstLetter(row.token.name)}</TableCell>
          <TableCell align="right">{row.currentPrice?.toLocaleString()}</TableCell>
          <TableCell align="right">{row.marketCap ? largeNumberFormat(row.marketCap) : "N/A"}</TableCell>
          <TableCell align="right">{row.amount?.toLocaleString()}</TableCell>
          <TableCell align="right">{row.avgBuyPrice?.toLocaleString()}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
