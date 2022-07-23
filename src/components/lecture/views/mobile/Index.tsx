import { useAppSelector } from "../../../../app/hooks";
import {
  selectParties,
  // createNewCustomer,
} from "../../../../features/lectures/lecturesSlice";
import Introduction from "../../ui/Introduction";

import { Box } from "@mui/material";
import Player from "./sidepanel/Player";
import Board from "./Board";
import Notifications from "./toolbars/NotificationsToolbar";
import usePartiesArray from "../../helpers/useParties";
import { useState } from "react";

const Index: React.FunctionComponent<{
  config?: any;
  texts: any;
}> = ({ config, texts }) => {
  const parties = useAppSelector(selectParties);
  const [selected, setSelected] = useState<string>(
    config.state.system === "centralbank" ? "bank1" : "customer1"
  );

  const configPartiesOne = config.parties.filter(
    (party: string) => party.includes("central") || party.includes("customer")
  );
  const configPartiesTwo = config.parties.filter(
    (party: string) =>
      (party.includes("bank") || party.includes("clearinghouse")) &&
      !party.includes("central")
  );

  const [partiesArray] = usePartiesArray(parties);

  const partiesRowOne = partiesArray.filter((party) =>
    configPartiesOne.includes(party.id)
  );

  const partiesRowTwo = partiesArray.filter((party) =>
    configPartiesTwo.includes(party.id)
  );

  function selectParty(player: any) {
    setSelected(player.id);
  }
  return (
    <>
      <Introduction texts={texts} />
      <Notifications config={config} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // margin: "1px",
          // border: "1px solid #BDBDBD",
          borderRadius: "5px",
        }}
      >
        <Box>
          <Board
            config={config}
            partiesRowOne={partiesRowOne}
            partiesRowTwo={partiesRowTwo}
            selectParty={selectParty}
          />
        </Box>
        <Box>
          <Player config={config} selected={parties[selected]} />
        </Box>
      </Box>
    </>
  );
};

export default Index;
