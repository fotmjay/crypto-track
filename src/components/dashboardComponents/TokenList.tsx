import { TableHead, TableBody } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRows from "./TableComponents/TableRows";
import TableTitles from "./TableComponents/TableTitles";

type Props = {
  savedTokenList: Token[];
};

export default function TokenList(props: Props) {
  return (
    <TableContainer component={Paper}>
      <Table align="center" size="small" aria-label="simple table">
        <TableHead>
          <TableTitles />
        </TableHead>
        <TableRows savedTokenList={props.savedTokenList} />
      </Table>
    </TableContainer>
  );
}
