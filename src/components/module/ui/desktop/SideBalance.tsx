import { Box, Typography } from "@mui/material";
import { deCamelize, capitalize } from "../../helpers";
const toolbarTextColor = "#f2eecb";

const Side: React.FunctionComponent<{
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
        borderLeft: `1px solid ${toolbarTextColor}`,
        height: "50%",
        width: "50%",
      }}
    >
      <Typography
        style={{
          fontSize: 14,
          color: toolbarTextColor,
          fontWeight: 500,
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
                fontSize: 13,
                color: toolbarTextColor,
                fontWeight: 500,
              }}
            >
              {config.balanceSheetDisplay.includes(k) && (
                <Typography sx={{ margin: 0, padding: 0, fontSize: 13 }}>
                  {deCamelize(k)}
                </Typography>
              )}

              {v
                .filter((acc) => config.balanceSheetDisplay.includes(acc.type))
                .map((account) => {
                  return (
                    <Typography
                      key={account.id}
                      style={{ margin: 0, padding: 0, fontSize: 12 }}
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
            fontSize: 12,
            color: toolbarTextColor,
            fontWeight: 500,
          }}
        >
          <hr style={{borderColor: "#f2eecb"}}/>
          <Typography sx={{ margin: 0, padding: 0, fontSize: 13 }}>
            Reserves: ${reserves}
          </Typography>
        </div>
      )}
    </Box>
  );
};

export default Side;