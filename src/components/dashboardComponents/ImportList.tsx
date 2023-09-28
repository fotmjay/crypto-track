import { Button, Tooltip } from "@mui/material";
import { useState } from "react";

type Props = {
  mediaSmall: boolean;
};

export default function ImportList(props: Props) {
  const [tooltip, setTooltip] = useState(false);

  function importList() {
    navigator.clipboard.readText().then((data) => {
      const decoded = atob(data);
      if (decoded) {
        console.log(decoded);
      } else {
        tooltipTimer;
      }
    });
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
      title="Data string invalid."
      placement="top-start"
    >
      <Button size="small" variant="outlined" onClick={importList}>
        {props.mediaSmall ? "IMPORT" : "IMPORT LIST"}
      </Button>
    </Tooltip>
  );
}
