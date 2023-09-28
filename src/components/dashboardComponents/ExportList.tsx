import { Button, Tooltip } from "@mui/material";
import { useState } from "react";

type Props = {
  mediaSmall: boolean;
};

export default function ExportList(props: Props) {
  const [tooltip, setTooltip] = useState(false);

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
      placement="top-start"
    >
      <Button size="small" variant="outlined" onClick={generateSavedListLink}>
        {props.mediaSmall ? "EXPORT" : "EXPORT LIST"}
      </Button>
    </Tooltip>
  );
}
