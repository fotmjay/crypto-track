import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteChangeReason, AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { useState, useRef } from "react";
import { URL } from "./constants/URL";

type Token = {
  id: string;
  symbol: string;
  name: string;
};

export default function App() {
  const [coinList, setCoinList] = useState<Token[]>(() => {
    const list = localStorage.getItem("list");
    return list ? JSON.parse(list) : [];
  });
  const [searchText, setSearchText] = useState("");

  const selectedToken = useRef<Token | null>(null);

  function fetchList() {
    fetch(URL.COINGECKO + "coins/list")
      .then((res) => res.json())
      .then((data) => {
        setCoinList(data);
        localStorage.setItem("list", JSON.stringify(data));
      });
  }

  function handleInputChange(_event: React.SyntheticEvent<Element, Event>, value: string, _reason: AutocompleteInputChangeReason) {
    setSearchText(value);
  }

  function handleChange(_event: React.SyntheticEvent<Element, Event>, value: Token | null, _reason: AutocompleteChangeReason) {
    selectedToken.current = value;
  }

  function createOptions() {
    if (searchText.length < 3) {
      return [];
    } else {
      const newList = coinList.filter((token) => {
        return token.id.toLowerCase().startsWith(searchText.toLowerCase()) || token.symbol.toLowerCase() === searchText.toLowerCase();
      });
      return newList;
    }
  }

  function formatLabel(option: Token) {
    return `${option.name} - ${option.symbol.toUpperCase()}`;
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
          <Typography sx={{ marginTop: "25px", "@media (max-width: 600px)": { fontSize: "3rem" } }} align="center" variant="h1" gutterBottom>
            CryptoTracker
          </Typography>
          <Button sx={{ position: "absolute", right: "0" }} size="small" onClick={fetchList} variant="contained">
            Update Data
          </Button>
        </Box>
        <Card sx={{ display: "flex", justifyContent: "center", alignContet: "center", padding: "20px" }} variant="outlined">
          <Autocomplete
            onInputChange={handleInputChange}
            onChange={handleChange}
            disablePortal
            id="optionList"
            options={createOptions()}
            filterOptions={(options) => options}
            getOptionLabel={formatLabel}
            sx={{ width: 300 }}
            renderOption={(props, option) => {
              return (
                <Box component="li" {...props}>
                  {formatLabel(option)}
                </Box>
              );
            }}
            renderInput={(params) => {
              return <TextField {...params} label="Tokens" />;
            }}
          />
          <Button sx={{ justifySelf: "flex-end", marginLeft: "20px" }} onClick={fetchList} variant="contained">
            Add
          </Button>
        </Card>
      </Container>
    </>
  );
}
