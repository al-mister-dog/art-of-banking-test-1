import { Box, Typography } from "@mui/material";
const toolbarTextColor = "#f2eecb";
type Account = {
  [index: string]: any;
};

const Side: React.FunctionComponent<{
  side: string;
  bills: any;
  coins: any;
}> = ({ side, bills, coins }) => {
  return (
    <Box
      p={1}
      flex={"auto"}
      style={{
        borderLeft: `1px solid ${toolbarTextColor}`,
        borderColor: "rgba(0, 0, 0, 0.08)",
        height: "50%",
        width: "50%",
      }}
    >
      <Typography
        style={{
          fontSize: 12,
          color: toolbarTextColor,
          fontWeight: 500,
          margin: 0,
        }}
      >
        {side}
      </Typography>

      {bills.length > 0 && (
        <div
          style={{
            margin: 0,
            padding: 0,
            textAlign: "left",
            fontSize: 12,
            color: toolbarTextColor,
            fontWeight: 500,
          }}
        >
          <Typography style={{ margin: 0, padding: 0 }}>Bills</Typography>
          {bills.map((account: Account, i: number) => {
            return account.paid ? (
              <Typography key={account.id} style={{ margin: 0, padding: 0 }}>
                <s style={{color: toolbarTextColor}}>
                  <span>
                    {side === "liabilities"
                      ? `Due to ${account.dueTo}: `
                      : `Due from ${account.dueFrom}: `}
                  </span>

                  <span>{account.amount}</span>
                </s>
              </Typography>
            ) : (
              <Typography key={account.id} style={{ margin: 0, padding: 0 }}>
                <span>
                  {side === "liabilities"
                    ? `Due to ${account.dueTo}: `
                    : `Due from ${account.dueFrom}: `}
                </span>
                <span>{account.amount}</span>
              </Typography>
            );
          })}
        </div>
      )}
      {coins.length > 0 && (
        <div
          style={{
            margin: 0,
            padding: 0,
            color: toolbarTextColor,
            textAlign: "left",
            fontSize: 12,
            fontWeight: 500,
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          }}
        >
          <Typography style={{ margin: 0, padding: 0 }}>Coins</Typography>

          {coins.map((account: Account, i: number) => {
            return (
              <Typography key={i} style={{ margin: 0, padding: 0 }}>
                <span>{account.coinType}: </span>
                <span>{account.amount}</span>
              </Typography>
            );
          })}
        </div>
      )}
    </Box>
  );
};

export default Side;
