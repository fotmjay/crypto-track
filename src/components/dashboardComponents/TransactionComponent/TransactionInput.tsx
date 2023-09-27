import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Token } from "../../../shared/types/types";

type Props = {
  token: Token;
  txType: string;
  closeInput: Function;
  tokenPrice: string;
  setTokenPrice: Function;
  txAmount: string;
  setTxAmount: Function;
  handleSave: Function;
  errorMessage: string;
};

export default function TransactionInput(props: Props) {
  const [togglePriceTextField, setTogglePriceTextField] = useState<boolean>(false);

  const mediaSmall = useMediaQuery("(max-width:550px)");
  // Work around to make the TextField the size of the text in it.
  const inputSize = `${props.tokenPrice.length * 11}px`;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>, stateChange: Function) {
    // VALIDATE ONLY FLOAT (1, 0.1, 1.2)
    if (/^[+-]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/.test(event.target.value) || event.target.value === "") {
      stateChange(event.target.value);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.keyCode === 13) {
      modifyPrice();
    }
  }

  function modifyPrice() {
    setTogglePriceTextField((toggle) => !toggle);
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
      <Box marginX={mediaSmall ? "auto" : "inherit"}>
        <TextField
          sx={{ paddingBottom: "10px" }}
          color={props.txType === "Buy" ? "success" : "error"}
          label={props.txType}
          size="small"
          value={props.txAmount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, props.setTxAmount)}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "10px" }}>
        <Button size="small" onClick={() => props.handleSave()}>
          SAVE
        </Button>
        <Button size="small" onClick={() => props.closeInput()}>
          CLOSE
        </Button>
        {togglePriceTextField ? (
          <TextField
            size="small"
            autoFocus={true}
            inputProps={{ sx: { width: inputSize, padding: "6px" } }}
            value={props.tokenPrice}
            onBlur={modifyPrice}
            onKeyDown={handleKeyDown}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, props.setTokenPrice)}
          />
        ) : (
          <Typography onClick={modifyPrice} variant="caption" fontSize="0.8125rem" px="8px" lineHeight="1.75">
            ${props.tokenPrice}
          </Typography>
        )}
      </Box>
      <Typography gutterBottom variant="body1" color="error">
        {props.errorMessage}
      </Typography>
    </Box>
  );
}
