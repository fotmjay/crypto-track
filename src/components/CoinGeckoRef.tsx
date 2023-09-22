// React & Mui
import { Box, Typography } from "@mui/material";

// Main
export default function CoinGeckoRef() {
  return (
    <Box sx={{ position: "relative", display: "flex", gap: "10px", justifyContent: "flex-end", alignItems: "center", marginTop: "10px" }}>
      <Typography component="span">Provided by</Typography>
      <a href="https://www.coingecko.com" target="_blank">
        <img height="30px" src="src\assets\images\coingecko.svg"></img>
      </a>
    </Box>
  );
}
