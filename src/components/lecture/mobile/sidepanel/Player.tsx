import { Box, Typography } from "@mui/material";
import PlayerTabs from "./PlayerTabs";
import { deCamelize } from "../../helpers";

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
            marginTop: "25px",
          }}
        >
          <Typography variant="h4">{deCamelize(selected.id)}</Typography>
          <Typography variant="h6" sx={{fontFamily: "Roboto", fontWeight: "bold"}}>Cash: ${selected.reserves}</Typography>
        </div>

        <PlayerTabs config={config} selected={selected} />
      </Box>
    </>
  );
};
export default Player;
