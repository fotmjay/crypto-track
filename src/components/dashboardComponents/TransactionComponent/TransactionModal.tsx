import { Box, Button, Modal, Typography, useMediaQuery } from "@mui/material";
import type { Token } from "../../../shared/types/types";
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

  return (
    <Modal open={props.token !== null} onClose={() => props.closeModal()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          {deleteConfirmation ? (
            <SavedTokenDeleteConfirmation
              setDeleteConfirmation={setDeleteConfirmation}
              tokenToDelete={props.token}
              setSavedTokenList={props.setSavedTokenList}
            />
          ) : (
            <Button onClick={() => setDeleteConfirmation(true)}>Delete</Button>
          )}
        </Box>
        <TransactionMenu setSavedTokenList={props.setSavedTokenList} token={props.token} />
        {props.token.transactionList.length > 0 ? <TransactionList token={props.token} /> : <Typography variant="body2">No transactions listed.</Typography>}
      </Box>
    </Modal>
  );
}
