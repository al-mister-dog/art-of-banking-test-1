import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";
import { useState } from "react";
import IndexMobile from "../mobile/Index";
import IndexDesktop from "../desktop/Index";
import { useEffect } from "react";
import { texts5 } from "../assets/texts";

function App() {
  const { me, salviati, federigo, piero } = useAppSelector(selectTraders);
  const { you, tomasso } = useAppSelector(selectBankers);
  const [selected, setSelected] = useState<string>("me");
  const florencePlayers = [me, you, federigo];
  const lyonsPlayers = [salviati, tomasso, piero];
  function selectPlayer(player: any) {
    setSelected(player.id);
  }

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 700;
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  if (width > breakpoint) {
    return (
      <IndexDesktop
        texts={texts5}
        florencePlayers={florencePlayers}
        lyonsPlayers={lyonsPlayers}
        selected={selected}
        selectPlayer={selectPlayer}
        notifications={true}
      />
    );
  }

  return (
    <IndexMobile
      texts={texts5}
      florencePlayers={florencePlayers}
      lyonsPlayers={lyonsPlayers}
      selected={selected}
      selectPlayer={selectPlayer}
      notifications={true}
    />
  );
}

export default App;
