// React & Mui
import { TableRow, TableCell, TableBody } from "@mui/material";

// Types
import type { Props } from "./TableRowsTypes";
import { Token } from "../../../shared/types/types";

// Main
export default function TableRows(props: Props) {
  function openModal(token: Token) {
    props.openModal(token);
  }

  return (
    <TableBody>
      {props.savedTokenList.map((token) => {
        return (
          <TableRow key={token.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {props.namedProperties.map((property, i) => {
              const cursorType = i === 0 ? "pointer" : "cursor";
              const alignment = i === 0 ? "left" : "right";
              return (
                <TableCell sx={{ cursor: cursorType }} key={`${property}`} align={alignment} onClick={() => openModal(token)}>
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
