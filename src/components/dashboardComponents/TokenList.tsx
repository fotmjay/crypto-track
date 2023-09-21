import { TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

type Props = {
  tokenList: Token[];
};

function createData(token: Token, currentPrice: number, marketCap: number, amount?: number, avgBuyPrice?: number) {
  return { token, currentPrice, marketCap, amount, avgBuyPrice };
}

const rows = [createData({ id: "bitcoin", symbol: "btc", name: "bitcoin" }, 26_000, 500_000_000_000, 5, 25_000)];

export default function TokenList(props: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell align="right">Current Price</TableCell>
            <TableCell align="right">Market Capitalization</TableCell>
            <TableCell align="right">Amount Held</TableCell>
            <TableCell align="right">Average Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.token.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.token.name}
              </TableCell>
              <TableCell align="right">{row.currentPrice}</TableCell>
              <TableCell align="right">{row.marketCap}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.avgBuyPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
