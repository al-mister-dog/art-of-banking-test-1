import { Box, Card, CardContent, Typography } from "@mui/material";
import SideBalance from "./SideOfBalanceSheet";
import { capitalize } from "../../helpers/parsers";
import { colors } from "../../../../config/colorPalette";
const toolbarTextColor = colors.balanceSheetsTextColor
const BalanceSheetTrader: React.FunctionComponent<{
  config?: any;
  party: any;
  selectParty: (b: any) => void;
}> = ({ config, party, selectParty }) => {
  return (
    <Card
      style={{
        borderRadius: 4,
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
      onClick={() => selectParty(party)}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: "bold",
            color: toolbarTextColor,
          }}
        >
          {capitalize(party.id)}
        </Typography>
        
      </CardContent>
      <Box display={"flex"} sx={{ borderTop: `1px solid ${toolbarTextColor}` }}>
        <SideBalance
          config={config}
          side="assets"
          instruments={party.assets}
          reserves={party.reserves}
        />
        <SideBalance
          config={config}
          side="liabilities"
          instruments={party.liabilities}
        />
      </Box>
    </Card>
  );
};

export default BalanceSheetTrader;
