export default function createPriceFetchString(tokenList: Token[]) {
  return (
    tokenList.reduce((acc, token, i) => (i === 0 ? token.id : `${acc}%2C${token.id}`), "") +
    "&vs_currencies=usd&include_market_cap=true&include_24hr_change=true"
  );
}
