import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import {
  toggleSelectedPartyDrawer,
} from "../../../../features/ui/uiSlice";
import { selectParties } from "../../../../features/lectures/lecturesSlice";
import { useState } from "react";
import { styled } from "@mui/material";
import SelectedPartyDrawer from "../../../shared_ui/index-page/selected-party/Drawer";
import Board from "./Board";
import Notifications from "./toolbars/NotificationsToolbar";
import usePartyRows from "../../helpers/usePartyRows";
import Introduction from "../../../shared_ui/Introduction";

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

const Index: React.FunctionComponent<{
  config?: any;
  texts: any;
}> = ({ config, texts }) => {
  const dispatch = useAppDispatch();
  const parties = useAppSelector(selectParties);
  const [partiesRowOne, partiesRowTwo] = usePartyRows(config, parties);
  const [selected, setSelected] = useState<string>(
    config.state.system === "centralbank" ? "bank1" : "customer1"
  );

  function selectParty(player: any) {
    setSelected(player.id);
    dispatch(toggleSelectedPartyDrawer({ selectedPartyDrawerOpen: true }));
  }
  return (
    <>
      <IntroContainer>
        <Introduction texts={texts} />
      </IntroContainer>
      <Board
        config={config}
        partiesRowOne={partiesRowOne}
        partiesRowTwo={partiesRowTwo}
        selectParty={selectParty}
      />
      <SelectedPartyDrawer
        config={config}
        parties={parties}
        selected={selected}
      />
      <Notifications config={config} />
    </>
  );
};

export default Index;
