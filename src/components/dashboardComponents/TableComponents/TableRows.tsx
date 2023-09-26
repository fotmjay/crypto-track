// React & Mui
import { TableRow, TableCell, TableBody } from "@mui/material";

// Types
import type { Props } from "./TableRowsTypes";
import { Token } from "../../../shared/types/types";

// Main
export default function TableRows(props: Props) {
  const clickable = props.firstElementClick === null ? false : true;
  function handleClick(token: Token) {
    if (props.firstElementClick !== null) {
      props.firstElementClick(token);
    }
  }

  return (
    <TableBody>
      {props.dataList.map((data: any) => {
        return (
          <TableRow key={data.id || data.txDate} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {props.namedProperties.map((property, i) => {
              const cursorType = i === 0 && clickable ? "pointer" : "cursor";
              const alignment = i === 0 ? "left" : "right";
              return (
                <TableCell sx={{ cursor: cursorType }} key={`${property}`} align={alignment} onClick={() => handleClick(data)}>
                  {data[property] || "N/A"}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
