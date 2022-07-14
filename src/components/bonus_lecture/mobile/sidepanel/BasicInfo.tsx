import { Typography } from "@mui/material";
const BasicInfo: React.FunctionComponent<{ selected: any }> = ({
  selected,
}) => {
  interface ICoin {
    coin: string;
    amount: number;
  }
  const coins: ICoin[] = Object.entries(selected.coins).map(([key, value]) => {
    let amount;
    if (typeof value !== "number") {
      amount = 0;
    } else {
      amount = value;
    }
    return { coin: key, amount };
  });
  return (
    <>
      <Typography variant="subtitle1" align="left">
        Equity:
      </Typography>
      {coins.map((c, i) => {
        return (
          <Typography key={i} variant="subtitle2" align="left">
            {c.coin}: {c.amount}
          </Typography>
        );
      })}
      <Typography variant="subtitle1" align="left">
        Goods: {selected.goods}
      </Typography>
    </>
  );
};

export default BasicInfo;
