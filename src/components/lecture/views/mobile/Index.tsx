import { useAppSelector } from "../../../../app/hooks";
import { selectParties } from "../../../../features/lectures/lecturesSlice";

import SelectedParty from "./sidepanel/SelectedParty";
import Board from "../../Board";
import Notifications from "./toolbars/NotificationsToolbar";
import { useState } from "react";
import usePartyRows from "../../helpers/usePartyRows";
import { Box, Button, SwipeableDrawer } from "@mui/material";
import { colors } from "../../../../config/colorPalette";
import Introduction from "../../../shared_ui/Introduction";

const Index: React.FunctionComponent<{
  config?: any;
  texts: any;
}> = ({ config, texts }) => {
  const parties = useAppSelector(selectParties);
  const [partiesRowOne, partiesRowTwo] = usePartyRows(config, parties);
  const [selected, setSelected] = useState<string>(
    config.state.system === "centralbank" ? "bank1" : "customer1"
  );
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };
  function selectParty(player: any) {
    setSelected(player.id);
    setOpen(true);
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
      <SwipeableDrawer
        PaperProps={{ sx: { backgroundColor: colors.paper } }}
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 300,
            minHeight: "100vh",
            // backgroundColor: colors.paper,
            padding: "5px",
          }}
          role="presentation"
          // onClick={toggleDrawer(false)}
          // onKeyDown={toggleDrawer(false)}
        >
          <Button
            onClick={toggleDrawer(false)}
            sx={{ alignSelf: "flex-end", fontSize: 16, marginRight: 2 }}
          >
            Close
          </Button>
          <SelectedParty config={config} selected={parties[selected]} />
        </Box>
      </SwipeableDrawer>

      <Notifications config={config} />
    </>
  );
};

export default Index;
