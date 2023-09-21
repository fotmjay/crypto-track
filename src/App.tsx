import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";
import { URL } from "./constants/URL";
import TokenAdd from "./components/TokenAdd";

export default function App() {
  const [coinList, setCoinList] = useState<Token[]>(() => {
    const list = localStorage.getItem("list");
    return list ? JSON.parse(list) : [];
  });

  function fetchList() {
    fetch(URL.COINGECKO + "coins/list")
      .then((res) => res.json())
      .then((data) => {
        setCoinList(data);
        localStorage.setItem("list", JSON.stringify(data));
      });
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
            Update Data
          </Button>
        </Box>
        <TokenAdd coinList={coinList} />
      </Container>
    </>
  );
}
