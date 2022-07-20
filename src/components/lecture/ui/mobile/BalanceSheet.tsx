import { Box, Card, CardContent, Typography, styled } from "@mui/material";
import SideBalance from "./SideOfBalanceSheet";
import { capitalize } from "../../helpers/parsers";
import { colors } from "../../../../config/colorPalette";
const toolbarTextColor = colors.balanceSheetsTextColor;

const BalanceSheetCard = styled(Card)(({theme}) => ({
  flex: "0 0 auto",
  minWidth: "30vw",
  borderRadius: 5,
  textAlign: "center",
  margin: "5px",
  backgroundColor: colors.balanceSheetsColor,
  [theme.breakpoints.up('tablet')]: {minWidth: "40vw"},
  [theme.breakpoints.down('smallTablet')]: {minWidth: "85vw"}
}))
const BalanceSheetTrader: React.FunctionComponent<{
  config?: any;
  bank: any;
  selectParty: (b: any) => void;
}> = ({ config, bank, selectParty }) => {
  return (
    <BalanceSheetCard
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
    </BalanceSheetCard>
  );
};

export default BalanceSheetTrader;
