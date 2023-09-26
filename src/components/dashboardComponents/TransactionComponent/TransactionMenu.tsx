import { Box, Button, Container, Typography } from "@mui/material";
import { Token } from "../../../shared/types/types";
import TransactionInput from "./TransactionInput";
import { useState } from "react";
import txFormatting from "../../../helpers/txFormatting";

type Props = {
  token: Token;
  setSavedTokenList: Function;
};

export default function TransactionMenu(props: Props) {
  const [tx, setTx] = useState<string>("");
  const [tokenPrice, setTokenPrice] = useState<string>(props.token.usd || "");
  const [txAmount, setTxAmount] = useState<string>("");

  function handleClick(action: string) {
    setTokenPrice(props.token.usd || "");
    setTx(action);
  }

  function handleSave() {
    const transaction = txFormatting(txAmount, tokenPrice, tx);
    props.setSavedTokenList((savedTokenList: Token[]) => {
      const newSavedTokenList = savedTokenList.map((token) => {
        let newToken = { ...token };
        if (newToken.transactionList === undefined) {
          newToken.transactionList = [];
        }
        if (newToken.id === props.token.id) {
          newToken.transactionList.push(transaction);
        }
        return newToken;
      });
      localStorage.setItem("savedList", JSON.stringify(newSavedTokenList));
      return newSavedTokenList;
    });
  }

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
        <Typography id="modal-modal-title" variant="body1" component="h2">
          {props.token?.name}
        </Typography>
        <Button onClick={() => handleClick("Buy")}>BUY</Button>
        <Button onClick={() => handleClick("Sell")}>SELL</Button>
      </Box>
      {tx.length > 0 && (
        <TransactionInput
          handleSave={handleSave}
          setTxAmount={setTxAmount}
          txAmount={txAmount}
          setTokenPrice={setTokenPrice}
          tokenPrice={tokenPrice}
          closeInput={() => setTx("")}
          txType={tx}
          token={props.token}
        />
      )}
    </Container>
  );
}
