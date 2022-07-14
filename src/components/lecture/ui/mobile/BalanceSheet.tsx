import { Box, Card, CardContent, Typography } from "@mui/material";
import SideBalance from "./SideOfBalanceSheet";
import { capitalize } from "../../helpers";
const toolbarTextColor = "#f2eecb";
const BalanceSheetTrader: React.FunctionComponent<{
  config?: any;
  bank: any;
  selectParty: (b: any) => void;
}> = ({ config, bank, selectParty }) => {
  return (
    <Card
      style={{
        flex: "0 0 auto",
        width: "70vw",
        borderRadius: 12,
        textAlign: "center",
        margin: "5px",
        backgroundColor: "#62120E",
      }}
      sx={{
        "&:hover": {
          opacity: [0.9, 0.8, 0.7],
        },
        "&:active": {
          border: "1px solid blue",
        },
        cursor: "pointer",
      }}
      onClick={() => selectParty(bank)}
    >
      <CardContent sx={{ padding: 1 }}>
        <Typography
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: toolbarTextColor,
          }}
        >
          {capitalize(bank.id)}
        </Typography>
        <Typography
          style={{
            fontSize: 12,
            color: toolbarTextColor,
          }}
        >
          {capitalize(bank.id)}
        </Typography>
      </CardContent>
      <Box display={"flex"} sx={{ borderTop: `1px solid ${toolbarTextColor}` }}>
        <SideBalance
          config={config}
          side="assets"
          instruments={bank.assets}
          reserves={bank.reserves}
        />
        <SideBalance
          config={config}
          side="liabilities"
          instruments={bank.liabilities}
        />
      </Box>
    </Card>
  );
};

export default BalanceSheetTrader;
