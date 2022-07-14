import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";
import { useEffect, useState } from "react";
import IndexMobile from "../mobile/Index";
import IndexDesktop from "../desktop/Index";
import { texts2 } from "../assets/texts";

function App() {
  const { me, salviati } = useAppSelector(selectTraders);
  const { you, tomasso } = useAppSelector(selectBankers);
  const [selected, setSelected] = useState<string>("you");
  const florencePlayers = [me, you];
  const lyonsPlayers = [salviati, tomasso];
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
        texts={texts2}
        florencePlayers={florencePlayers}
        lyonsPlayers={lyonsPlayers}
        selected={selected}
        selectPlayer={selectPlayer}
      />
    );
  }

  return (
    <IndexMobile
      texts={texts2}
      florencePlayers={florencePlayers}
      lyonsPlayers={lyonsPlayers}
      selected={selected}
      selectPlayer={selectPlayer}
    />
  );
}

export default App;
