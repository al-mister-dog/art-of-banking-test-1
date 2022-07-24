import { useAppSelector } from "../../../../app/hooks";
import { selectParties } from "../../../../features/lectures/lecturesSlice";
import Introduction from "../../ui/Introduction";
import SelectedParty from "./sidepanel/SelectedParty";
import Board from "../../Board";
import Notifications from "./toolbars/NotificationsToolbar";
import { useState } from "react";
import usePartyRows from "../../helpers/usePartyRows";
import { Box } from "@mui/material";

const Index: React.FunctionComponent<{
  config?: any;
  texts: any;
}> = ({ config, texts }) => {
  const parties = useAppSelector(selectParties);
  const [partiesRowOne, partiesRowTwo] = usePartyRows(config, parties);
  const [selected, setSelected] = useState<string>(
    config.state.system === "centralbank" ? "bank1" : "customer1"
  );
  function selectParty(player: any) {
    setSelected(player.id);
  }
  return (
    <>
      <Introduction texts={texts} />
      <Board
        config={config}
        partiesRowOne={partiesRowOne}
        partiesRowTwo={partiesRowTwo}
        selectParty={selectParty}
      />
      {/* <SelectedParty config={config} selected={parties[selected]} /> */}
      <Notifications config={config} />
    </>
  );
};

export default Index;
