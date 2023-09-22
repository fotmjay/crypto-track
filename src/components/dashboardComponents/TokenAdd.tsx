// React & Mui
import { Autocomplete, AutocompleteChangeReason, AutocompleteInputChangeReason, Box, TextField, Button } from "@mui/material";
import { useState, useRef } from "react";

// Types
import type { Token } from "../../shared/types/types";

// Types definition
type Props = {
  fullTokenList: Token[];
  addToken: Function;
  savedTokenList: Token[];
};

type SavedTokenCache = {
  [key: string]: boolean;
};

// Main

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
      const savedTokenCache: SavedTokenCache = {};
      props.savedTokenList.forEach((token) => (savedTokenCache[token.id] = true));
      const newList = props.fullTokenList.filter((token) => {
        return (
          !savedTokenCache[token.id] && (token.id.toLowerCase().startsWith(searchText.toLowerCase()) || token.symbol.toLowerCase() === searchText.toLowerCase())
        );
      });
      return newList;
    }
  }

  function formatLabel(option: Token) {
    return `${option.name} - ${option.symbol.toUpperCase()}`;
  }

  function addTokenToSavedList() {
    if (selectedToken !== null) {
      props.addToken(selectedToken.current);
      setSearchText("");
      selectedToken.current = null;
    }
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
        value={selectedToken.current}
        renderOption={(props, option) => {
          return (
            <Box component="li" key={option.id} {...props}>
              {formatLabel(option)}
            </Box>
          );
        }}
        renderInput={(params) => {
          return <TextField {...params} value={searchText} label="Tokens" />;
        }}
      />
      <Button
        sx={{ justifySelf: "flex-end", marginLeft: "20px" }}
        onClick={addTokenToSavedList}
        disabled={selectedToken.current ? false : true}
        variant="contained"
      >
        Add
      </Button>
    </>
  );
}
