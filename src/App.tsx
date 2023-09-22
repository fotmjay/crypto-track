// COMPONENTS
import CoinGeckoRef from "./components/CoinGeckoRef";
import Dashboard from "./components/Dashboard";

// CONSTANTS
import { URL } from "./constants/URL";
import { ENDPOINT } from "./constants/apiEndpoints";
import { RATELIMIT } from "./constants/rateLimit";

// HELPERS
import { lsGet, lsSet } from "./helpers/localStorageHelper";

// ICONS

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

// REACT & MATERIAL IMPORTS
import { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// TYPES
import { Token } from "./shared/types/types";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [fullTokenList, setFullTokenList] = useState<Token[]>(() => lsGet.list("fullTokenList"));
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (fullTokenList.length === 0) {
      fetchList();
    }
  }, []);

  function fetchList() {
    const lastUpdated = lsGet.date("fullTokenListUpdatedAt");
    // If last request was less than RATELIMIT seconds, do not fetch.
    if (lastUpdated === undefined || Date.parse(new Date().toISOString()) - lastUpdated > RATELIMIT.fullTokenList) {
      lsSet.date("fullTokenListUpdatedAt");
      fetch(URL.COINGECKO + ENDPOINT.tokenList)
        .then((res) => res.json())
        .then((data) => {
          setErrorMessage("");
          setFullTokenList(data);
          localStorage.setItem("fullTokenList", JSON.stringify(data));
        })
        .catch((err) => {
          setErrorMessage("Failed to receive data from CoinGecko.");
          console.error(err);
        });
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{ marginTop: "1rem", minWidth: "320px" }}>
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
        {errorMessage ? (
          <Typography align="center" color="error">
            {errorMessage}
          </Typography>
        ) : (
          ""
        )}
        <Dashboard setErrorMessage={setErrorMessage} fullTokenList={fullTokenList} />
        <CoinGeckoRef />
      </Container>
    </ThemeProvider>
  );
}
