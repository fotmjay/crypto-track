import { Box, Button, Container, Typography } from "@mui/material";
import { Token } from "../../../shared/types/types";
import TransactionInput from "./TransactionInput";
import { useState } from "react";
import txFormatting from "../../../helpers/txFormatting";
import calculateAveragePriceAndTotalAmount from "../../../helpers/calculateAverage";
import { smallNumberFormat } from "../../../helpers/numberFormatting";

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
        if (newToken.id === props.token.id) {
          const updatedData = calculateAveragePriceAndTotalAmount(newToken.averagePrice, newToken.amount, tokenPrice, txAmount, tx);
          newToken.amount = updatedData.amount;
          newToken.averagePrice = updatedData.averagePrice;
          newToken.transactionList.push(transaction);
        }
        return newToken;
      });
      localStorage.setItem("savedList", JSON.stringify(newSavedTokenList));
      return newSavedTokenList;
    });
    setTxAmount("");
  }

  function formatAverage(amount: string, average: string) {
    if (parseInt(amount) === 0) {
      const avg = parseInt(average, 10);
      return `Current ${avg > 0 ? "loss" : "profit"}: ${Math.abs(avg)}$`;
    } else {
      return `${smallNumberFormat(parseFloat(amount))} @ $${smallNumberFormat(parseFloat(average))}`;
    }
  }

  return (
    <Container>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
          <Typography id="modal-modal-title" variant="body1" component="h2">
            {props.token?.name}
          </Typography>
          <Button onClick={() => handleClick("Buy")}>BUY</Button>
          <Button onClick={() => handleClick("Sell")}>SELL</Button>
        </Box>
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
      {props.token.averagePrice && (
        <Typography variant="h6" gutterBottom textAlign="left">
          {formatAverage(props.token.amount, props.token.averagePrice)}
        </Typography>
      )}
    </Container>
  );
}
