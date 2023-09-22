// React & Mui
import { TableRow, TableCell, TableBody } from "@mui/material";

// Types
import type { Props } from "./TableRowsTypes";

// Main
export default function TableRows(props: Props) {
  return (
    <TableBody>
      {props.savedTokenList.map((token) => {
        return (
          <TableRow key={token.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {props.namedProperties.map((property, i) => {
              return (
                <TableCell key={`${property}${i}`} align={i === 0 ? "left" : "right"}>
                  {token[property] || "N/A"}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
