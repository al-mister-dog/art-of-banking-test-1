import { Box, Typography } from "@mui/material";
import PlayerTabs from "./PlayerTabs";
import { deCamelize } from "../../helpers";

const Player: React.FunctionComponent<{ config?: any; selected: any,  }> = ({
  config,
  selected,
  
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "60vh",
        // width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "5px 25px",
          marginBottom: "25px",
        }}
      >
        <Typography variant="h4" align="left" sx={{ marginTop: 4, color: "#134749" }}>
          {deCamelize(selected.id)}
        </Typography>
        <Typography variant="h6" align="left" sx={{ marginTop: 4, fontFamily: "Roboto", fontWeight: "bold", color: "#134749" }}>
          Cash: ${selected.reserves}
        </Typography>
      </Box>
      <PlayerTabs config={config} selected={selected} />
    </Box>
  );
};
export default Player;
