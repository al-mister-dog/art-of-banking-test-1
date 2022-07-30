import { useAppSelector } from "../../../../app/hooks";
import { selectParties } from "../../../../features/lectures/lecturesSlice";
import { useState } from "react";
import { Box, styled } from "@mui/material";
import SelectedParty from "./sidepanel/Panel";
import Board from "./Board";
import Notifications from "./toolbars/NotificationsToolbar";
import usePartyRows from "../../../../helpers/usePartyRows";
import Introduction from "../../../ui/text/Introduction";

const IntroContainer = styled("div")(({ theme }) => ({
  marginTop: "50px",
  marginBottom: "50px",
  [theme.breakpoints.down("mobile")]: {
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  [theme.breakpoints.up("mobile")]: {
    paddingLeft: "25px",
    paddingRight: "25px",
  },
  [theme.breakpoints.up("tablet")]: {
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  [theme.breakpoints.up("laptop")]: {
    paddingLeft: "75px",
    paddingRight: "75px",
  },
  [theme.breakpoints.up("desktop")]: {
    paddingLeft: "75px",
    paddingRight: "75px",
  },
}));
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
      <IntroContainer>
        <Introduction texts={texts} />
      </IntroContainer>
      {/* <hr style={{ borderBottom: colors.darkMain, color: colors.darkMain,  width: "70%" }} /> */}
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
