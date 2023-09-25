import { Box, Modal, useMediaQuery } from "@mui/material";
import { Token } from "../../../shared/types/types";
import { lsGet, lsKey } from "../../../helpers/localStorageHelper";
import { useState } from "react";
import TransactionMenu from "./TransactionMenu";

type Props = {
  token: Token;
  closeModal: Function;
};

type txData = {
  transactions: Transaction[];
};

type Transaction = {
  txDate: string;
  price: string;
  amount: string;
};

export default function TransactionModal(props: Props) {
  const [txData, setTxData] = useState<txData | null>(lsGet.list(lsKey.format(props.token)) || null);

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
    <div>
      <Modal open={props.token !== null} onClose={() => props.closeModal()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <TransactionMenu token={props.token} />
        </Box>
      </Modal>
    </div>
  );
}
