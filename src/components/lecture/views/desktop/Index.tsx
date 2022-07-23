import { useAppSelector } from "../../../../app/hooks";
import {
  selectParties,
  // createNewCustomer,
} from "../../../../features/lectures/lecturesSlice";
import Introduction from "../../ui/Introduction";

import { Box, styled } from "@mui/material";
import Player from "./sidepanel/Player";
import Board from "./Board";
import Notifications from "./toolbars/NotificationsToolbar";
import { useState } from "react";
import usePartiesArray from "../../helpers/useParties";

const InterfaceContainer = styled("div")(({ theme }) => ({
  display: "flex",
  height: "60vh",
  // margin: "5px",
  // border: "1px solid #BDBDBD",
  // borderRadius: "5px",
  marginBottom: "20px",
}));
const BoardContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("mobile")]: {
    width: "50%",
  },
  [theme.breakpoints.up("tablet")]: {
    width: "60%",
  },
  [theme.breakpoints.up("laptop")]: {
    width: "60%",
  },
  [theme.breakpoints.up("desktop")]: {
    width: "65%",
  },
}));
const SidePanelContainer = styled("div")(({ theme }) => ({
  margin: "auto",

  [theme.breakpoints.up("mobile")]: {
    width: "50%",
  },
  [theme.breakpoints.up("tablet")]: {
    width: "40%",
  },
  [theme.breakpoints.up("laptop")]: {
    width: "40%",
  },
  [theme.breakpoints.up("desktop")]: {
    width: "35%",
  },
}));

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
      <Box
        sx={{
          paddingLeft: "75px",
          paddingRight: "75px",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Introduction texts={texts} />
      </Box>
      <hr style={{ color: "#bccccd", width: "70%" }} />
      <Box
        sx={{
          // backgroundColor: "#e2e9e9",
          // borderTop: "1px solid #bccccd",

          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <InterfaceContainer>
          <BoardContainer>
            <Board
              config={config}
              partiesRowOne={partiesRowOne}
              partiesRowTwo={partiesRowTwo}
              selectParty={selectParty}
            />
          </BoardContainer>

          <SidePanelContainer>
            <Player config={config} selected={parties[selected]} />
          </SidePanelContainer>
        </InterfaceContainer>
        <Notifications config={config} />
      </Box>
      {/* <hr style={{ color: "#bccccd", width: "50%" }} /> */}
      {/* <Button onClick={() => dispatch(createNewCustomer())}>
        Create Customer
      </Button> */}
    </>
  );
};

export default Index;
