// React & Mui
import { TableRow, TableCell, TableBody } from "@mui/material";

// Types
import type { Props } from "./TableRowsTypes";

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
              let cursorType = "cursor";
              let alignment: "right" | "left" = "right";
              let onClickFunction = undefined;
              if (i === 0) {
                alignment = "left";
                cursorType = props.firstElementClick ? "pointer" : "cursor";
                onClickFunction = handleClick;
              }
              let fontColor = "";
              switch (data.action) {
                case "Buy":
                  fontColor = "lightgreen";
                  break;
                case "Sell":
                  fontColor = "red";
                  break;
                default:
                  break;
              }
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
