// React & Mui
import { TableBody } from "@mui/material";

// Types
import type { Props } from "./TableRowsTypes";
import Row from "./Row";

// Main
export default function TableRows(props: Props) {
  return (
    <TableBody>
      {props.dataList.map((data: any) => (
        <Row key={data.id || data.txDate} firstElementClick={props.firstElementClick} dataFromList={data} namedProperties={props.namedProperties}></Row>
      ))}
    </TableBody>
  );
}
