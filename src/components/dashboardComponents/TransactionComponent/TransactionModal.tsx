import { Box, Button, Divider, Modal, Typography, useMediaQuery } from "@mui/material";
import type { Token, Transaction } from "../../../shared/types/types";
import TransactionMenu from "./TransactionMenu";
import TransactionList from "./TransactionList";
import { useState } from "react";
import SavedTokenDeleteConfirmation from "./SavedTokenDeleteConfirmation";

type Props = {
  token: Token;
  closeModal: Function;
  setSavedTokenList: Function;
};

export default function TransactionModal(props: Props) {
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const mediaSmall = useMediaQuery("(max-width:695px)");
  const modalWidth = mediaSmall ? "90%" : "625px"; // 625px is max size as 90% of 695px is ~625px

  const style = {
    position: "absolute" as "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: modalWidth,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function recalculateAverage() {
    const averageAndAmounts: { amount: number; total: number } = { amount: 0, total: 0 };
    props.token.transactionList.forEach((tx: Transaction) => {
      if (tx.action === "Buy") {
        averageAndAmounts.amount += +tx.amount;
        averageAndAmounts.total += +tx.amount * +tx.price;
      } else {
        averageAndAmounts.amount -= +tx.amount;
        averageAndAmounts.total -= +tx.amount * +tx.price;
      }
    });
    props.setSavedTokenList((oldList: Token[]) => {
      const newList = oldList.map((token: Token) => {
        if (token.id === props.token.id) {
          token.averagePrice = (averageAndAmounts.total / averageAndAmounts.amount).toString();
          token.amount = averageAndAmounts.amount.toString();
        }
        return token;
      });
      localStorage.setItem("savedList", JSON.stringify(newList));
      return newList;
    });
  }

  return (
    <Modal open={props.token !== null} onClose={() => props.closeModal()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {deleteConfirmation ? (
            <SavedTokenDeleteConfirmation
              setDeleteConfirmation={setDeleteConfirmation}
              tokenToDelete={props.token}
              setSavedTokenList={props.setSavedTokenList}
            />
          ) : (
            <Button onClick={() => setDeleteConfirmation(true)}>Delete</Button>
          )}
          <Button onClick={recalculateAverage}>ReCalc Average</Button>
        </Box>
        <Divider sx={{ marginBottom: "8px" }} />
        <TransactionMenu setSavedTokenList={props.setSavedTokenList} token={props.token} />
        {props.token.transactionList.length > 0 ? (
          <TransactionList setSavedTokenList={props.setSavedTokenList} token={props.token} />
        ) : (
          <Typography variant="body2">No transactions listed.</Typography>
        )}
      </Box>
    </Modal>
  );
}
