import { Box, Card, CardContent, Typography, styled } from "@mui/material";
import { colors } from "../../config/colorPalette";
import { capitalize } from "../lecture/helpers/parsers";
import SideBalance from "../lecture/ui/desktop/SideOfBalanceSheet";

const BalanceSheetCard = styled(Card)(({ theme }) => ({
  flex: "0 0 auto",
  borderRadius: 5,
  textAlign: "center",
  minWidth: 300,
  margin: 25,
  backgroundColor: colors.balanceSheetsColor,
  "&:hover": {
    opacity: [0.9, 0.8, 0.7],
  },
  "&:active": {
    border: "1px solid blue",
  },
  cursor: "pointer",

  [theme.breakpoints.down("laptop")]: { minWidth: "40vw" },
  [theme.breakpoints.down("smallTablet")]: { minWidth: "85vw" },
}));
const BalanceSheet: React.FunctionComponent<{
  config?: any;
  party: any;
  selectParty: (b: any) => void;
}> = ({ config, party, selectParty }) => {
  return (
    <BalanceSheetCard onClick={() => selectParty(party)}>
      <CardContent sx={{ padding: 1 }}>
        <Typography
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: colors.balanceSheetsTextColor,
          }}
        >
          {capitalize(party.id)}
        </Typography>
      </CardContent>
      <Box
        display={"flex"}
        sx={{ borderTop: `1px solid ${colors.balanceSheetsTextColor}` }}
      >
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
    </BalanceSheetCard>
  );
};

export default BalanceSheet;
