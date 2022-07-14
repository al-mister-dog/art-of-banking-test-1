import { Box, Typography } from "@mui/material";
import PlayerTabs from "./PlayerTabs";
import florenceFlag from "../../assets/florence-flag.png";
import lyonsFlag from "../../assets/lyons-flag.png";
import { capitalize } from "../../helpers";

const Player: React.FunctionComponent<{ selected: any }> = ({ selected }) => {

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "40vh",
          paddingBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "10px",
          }}
        >
          <div>
            <Typography
              variant="h6"
              align="left"
              sx={{ fontSize: 13, fontWeight: "bold" }}
            >
              {capitalize(selected.id)}:
            </Typography>
            <Typography variant="h6" align="left" sx={{ fontSize: 13 }}>
              {capitalize(selected.type)}, {capitalize(selected.city)}
            </Typography>
          </div>

          <img
            src={selected.city === "florence" ? florenceFlag : lyonsFlag}
            alt="asas"
            style={{ width: "60px", height: "40px" }}
          ></img>
        </div>

        <PlayerTabs selected={selected} />
      </Box>
    </>
  );
};
export default Player;
