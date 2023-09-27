import TableRows from "../TableComponents/TableRows";
import { TableContainer, Paper, Table, TableHead } from "@mui/material";
import { tableConfig } from "../../../constants/tableConfig";
import TableTitles from "../TableComponents/TableTitles";
import { Token } from "../../../shared/types/types";

type Props = {
  token: Token;
};

export default function TransactionList(props: Props) {
  return (
    <TableContainer component={Paper}>
      <Table align="center" size="small" aria-label="simple table">
        <TableHead>
          <TableTitles categories={tableConfig.txDataTableCategories} />
        </TableHead>
        <TableRows namedProperties={tableConfig.txDataTableCategories.apiRelated} dataList={props.token.transactionList} />
      </Table>
    </TableContainer>
  );
}
