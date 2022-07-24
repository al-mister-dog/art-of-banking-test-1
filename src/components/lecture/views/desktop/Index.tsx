import { useAppSelector } from "../../../../app/hooks";
import {
  selectParties,
} from "../../../../features/lectures/lecturesSlice";

import { Box, styled } from "@mui/material";
import SelectedParty from "./sidepanel/SelectedParty";
import Board from "../../Board";
import Notifications from "./toolbars/NotificationsToolbar";
import { useState } from "react";
import usePartyRows from "../../helpers/usePartyRows";
import Introduction from "../../../shared_ui/Introduction";

const InterfaceContainer = styled("div")(({ theme }) => ({
  display: "flex",
  height: "60vh",
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
  const [partiesRowOne, partiesRowTwo] = usePartyRows(config, parties);
  const [selected, setSelected] = useState<string>(
    config.state.system === "centralbank" ? "bank1" : "customer1"
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
            <SelectedParty config={config} selected={parties[selected]} />
          </SidePanelContainer>
        </InterfaceContainer>
        <Notifications config={config} />
      </Box>
    </>
  );
};

export default Index;
