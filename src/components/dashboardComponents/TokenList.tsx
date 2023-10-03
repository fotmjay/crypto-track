// Components
import TableRows from "./TableComponents/TableRows";
import TableTitles from "./TableComponents/TableTitles";

// Constants
import { tableConfig } from "../../constants/tableConfig";

// React and Mui
import { TableHead, Paper, Table, TableContainer } from "@mui/material";
import React, { useState, useEffect, SetStateAction } from "react";

// Types
import type { Token } from "../../shared/types/types";
import TransactionModal from "./TransactionComponent/TransactionModal";
import ListLock from "./TableComponents/ListLock";

// Type definition
type Props = {
  savedTokenList: Token[];
  setSavedTokenList: React.Dispatch<SetStateAction<Token[]>>;
};

// Main
export default function TokenList(props: Props) {
  const [tokenForModal, setTokenForModal] = useState<Token | null>(null);
  const [toggleLock, setToggleLock] = useState(false);

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
    <TableContainer sx={{ position: "relative" }} component={Paper}>
      <ListLock setToggleLock={setToggleLock} toggleLock={toggleLock} />
      <Table align="center" size="small" aria-label="simple table">
        {props.savedTokenList.length > 0 && (
          <TableHead>
            <TableTitles categories={tableConfig.mainTableCategories} />
          </TableHead>
        )}
        <TableRows
          setDataList={props.setSavedTokenList}
          draggable={toggleLock}
          firstElementClick={openModal}
          namedProperties={tableConfig.mainTableCategories.apiRelated}
          dataList={props.savedTokenList}
        />
      </Table>
      {tokenForModal ? <TransactionModal setSavedTokenList={props.setSavedTokenList} token={tokenForModal} closeModal={closeModal} /> : ""}
    </TableContainer>
  );
}
