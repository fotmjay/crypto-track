import { Button, Tooltip, useMediaQuery } from "@mui/material";
import { useState } from "react";

export default function ExportList() {
  const [tooltip, setTooltip] = useState(false);
  const mediaSmall = useMediaQuery("(max-width:450px)");

  function generateSavedListLink() {
    const data = localStorage.getItem("savedList");
    if (data) {
      const encoded = btoa(data);
      navigator.clipboard.writeText(encoded);
      tooltipTimer();
    } else {
    }
  }
  function tooltipTimer() {
    setTooltip(true);
    setTimeout(() => setTooltip(false), 1000);
  }
  return (
    <Tooltip
      PopperProps={{
        disablePortal: true,
      }}
      onClose={() => setTooltip(false)}
      open={tooltip}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      title="Copied to clipboard."
      placement="bottom-start"
    >
      <Button sx={{ position: "absolute", bottom: "-40px", left: "0", zIndex: "10" }} size="small" variant="outlined" onClick={generateSavedListLink}>
        {mediaSmall ? "EXPORT" : "EXPORT LIST"}
      </Button>
    </Tooltip>
  );
}
