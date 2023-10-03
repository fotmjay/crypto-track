import { TableCell, useMediaQuery } from "@mui/material";
import { smallNumberFormat } from "../../../helpers/numberFormatting";
import dateFormat from "../../../helpers/dateFormat";
import { MouseEventHandler } from "react";

type Props = {
  cellPlacement: number;
  dataFromList: any;
  firstElementClick?: MouseEventHandler<HTMLTableCellElement>;
  property: string;
};

export default function CellsForTable(props: Props) {
  const mediaSmall = useMediaQuery("(max-width:450px)");
  const numbersPropertiesToFormat = ["amount", "price", "total", "averagePrice"];
  let cursorType = "cursor";
  let alignment: "right" | "left" = "right";
  if (props.cellPlacement === 0) {
    alignment = "left";
    cursorType = props.firstElementClick ? "pointer" : "cursor";
  }
  let fontColor = "";
  switch (props.dataFromList.action) {
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
    <TableCell sx={{ cursor: cursorType, color: fontColor }} align={alignment} onClick={props.firstElementClick}>
      {numbersPropertiesToFormat.includes(props.property)
        ? smallNumberFormat(parseFloat(props.dataFromList[props.property]))
        : props.property === "txDate"
        ? dateFormat(props.dataFromList[props.property], mediaSmall)
        : props.dataFromList[props.property] || "N/A"}
    </TableCell>
  );
}
