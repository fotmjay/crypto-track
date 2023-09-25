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
  const [changedPrice, setChangedPrice] = useState<string | null>(null);

  const mediaSmall = useMediaQuery("(max-width:550px)");

  const display = mediaSmall ? "block" : "flex";

  function handleChange(event: React.ChangeEvent<HTMLInputElement>, stateChange: Function) {
    if (/^[+-]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/.test(event.target.value) || event.target.value === "") {
      stateChange(event.target.value);
    }
  }

  function modifyPrice() {
    setTogglePriceTextField(true);
  }

  function handleSave() {
    console.log("saved: " + amount);
  }

  return (
    <Box sx={{ display: { display }, justifyContent: "center", alignItems: "center", alignContent: "center" }}>
      <Box marginLeft="auto">
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
            defaultValue={props.token.usd}
            value={changedPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setChangedPrice)}
          />
        ) : (
          <Typography onClick={modifyPrice} variant="caption" fontSize="0.8125rem" px="8px" lineHeight="1.75">
            ${changedPrice ? changedPrice : props.token.usd}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
