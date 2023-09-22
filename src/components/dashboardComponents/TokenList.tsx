// Components
import TableRows from "./TableComponents/TableRows";
import TableTitles from "./TableComponents/TableTitles";

// Constants
import { tableConfig } from "../../constants/tableConfig";

// React and Mui
import { TableHead, Paper, Table, TableContainer } from "@mui/material";

// Types
import type { Token } from "../../shared/types/types";

// Type definition
type Props = {
  savedTokenList: Token[];
};

// Main
export default function TokenList(props: Props) {
  return (
    <TableContainer component={Paper}>
      <Table align="center" size="small" aria-label="simple table">
        <TableHead>
          <TableTitles categories={tableConfig.mainTableCategories} />
        </TableHead>
        <TableRows namedProperties={tableConfig.mainTableCategories.apiRelated} savedTokenList={props.savedTokenList} />
      </Table>
    </TableContainer>
  );
}
