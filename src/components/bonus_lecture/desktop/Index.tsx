import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";
import Introduction from "../ui/Introduction";
import { Box } from "@mui/material";
import Player from "./sidepanel/Player";
import Board from "./Board";
import Notifications from "./toolbars/NotificationsToolbar";
import Refresh from "./toolbars/RefreshToolbar";

const SelectedPlayer = ({ player }: { player: any }) => {
  return <Player selected={player} />;
};

const Index: React.FunctionComponent<{
  texts: any;
  florencePlayers: any;
  lyonsPlayers: any;
  selected: string;
  selectPlayer: (v: any) => void;
  notifications?: boolean;
}> = ({
  texts,
  florencePlayers,
  lyonsPlayers,
  selected,
  selectPlayer,
  notifications,
}) => {
  const { me, salviati, federigo, piero } = useAppSelector(selectTraders);
  const { you, tomasso } = useAppSelector(selectBankers);

  return (
    <>
      <Box
        sx={{ paddingLeft: "75px", paddingRight: "75px", marginTop: "50px" }}
      >
        <Introduction texts={texts} />
      </Box>

      {notifications ? <Notifications /> : <Refresh />}
      <Box
        style={{
          display: "flex",
          height: "60vh",
          margin: "5px",
          border: "1px solid #BDBDBD",
          borderRadius: "5px",
        }}
      >
        <Box
          style={{
            overflowX: "hidden",
          }}
        >
          <Board
            florencePlayers={florencePlayers}
            lyonsPlayers={lyonsPlayers}
            selectPlayer={selectPlayer}
          />
        </Box>
        <Box sx={{ width: "40%", margin: "auto" }}>
          {selected === "me" && <SelectedPlayer player={me} />}
          {selected === "you" && <SelectedPlayer player={you} />}
          {selected === "salviati" && <SelectedPlayer player={salviati} />}
          {selected === "tomasso" && <SelectedPlayer player={tomasso} />}
          {selected === "piero" && <SelectedPlayer player={piero} />}
          {selected === "federigo" && <SelectedPlayer player={federigo} />}
        </Box>
      </Box>
    </>
  );
};

export default Index;
