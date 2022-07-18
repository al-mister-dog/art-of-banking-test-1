import { Box, Typography } from "@mui/material";
import { colors } from "../../../../config/colorPalette";
import { deCamelize, capitalize } from "../../helpers";
const toolbarTextColor = "black";

const SideOfBalanceSheet: React.FunctionComponent<{
  config?: any;
  side: string;
  instruments: any;
  reserves?: number;
}> = ({ config, side, instruments, reserves }) => {
  return (
    <Box
      p={1}
      flex={"auto"}
      style={{
        borderLeft: `${side === "liabilities" ? `1px solid ${toolbarTextColor}`:`none`}`,
        height: "50%",
        width: "50%",
      }}
    >
      <Typography
        style={{
          fontSize: 16,
          color: toolbarTextColor,
          fontFamily: "Roboto",
          fontWeight: "bold",
          margin: 0,
        }}
      >
        {capitalize(side)}
      </Typography>
      {Object.entries(instruments).map(([k, v], i) => {
        return (
          Array.isArray(v) &&
          v.length > 0 && (
            <div
              key={i}
              style={{
                margin: 0,
                padding: 0,
                textAlign: "left",
                fontSize: 15,
                color: toolbarTextColor,
                fontWeight: 500,
              }}
            >
              {config.balanceSheetDisplay.includes(k) && (
                <Typography sx={{ margin: 0, padding: 0, fontSize: 15, fontFamily: "Roboto",
                fontWeight: "bold", }}>
                  {deCamelize(k)}
                </Typography>
              )}

              {v
                .filter((acc) => config.balanceSheetDisplay.includes(acc.type))
                .map((account) => {
                  return (
                    <Typography
                      key={account.id}
                      style={{ margin: 0, padding: 0, fontSize: 14, fontFamily: "Roboto",
                      fontWeight: "bold", }}
                    >
                      <span>{account.id}: </span>
                      <span>${account.amount}</span>
                    </Typography>
                  );
                })}
            </div>
          )
        );
      })}
      {reserves !== undefined && Object.keys(instruments).includes("bankDeposits") && ( //HACKY
        
        <div
          style={{
            margin: 0,
            padding: 0,
            textAlign: "left",
            fontSize: 14,
            color: toolbarTextColor,
            fontWeight: 500,
          }}
        >
          <hr style={{borderColor: colors.paper}}/>
          <Typography sx={{ margin: 0, padding: 0, fontSize: 15, fontFamily: "Roboto",
          fontWeight: "bold", }}>
            Reserves: ${reserves}
          </Typography>
        </div>
      )}
    </Box>
  );
};

export default SideOfBalanceSheet;