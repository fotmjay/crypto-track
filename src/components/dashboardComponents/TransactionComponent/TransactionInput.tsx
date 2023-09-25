import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Token } from "../../../shared/types/types";

type Props = {
  token: Token;
  txType: string;
  closeInput: Function;
};

export default function TransactionInput(props: Props) {
  const [amount, setAmount] = useState<string>("");
  const [togglePriceTextField, setTogglePriceTextField] = useState<boolean>(false);
  const [tokenPrice, setTokenPrice] = useState<string>(props.token.usd || "");

  const mediaSmall = useMediaQuery("(max-width:550px)");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>, stateChange: Function) {
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

  function handleSave() {
    console.log("saved: " + amount);
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
      <Box marginX={mediaSmall ? "auto" : "inherit"}>
        <TextField
          sx={{ paddingBottom: "10px" }}
          color={props.txType === "Buy" ? "success" : "error"}
          label={props.txType}
          size="small"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setAmount)}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "10px" }}>
        <Button size="small" onClick={handleSave}>
          SAVE
        </Button>
        <Button size="small" onClick={() => props.closeInput()}>
          CLOSE
        </Button>
        {togglePriceTextField ? (
          <TextField
            size="small"
            value={tokenPrice || ""}
            onBlur={modifyPrice}
            onKeyDown={handleKeyDown}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setTokenPrice)}
          />
        ) : (
          <Typography onClick={modifyPrice} variant="caption" fontSize="0.8125rem" px="8px" lineHeight="1.75">
            ${tokenPrice}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
