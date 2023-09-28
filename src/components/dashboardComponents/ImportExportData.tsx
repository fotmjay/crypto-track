import { Box, useMediaQuery } from "@mui/material";
import ExportList from "./ExportList";
import ImportList from "./ImportList";

export default function ImportExportData() {
  const mediaSmall = useMediaQuery("(max-width:450px)");
  return (
    <Box sx={{ position: "absolute", bottom: "-40px", left: "0", zIndex: "10", display: "flex" }}>
      <ExportList mediaSmall={mediaSmall} />
      <ImportList mediaSmall={mediaSmall} />
    </Box>
  );
}
