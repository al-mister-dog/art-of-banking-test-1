import { Box, Typography } from "@mui/material";
import PlayerTabs from "./SelectedPartyTabs";
import { deCamelize } from "../../../helpers/parsers";
import { colors } from "../../../../../config/colorPalette";

const Player: React.FunctionComponent<{ config?: any; selected: any }> = ({
  config,
  selected,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            padding: "10px",
          }}
        >
          <Typography variant="h4" sx={{color: colors.darkMain}}>{deCamelize(selected.id)}</Typography>
          <Typography variant="h6" sx={{fontFamily: "Roboto", fontWeight: "bold", color: colors.darkMain}}>Cash: ${selected.reserves}</Typography>
        </div>

        <PlayerTabs config={config} selected={selected} />
      </Box>
    </>
  );
};
export default Player;
