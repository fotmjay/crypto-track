import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";
import { URL } from "./constants/URL";
import { ENDPOINT } from "./constants/apiEndpoints";
import Dashboard from "./components/Dashboard";
import CoinGeckoRef from "./components/CoinGeckoRef";
import { RATELIMIT } from "./constants/rateLimit";

export default function App() {
  const [fullTokenList, setFullTokenList] = useState<Token[]>(() => {
    const list = localStorage.getItem("fullTokenList");
    return list ? JSON.parse(list) : [];
  });

  function fetchList() {
    const lastUpdated = localStorage.getItem("fullTokenListUpdatedAt") || undefined;
    // If last request was less than X seconds, do not fetch.
    if (lastUpdated === undefined || Date.now() - Date.parse(lastUpdated) > RATELIMIT.fullTokenList) {
      fetch(URL.COINGECKO + ENDPOINT.tokenList)
        .then((res) => res.json())
        .then((data) => {
          setFullTokenList(data);
          localStorage.setItem("fullTokenList", JSON.stringify(data));
          const date = new Date();
          localStorage.setItem("fullTokenListUpdatedAt", date.toISOString());
        });
    }
  }

  return (
    <>
      <Container sx={{ minWidth: "320px" }}>
        <Box
          sx={{
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{
              marginTop: "25px",
              "@media (max-width: 600px)": { fontSize: "4rem", marginTop: "40px" },
              "@media (max-width: 400px)": { fontSize: "2.5rem" },
            }}
            align="center"
            variant="h1"
            gutterBottom
          >
            CryptoTracker
          </Typography>
          <Button sx={{ position: "absolute", right: "0" }} size="small" onClick={fetchList} variant="contained">
            Update Token List
          </Button>
        </Box>
        <Dashboard fullTokenList={fullTokenList} />
        <CoinGeckoRef />
      </Container>
    </>
  );
}
