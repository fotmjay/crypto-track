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
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleClick(action: string) {
    setTokenPrice(props.token.usd || "");
    setTx(action);
    setErrorMessage("");
  }

  function handleSave() {
    if (txAmount === "" || txAmount === "0") {
      setErrorMessage("Amount needs to be greater than 0.");
      return;
    } else if (tx === "Sell" && txAmount > props.token.amount) {
      setErrorMessage(`Amount sold (${txAmount}) has to be lower than amount bought (${props.token.amount}).`);
      return;
    }
    setErrorMessage("");
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
    setTx("");
  }

  function formatAverage(amount: string, average: string) {
    if (parseFloat(amount) === 0) {
      const avg = parseInt(average, 10);
      return `Current ${avg > 0 ? "loss" : "profit"}: ${Math.abs(avg)}$`;
    } else {
      return `${smallNumberFormat(parseFloat(amount))} @ $${smallNumberFormat(parseFloat(average))} | Total: ${(+amount * +average).toFixed(2)}$`;
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
          errorMessage={errorMessage}
        />
      )}
      {tx.length === 0 && props.token.averagePrice && (
        <Typography variant="body1" gutterBottom paddingX="0" textAlign="center">
          {formatAverage(props.token.amount, props.token.averagePrice)}
        </Typography>
      )}
    </Container>
  );
}
