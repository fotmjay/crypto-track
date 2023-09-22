// React & Mui
import { TableCell, useMediaQuery, TableRow } from "@mui/material";

// Type definitions
type Props = {
  categories: Size;
};

type Size = {
  large: string[];
  small: string[];
};

// Main
export default function TableTitles(props: Props) {
  const mediaSmall = useMediaQuery("(max-width:695px)");

  return (
    <TableRow>
      {props.categories[mediaSmall ? "small" : "large"].map((title, i) => (
        <TableCell key={i} align={i === 0 ? "left" : "right"}>
          {title}
        </TableCell>
      ))}
    </TableRow>
  );
}
