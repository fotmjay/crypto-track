import TableRows from "../TableComponents/TableRows";
import { TableContainer, Paper, Table, TableHead } from "@mui/material";
import { tableConfig } from "../../../constants/tableConfig";
import TableTitles from "../TableComponents/TableTitles";
import { Token, Transaction } from "../../../shared/types/types";
import { useState } from "react";
import ConfirmationModalDialog from "../ConfirmationModalDialog";
import calculateAveragePriceAndTotalAmount from "../../../helpers/calculateAverage";

type Props = {
  token: Token;
  setSavedTokenList: Function;
};

export default function TransactionList(props: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction>();

  function removeTransactionFromList() {
    if (transactionToDelete === undefined) {
      return;
    }
    props.setSavedTokenList((oldList: Token[]) => {
      const newList: Token[] = [];
      oldList.forEach((tokenFromList: Token) => {
        if (tokenFromList !== props.token) {
          newList.push(tokenFromList);
        } else {
          const newToken = { ...tokenFromList };
          newToken.transactionList = newToken.transactionList.filter((tx: Transaction) => {
            return tx.txDate !== transactionToDelete.txDate || tx.amount !== transactionToDelete.amount;
          });
          const newAmounts = resetAverageAndTotalPrice(
            props.token.averagePrice,
            props.token.amount,
            transactionToDelete.price,
            transactionToDelete.amount,
            transactionToDelete.action === "Buy" ? "Sell" : "Buy"
          );
          newToken.averagePrice = 0 + newAmounts.averagePrice;
          newToken.amount = 0 + newAmounts.amount;
          newList.push(newToken);
        }
      });
      localStorage.setItem("savedList", JSON.stringify(newList));
      return newList;
    });
    setOpenDialog(false);
    setTransactionToDelete(undefined);
  }

  function resetAverageAndTotalPrice(prevAverage: string, prevAmount: string, price: string, amount: string, action: string) {
    return calculateAveragePriceAndTotalAmount(prevAverage, prevAmount, price, amount, action);
  }

  function openModalForDeleteConfirmation(tx: Transaction) {
    setTransactionToDelete(tx);
    setOpenDialog(true);
  }

  return (
    <TableContainer component={Paper}>
      <Table align="center" size="small" aria-label="simple table">
        <TableHead>
          <TableTitles categories={tableConfig.txDataTableCategories} />
        </TableHead>
        <TableRows
          firstElementClick={openModalForDeleteConfirmation}
          namedProperties={tableConfig.txDataTableCategories.apiRelated}
          dataList={props.token.transactionList}
        />
        <ConfirmationModalDialog isDialogOpen={openDialog} actionOnConfirm={removeTransactionFromList} closeDialog={() => setOpenDialog(false)} />
      </Table>
    </TableContainer>
  );
}
