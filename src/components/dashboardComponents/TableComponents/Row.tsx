import { TableRow } from "@mui/material";
import { Token, Transaction } from "../../../shared/types/types";
import CellsForTable from "./CellsForTable";

type Props = {
  dataFromList: Token & Transaction;
  namedProperties: string[];
  firstElementClick?: Function;
};

export default function Row(props: Props) {
  function handleClick() {
    if (props.firstElementClick !== undefined) {
      props.firstElementClick(props.dataFromList);
    }
  }

  return (
    <TableRow key={props.dataFromList.id || props.dataFromList.txDate} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {props.namedProperties.map((property, i) => (
        <CellsForTable
          firstElementClick={i === 0 ? handleClick : undefined}
          key={property}
          property={property}
          cellPlacement={i}
          dataFromList={props.dataFromList}
        />
      ))}
    </TableRow>
  );
}
