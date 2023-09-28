// React & Mui
import { Box, Typography, useMediaQuery } from "@mui/material";

// Main
export default function CoinGeckoRef() {
  const mediaSmall = useMediaQuery("(max-width:450px)");

  const flexStyle = mediaSmall ? { alignItems: "flex-end", flexDirection: "column" } : { alignItems: "center", flexDirection: "row" };

  return (
    <Box sx={{ position: "relative", display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "10px", ...flexStyle }}>
      <Typography component="span">Provided by</Typography>
      <a href="https://www.coingecko.com" target="_blank">
        <img height="30px" src="/images/coingecko.svg"></img>
      </a>
    </Box>
  );
}
