import { TableCell, useMediaQuery } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { tableCategories } from "../../../constants/tableCategories";

export default function TableTitles() {
  const mediaSmall = useMediaQuery("(max-width:695px)");
  return (
    <TableRow>
      {tableCategories.head[mediaSmall ? "small" : "large"].map((title, i) => (
        <TableCell key={i} align={i === 0 ? "left" : "right"}>
          {title}
        </TableCell>
      ))}
    </TableRow>
  );
}
