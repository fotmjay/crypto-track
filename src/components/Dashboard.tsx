import Card from "@mui/material/Card";
import TokenAdd from "./dashboardComponents/TokenAdd";
import TokenList from "./dashboardComponents/TokenList";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import { useState } from "react";

type Props = {
  fullTokenList: Token[];
};

export default function Dashboard(props: Props) {
  const [savedTokenList, setSavedTokenList] = useState<Token[]>(() => getSavedList());

  function getSavedList() {
    const list = localStorage.getItem("savedList");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  }

  function addToken(token: Token | null) {
    if (token !== null) {
      setSavedTokenList((list) => {
        if (!list.find((tokenFromList) => tokenFromList.id === token.id)) {
          list.push(token);
          localStorage.setItem("savedList", JSON.stringify(list));
        }
        return list;
      });
    }
  }

  return (
    <Card variant="outlined">
      <Container sx={{ display: "flex", justifyContent: "center", alignContent: "center", padding: "20px" }}>
        <TokenAdd addToken={addToken} fullTokenList={props.fullTokenList} />
      </Container>
      <Divider />
      <TokenList savedTokenList={savedTokenList} />
    </Card>
  );
}
