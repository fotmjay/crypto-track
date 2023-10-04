import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { Token } from "../../../shared/types/types";

type Props = {
  token: Token;
  txType: string;
  closeInput: Function;
  tokenPrice: string;
  setTokenPrice: Function;
  txAmount: string;
  setTxAmount: Function;
  handleSave: Function;
  errorMessage: string;
};

export default function TransactionInput(props: Props) {
  const mediaSmall = useMediaQuery("(max-width:550px)");
  // Work around to make the TextField the size of the text in it.
  // Keeping if responsiveness brings me to use it again
  // const inputSize = `${props.tokenPrice.length * 11}px`;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>, stateChange: Function) {
    // VALIDATE ONLY FLOAT (1, 0.1, 1.2)
    if (/^[+-]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/.test(event.target.value) || event.target.value === "") {
      stateChange(event.target.value);
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
      <Box maxWidth="225px" marginX={mediaSmall ? "auto" : "inherit"}>
        <TextField
          autoFocus={true}
          sx={{ paddingBottom: "10px" }}
          color={props.txType === "Buy" ? "success" : "error"}
          label={props.txType}
          size="small"
          fullWidth
          value={props.txAmount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, props.setTxAmount)}
        />
        <TextField
          size="small"
          sx={{ paddingBottom: "10px" }}
          fullWidth
          label="Price"
          inputProps={{ sx: { paddingX: "6px" } }}
          value={props.tokenPrice}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, props.setTokenPrice)}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "10px" }}>
        <Button size="small" onClick={() => props.handleSave()}>
          SAVE
        </Button>
        <Button size="small" onClick={() => props.closeInput()}>
          CLOSE
        </Button>
      </Box>
      <Typography gutterBottom variant="body1" color="error">
        {props.errorMessage}
      </Typography>
    </Box>
  );
}
