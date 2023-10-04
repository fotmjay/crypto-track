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
import { Card, Divider, Container, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

// Icons

import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

// Types
import type { CoinGecko, Token } from "../shared/types/types";
import ImportExportData from "./dashboardComponents/ImportExportData";
import FullWalletModal from "./dashboardComponents/FullWalletModal";

// Types definition
type Props = {
  fullTokenList: Token[];
  setErrorMessage: Function;
};

// Main

function createTokenModel(token: Partial<Token>): Token {
  return {
    usd: "",
    usd_market_cap: "",
    usd_24h_change: "",
    averagePrice: "",
    amount: "",
    name: capitalizeFirstLetter(token.name || ""),
    symbol: token.symbol || "",
    transactionList: [],
    id: token.id || "",
  };
}

export default function Dashboard(props: Props) {
  const [savedTokenList, setSavedTokenList] = useState<Token[]>(lsGet.list("savedList"));
  const [hideAmount, setHideAmount] = useState(localStorage.getItem("hideWalletAmount") === "true" || false);
  const [fullWalletModal, setFullWalletModal] = useState(false);

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
          newList.push(createTokenModel(token));
        }
        localStorage.setItem("savedList", JSON.stringify(newList));
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

  const value = savedTokenList.reduce((acc, v) => acc + +v.amount * +v.usd, 0);

  function toggleWalletTotal() {
    setHideAmount((toggle) => {
      localStorage.setItem("hideWalletAmount", `${!toggle}`);
      return !toggle;
    });
  }

  return (
    <Card sx={{ position: "relative", overflow: "visible" }} variant="outlined">
      <Container sx={{ display: "flex", justifyContent: "center", alignContent: "center", padding: "20px" }}>
        <TokenAdd addToken={addToken} fullTokenList={props.fullTokenList} savedTokenList={savedTokenList} />
        <Button sx={{ marginLeft: "10px" }} variant="contained" size="small" onClick={savedTokensPriceFetch}>
          Refresh
        </Button>
      </Container>
      <Divider />

      {savedTokenList.length > 0 && (
        <Typography padding="12px" align="center" variant="h4">
          {hideAmount ? "******" : `${value.toFixed(0)}$`}
          <VisibilityIcon onClick={toggleWalletTotal} sx={{ marginLeft: "15px" }} fontSize="medium" />
          <AccountBalanceWalletIcon sx={{ marginLeft: "15px" }} onClick={() => setFullWalletModal(true)} />
        </Typography>
      )}
      <Divider />
      {fullWalletModal && <FullWalletModal savedTokenList={savedTokenList} open={fullWalletModal} closeModal={() => setFullWalletModal(false)} />}
      <TokenList setSavedTokenList={setSavedTokenList} savedTokenList={savedTokenList} />
      <ImportExportData setSavedTokenList={setSavedTokenList} />
    </Card>
  );
}
