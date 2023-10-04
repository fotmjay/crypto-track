import { Button } from "@mui/material";
import { useState } from "react";
import ConfirmationModalDialog from "./ConfirmationModalDialog";

type Props = {
  mediaSmall: boolean;
  setSavedTokenList: Function;
};

export default function ImportList(props: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
          throw new Error("Imported data was empty.");
        }
        setOpenDialog(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("The import has failed.  Ensure you export the list before trying again.");
      });
  }

  function confirmationDialog() {
    setOpenDialog(false);
    setErrorMessage("");
  }

  const specificStyle = { paddingX: "15px" };

  return (
    <div>
      <Button size="small" variant="outlined" onClick={() => setOpenDialog(true)}>
        {props.mediaSmall ? "PASTE" : "PASTE WALLET"}
      </Button>
      <ConfirmationModalDialog
        specificStyle={specificStyle}
        isDialogOpen={openDialog}
        errorMessage={errorMessage}
        actionOnConfirm={importList}
        closeDialog={confirmationDialog}
      />
    </div>
  );
}
