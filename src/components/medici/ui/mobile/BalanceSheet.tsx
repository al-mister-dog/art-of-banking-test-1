import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import SideBalance from "./SideBalance";
import {capitalize} from "../../helpers"
const toolbarTextColor = '#f2eecb'
const BalanceSheetTrader: React.FunctionComponent<{
  bank: any;
  selectPlayer: (b: any) => void;
}> = ({ bank, selectPlayer }) => {
  
  return (
    <Card
      style={{
        flex: "0 0 auto",
        width: "70vw",
        borderRadius: 12,
        textAlign: "center",
        margin: "5px",
        backgroundColor: "#62120E"
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
      onClick={() => selectPlayer(bank)}
    >
      <CardContent sx={{padding: 1}}>
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
          {capitalize(bank.city)}
        </Typography>
      </CardContent>
      <Box display={"flex"} sx={{borderTop: `1px solid ${toolbarTextColor}`}}>
        <SideBalance side="assets" bills={bank.assets} coins={bank.coinAsset} />
        <SideBalance
          side="liabilities"
          bills={bank.liabilities}
          coins={bank.coinLiability}
        />
      </Box>
    </Card>
  );
};

export default BalanceSheetTrader;
