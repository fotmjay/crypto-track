import { Autocomplete, AutocompleteChangeReason, AutocompleteInputChangeReason, Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, useRef } from "react";

type Props = {
  coinList: Token[];
  addToken: Function;
};

export default function TokenAdd(props: Props) {
  const [searchText, setSearchText] = useState("");
  const selectedToken = useRef<Token | null>(null);

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
      const newList = props.coinList.filter((token) => {
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
      <Button
        sx={{ justifySelf: "flex-end", marginLeft: "20px" }}
        onClick={() => props.addToken(selectedToken.current || null)}
        disabled={selectedToken.current ? false : true}
        variant="contained"
      >
        Add
      </Button>
    </>
  );
}
