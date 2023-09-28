// Components
import TableRows from "./TableComponents/TableRows";
import TableTitles from "./TableComponents/TableTitles";

// Constants
import { tableConfig } from "../../constants/tableConfig";

// React and Mui
import { TableHead, Paper, Table, TableContainer } from "@mui/material";
import { useState, useEffect } from "react";

// Types
import type { Token } from "../../shared/types/types";
import TransactionModal from "./TransactionComponent/TransactionModal";

// Type definition
type Props = {
  savedTokenList: Token[];
  setSavedTokenList: Function;
};

// Main
export default function TokenList(props: Props) {
  const [tokenForModal, setTokenForModal] = useState<Token | null>(null);

  useEffect(() => {
    if (tokenForModal !== null) {
      setTokenForModal((token) => {
        return props.savedTokenList.find((savedToken) => savedToken.id === token?.id) || null;
      });
    }
  }, [props.savedTokenList]);

  function openModal(token: Token) {
    setTokenForModal(token);
  }

  function closeModal() {
    setTokenForModal(null);
  }

  return (
    <TableContainer component={Paper}>
      <Table align="center" size="small" aria-label="simple table">
        {props.savedTokenList.length > 0 && (
          <TableHead>
            <TableTitles categories={tableConfig.mainTableCategories} />
          </TableHead>
        )}
        <TableRows firstElementClick={openModal} namedProperties={tableConfig.mainTableCategories.apiRelated} dataList={props.savedTokenList} />
      </Table>
      {tokenForModal ? <TransactionModal setSavedTokenList={props.setSavedTokenList} token={tokenForModal} closeModal={closeModal} /> : ""}
    </TableContainer>
  );
}
