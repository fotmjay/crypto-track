import { Box, Button, Container, Typography } from "@mui/material";
import { Token } from "../../../shared/types/types";
import TransactionInput from "./TransactionInput";
import { useState } from "react";

type Props = {
  token: Token;
};

export default function TransactionMenu(props: Props) {
  const [tx, setTx] = useState<string | null>(null);

  function buyAction() {
    setTx("Buy");
  }

  function sellAction() {
    setTx("Sell");
  }

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: "10px" }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.token?.name}
        </Typography>
        <Button onClick={buyAction}>BUY</Button>
        <Button onClick={sellAction}>SELL</Button>
      </Box>
      {tx && <TransactionInput closeInput={() => setTx(null)} txType={tx} token={props.token} />}
    </Container>
  );
}
