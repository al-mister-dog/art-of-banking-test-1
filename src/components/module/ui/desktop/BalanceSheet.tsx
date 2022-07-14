import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import SideBalance from "./SideBalance";
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
        borderRadius: 12,
        minWidth: 300,
        textAlign: "center",
        margin: 25,
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
      <CardContent>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: "bold",
            color: toolbarTextColor,
          }}
        >
          {capitalize(bank.id)}
        </Typography>
        <Typography
          style={{
            fontSize: 14,
            color: toolbarTextColor,
          }}
        ></Typography>
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
