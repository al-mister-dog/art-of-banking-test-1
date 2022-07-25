import { Box, Typography } from "@mui/material";
import { colors } from "../../../config/colorPalette";
import { IBank } from "../../../features/lectures/program/types";
import { deCamelize } from "../../lecture/helpers/parsers";

const Records = ({ selected }: { selected: IBank }) => {
  return (
    <Box
      width="100%"
      sx={{ display: "flex", flexDirection: "column-reverse", margin: "auto" }}
    >
      {selected.records.map((record: any, index: number) => {
        const {
          amount,
          balance,
          credit,
          instrumentType,
          party,
          transactionType,
        } = record;
        const str1 = `${deCamelize(party)}: `;
        const str2 = `${credit ? `+` : `-`} $${amount}`;
        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
              borderBottom: `1px solid ${colors.light}`,
            }}
          >
            <Typography sx={{fontFamily: "Roboto"}}>{str1}</Typography>
            <Typography sx={{fontFamily: "Roboto", fontWeight: "bold"}}>{str2}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default Records;
