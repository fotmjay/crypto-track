// Components
import TokenAdd from "./dashboardComponents/TokenAdd";
import TokenList from "./dashboardComponents/TokenList";

// Constants
import { ENDPOINT } from "../constants/apiEndpoints";
import { URL } from "../constants/URL";
import { RATELIMIT } from "../constants/rateLimit";

// Helpers
import { lsGet, lsSet } from "../helpers/localStorageHelper";
import createPriceFetchString from "../helpers/createPriceFetchString";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import { largeNumberFormat, dailyChangeFormat, smallNumberFormat } from "../helpers/numberFormatting";

// React and Mui
import { Card, Divider, Container, Button } from "@mui/material";
import { useEffect, useState } from "react";

// Types
import type { CoinGecko, Token } from "../shared/types/types";

// Types definition
type Props = {
  fullTokenList: Token[];
  setErrorMessage: Function;
};

// Main

export default function Dashboard(props: Props) {
  const [savedTokenList, setSavedTokenList] = useState<Token[]>(lsGet.list("savedList"));

  useEffect(() => {
    if (rateLimiting() === true) {
      savedTokensPriceFetch();
    }
  }, []);

  function rateLimiting() {
    const current = Date.parse(new Date().toISOString());
    const lastUpdated = lsGet.date("savedListUpdatedAt");
    return lastUpdated === undefined || current - lastUpdated > RATELIMIT.tokenPrices;
  }

  function addToken(token: Token | null) {
    if (token !== null) {
      setSavedTokenList((list) => {
        const newList = [...list];
        if (!list.find((tokenFromList) => tokenFromList.id === token.id)) {
          newList.push({ ...token, name: capitalizeFirstLetter(token.name) });
          localStorage.setItem("savedList", JSON.stringify(newList));
        }
        return newList;
      });
    }
  }

  function savedTokensPriceFetch() {
    if (rateLimiting() === false) {
      props.setErrorMessage("Please wait a few seconds before refreshing.");
      return;
    }
    lsSet.date("savedListUpdatedAt");
    props.setErrorMessage("");
    fetch(URL.COINGECKO + ENDPOINT.price + createPriceFetchString(savedTokenList))
      .then((res) => res.json())
      .then((data: CoinGecko) => {
        setSavedTokenList((savedList) => {
          const newList = savedList.map((token) => ({
            ...token,
            usd: smallNumberFormat(data[token.id].usd),
            usd_market_cap: largeNumberFormat(data[token.id].usd_market_cap),
            usd_24h_change: dailyChangeFormat(data[token.id].usd_24h_change),
          }));
          localStorage.setItem("savedList", JSON.stringify(newList));
          return newList;
        });
      })
      .catch((err) => console.error(err));
  }

  return (
    <Card variant="outlined">
      <Container sx={{ display: "flex", justifyContent: "center", alignContent: "center", padding: "20px" }}>
        <TokenAdd addToken={addToken} fullTokenList={props.fullTokenList} savedTokenList={savedTokenList} />
        <Button sx={{ marginLeft: "10px" }} variant="contained" size="small" onClick={savedTokensPriceFetch}>
          Refresh
        </Button>
      </Container>
      <Divider />
      <TokenList savedTokenList={savedTokenList} />
    </Card>
  );
}