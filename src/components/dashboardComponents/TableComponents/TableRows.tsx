// React & Mui
import { TableRow, TableCell, TableBody } from "@mui/material";

// Types
import type { Props } from "./TableRowsTypes";
import { Token, Transaction } from "../../../shared/types/types";

import { smallNumberFormat } from "../../../helpers/numberFormatting";
import dateFormat from "../../../helpers/dateFormat";

// Main
export default function TableRows(props: Props) {
  const clickable = props.firstElementClick === null ? false : true;
  function handleClick(token: Token | Transaction) {
    if (props.firstElementClick !== null) {
      props.firstElementClick(token);
    }
  }

  const numbersPropertiesToFormat = ["amount", "price", "total", "averagePrice"];

  return (
    <TableBody>
      {props.dataList.map((data: Token | Transaction) => {
        return (
          <TableRow key={data.id || data.txDate} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {props.namedProperties.map((property, i) => {
              const cursorType = i === 0 && clickable ? "pointer" : "cursor";
              const alignment = i === 0 ? "left" : "right";
              const fontColor = data.action === "Buy" ? "lightgreen" : data.action === "Sell" ? "red" : "";
              return (
                <TableCell sx={{ cursor: cursorType, color: fontColor }} key={`${property}`} align={alignment} onClick={() => handleClick(data)}>
                  {numbersPropertiesToFormat.includes(property)
                    ? smallNumberFormat(parseFloat(data[property]))
                    : property === "txDate"
                    ? dateFormat(data[property])
                    : data[property] || "N/A"}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
