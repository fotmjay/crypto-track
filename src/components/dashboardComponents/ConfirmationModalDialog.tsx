import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

type Props = {
  specificStyle?: { paddingX: string };
  isDialogOpen: boolean;
  errorMessage?: string;
  actionOnConfirm: (() => void) & ((e: React.MouseEvent, txindex: number) => void);
  closeDialog: () => void;
};

export default function ConfirmationModalDialog(props: Props) {
  return (
    <Dialog
      sx={{ maxWidth: "450px", marginX: "auto" }}
      open={props.isDialogOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ ...props.specificStyle }} id="alert-dialog-description" gutterBottom>
          Importing a list will overwrite your current holdings and transactions.
        </DialogContentText>
        <DialogContentText sx={{ ...props.specificStyle }} id="alert-dialog-description">
          Are you sure?
        </DialogContentText>
        {props.errorMessage && (
          <DialogContentText sx={{ ...props.specificStyle }} color="red" id="alert-dialog-description">
            {props.errorMessage}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.closeDialog()}>Cancel</Button>
        {!props.errorMessage && (
          <Button onClick={props.actionOnConfirm} autoFocus>
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
