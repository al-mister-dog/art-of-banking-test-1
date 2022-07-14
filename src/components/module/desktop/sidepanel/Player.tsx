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
        width: "100%",
        height: "60vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "5px 25px",
        }}
      >
        <Typography variant="h6" align="left" sx={{ marginTop: 4 }}>
          {deCamelize(selected.id)}
        </Typography>
        <Typography variant="body1" align="left" sx={{ marginTop: 4 }}>
          Cash: ${selected.reserves}
        </Typography>
      </Box>
      <PlayerTabs config={config} selected={selected} />
    </Box>
  );
};
export default Player;
