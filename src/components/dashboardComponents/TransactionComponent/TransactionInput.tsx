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

  const mediaSmall = useMediaQuery("(max-width:550px)");

  const display = mediaSmall ? "block" : "flex";

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (/^[+-]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/.test(event.target.value) || event.target.value === "") {
      setAmount(event.target.value);
    }
  }

  function handleSave() {
    console.log("saved: " + amount);
  }

  return (
    <Box sx={{ display: { display }, justifyContent: "flex-start", alignItems: "center" }}>
      <TextField label={props.txType} size="small" value={amount} onChange={handleChange}></TextField>
      <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
        <Button size="small" onClick={handleSave}>
          SAVE
        </Button>
        <Button size="small" onClick={() => props.closeInput()}>
          CLOSE
        </Button>
        <Typography variant="caption" fontSize="0.8125rem" px="8px" lineHeight="1.75">
          ${props.token.usd}
        </Typography>
      </Box>
    </Box>
  );
}
