import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";

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

  function confirmationDialog(toggle: boolean) {
    setOpenDialog(toggle);
    if (toggle === false) {
      setErrorMessage("");
    }
  }

  const extraPadding = { paddingX: "15px" };

  return (
    <div>
      <Button size="small" variant="outlined" onClick={() => confirmationDialog(true)}>
        {props.mediaSmall ? "IMPORT" : "IMPORT LIST"}
      </Button>
      <Dialog sx={{ maxWidth: "450px", marginX: "auto" }} open={openDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ ...extraPadding }} id="alert-dialog-description" gutterBottom>
            Importing a list will overwrite your current holdings and transactions.
          </DialogContentText>
          <DialogContentText sx={{ ...extraPadding }} id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
          {errorMessage && (
            <DialogContentText sx={{ ...extraPadding }} color="red" id="alert-dialog-description">
              {errorMessage}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => confirmationDialog(false)}>Cancel</Button>
          {!errorMessage && (
            <Button onClick={importList} autoFocus>
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
