// Components
import TableRows from "./TableComponents/TableRows";
import TableTitles from "./TableComponents/TableTitles";

// Constants
import { tableConfig } from "../../constants/tableConfig";

// React and Mui
import { TableHead, Paper, Table, TableContainer } from "@mui/material";
import { useState } from "react";

// Types
import type { Token } from "../../shared/types/types";
import TransactionModal from "./TransactionComponent/TransactionModal";

// Type definition
type Props = {
  savedTokenList: Token[];
};

// Main
export default function TokenList(props: Props) {
  const [tokenForModal, setTokenForModal] = useState<Token | null>(null);

  function openModal(token: Token) {
    setTokenForModal(token);
  }

  function closeModal() {
    setTokenForModal(null);
  }

  return (
    <TableContainer component={Paper}>
      <Table align="center" size="small" aria-label="simple table">
        <TableHead>
          <TableTitles categories={tableConfig.mainTableCategories} />
        </TableHead>
        <TableRows openModal={openModal} namedProperties={tableConfig.mainTableCategories.apiRelated} savedTokenList={props.savedTokenList} />
      </Table>
      {tokenForModal ? <TransactionModal token={tokenForModal} closeModal={closeModal} /> : ""}
    </TableContainer>
  );
}
