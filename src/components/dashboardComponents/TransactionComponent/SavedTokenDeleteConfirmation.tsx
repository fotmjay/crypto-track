import { Box, Typography, Button } from "@mui/material";
import type { Token } from "../../../shared/types/types";

type Props = {
  setDeleteConfirmation: Function;
  tokenToDelete: Token;
  setSavedTokenList: Function;
};

export default function SavedTokenDeleteConfirmation(props: Props) {
  function deleteTokenFromList(token: Token) {
    props.setSavedTokenList((oldList: Token[]) => {
      const newList = oldList.filter((tokenFromList: Token) => tokenFromList.id !== token.id);
      localStorage.setItem("savedList", JSON.stringify(newList));
      return newList;
    });
  }
  return (
    <Box display="flex" alignItems="center">
      <Typography>Are you sure?</Typography>
      <Button onClick={() => deleteTokenFromList(props.tokenToDelete)}>Yes</Button>
      <Button onClick={() => props.setDeleteConfirmation(false)}>No</Button>
    </Box>
  );
}
