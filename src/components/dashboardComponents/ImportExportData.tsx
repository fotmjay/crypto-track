import { Box, useMediaQuery } from "@mui/material";
import ExportList from "./ExportList";
import ImportList from "./ImportList";

type Props = {
  setSavedTokenList: Function;
};

export default function ImportExportData(props: Props) {
  const mediaSmall = useMediaQuery("(max-width:450px)");
  return (
    <Box sx={{ position: "absolute", bottom: "-40px", left: "0", zIndex: "10", display: "flex" }}>
      <ExportList mediaSmall={mediaSmall} />
      <ImportList setSavedTokenList={props.setSavedTokenList} mediaSmall={mediaSmall} />
    </Box>
  );
}
