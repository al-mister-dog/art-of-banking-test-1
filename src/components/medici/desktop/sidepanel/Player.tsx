import { Box, Typography } from "@mui/material";
import PlayerTabs from "./PlayerTabs";
import florenceFlag from "../../assets/florence-flag.png";
import lyonsFlag from "../../assets/lyons-flag.png";
import { capitalize } from "../../helpers";

const Player: React.FunctionComponent<{ selected: any }> = ({ selected }) => {
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
          {capitalize(selected.id)}: {capitalize(selected.type)},{" "}
          {capitalize(selected.city)}
        </Typography>
        <img
          src={selected.city === "florence" ? florenceFlag : lyonsFlag}
          alt="asas"
          style={{ width: "150px", filter: "sepia(50%)" }}
        ></img>
      </Box>
        <PlayerTabs selected={selected} />
    </Box>
  );
};
export default Player;
