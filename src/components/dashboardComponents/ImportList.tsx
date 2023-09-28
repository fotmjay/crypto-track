import { Button, Tooltip } from "@mui/material";
import { useState } from "react";

type Props = {
  mediaSmall: boolean;
  setSavedTokenList: Function;
};

export default function ImportList(props: Props) {
  const [tooltip, setTooltip] = useState(false);

  function importList() {
    navigator.clipboard
      .readText()
      .then((data) => {
        const decodedString = atob(data);
        if (decodedString) {
          const decodedDataObject = JSON.parse(decodedString);
          localStorage.setItem("savedList", decodedString);
          props.setSavedTokenList(decodedDataObject);
        } else {
          tooltipTimer();
        }
      })
      .catch((err) => {
        console.error(err);
        tooltipTimer();
      });
  }
  function tooltipTimer() {
    setTooltip(true);
    setTimeout(() => setTooltip(false), 3000);
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
      title="Invalid data, please export it again."
      placement="top-start"
    >
      <Button size="small" variant="outlined" onClick={importList}>
        {props.mediaSmall ? "IMPORT" : "IMPORT LIST"}
      </Button>
    </Tooltip>
  );
}
