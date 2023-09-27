// React & Mui
import { TableRow, TableCell, TableBody } from "@mui/material";

// Types
import type { Props } from "./TableRowsTypes";
import { Token, Transaction } from "../../../shared/types/types";

import { smallNumberFormat } from "../../../helpers/numberFormatting";
import dateFormat from "../../../helpers/dateFormat";

// Main
export default function TableRows(props: Props) {
  const numbersPropertiesToFormat = ["amount", "price", "total", "averagePrice"];

  return (
    <TableBody>
      {props.dataList.map((data: any) => {
        function handleClick() {
          if (props.firstElementClick !== undefined) {
            props.firstElementClick(data);
          }
        }
        return (
          <TableRow key={data.id || data.txDate} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {props.namedProperties.map((property, i) => {
              const cursorType = i === 0 && props.firstElementClick ? "pointer" : "cursor";
              const alignment = i === 0 ? "left" : "right";
              const fontColor = data.action === "Buy" ? "lightgreen" : data.action === "Sell" ? "red" : "";
              const onClickFunction = i === 0 ? handleClick : undefined;
              return (
                <TableCell sx={{ cursor: cursorType, color: fontColor }} key={property} align={alignment} onClick={onClickFunction}>
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
