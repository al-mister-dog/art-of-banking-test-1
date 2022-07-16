import { Box, Card, CardContent, Typography } from "@mui/material";
import SideBalance from "./SideOfBalanceSheet";
import { capitalize } from "../../helpers";
import { colors } from "../../../../config/colorPalette";
const toolbarTextColor = "#f5f1d6";
const BalanceSheetTrader: React.FunctionComponent<{
  config?: any;
  bank: any;
  selectParty: (b: any) => void;
}> = ({ config, bank, selectParty }) => {
  return (
    <Card
      style={{
        borderRadius: 5,
        minWidth: 300,
        textAlign: "center",
        margin: 25,
        backgroundColor: colors.balanceSheetsColor,
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
            fontSize: 22,
            fontWeight: "bold",
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
