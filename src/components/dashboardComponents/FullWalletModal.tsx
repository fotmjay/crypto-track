import TableRows from "./TableComponents/TableRows";
import { TableContainer, Paper, Table, TableHead, Box, Modal, useMediaQuery, Typography } from "@mui/material";
import { tableConfig } from "../../constants/tableConfig";
import { Token } from "../../shared/types/types";
import TableTitles from "./TableComponents/TableTitles";
import { useRef } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

type Props = {
  savedTokenList: Token[];
  open: boolean;
  closeModal: () => void;
};

export default function FullWalletModal(props: Props) {
  const mediaSmall = useMediaQuery("(max-width:695px)");
  const modalWidth = mediaSmall ? "90%" : "625px"; // 625px is max size as 90% of 695px is ~625px
  const totalPaid = useRef<number>(0);
  const totalValue = useRef<number>(0);

  const style = {
    position: "absolute" as const,
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: modalWidth,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function prepareTokenList() {
    totalPaid.current = 0;
    totalValue.current = 0;
    const filteredListWithTotals: Token[] = [];
    props.savedTokenList.forEach((token: Token) => {
      const tokenAmount = 0 + parseFloat(token.amount);
      if (!isNaN(tokenAmount) && tokenAmount !== 0) {
        const updatedToken = { ...token, total: "0", paid: "0", color: "" };
        updatedToken.total = (parseFloat(token.amount) * parseFloat(token.usd)).toString();
        totalValue.current! += +updatedToken.total;
        updatedToken.paid = (parseFloat(token.amount) * parseFloat(token.averagePrice)).toFixed(0);
        totalPaid.current! += +updatedToken.paid;
        updatedToken.color = parseInt(updatedToken.paid, 10) > parseInt(updatedToken.total, 10) ? "red" : "lightgreen";
        filteredListWithTotals.push(updatedToken);
      }
    });
    return filteredListWithTotals.sort((a, b) => parseFloat(b.total || "0") - parseFloat(a.total || "0"));
  }

  const tokenHeldList = prepareTokenList();
  const positiveReturns = totalPaid.current > totalValue.current;
  return (
    <Modal open={props.open} onClose={() => props.closeModal()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box maxHeight="50vh" overflow="auto" sx={style}>
        <Typography gutterBottom variant="h4" textAlign="center">
          Wallet details
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box maxWidth="175px" display="flex" flexWrap="wrap" alignItems="space-between" justifyContent="flex-end">
            <Typography>Total Paid: {totalPaid.current.toFixed(0)}$</Typography>
            <Typography gutterBottom>Current Value: {totalValue.current!.toFixed(0)}$</Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography>{((totalValue.current / totalPaid.current - 1) * 100).toFixed(2)}%</Typography>
            {positiveReturns ? <ArrowDownwardIcon fontSize="large" /> : <ArrowUpwardIcon fontSize="large" />}
          </Box>
        </Box>
        <TableContainer sx={{ position: "relative" }} component={Paper}>
          <Table align="center" size="small" aria-label="simple table">
            {props.savedTokenList.length > 0 && (
              <TableHead>
                <TableTitles categories={tableConfig.walletTotalCategories} />
              </TableHead>
            )}
            <TableRows namedProperties={tableConfig.walletTotalCategories.apiRelated} dataList={tokenHeldList} />
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
}
